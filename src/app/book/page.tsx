"use client"
// pages/index.tsx
import { useState, useEffect, useRef   } from 'react';
import { useRouter } from "next/navigation";
import Script from 'next/script';
import CheckoutPage from "../components/CheckoutPage";
 import {  Menu, Shield, Award, Clock, Star, ChevronDown, ChevronLeft , ChevronRight, Check } from 'lucide-react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
 
 if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
   throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
 }
 const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


interface OfferTimeSlot {
    date: string;
    timeSlot: string;
}
 


  const langImages = {
    
    EN: '/english.png',
    AR: '/arabic.png'
  };


  
const TabsPage = () => {
    // const router = useRouter(); // Duplicate declaration removed
    const [hours, setHours] = useState(4);
  const [selectedTime, setSelectedTime] = useState('');
  const [date, setDate] = useState('');
  const [basePrice, setBasePrice] = useState(100);
  const [workers, setWorkers] = useState(1);
  const [serviceType, setServiceType] = useState< string>('one-time');
const [totalPrice, setTotalPrice] = useState(100);
const [selectedCity, setSelectedCity] = useState("");
//const [selectedDay, setSelectedDay] = useState("sun");
 


 
 



 







// إعادة تعيين حقول النموذج

 





 const calculateTotalPrice = ({hours, workers}: {hours: number; workers: number}) => {
    
    if (selectedCity === 'Dubai') {
        setBasePrice(100);
    } else if (selectedCity === 'Sharjah' || selectedCity === 'Ajman' || selectedCity === 'Umm Al Quwain') {
        setBasePrice(85);
    }
    if (serviceType === 'one-time') {
        // Calculate price for one-time service
        // Example base rate per hour
        let extra = (hours - 4) * 20;

        if (hours <4) {
            
          extra = 0;
      }
       
        if (workers > 0) {
            
            setTotalPrice((basePrice * workers) + (extra * workers));
        }
    } else if (serviceType === 'package-4') {
      if (hours <=4 && workers === 1) {

        setTotalPrice(340);}
        else  {
          
            setTotalPrice((340+ (hours - 4) * 20)*workers);
        }
    } else if (serviceType === 'package-8') {
      if (hours <=4 && workers === 1) {

        setTotalPrice(680);}
        else  {
          
            setTotalPrice((680+ (hours - 4) * 20)*workers);
        }
    } else if (serviceType === 'package-12') {
      if (hours <=4 && workers === 1) {

        setTotalPrice(1000);}
        else  {
          
            setTotalPrice((1000+ (hours - 4) * 20)*workers);
        }
    }
};

useEffect(() => {
    console.log("totalPrice useeffect", totalPrice);

    calculateTotalPrice({ hours, workers });
}, [ serviceType, basePrice, workers, hours, selectedCity]);

 
const [showSummaryDetails, setShowSummaryDetails] = useState(false);

// Modified renderBookingSummary function - will be rendered at the bottom of the page
const renderBookingSummary = () => {
  if (!showSummaryDetails) {
    return null;
  }
  
  // Return the expanded view as a fixed position panel at the bottom
  console.log("totalPrice", totalPrice);
  return (
    <div className="summary-overlay">
      <div dir="ltr" className="summary-panel bg-gradient-to-br from-blue-50 to-white rounded-t-xl p-6 shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => setShowSummaryDetails(false)} 
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <h3 className="text-xl font-bold text-center text-gray-800 border-b pb-2">ملخص الحجز</h3>
        </div>
        
        <div className="space-y-3 text-right w-full mx-auto">
        
        </div>
      </div>
    </div>
  );
}; 
    const handleserviceTypeSelect = (type: string) => {
 
        setServiceType(type);
        
            setHours(4);
            setWorkers(1);
            
        
        
        // Set base price based on booking type
        switch(type) {
            case 'one-time':
             
                setTotalPrice(100);
                setBasePrice(100);
                break;
            case 'package-4':
                setSelectedOffer(offers[0].id);
                setTotalPrice(340);
                break;
            case 'package-8':
                setSelectedOffer(offers[1].id);
                setTotalPrice(680);
                break;
            case 'package-12':
                setSelectedOffer(offers[2].id);
                setTotalPrice(1000);
                break;
      
        }
    };
 
    const renderBookingDetails = () => {
     
   
        return (
          <div>
   <div className="border-b pb-3 mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">خدمة التنظيف العميق</h1>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-gray-600">(679k تقييم)</span>
            <span className="font-semibold">4.8/5</span>
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          </div>
        </div>
      </div>
 
 
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-right  mb-3">كم عدد العمال المطلوب؟</h2>
        <div className="flex justify-between px-8 gap-2">
          {[1, 2, 3, 4].map((w) => (
            <button
              key={w}
              className={`py-3 px-4 rounded-full flex justify-center items-center w-16 h-16 ${
                workers === w 
                  ? 'bg-teal-600 text-white ring-2 ring-teal-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              onClick={() => setWorkers(w)}
            >
              <span className="text-lg font-semibold">{w}</span>
            </button>
          ))}
        </div>
      </div>

           {/* Hours selection */}
<div className="mb-6">
  <h2 className="text-lg font-semibold text-right mb-3">كم عدد الساعات التي يجب أن يبقوا فيها؟</h2>
  <div className="grid grid-cols-4 gap-2">
    {[1, 2, 3, 4, 5, 6, 7, 8].map((h) => (
      <button
        key={h}
        className={`relative py-3 px-2 rounded-lg border text-center transition-all duration-200 ${
          hours === h 
            ? 'bg-teal-100 border-teal-600 text-teal-800 shadow-md' 
            : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
        }`}
        onClick={() => setHours(h)}
      >
        <div className="text-lg font-medium">{h}</div>
        {h === 1 && (
          <div className="text-xs text-gray-600">AED 100/hr</div>
        )}
        {h === 2 && (
          <div className="text-xs text-gray-600">AED 50/hr</div>
        )}
        {h === 3 && (
          <div className="text-xs text-gray-600">AED 33/hr</div>
        )}
        {h === 4 && (
          <div className="text-xs text-gray-600">AED 25/hr</div>
        )}
        {h > 4 && (
          <div className="text-xs text-gray-600">AED 20/hr</div>
        )}
        
        {/* علامة الصح عند الاختيار */}
        {hours === h && (
          <div className="absolute -top-2 -left-2 bg-teal-500 text-white text-xs p-1 rounded-full w-6 h-6 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
        
        {/* العلامة الموصى بها */}
        {hours === h && h === 4 && (
          <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-md">
            موصى به
          </div>
        )}
      </button>
    ))}
  </div>
</div>
                
                {/* Service frequency */}
      <div className="mb-6  ">
        <h2 className="text-lg font-semibold text-right mb-3">ما هو معدل تكرار التنظيف المطلوب؟</h2>
        <div className="space-y-6">
          <div 
            className={`rounded-lg border-2 p-4 cursor-pointer ${
              serviceType === 'one-time' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
            }`}
            onClick={() => handleserviceTypeSelect('one-time')}
          >
            <div className="flex justify-between">
              <div className="font-semibold text-gray-800">زيارة واحدة</div>
              {serviceType === 'one-time' && <Check className="w-5 h-5 text-teal-600" />}
            </div>
            <div className="text-sm text-gray-600 mt-1">• حجز جلسة تنظيف لمرة واحدة</div>
          </div>
          
          <div 
            className={`rounded-lg border-2 p-4 cursor-pointer relative ${
              serviceType === 'package-4' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
            }`}
            onClick={() => handleserviceTypeSelect('package-4')}
          >
            <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full transform  ">
الأكثر مبيعاً            </div>
            <div className="flex justify-between">
              <div className="font-semibold text-gray-800">4 زيارات اسبوعية</div>
              {serviceType === 'package-4' && <Check className="w-5 h-5 text-teal-600" />}
            </div>
            <div className="text-sm text-gray-600 mt-1">• زيارات في نفس اليوم والتوقيت من كل اسبوع ولمدة شهر</div>

            <div className="text-sm text-gray-600 mt-1">• احصل على نفس المنظف في كل مرة</div>
            <div className="text-sm text-gray-600">•  جدولة بسهولة من خلال التطبيق</div>
          </div>
          <div 
            className={`rounded-lg border-2 p-4 cursor-pointer relative ${
              serviceType === 'package-12' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
            }`}
            onClick={() => handleserviceTypeSelect('package-12')}
          >
            <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full transform " >
              خصم 17% لكل زيارة
            </div>
            <div className="flex justify-between">
              <div className="font-semibold text-gray-800">12 زيارة اسبوعية</div>
              {serviceType === 'package-12' && <Check className="w-5 h-5 text-teal-600" />}
            </div>
            <div className="text-sm text-gray-600 mt-1">• زيارات في نفس اليوم والتوقيت من كل اسبوع ولمدة 3 أشهر</div>

            <div className="text-sm text-gray-600 mt-1">• احصل على نفس المنظف في كل مرة</div>
            <div className="text-sm text-gray-600">•  جدولة بسهولة من خلال التطبيق</div>
          </div>

          <div 
            className={`rounded-lg border-2 p-4 cursor-pointer relative ${
              serviceType === 'package-8' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
            }`}
            onClick={() => handleserviceTypeSelect('package-8')}
          >
            <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full transform  ">
              خصم 15% لكل زيارة
            </div>
            <div className="flex justify-between">
              <div className="font-semibold text-gray-800">عدة زيارات في الشهر</div>
              {serviceType === 'package-8' && <Check className="w-5 h-5 text-teal-600" />}
            </div>
            <div className="text-sm text-gray-600 mt-1">• أختر الايام والتوقيت المفضل بسهولة </div>
            <div className="text-sm text-gray-600 mt-1">• 8 زيارات مع خصم يصل الى 16 بالمئة </div>

            <div className="text-sm text-gray-600 mt-1">• احصل على نفس المنظف في كل مرة</div>
            <div className="text-sm text-gray-600">• إختيار أوقات الزيارات بسهولة من الموقع</div>
          </div>
        </div>
      </div>
       
      
         {/*   
          {(serviceType === 'package-12' || serviceType === 'package-4') && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-right mb-2">في أي أيام الأسبوع تريد الخدمة؟</h2>
          <div className="grid grid-cols-4 gap-3">
            {[
                            { id: 'sat', label: 'السبت', available: true },

              { id: 'sun', label: 'الأحد', available: true },
              { id: 'mon', label: 'الإثنين', available: true },
              { id: 'tue', label: 'الثلاثاء', available: true },
              { id: 'wed', label: 'الأربعاء', available: true },
              { id: 'thu', label: 'الخميس', available: true },
              { id: 'fri', label: 'الجمعة', available: false },
            ].map((day) => (
              <div key={day.id} className={`flex items-center ${!day.available ? 'opacity-50' : ''}`}>
                <input
                  type="radio"
                  id={day.id}
                  name="day-selection"
                  checked={selectedDay === day.id}
                  onChange={() => day.available && handleDaySelection(day.id)}
                  disabled={!day.available}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded-full focus:ring-teal-500"
                />
                <label 
                  htmlFor={day.id} 
                  className={`mr-2 text-sm ${!day.available ? 'text-gray-400 line-through' : 'text-gray-700'}`}
                >
                  {day.label}
                  {!day.available && <span className="mr-1 text-xs text-red-500">(غير متاح)</span>}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
 */}
         
         <div dir='ltr' className="bg-blue-50 p-4 rounded-lg mb-6">
           <h3 className="text-lg font-semibold text-right mb-2">لماذا تختار خدماتنا؟</h3>
           <ul className="space-y-2 text-right">
             <li className="flex justify-end items-center gap-2">
               <span>ضمان الجودة 100%</span>
               <Shield className="text-blue-600" size={18} />
             </li>
             <li className="flex justify-end items-center gap-2">
               <span>فريق محترف ومؤهل</span>
               <Award className="text-blue-600" size={18} />
             </li>
             <li className="flex justify-end items-center gap-2">
               <span>التزام بالمواعيد</span>
               <Clock className="text-blue-600" size={18} />
             </li>
             <li className="flex justify-end items-center gap-2">
               <span>تقييم 4.9/5 من العملاء</span>
               <Star className="text-yellow-500" size={18} />
             </li>
           </ul>
         </div>
         
       </div>
     );
   };

 
    const showSection = () => {
    
        router.push(`/`);
      };
    // All state declarations remain the same
    const [currentTab, setCurrentTab] = useState(0);
    const [user, setUser] = useState<{ name: string; phone: string;mail: string; phoneVerified: boolean } | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    console.log("mapLoaded", mapLoaded);
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [addressDetails, setAddressDetails] = useState("");
    const [locationNotes, setLocationNotes] = useState("");
    const [locationUrl, setLocationUrl] = useState("");
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<google.maps.Map | null>(null);
    const markerRef = useRef<google.maps.Marker | null>(null)
    const router = useRouter();

    const [showMinue, setshowMinue] = useState(false);
    console.log("showMinue", showMinue);
    const handleClick2: React.MouseEventHandler<SVGPathElement> = (): void => {
      setshowMinue((prevState) => !prevState);
    };
  const [lang, setlang] = useState("");


    // States for Time and Offer Selection remain the same
    const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');
 const [loading, setLoading] = useState<boolean>(false);
 
 const [availableCleanersM, setAvailableCleanersM] = useState<number>(15);
const [availableCleanersE, setAvailableCleanersE] = useState<number>(15);
 
 
 const getcleaners = async (date: Date): Promise<void> => {
  if (!date) return;

  setLoading(true);
  try {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const response = await fetch(`/api/booking?date=${formattedDate}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched reservations:', data); // التحقق من البيانات

    if (!Array.isArray(data)) {
      console.error("Unexpected data format:", data);
      return;
    }

    // حساب عدد العمال المحجوزين في كل فترة
    let bookedMorning = 0;
    let bookedEvening = 0;

    data.forEach((reservation) => {
      if (!reservation.timePeriod || !reservation.workerCount) return;

      if (reservation.timePeriod.toUpperCase() === "MORNING") {
        bookedMorning += reservation.workerCount;
      } else if (reservation.timePeriod.toUpperCase() === "EVENING") {
        bookedEvening += reservation.workerCount;
      }
    });

    // تحديث عدد العمال المتاحين
    setAvailableCleanersM(Math.max(15 - bookedMorning, 0));
    setAvailableCleanersE(Math.max(15 - bookedEvening, 0));
    console.log("cleanersM", availableCleanersM);
console.log("cleanersE", availableCleanersE);
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
    alert("فشل في جلب الحجوزات. يرجى المحاولة مرة أخرى لاحقًا.");
  } finally {
    setLoading(false);
  }
};


    
    
    
    // States for offer times remain the same
    const [offerTimeSlots, setOfferTimeSlots] = useState<OfferTimeSlot[]>([]);
    let items: string[] = [];
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
    const [illegalOfferDays, setIllegalOfferDays] = useState<string[]>([]);

    // Available time slots
    //const availableTimeSlots = [
       // "الفترة الصباحية من 11:00-11:30 الى 15:00-15:30","الفترة المسائية من 16:00-16:30 الى 20:00-20:30"  ];
 
    
    // Offers
    const offers = [
        { id: 'offer1', label: '4 hours X 4 times in a month one cleaner 340 AED', times: 4, price: 340 },
        { id: 'offer2', label: '4 hours X 8 times in a month one cleaner 680 AED', times: 8, price: 680 },
        { id: 'offer3', label: '4 hours X 12 times in a month one cleaner 1000 AED', times: 12, price: 1000 }
    ];

    const selectedOfferData = offers.find(offer => offer.id === selectedOffer);
    const maxOfferTimes = selectedOfferData ? selectedOfferData.times : 12;
    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [mail, setMail] = useState(user?.mail || '');
    const [minDate, setMinDate] = useState<string>('');
    console.log("minDate", minDate);
    // Set min date effect - remains the same
    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        const formattedDay = day < 10 ? `0${day}` : `${day}`;

        setMinDate(`${year}-${formattedMonth}-${formattedDay}`);
    }, []);

    // All useEffects and functions stay the same
    // Note that we're keeping all the business logic and just modifying the UI

    // Load user data from localStorage on component mount
    const loadinfo = () => {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");

       
            setUser(userData);
     
    };

    const handleSave = () => {
     
   // Save user info in localStorage
   const userdata = {
    name: user?.name || name, // Use the name from response or input
    phone: user?.phone || phone,
    mail: user?.mail || mail,
    logedin: true,
  };
  localStorage.setItem("user", JSON.stringify(userdata));

} ;
    
    // Create a custom control for the current location button
    const createCurrentLocationButton = () => {
        // Function implementation remains the same, just change the type
        const controlDiv = document.createElement('div');

        // Set CSS for the control border
        const controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginRight = '10px';
        controlUI.style.marginTop = '10px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'الموقع الحالي';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior
        const controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4285F4"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994.994 0 0 0 13 3.06V1h-2v2.06A8.994.994 0 0 0 3.06 11H1v2h2.06A8.994.994 0 0 0 11 20.94V23h2v-2.06A8.994.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>';
        controlUI.appendChild(controlText);

        

        return controlDiv;
    };

    useEffect(() => {
        // Check if the Google Maps script is loaded and the map container exists
        if (typeof window !== 'undefined' && window.google && mapRef.current && currentTab === 1) {
          // Initialize the map centered on UAE
          const initialPosition = { lat: 25.276987, lng: 55.296249 }; // Dubai coordinates as default
          const map = new google.maps.Map(mapRef.current, {
            zoom: 10,
            center: initialPosition,
            mapTypeControl: false,
            streetViewControl: false, 
            fullscreenControl: false,
            zoomControl: true,
            


          });
          // Store map instance in ref for later access
          mapInstanceRef.current = map;
      
          // Add a marker for the selected location
          const marker = new google.maps.Marker({
            position: initialPosition,
            map: map,
            draggable: true,
          });
          markerRef.current = marker;
      
          // Add the current location button to the map
          const locationButton = createCurrentLocationButton();
          map.controls[google.maps.ControlPosition.TOP_RIGHT].push(locationButton);
      
          // ----------------------------
          // Create and add the Autocomplete input element
          // ----------------------------
          const input = document.createElement('input');
          input.type = 'text';
          input.placeholder = ' ابحث عن موقع على الخريطة...';
          input.style.cssText = 'width: 300px; margin: 10px; padding: 5px; height: 50px; font-size: 18px;  border-radius: 5px;  margin-left: 10px; margin-top: 10px;  ';
          // You can add the input to the map controls (e.g., TOP_LEFT)
          map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
      
          // Initialize the autocomplete widget with the input element
          const autocomplete = new google.maps.places.Autocomplete(input);
          autocomplete.bindTo('bounds', map);
      
          // Listen for place changes and update the map and marker accordingly
          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry || !place.geometry.location) {
              console.log("No details available for input: '" + place.name + "'");
              return;
            }
            // Adjust the map view based on the place's geometry
            if (place.geometry.viewport) {
              map.fitBounds(place.geometry.viewport);
            } else {
              map.setCenter(place.geometry.location);
              map.setZoom(17);
            }
            // Update the marker position
            marker.setPosition(place.geometry.location);
            setSelectedLocation({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            });
            // Optionally, update the address details using your function
            getAddressFromCoordinates({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            });
          });
      
          // ----------------------------
          // Geolocation: Get device's current location if permission is granted
          // ----------------------------
         
      
          // ----------------------------
          // Update selected location when marker is dragged
          // ----------------------------
          google.maps.event.addListener(marker, 'dragend', () => {
            
            const position = marker.getPosition();
            if (position) {
              setSelectedLocation({
                lat: position.lat(),
                lng: position.lng(),
              });
              // Update address details when marker position changes
              getAddressFromCoordinates({
                lat: position.lat(),
                lng: position.lng(),
              });
            }
          });
      
          // ----------------------------
          // Update marker position when map is clicked
          // ----------------------------
          google.maps.event.addListener(map, 'click', (event: google.maps.MapMouseEvent) => {
            if (event.latLng) {
              marker.setPosition(event.latLng);
              setSelectedLocation({
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
              });
              // Update address details when map is clicked
              getAddressFromCoordinates({
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
              });
            }
          });
      
          setMapLoaded(true);
          loadAddress();
       
        }
      }, [currentTab]);
      
const converttime = (i: number) => {
  if (offerTimeSlots[i].timeSlot==='11:00 AM - 11:30 AM') {
    return "MORNING";
  } else if (offerTimeSlots[i].timeSlot==='4:00 PM - 4:30 PM') {
    return "EVENING";
  }
}

    const createBookingdata = () => {
        items=[];
if (offerTimeSlots  && offerTimeSlots.length > 3) {
    console.log("offerTimeSlots is running" );
        for (let i = 0; i < offerTimeSlots.length; i++) {

            items.push(JSON.stringify({name: user?.name || '',  // Use name from user object
                phone: user?.phone || '',  // Use phone from user object
                email: user?.mail || '',  // Use email from user object
                city: selectedCity,
                address: addressDetails + "\n " + locationNotes,
                locationUrl: locationUrl,
                serviceType:
                    serviceType === 'one-time'
                        ? 'ONE_TIME'
                        : selectedOffer === 'package-4'
                            ? 'OFFER_4'
                            : selectedOffer === 'package-8'
                                ? 'OFFER_8'
                                : selectedOffer === 'package-12'
                                    ? 'OFFER_12'
                                    : 'ONE_TIME', // Default to ONE_TIME if offer is not selected.  Important!
                date:new Date( offerTimeSlots[i].date) , // Convert to DateTime, handle empty string
                timePeriod:converttime(i),
                    
                extraHours:hours-4,  // Use ternary for correct hours.  Also, needs to be zero if both or neither time selected.
        
                workerCount: workers,
                price: totalPrice,
            } ));
        
        
          }
        return items;}
          else{
            console.log("one items.push  is running" );
            
            items.push(JSON.stringify({
                name: user?.name || '',  // Use name from user object
                phone: user?.phone || '',  // Use phone from user object
                email: user?.mail || '',  // Use email from user object
                city: selectedCity,
                address: addressDetails + "\n " + locationNotes,
                locationUrl: locationUrl,
                serviceType:
                    serviceType === 'one-time'
                        ? 'ONE_TIME'
                        : selectedOffer === 'package-4'
                            ? 'OFFER_4'
                            : selectedOffer === 'package-8'
                                ? 'OFFER_8'
                                : selectedOffer === 'package-12'
                                    ? 'OFFER_12'
                                    : 'ONE_TIME', // Default to ONE_TIME if offer is not selected.  Important!
                date: selectedDate ? new Date(selectedDate) : new Date(), // Convert to DateTime, handle empty string
                timePeriod:selectedTime=== '11:00 AM - 11:30 AM'
                ? "MORNING" 
                : selectedTime === '4:00 PM - 4:30 PM'
                ? "EVENING" 
                : "MORNING" , // Default to MORNING if neither or both are selected. Important
                extraHours: hours-4,  // Use ternary for correct hours.  Also, needs to be zero if both or neither time selected.
        
                workerCount: workers,
                price: totalPrice,
            } ));
            return [items[0]]
          }

        }
    // Function to get address details from coordinates using Geocoding API
   // Fix the getAddressFromCoordinates function
const getAddressFromCoordinates = (location: google.maps.LatLngLiteral) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: location }, (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
        if (status === "OK" && results && results[0]) {
            const addressComponents = results[0].address_components;
            setSelectedCity("");
            // Try to find city from address components
            const cityComponent = addressComponents.find(
                component => component.types.includes("locality")
            );

            if (cityComponent) {
                const cityName = cityComponent.long_name;
                // Check if the city is one of the UAE emirates we're interested in
                const normalizedCityName = cityName.toLowerCase();
                if (normalizedCityName.includes("dubai") || normalizedCityName.includes("دبي")) {
                    setSelectedCity("Dubai");
                    setBasePrice(100);
                    calculateTotalPrice({ hours, workers });
                } else if (normalizedCityName.includes("sharjah") || normalizedCityName.includes("الشارقة")) {
                    setSelectedCity("Sharjah");
                    setBasePrice(85);
                    calculateTotalPrice({ hours, workers });
                } else if (normalizedCityName.includes("ajman") || normalizedCityName.includes("عجمان")) {
                    setSelectedCity("Ajman");
                    setBasePrice(85);
                    calculateTotalPrice({ hours, workers });
                } else if (normalizedCityName.includes("umm al quwain") || normalizedCityName.includes("أم القيوين")) {
                    setSelectedCity("Umm Al Quwain");
                    setBasePrice(85);
                    calculateTotalPrice({ hours, workers });
                }else{
                    setSelectedCity("");
                }
            }

            // Set the formatted address
            setAddressDetails(results[0].formatted_address);

            // Generate Google Maps URL for the location
            const locationLink = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
            setLocationUrl(locationLink);
            
        }
    });
};

  // تحميل العنوان من التخزين المحلي عند تحميل الصفحة
  const loadAddress = () => {
    const storedAddress = localStorage.getItem("userAddress");
    const parsedAddress = storedAddress ? JSON.parse(storedAddress) : {};
    const params = new URLSearchParams(new URL(parsedAddress.locationUrl).search);
    const coordinates = params.get("q");
    if (coordinates) {
      const [lat, lng] = coordinates.split(",").map(Number);
      setSelectedLocation({
        lat: lat,
        lng: lng,
      });
      // Update marker position
        if (markerRef.current && mapInstanceRef.current) {
        markerRef.current.setPosition({ lat: lat, lng: lng });
        mapInstanceRef.current.setCenter({ lat: lat, lng: lng });
      }
      // Update address details when marker position changes
      getAddressFromCoordinates({
        lat: lat,
        lng:lng,
      });
    }
    setAddressDetails(parsedAddress.addressDetails || "");
    setLocationNotes(parsedAddress.locationNotes || "");
    setSelectedCity(parsedAddress.selectedCity || "");
    setLocationUrl(parsedAddress.locationUrl || "");
  };



 const handleSaveAddress = () => {
const opject = {
    "addressDetails": addressDetails,
    "locationNotes": locationNotes,
    "selectedCity": selectedCity,
    "locationUrl": locationUrl,
  }


  if (locationNotes.trim() !== "") {
    localStorage.setItem("userAddress", JSON.stringify(opject));
     
  }
};
    const handleNext = async () => {
        // Add validation for location tab
   if (currentTab === 0) {

loadAddress();

   }
        if (currentTab === 1 ){

          loadinfo();

          handleSaveAddress();

        }

         
        
        if (currentTab === 2 ){
         
          if(!user){
            alert("   الرجاء إدخال معلوماتك الشخصية");
            return;
          }
          if (user?.name===null || user?.phone===null || user?.mail===null) {
            alert("   الرجاء إدخال معلوماتك الشخصية");
            return;
          }
          if (user?.name.trim()==="" || user?.phone.trim()==="" || user?.mail.trim()==="") {
            alert("   الرجاء إدخال معلوماتك الشخصية");
            return;
          } 
if (user?.phone.substring(0, 2) !== "05") {
  alert("الرجاء إدخال رقم هاتف صحيح");
  return;
} 
          if (user?.phone.length !== 10) {
            alert("الرجاء إدخال رقم هاتف صحيح");
            return;
          }
          if (user?.mail.length < 6) {
            alert("الرجاء إدخال بريد إلكتروني صحيح");
            return;
          }
          if (user?.mail.indexOf("@") === -1) {
            alert("الرجاء إدخال بريد إلكتروني صحيح");
            return;
          }
          if (user?.mail.indexOf(".") === -1) {
            alert("الرجاء إدخال بريد إلكتروني صحيح");
            return;
          }
          if (user?.name.length < 3) {
            alert("الرجاء إدخال اسم صحيح");
            return;
          }
          if (user?.name.length > 50) {
            alert("الرجاء إدخال اسم صحيح");
            return;
          }
          if (user?.name.indexOf(" ") === -1) {
            alert("الرجاء إدخال اسم صحيح");
            return;
          }
          if (user?.name.indexOf("  ") !== -1) {
            alert("الرجاء إدخال اسم صحيح");
            return;
          }
          if (user?.name.split(" ").length < 2)  {
            alert("الرجاء إدخال اسم صحيح");
            return;
          }
          
        handleSave();
 


        try {
          // Send the booking data to the API endpoint
           
          const response = await fetch('/api/uncompleted', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({name: user?.name || '',  // Use name from user object
                phone: user?.phone || '',  // Use phone from user object
                email: user?.mail || '',  // Use email from user object
                city: selectedCity,
                address: addressDetails + "\n " + locationNotes,
                locationUrl: locationUrl,
                serviceType:
                    serviceType === 'one-time'
                        ? 'ONE_TIME'
                        : selectedOffer === 'package-4'
                            ? 'OFFER_4'
                            : selectedOffer === 'package-8'
                                ? 'OFFER_8'
                                : selectedOffer === 'package-12'
                                    ? 'OFFER_12'
                                    : 'ONE_TIME', // Default to ONE_TIME if offer is not selected.  Important!
              
                    
                extraHours:hours-4,  // Use ternary for correct hours.  Also, needs to be zero if both or neither time selected.
        
                workerCount: workers,
                 
            } ) ,
          });
        
          if (response.ok) {
         
         console.log("response.ok", response.ok);
          }          
          else {
              const errorData = await response.json();
              if (errorData.error?.includes("Unique")) {
                console.log("Unique");
              }
              else {
                alert(`حدث خطأ أثناء تأكيد الحجز: ${errorData.error || 'Unknown error'}`);
                console.error('API Error:', errorData);
               
                return;
              }
             
          }
        }
         catch (error) {
          alert('حدث خطأ أثناء الاتصال بالخادم.');
          console.error('Fetch Error:', error);
          
          return;
        }


        }
        if (currentTab === 1 && (!locationNotes || locationNotes.trim() === "")) {
            alert("الرجاء إدخال اسم البناء وؤقم الشقة ");
           
            return;
        }

        if (currentTab === 1 && !selectedCity) {
            alert("الرجاء اختيار مدينة ضمن الخدمة دبي عجمان الشارقة ام القيوين");
            return;
        }

        // Save form data when moving from location tab
        if (currentTab === 1) {
            // Save location data to localStorage or your preferred state management
            const locationData = {
                coordinates: selectedLocation,
                city: selectedCity,
                address: addressDetails,
                notes: locationNotes,
                mapUrl: locationUrl
            };

            localStorage.setItem("locationData", JSON.stringify(locationData));
            console.log("Location data saved:", locationData);
        }

        //Validation for time and date
       

        if (currentTab < 3) {
            setCurrentTab(currentTab + 1);
        }
    };

    const handlePrev = () => {
      setDate("");
      setOfferTimeSlots([]);
      setSelectedTime("");
      setSelectedDate("");
        if (currentTab > 0) {
            setCurrentTab(currentTab - 1);
        }
    };
     
   








    
 

    // Function to check if a date is a working day (Saturday to Thursday)
    
    const now = new Date();
    const hoursDate = now.getHours();
    console.log("Current Hour:", hoursDate);
    
    let times: { time: string; disabled: boolean }[] = [];
    
    const formattedDate = now.toISOString().split('T')[0];
    
    if (  date !== "") {
        times = [
            { time: '9:00 AM - 9:30 AM', disabled: false },
            { time: '11:00 AM - 11:30 AM', disabled: false },
            { time: '1:00 PM - 1:30 PM', disabled: false },
            { time: '4:00 PM - 4:30 PM', disabled: false },
        ];
    
        if (date === formattedDate) {
            times = times.filter(slot => {
                let slotHour = parseInt(slot.time.split(':')[0]); // استخراج الساعة من النص
    
                if (slot.time.includes('PM') && slotHour !== 12) {
                    slotHour += 12; // تحويل الأوقات PM إلى تنسيق 24 ساعة
                }
    
                return slotHour > hoursDate; // الاحتفاظ فقط بالأوقات القادمة
            });
    
            // طباعة الأوقات المتاحة بعد التصفية
            console.log("Available Time Slots:", times);
        }
    }
    
    // تصفية الأوقات بناءً على الساعة الحالية
   
    
          
          // أسماء الأيام والشهور بالعربية - نبدأ بالأحد لتتوافق مع ترتيب الأيام في التقويم
          let dayNames = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
          const today = new Date();
          today.setDate(today.getDate()+1 );
          const dayIndex = today.getDay();
          
          const startIndex = dayNames.indexOf(dayNames[dayIndex]);

          dayNames= [...dayNames.slice(startIndex), ...dayNames.slice(0, startIndex)]
  
          const monthNames = [
            'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
            'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
          ];
        

    
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
    interface DisplayDay {
      date: Date;
      day: number;
      month: number;
      year: number;
      dayName: string;
      isToday: boolean;
      isDisabled: boolean;
    }
    
    const [displayDays, setDisplayDays] = useState<DisplayDay[]>([]);
    const [currentMonth, setCurrentMonth] = useState('');

    const isToday = (date: Date): boolean => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
      };
        // دالة لتحديث الأيام المعروضة
        const updateDisplayDays = () => {
            const days = [];
            const startDate = new Date(currentWeekStart);
            const today = new Date();
            const tomorrow = new Date();
            const yesterday = new Date();
            tomorrow.setDate(today.getDate() + 1);
            yesterday.setDate(today.getDate() - 1);
            setCurrentMonth(monthNames[startDate.getMonth()]);
        
            for (let i = 0; i < 7; i++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + i);
        
                const dayIndex = currentDate.getDay(); // 0 للأحد، 1 للإثنين، ..., 6 للسبت
                const isBeforeTomorrow = currentDate < yesterday;
                const isThursdayOrFriday =  dayIndex === 5; // الخميس = 4، الجمعة = 5
        
                days.push({
                    date: currentDate,
                    day: currentDate.getDate(),
                    month: currentDate.getMonth(),
                    year: currentDate.getFullYear(),
                    dayName: dayNames[dayIndex],
                    isToday: isToday(currentDate),
                    isDisabled: isBeforeTomorrow || isThursdayOrFriday, // تعطيل الأيام قبل الغد والخميس والجمعة
                });
            }
        
            setDisplayDays(days);
        };
        

 
 // تهيئة التقويم عند التحميل
 useEffect(() => {
    // نبدأ من اليوم الحالي
    const today = new Date();
    
    const firstDayOfWeek = new Date(today); 
    
    
    
    setCurrentWeekStart(firstDayOfWeek);
  }, []);

  // تحديث عرض الأيام عند تغيير بداية الأسبوع
  useEffect(() => {
    updateDisplayDays();
  }, [currentWeekStart]);

    const renderDateTimeSelection = () => {
        
        // دالة للتحقق مما إذا كان التاريخ هو اليوم
        interface DisplayDay {
          date: Date;
          day: number;
          month: number;
          year: number;
          dayName: string;
          isToday: boolean;
          isDisabled: boolean;
        }

      
        // دالة للانتقال إلى الأسبوع السابق
        const goToPreviousWeek = () => {
          const prevWeek = new Date(currentWeekStart);
          prevWeek.setDate(prevWeek.getDate() - 7);
          setCurrentWeekStart(prevWeek);
        };
      
        // دالة للانتقال إلى الأسبوع التالي
        const goToNextWeek = () => {
          const nextWeek = new Date(currentWeekStart);
          nextWeek.setDate(nextWeek.getDate() + 7);
          setCurrentWeekStart(nextWeek);
        };
      
        // دالة لتحديد التاريخ عند النقر
      


const handleDateSelection = (day: DisplayDay) => {
  setSelectedTimeSlot(" ");
  setSelectedTime("");
    if (!day.isDisabled) {
      const dateString = `${day.year}-${String(day.month + 1).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`;
      setSelectedDate(dateString);
      setDate(dateString);
      getcleaners(new Date(dateString));

    }
  };
  
    
      
        return (
          <div className="rtl-direction">
            <h2 className="text-xl font-bold text-center mb-4">اختر وقت الوصول</h2>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center mb-2">
                <button 
                  className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md"
                  onClick={goToPreviousWeek}
                  disabled={currentWeekStart <= new Date()}
                >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <h3 className="text-right font-medium">{currentMonth}</h3>
                
                <button 
                  className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md"
                  onClick={goToNextWeek}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg> 

                 
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {dayNames.map((dayName) => (
                  <div key={dayName} className="text-xs py-1">{dayName}</div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2 text-center">
              {displayDays.map((day) => (
    <div
      key={`${day.day}-${day.month}`}
      className={`text-sm p-2 rounded-md cursor-pointer ${
        day.isDisabled
          ? 'bg-gray-300 text-gray-600 cursor-not-allowed' // للأيام المعطلة
          : selectedDate && new Date(selectedDate).getDate() === day.day &&
            new Date(selectedDate).getMonth() === day.month &&
            new Date(selectedDate).getFullYear() === day.year
          ? 'bg-blue-600 text-white' // اليوم المحدد
          : day.isToday
          ? 'bg-blue-100' // اليوم الحالي
         
          : 'hover:bg-gray-100' // الأيام العادية
      }`}
      onClick={() => handleDateSelection(day)}
    >
      {day.day}
    </div>
                ))}
              </div>
              
              
            </div>
            {(date !== "" && !loading &&(availableCleanersE !==15 ||availableCleanersM !==15  ) )&& (
  <div
    style={{
      backgroundColor: "#fef2d9",
      border: "1px dashed #f39c12",
      color: "#9a5c0b",
      padding: "12px",
      borderRadius: "8px",
      margin: "15px 0",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "15px"
    }}
  >
    {(() => {
      const selectedDate = new Date(date);
      const dayName = selectedDate.toLocaleDateString("ar-EG", { weekday: "long" });
      const formattedDate = selectedDate.toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long"
      });

      let percentage = Math.round(50.5 + ((15 - availableCleanersE) * 25 / 15) + ((15 - availableCleanersM) * 25 / 15));

      if (availableCleanersE === 0 && availableCleanersM === 0) {
        percentage = 100; // إذا كانت القيم تساوي 0، يتم ضبط النسبة إلى 100%
      }
      
      return `تنبيه: تم حجز اكثر من ${percentage}% من مواعيد يوم ${dayName} ${formattedDate}`;    })()}
  </div>
)}


        
         
         
            <div className="mb-8">
              
              <h3 className="text-lg font-semibold text-center mb-3">وقت الوصول المفضل</h3>

              { loading &&(

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60">
  
  <circle cx="40" cy="30" r="5" fill="#333">
    <animate
      attributeName="opacity"
      values="0.3;1;0.3"
      dur="1.5s"
      begin="0s"
      repeatCount="indefinite"
    />
  </circle>
  
  <circle cx="60" cy="30" r="5" fill="#333">
    <animate
      attributeName="opacity"
      values="0.3;1;0.3"
      dur="1.5s"
      begin="0.3s"
      repeatCount="indefinite"
    />
  </circle>
  
  <circle cx="80" cy="30" r="5" fill="#333">
    <animate
      attributeName="opacity"
      values="0.3;1;0.3"
      dur="1.5s"
      begin="0.6s"
      repeatCount="indefinite"
    />
  </circle>
  
 </svg>

              )
              
              
              }
{ !loading && (
  <div className="max-w-2xl mx-auto">
    <h3 className="text-xl font-medium mb-4 text-center">اختر الوقت المناسب</h3>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {times.map((item) => {
        // تحديد توفر العمال بناءً على الفترات الزمنية المحددة
        let isAvailable = false;
        let workerCount = 0;
        let timeSlot = "";
        
        if (item.time === '11:00 AM - 11:30 AM') {
          workerCount = availableCleanersM;
          isAvailable = availableCleanersM > workers;
          timeSlot = "MORNING";
        } else if (item.time === '4:00 PM - 4:30 PM') {
          workerCount = availableCleanersE;
          isAvailable = availableCleanersE > workers;
          timeSlot = "EVENING";
        }
        
        const isDisabled = item.disabled || !isAvailable;
        const isSelected = selectedTime === item.time;
        
        // تحديد حالة ونص الحالة بناءً على التوفر
        let statusText = '';
        let statusClass = '';
        let statusIcon = null;
        
        if (item.disabled) {
          statusText = 'غير متاح للحجز';
          statusClass = 'bg-gray-100 text-gray-500';
        } else if (!isAvailable) {
          statusText = 'تم حجز جميع العمال';
          statusClass = 'bg-red-100 text-red-700';
          statusIcon = '⛔';
        } else if (workerCount <= 3) {
          statusText = `متبقي ${workerCount} عمال فقط!`;
          statusClass = 'bg-yellow-100 text-yellow-700 animate-pulse';
          statusIcon = '⚠️';
        } else {
          statusText = `متاح ${workerCount} عامل`;
          statusClass = 'bg-green-100 text-green-700';
          statusIcon = '✅';
        }
        
        return (
          <button
            key={item.time}
            className={`relative p-4 rounded-lg border transition-all ${
              isDisabled 
                ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed' 
                : isSelected
                  ? 'bg-blue-50 border-blue-500 shadow-md'
                  : 'border-gray-300 hover:bg-blue-50 hover:border-blue-400'
            }`}
            onClick={() => {
              if (isDisabled) return;
              
              setSelectedTime(item.time);
              setSelectedTimeSlot(timeSlot);
            }}
            disabled={isDisabled}
            aria-pressed={isSelected}
          >
            {/* مؤشر الاختيار */}
            {isSelected && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            {/* عرض الوقت */}
            <div className="text-lg font-medium mb-3 text-center">
              {item.time}
            </div>
            
            {/* مؤشر الحالة */}
            <div className={`${statusClass} px-3 py-1.5 rounded-md text-sm text-center flex items-center justify-center`}>
              {statusIcon && <span className="ml-1">{statusIcon}</span>}
              <span>{statusText}</span>
            </div>
          </button>
        );
      })}
    </div>
    
    {selectedTime && (
      <div className="mt-5 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
        <p className="text-blue-800">
          تم اختيار موعد الخدمة: <strong>{selectedTime}</strong>
        </p>
      </div>
    )}
  </div>
)}
              
              
            </div>
          </div>
        );
      };

      const handleAddTimeSlot = (repeatCount: number = 1) => {
        if (selectedDate && selectedTimeSlot) {
            // التحقق مما إذا كان اليوم موجودًا في الأيام المحظورة
            if (illegalOfferDays.includes(selectedDate)) {
                alert("هذا اليوم محدد مسبقًا، الرجاء اختيار يوم آخر.");
                return;
            }
    
            // التحقق مما إذا كان التاريخ مكررًا بالفعل
            if (offerTimeSlots.some(slot => slot.date === selectedDate)) {
                alert("لا يمكنك تحديد نفس التاريخ لمرات عديدة.");
                return;
            }
    
            const today = new Date();
            today.setHours(0, 0, 0, 0);
    
            if (new Date(selectedDate) === today && new Date(selectedDate).getHours() >= 11) {
                alert("الرجاء اختيار تاريخ مستقبلي.");
                return;
            }
    
            const newSlots: OfferTimeSlot[] = [];
            const newIllegalDays: string[] = [];
    
            for (let i = 0; i < repeatCount; i++) {
                const nextDate = new Date(selectedDate);
                nextDate.setDate(nextDate.getDate() + i * 7); // كل مرة بفارق أسبوع
    
                const formattedDate = nextDate.toISOString().split("T")[0];
    
                if (!offerTimeSlots.some(slot => slot.date === formattedDate) && !illegalOfferDays.includes(formattedDate)) {
                    newSlots.push({ date: formattedDate, timeSlot: selectedTime });
                    newIllegalDays.push(formattedDate);
                }
            }
    
            if (offerTimeSlots.length + newSlots.length <= maxOfferTimes) {
                setOfferTimeSlots([...offerTimeSlots, ...newSlots]);
                setIllegalOfferDays([...illegalOfferDays, ...newIllegalDays]);
    
                console.log("Offer time slots", offerTimeSlots);
                console.log("Illegal offer days", illegalOfferDays);
            } else {
                alert(`لقد وصلت إلى الحد الأقصى لعدد المواعيد المتاحة (${maxOfferTimes}).`);
            }
        } else {
            alert("الرجاء تحديد التاريخ والوقت.");
        }
    };
    

    // Function to remove time slot for offer
   const handleRemoveTimeSlot = (index: number) => {
        const timeSlotToRemove = offerTimeSlots[index];
        const newTimeSlots = [...offerTimeSlots];
        newTimeSlots.splice(index, 1);
        setOfferTimeSlots(newTimeSlots);

        // Remove the date from illegalOfferDays
        setIllegalOfferDays(illegalOfferDays.filter(date => date !== timeSlotToRemove.date));
    };

   
  
    const testfunc = (): boolean => {
      console.log("tester value", selectedTime);
      if (serviceType === 'one-time') {
      if (selectedTime && selectedDate) {
        return true;
      }
      return false;}
      else{
        if (offerTimeSlots.length===maxOfferTimes){
          return true;
        }
        return false;
      }
    };

  // Progress indicator component to show which step the user is on
const ProgressIndicator = () => {
  const steps = ['تفاصيل الحجز', 'الموقع', 'معلومات المستخدم', ' التاريخ و الدفع'];
  
  return (
      <div className="progress-container ">
          <div className="progress-steps">
              {steps.map((step, index) => (
                  <div 
                      key={index} 
                      className={`progress-step ${currentTab >= index ? 'active' : ''} ${currentTab === index ? 'current' : ''}`}
                      onClick={() => index < currentTab && setCurrentTab(index)}
                  >
                      <div className="step-circle">
                          {currentTab > index ? (
                              <div className="step-check">✓</div>
                          ) : (
                              <div className="step-number">{index + 1}</div>
                          )}
                      </div>
                      <div className="step-label ">{step}</div>
                      {index < steps.length - 1 && (
                          <div className={`step-connector  ${currentTab > index ? 'active' : ''}`}></div>
                      )}
                  </div>
              ))}
          </div>
      </div>
  );
};
    return (
        <>

    {/* Header - Updated hover states and rings */}
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b">
          <div className="max-w-7xl mx-auto px-2 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-blue-100 rounded-full blur-lg opacity-60"></div>
                  <img onClick={() => showSection( )} src="/logo.png" alt="Next Graft" className="h-12 relative" />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex gap-3">
                  {['EN', 'AR'].map((langa) => {
                    const langKey = langa.toUpperCase() as keyof typeof langImages;
                    return (
                      <button 
                        key={langa}
                        onClick={() => setlang(langa)}
                        className={`relative rounded-full overflow-hidden w-8 h-8 transition-transform ${
                          lang === langa ? 'scale-110 ring-2 ring-blue-500' : 'hover:scale-105'
                        }`}
                      >
                        <img 
                          src={langImages[langKey]}
                          alt={langKey} 
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
                <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors" onClick={handleClick2 as unknown as React.MouseEventHandler<HTMLButtonElement>}>
                  <Menu className="w-8 h-8 text-gray-700" /> 
                </button>
              </div>
            </div>
          </div>
        </header>


            {/* Load Google Maps JavaScript API */}
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAaDAaMUyqGhUKIZWQ-QbsQloq60oyBi8s&libraries=places`}
                strategy="afterInteractive"
            />

            <div   className="container">
                <ProgressIndicator />
                 
                <div className="tabs">

                    <div className={`tab ${currentTab === 0 ? 'active' : ''}`}>

                   
                       {  renderBookingDetails()}



                    </div>

                    <div className={`tab ${currentTab === 1 ? 'active' : ''}`}>
                        <h2>اختيار الموقع</h2>
                        {(currentTab === 1 )  && (
            <>
           
      
      <div className="location-container">
                              
       
                              <div className="map-container" ref={mapRef}></div>
                              
                              <label>الموقع المختار:</label>
                                  <textarea
                                      value={addressDetails + "\n " + locationUrl}
                                       rows={1}
                                      readOnly
                                  />
                              
                              <div className="form-group">
                                  <label>المدينة:</label>
                                  <input type="text" value={selectedCity} readOnly />
                                   
                                  
                              
                              
                              
                                  <label>اسم البناء ورقم الشقة:</label>
                                  <textarea
                                      value={locationNotes}
                                      onChange={(e) => setLocationNotes(e.target.value)}
                                      rows={3}
                                  />
                              
                                  
                               
                              </div>
                              </div>
                             
       
      
      
          </>
            )}

                  

                    </div>

                    <div className={`tab ${currentTab === 2 ? 'active' : ''}`}>


                    <h2>معلومات المستخدم</h2>
                         
                            <div className="form-group">
                                <label>الاسم:</label>
                                <input  placeholder="First Name Last Name"  value={ user?.name || name}  onChange={(e) => {
                                    if (user) {
                                        user.name = e.target.value;
                                    }
                                    setName(e.target.value);
                                    handleSave();
                                }} />
                                <label>رقم الهاتف:</label>
                                <input type="tel" placeholder="050 123 4567"  value={user?.phone || phone}   onChange={(e) => {
                                    if (user) {
                                        user.phone = e.target.value;
                                    }
                                    
                                    setPhone(e.target.value);
                                    handleSave();
                                }}     />
                                <label>البريد الإلكتروني:</label>
                                <input  type="email" value={user?.mail || mail}  onChange={(e) => {
                                    if (user) {
                                        user.mail = e.target.value;
                                    }
                                    setMail(e.target.value);
                                    handleSave();
                                }}  placeholder="example@domain.com" />
                                
                            </div>
                     

                      
                        
                    </div>

                    <div className={`tab ${currentTab === 3 ? 'active' : ''}`}>
                        <h2>الدفع</h2>
         
<div
  style={{
    marginTop: "25px",
    padding: "12px",
    backgroundColor: "#f0f8ff",
    color: "#05438b",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    border: "1px solid #d0e3ff",
  }}
>

            <div style={{
  marginLeft: "10px",
  fontSize: "20px",
  color: "#f39c12",
}}
>⚡</div>
            <div>
                <strong>تنبيه هام:</strong> مواعيدنا تنفذ بسرعة! عملاؤنا يحجزون مواعيدهم قبل 3-5 أيام مقدماً.
            </div>
        </div>
                        {renderDateTimeSelection()}



                        {currentTab === 3 && (
                            <div className="form-group">
                                
                               

                                

                                {serviceType != 'one-time' && (
                                    <>
                                        
                                      
                                         
                                                <div className="offer-time-slots">
                                                    <h3>المواعيد ({offerTimeSlots.length}/{maxOfferTimes})</h3>
                                                    
                                                    <div className="add-time-slot">
 
                                                  

                                                        <button 
                                                            type="button" 
                                                            className="add-slot-btn" 
                                                            onClick={() => {
                                                              if (serviceType === "package-12") {
                                                                handleAddTimeSlot(12);
                                                              } else if (serviceType === "package-4") {
                                                                handleAddTimeSlot(4);
                                                              } else {
                                                                handleAddTimeSlot();
                                                              }
                                                            }}
                                                            disabled={offerTimeSlots.length >= maxOfferTimes}
                                                        >
                                                            إضافة موعد
                                                        </button>
                                                    </div>
                                                    
                                                   
                                                    {illegalOfferDays.includes(selectedDate) && (
                                                        <p className="error-message">هذا اليوم محدد مسبقًا، الرجاء اختيار يوم آخر.</p>
                                                    )}

                                                    <div className="time-slots-list">
                                                        {offerTimeSlots.length > 0 ? (
                                                            <ul>
                                                                {offerTimeSlots.map((timeSlot, index) => (
                                                                    <li key={index} className="time-slot-item">
                                                                        <span className="time-slot-info">
                                                                            <span className="time-slot-date">{timeSlot.date}</span>
                                                                            <span className="time-slot-time">{timeSlot.timeSlot}</span>
                                                                        </span>
                                                                        <button 
                                                                            type="button" 
                                                                            className="remove-slot-btn"
                                                                            onClick={() => handleRemoveTimeSlot(index)}
                                                                        >
                                                                            ×
                                                                        </button>
                                                                        
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p className="no-slots">لم يتم تحديد أي مواعيد بعد.</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                
                               
                                )}
                            </div>
                        )}







                        {testfunc() ? (
                                <div className="payment-info">
                                  
                                    <h3>معلومات بطاقة الائتمان</h3>



                                    <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: totalPrice*100,
          currency: "aed",
        }}
      >
        <CheckoutPage amount={totalPrice}   language="ar" bookingData={createBookingdata()} />
      </Elements>
                                </div>
                            
                        ) : (
                            <div className="error-message">الرجاء تحديد التاريخ والوقت.</div>
                        )}
                    </div>
                </div>
  {renderBookingSummary()}



             <div className=" pt-16 navigation">

  
  
  
  
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-md mx-auto">
          {/* Collapsible price details */}
          {showSummaryDetails && (
            <div className="p-4 bg-white border-b">
              <div className="mb-2 flex justify-between items-center">
                <button 
                  onClick={() => setShowSummaryDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h3 className="text-lg font-bold text-gray-800 text-center">تفاصيل الحجز</h3>
              </div>
         
              <div className="space-y-2 text-sm text-right">
              {serviceType && (
           <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium text-gray-800">
                {serviceType === 'one-time' ? 'زيارة لمرة واحدة' : 
                 serviceType === 'package-4' ? '4 زيارات أسبوعية' : 
                 serviceType === 'package-8' ? '8 زيارات متعددة ' : '12 زيارة اسبوعية '}
              </span>
              <span className="text-gray-800 font-bold ">نوع الحجز</span>
            </div>
          )}
          
          {workers > 0 && (
             <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-800">{workers} </span>
              <span className="text-gray-800 font-bold ">عدد العمال</span>
            </div>
          )}
          
          {hours > 0 && (
             <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">{hours} </span>
              <span className="text-gray-800 font-bold  ">عدد الساعات</span>
            </div>
          )}
          
          {selectedCity && (
           <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 w-[40%] text-left ">{addressDetails + "\n " + locationUrl}</span>
              <span className="text-gray-800 font-bold ">الموقع</span>
            </div>
          )}

          {selectedTime && (
           <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-800">{selectedTime}</span>
              <span className="text-gray-800 font-bold ">وقت الوصول</span>
            </div>
          )}
          
          {date && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-800">{date}</span>
              <span className="text-gray-800 font-bold ">التاريخ</span>
            </div>
          )}
          
          {totalPrice > 0 && (
             <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-lg font-bold text-blue-600">{totalPrice} درهم</span>
              <span className="text-gray-800 font-bold ">السعر الإجمالي</span>
            </div>
          )}

                
              </div>
            </div>
          )}
          
          {/* Fixed price bar */}
          <div className="p-4 bg-white flex justify-between items-center">
              {currentTab > 0 && (
            <button  onClick={handlePrev} className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1 text-sm">
                   <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            <span>رجوع</span>

          </button>
  )}
            <button 
              onClick={() => setShowSummaryDetails(!showSummaryDetails)}
              className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <span className="text-gray-700 text-sm">AED {totalPrice}</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showSummaryDetails ? 'rotate-180' : ''}`} />
            </button>
          
            {currentTab < 3 && (
            <button  onClick={handleNext} className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1 text-sm">
              <span>التالي</span>
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          
            </button>
            )}

          </div>
        </div>
        </div>
</div>

            </div>
            <style jsx>{`
                /* Base Styles */


                
.btn-summary {
  background-color: #f0f8ff;
  color: #333;
  border: 1px solid #4e73df;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 120px;
  margin: 0 10px;
  transition: all 0.3s ease;
}

.btn-summary:hover {
  background-color: #e6f0ff;
}

.price-text {
  font-weight: bold;
  color: #4e73df;
}

.arrow-icon {
  margin-right: 8px;
  font-size: 12px;
  transition: transform 0.3s ease;
}

.arrow-icon.up {
  transform: rotate(180deg);
}

.navigation {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 15px;
                    font-family: 'Arial', sans-serif;
                    background-color: #f7f9fc;
                    border-radius: 10px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    direction: rtl;
                }

                /* Progress Indicator */
                .progress-container {
                    margin: 0 10px 25px 10px;
                    padding-bottom: 5px;
                }
                
                .progress-bar {
                    height: 4px;
                    background-color: #e0e0e0;
                    border-radius: 2px;
                    margin: 15px 20px 25px 20px;
                    position: relative;
                    z-index: 1;
                }
                
                .progress-fill {
                    height: 100%;
                    background-color: #4e73df;
                    border-radius: 2px;
                    transition: width 0.3s ease;
                }
                
                .progress-steps {
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                    padding: 0 10px;
                }
                
                .progress-step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    z-index: 2;
                    flex: 1;
                     
                    transition: all 0.3s;
                    position: relative;
                    cursor: pointer;
                }
                
                .progress-step.current .step-circle {
                    transform: scale(1.15);
                    box-shadow: 0 0 0 4px rgba(78, 115, 223, 0.15);
                }
                
                .step-circle {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background-color: #fff;
                    border: 2px solid #e0e0e0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 8px;
                    position: relative;
                    transition: all 0.3s ease;
                }
                
                .progress-step.active .step-circle {
                    border-color: #4e73df;
                    background-color: #fff;
                }
                
                .step-number {
                    font-size: 14px;
                    font-weight: bold;
                    color: #777;
                    transition: all 0.3s ease;
                }
                
                .progress-step.active .step-number {
                    color: #4e73df;
                }
                
                .step-label {
                    font-size: 11px;
                    color: #777;
                    text-align: center;
                    transition: all 0.3s ease;
                    max-width: 70px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                
                .progress-step.active .step-label {
                    color: #333;
                    font-weight: 500;
                }

                /* Tabs */
                .tabs {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .tab {
                    display: none;
                    padding: 15px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }

                .tab.active {
                    display: block;
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                h2 {
                    font-size: 18px;
                    color: #333;
                    margin-bottom: 15px;
                    text-align: center;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #eee;
                }

                h3 {
                    font-size: 16px;
                    margin: 15px 0 10px;
                    color: #444;
                }

                /* Form Elements */
                .form-group {
                    margin-bottom: 15px;
                }

                label {
                    display: block;
                    font-size: 14px;
                    color: #555;
                    margin-bottom: 5px;
                    font-weight: 500;
                }

                input, select, textarea {
                    width: 100%;
                    padding: 12px;
                    border-radius: 8px;
                    border: 1px solid #ddd;
                    font-size: 16px;
                    background-color: #f9f9f9;
                    transition: border-color 0.3s;
                    margin-bottom: 10px;
                    -webkit-appearance: none;
                }

                input:focus, select:focus, textarea:focus {
                    outline: none;
                    border-color: #4e73df;
                    background-color: #fff;
                    box-shadow: 0 0 0 3px rgba(78, 115, 223, 0.1);
                }

                textarea {
                    resize: vertical;
                    min-height: 80px;
                }

                .select-field {
                    position: relative;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23555' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: left 12px center;
                    padding-left: 30px;
                }

                .select-field.small {
                    max-width: 100px;
                    display: inline-block;
                }

                .readonly-field {
                    background-color: #f0f0f0;
                    color: #666;
                }

                /* Map Container */
                .map-container {
                    width: 100%;
                    height: 250px;
                    margin-bottom: 15px;
                    border-radius: 8px;
                    overflow: hidden;
                    border: 1px solid #ddd;
                    position: relative;
                }

                /* Location URL and Copy Button */
                .location-url-container {
                    display: flex;
                    gap: 5px;
                    margin-bottom: 10px;
                }

                .copy-btn {
                    padding: 6px 12px;
                    background-color: #4e73df;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    flex-shrink: 0;
                    font-size: 14px;
                    transition: background-color 0.2s;
                }

                .copy-btn:hover {
                    background-color: #3a57c9;
                }

                .coordinates-info {
                    background-color: #f0f0f0;
                    padding: 8px 12px;
                    border-radius: 6px;
                    margin: 10px 0;
                    font-size: 13px;
                    color: #666;
                }

                /* Service Type Selector */
                .service-type-selector {
                    display: flex;
                    margin-bottom: 15px;
                    border-radius: 8px;
                    overflow: hidden;
                }

                .service-option {
                    flex: 1;
                    text-align: center;
                    padding: 12px;
                    background-color: #f0f0f0;
                    color: #555;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-weight: 500;
                }

                .service-option.selected {
                    background-color: #4e73df;
                    color: white;
                }

                /* Time Period Selection */
                .time-period-section {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-bottom: 15px;
                }

                .time-option {
                    padding: 12px;
                    border-radius: 8px;
                    border: 1px solid #ddd;
                    background-color: #f9f9f9;
                    transition: all 0.2s;
                }

                .time-option.selected {
                    border-color: #4e73df;
                    background-color: rgba(78, 115, 223, 0.05);
                }

                /* Checkbox Container */
                .checkbox-container {
                    display: flex;
                    align-items: center;
                    position: relative;
                    cursor: pointer;
                    user-select: none;
                }

                .checkbox-container input {
                    position: absolute;
                    opacity: 0;
                    cursor: pointer;
                    height: 0;
                    width: 0;
                }

                .checkmark {
                    height: 20px;
                    width: 20px;
                    background-color: #eee;
                    border-radius: 4px;
                    margin-left: 10px;
                    position: relative;
                }

                .checkbox-container:hover input ~ .checkmark {
                    background-color: #ccc;
                }

                .checkbox-container input:checked ~ .checkmark {
                    background-color: #4e73df;
                }

                .checkmark:after {
                    content: "";
                    position: absolute;
                    display: none;
                }

                .checkbox-container input:checked ~ .checkmark:after {
                    display: block;
                }

                .checkbox-container .checkmark:after {
                    right: 6px;
                    top: 2px;
                    width: 5px;
                    height: 10px;
                    border: solid white;
                    border-width: 0 3px 3px 0;
                    transform: rotate(45deg);
                }

                .label-text {
                    font-weight: 500;
                }

                .extra-hours {
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                }

                .extra-hours label {
                    margin-left: 10px;
                    margin-bottom: 0;
                    font-size: 13px;
                }

                /* Counter Input for Cleaners */
                .cleaner-section {
                    margin-top: 20px;
                    padding: 15px;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    border: 1px solid #eee;
                }

                .counter-input {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 10px 0;
                }

                .counter-btn {
                 
                    border-radius: 50%;
                    background-color: #4e73df;
                    color: white;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }

                .counter-btn:hover {
                    background-color: #3a57c9;
                }

                .counter-value {
                    margin: 0 15px;
                    font-size: 18px;
                    font-weight: bold;
                  
                    text-align: center;
                }

                .available-cleaners {
                    margin-top: 10px;
                    font-size: 13px;
                    color: #777;
                    text-align: center;
                }

                /* Offers Styling */
                .offers-container {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-bottom: 15px;
                }

                .offer-card {
                    padding: 15px;
                    border-radius: 8px;
                    border: 1px solid #ddd;
                    background-color: #f9f9f9;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .offer-card.selected {
                    border-color: #4e73df;
                    background-color: rgba(78, 115, 223, 0.05);
                }

                .offer-details {
                    display: flex;
                    flex-direction: column;
                }

                .offer-price {
                    font-size: 18px;
                    font-weight: bold;
                    color: #4e73df;
                    margin-bottom: 5px;
                }

                .offer-description {
                    font-size: 14px;
                    color: #555;
                }

                /* Time Slots for Offers */
                .offer-time-slots {
                    margin-top: 20px;
                }

                .add-time-slot {
                    margin-bottom: 15px;
                }

                .date-time-inputs {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    margin-bottom: 10px;
                }

                .input-group {
                    flex: 1;
                    min-width: 140px;
                }

                .date-input {
                    font-family: Arial, sans-serif;
                }

                .add-slot-btn {
                    width: 100%;
                    padding: 12px;
                    background-color: #4e73df;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: background-color 0.2s;
                }

                .add-slot-btn:hover {
                    background-color: #3a57c9;
                }

                .add-slot-btn:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }

                .time-slots-list {
                    margin-top: 15px;
                }

                .time-slots-list ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .time-slot-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    margin-bottom: 8px;
                    background-color: #f0f0f0;
                    border-radius: 6px;
                    transition: all 0.2s;
                }

                .time-slot-item:hover {
                    background-color: #e8e8e8;
                }

                .time-slot-info {
                    display: flex;
                    flex-direction: column;
                }

                .time-slot-date {
                    font-weight: 500;
                    margin-bottom: 3px;
                }

                .time-slot-time {
                    font-size: 13px;
                    color: #666;
                }

                .remove-slot-btn {
                    background-color: #ff4d4d;
                    color: white;
                    border: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.2s;
                }

                .remove-slot-btn:hover {
                    background-color: #e04141;
                }

                .no-slots {
                    color: #999;
                    font-style: italic;
                    font-size: 14px;
                    text-align: center;
                    padding: 10px;
                }

                /* Error Message */
                .error-message {
                    color: #e74a3b;
                    font-size: 13px;
                    margin-top: 5px;
                    margin-bottom: 10px;
                }

                /* Summary Section */
                .summary {
                    background-color: #f5f7fa;
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    border: 1px solid #e6e9ee;
                }

                .summary h3 {
                    color: #333;
                    font-size: 16px;
                    margin-bottom: 15px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid #ddd;
                }

                .summary-item {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    font-size: 14px;
                }

                .summary-label {
                    color: #666;
                    flex: 1;
                }

                .summary-value {
                    font-weight: 500;
                    color: #333;
                    flex: 1;
                    text-align: left;
                }

                .slots-summary {
                    flex-direction: column;
                }

                .slots-list {
                    margin-top: 8px;
                }

                .slot-item {
                    padding: 8px;
                    background-color: #eef1f7;
                    border-radius: 4px;
                    margin-bottom: 5px;
                    font-size: 13px;
                }

                .total-price {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 15px;
                    padding-top: 12px;
                    border-top: 1px dashed #ddd;
                }

                .total-label {
                    font-size: 16px;
                    font-weight: bold;
                    color: #333;
                }

                .total-value {
                    font-size: 20px;
                    font-weight: bold;
                    color: #4e73df;
                }
                .day-alert {
            background-color: #fef2d9;
            border: 1px dashed #f39c12;
            color: #9a5c0b;
            padding: 12px;
            border-radius: 8px;
            margin: 15px 0;
            text-align: center;
            font-weight: bold;
            font-size: 15px;
        }
                /* Payment Section */
                .payment-info {
                    background-color: #fff;
                    padding: 15px;
                    border-radius: 8px;
                    border: 1px solid #e6e9ee;
                }

                .card-container {
                    background-color: #f9f9f9;
                    padding: 15px;
                    border-radius: 8px;
                    border: 1px solid #eee;
                }

                .card-row {
                    display: flex;
                    gap: 10px;
                }

                .half {
                    flex: 1;
                }

                .card-input {
                    font-size: 16px;
                    letter-spacing: 0.5px;
                }

                /* Navigation Buttons */
                .navigation {
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
                    gap: 10px;
                }

                button {
                    padding: 14px 20px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 8px;
                }

                .btn-prev {
                    background-color: #f8f9fa;
                    color: #555;
                    border: 1px solid #ddd;
                    flex: 1;
                }

                .btn-prev:hover {
                    background-color: #e9ecef;
                }

                .btn-next {
                    background-color: #4e73df;
                    color: white;
                    flex: 1;
                }

                .btn-next:hover {
                    background-color: #3a57c9;
                }

                .btn-confirm {
                    background-color: #28a745;
                    color: white;
                    flex: 1;
                }

                .btn-confirm:hover {
                    background-color: #218838;
                }

                .btn-icon {
                    font-size: 18px;
                    margin: 0 5px;
                }

                /* Mobile-specific adjustments */
                @media (max-width: 480px) {
                    .container {
                        padding: 10px;
                        border-radius: 0;
                        box-shadow: none;
                    }

                    h2 {
                        font-size: 16px;
                    }

                    .tab {
                        padding: 12px;
                    }

                    input, select, textarea {
                        padding: 10px;
                        font-size: 14px;
                    }

                    button {
                        padding: 12px 16px;
                        font-size: 14px;
                    }

                    .map-container {
                        height: 200px;
                    }

                    .step-label {
                        font-size: 10px;
                    }

                    .offers-container {                        gap: 8px;
                    }

                    .offer-price {
                        font-size: 16px;
                    }

                    .offer-description {
                        font-size: 12px;
                    }

                    .card-row {
                        flex-direction: column;
                        gap: 5px;
                    }
                }
            `}</style>
        </>
    );
};

export default TabsPage;