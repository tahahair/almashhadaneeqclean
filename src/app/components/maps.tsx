// pages/location.js
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from '../styles.module.css';
import 'leaflet/dist/leaflet.css';

type Coordinates = {
  lat: number;
  lng: number;
};

export default function LocationPage() {
  const [location, setLocation] = useState({ lat: 24.774265, lng: 46.738586 }); // الرياض كموقع افتراضي
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [mapUrl, setMapUrl] = useState('');
  const mapRef = useRef(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // تحميل خريطة Leaflet
  useEffect(() => {
    // استيراد Leaflet بشكل ديناميكي لأنه يعتمد على window
    if (typeof window !== 'undefined') {
      import('leaflet').then(L => {
        if (!mapRef.current || mapInstance.current) return;
        
        // تهيئة الخريطة
        const map = L.map(mapRef.current).setView([location.lat, location.lng], 15);
        
        // إضافة طبقة الخريطة من OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // إضافة علامة
        const marker = L.marker([location.lat, location.lng], {
          draggable: true,
          title: 'اسحب لتحديد الموقع'
        }).addTo(map);
        
        // حفظ المراجع
        mapInstance.current = map;
        markerRef.current = marker;
        
        // الأحداث للخريطة والعلامة
        map.on('click', (e) => {
          const clickedLocation = e.latlng;
          updateLocation(clickedLocation);
        });
        
        marker.on('dragend', () => {
          const newPosition = marker.getLatLng();
          updateLocation(newPosition);
        });
        
        // تحديث العنوان للموقع الافتراضي
        updateAddressFromCoordinates(location);
        setLoading(false);
      }).catch(err => {
        console.error('فشل في تحميل مكتبة Leaflet:', err);
        setError('فشل في تحميل مكتبة الخرائط');
        setLoading(false);
      });
    }
    
    return () => {
      // تنظيف عند إلغاء تحميل المكون
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  // تحديث الموقع والعنوان
interface Location {
    lat: number;
    lng: number;
}

const updateLocation = (newLocation: Location) => {
    setLocation(newLocation);
    
    // تحريك العلامة إلى الموقع الجديد
    if (markerRef.current) {
        markerRef.current.setLatLng(newLocation);
    }
    
    // تحديث العنوان
    updateAddressFromCoordinates(newLocation);
    
    // تحديث رابط الخريطة
    const mapsUrl = `https://www.openstreetmap.org/?mlat=${newLocation.lat}&mlon=${newLocation.lng}#map=17/${newLocation.lat}/${newLocation.lng}`;
    setMapUrl(mapsUrl);
};

  // الحصول على العنوان من الإحداثيات باستخدام OpenStreetMap Nominatim API
  const updateAddressFromCoordinates = async (coords: Coordinates) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}&zoom=18&addressdetails=1`);
      const data = await response.json();
      
      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress('لا يمكن تحديد العنوان');
      }
    } catch (err) {
      console.error('خطأ في الحصول على العنوان:', err);
      setAddress('حدث خطأ أثناء الحصول على العنوان');
    }
  };

  // الحصول على موقع المستخدم باستخدام GPS
  const handleGetCurrentLocation = () => {
    // مسح رسائل الخطأ السابقة
    setError('');
    
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          // تحريك الخريطة إلى موقع المستخدم
          if (mapInstance.current) {
            mapInstance.current.setView([userLocation.lat, userLocation.lng], 15);
          }
          
          updateLocation(userLocation);
          setLoading(false);
        },
        (err) => {
          console.error('خطأ في الحصول على الموقع:', err);
          
          // معالجة أنواع الأخطاء المختلفة
          switch(err.code) {
            case 1: // PERMISSION_DENIED
              setError('تم رفض الوصول إلى الموقع. يرجى السماح للمتصفح بالوصول إلى موقعك والمحاولة مرة أخرى.');
              break;
            case 2: // POSITION_UNAVAILABLE
              setError('معلومات الموقع غير متاحة حاليًا. يرجى المحاولة مرة أخرى لاحقًا.');
              break;
            case 3: // TIMEOUT
              setError('انتهت مهلة تحديد الموقع. يرجى المحاولة مرة أخرى.');
              break;
            default:
              setError('حدث خطأ أثناء تحديد موقعك. يمكنك تحديد الموقع يدويًا على الخريطة.');
          }
          
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError('متصفحك لا يدعم تحديد الموقع');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>تحديد الموقع</title>
        <meta name="description" content="صفحة تحديد الموقع" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>تحديد الموقع</h1>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <div className={styles.mapContainer}>
          <div ref={mapRef} className={styles.map}></div>
          
          <div className={styles.mapControls}>
            <button 
              className={styles.button} 
              onClick={handleGetCurrentLocation}
              disabled={loading}
            >
              {loading ? 'جاري التحميل...' : 'استخدام موقعي الحالي (GPS)'}
            </button>
            <p className={styles.hint}>
              يمكنك أيضًا النقر على الخريطة أو سحب العلامة لتحديد الموقع يدويًا
            </p>
            {error && (
              <div className={styles.errorTip}>
                <p>{error}</p>
                {error.includes('تم رفض الوصول') && (
                  <div className={styles.permissionHelp}>
                    <p>لتمكين الوصول إلى موقعك:</p>
                    <ol>
                      <li>انقر على أيقونة القفل في شريط العنوان</li>
                      <li>ابحث عن إعدادات "الموقع"</li>
                      <li>قم بتغيير الإذن إلى "السماح"</li>
                      <li>أعد تحميل الصفحة</li>
                    </ol>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.detailsContainer}>
          <div className={styles.formGroup}>
            <label className={styles.label}>العنوان:</label>
            <input 
              type="text" 
              className={styles.input} 
              value={address} 
              readOnly 
              placeholder="سيظهر العنوان هنا تلقائيًا"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>رابط الموقع:</label>
            <div className={styles.urlContainer}>
              <input 
                type="text" 
                className={styles.input} 
                value={mapUrl} 
                readOnly 
              />
              {mapUrl && (
                <a 
                  href={mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.openLink}
                >
                  فتح في OpenStreetMap
                </a>
              )}
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>معلومات إضافية:</label>
            <textarea 
              className={styles.textarea}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="أدخل أي معلومات إضافية هنا"
              rows={4}
            />
          </div>
          
          <button className={styles.submitButton}>
            حفظ المعلومات
          </button>
        </div>
      </main>
    </div>
  );
}