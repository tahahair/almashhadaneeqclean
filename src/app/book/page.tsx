"use client"
// pages/index.tsx
import { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import Script from 'next/script';
import LogoutButton from "../components/LogoutButton";
 
 

interface OfferTimeSlot {
    date: string;
    timeSlot: string;
}

const TabsPage = () => {
    // All state declarations remain the same
    const [currentTab, setCurrentTab] = useState(0);
    const [user, setUser] = useState<{ name: string; phone: string; phoneVerified: boolean } | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    console.log("mapLoaded", mapLoaded);
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [selectedCity, setSelectedCity] = useState("");
    const [addressDetails, setAddressDetails] = useState("");
    const [locationNotes, setLocationNotes] = useState("");
    const [locationUrl, setLocationUrl] = useState("");
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<google.maps.Map | null>(null);
    const markerRef = useRef<google.maps.Marker | null>(null)
    const router = useRouter();

    // States for Time and Offer Selection remain the same
    const [serviceType, setServiceType] = useState<'oneTime' | 'offer'>('oneTime');
    const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedMorningTime, setSelectedMorningTime] = useState<boolean>(false);
    const [selectedAfternoonTime, setSelectedAfternoonTime] = useState<boolean>(false);
    const [morningExtraHours, setMorningExtraHours] = useState<number>(0);
    const [afternoonExtraHours, setAfternoonExtraHours] = useState<number  >(0);
    const [numberOfCleaners, setNumberOfCleaners] = useState<number>(1);
    const [availableCleaners, setAvailableCleaners] = useState<number>(15);
    const totalCleaners = 15;
 
    // States for offer times remain the same
    const [offerTimeSlots, setOfferTimeSlots] = useState<OfferTimeSlot[]>([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
    const [illegalOfferDays, setIllegalOfferDays] = useState<string[]>([]);

    // Available time slots
    const availableTimeSlots = [
        "الفترة الصباحية من 11:00-11:30 الى 15:00-15:30","الفترة المسائية من 16:00-16:30 الى 20:00-20:30"  ];

    // Offers
    const offers = [
        { id: 'offer1', label: '4 hours X 4 times in a month one cleaner 340 AED', times: 4, price: 340 },
        { id: 'offer2', label: '4 hours X 8 times in a month one cleaner 680 AED', times: 8, price: 680 },
        { id: 'offer3', label: '4 hours X 12 times in a month one cleaner 1000 AED', times: 12, price: 1000 }
    ];

    const selectedOfferData = offers.find(offer => offer.id === selectedOffer);
    const maxOfferTimes = selectedOfferData ? selectedOfferData.times : 0;

    const [minDate, setMinDate] = useState<string>('');
    
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
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");

        if (userData && userData.phoneVerified && userData.logedin) {
            setUser(userData);
        } else {
            router.push('/login?book=${bookValue}');
        }
    }, []);

    // Function to get the user's current location
    // Fix the getCurrentLocation function
const getCurrentLocation = () => {
    if (navigator.geolocation && mapInstanceRef.current && markerRef.current) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // Set map center to user's location
                mapInstanceRef.current?.setCenter(userLocation);
                markerRef.current?.setPosition(userLocation);
                setSelectedLocation(userLocation);

                // Try to get address details from coordinates
                getAddressFromCoordinates(userLocation);
            },
            () => {
                // Handle geolocation error or permission denied
                alert("تعذر الوصول إلى موقعك الحالي");
                console.log("Unable to retrieve your location");
            }
        );
    }
};
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

        // Setup the click event listener
        controlUI.addEventListener('click', getCurrentLocation);

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
    
            // Get device's current location if permission is granted
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
    
                        // Set map center to user's location
                        map.setCenter(userLocation);
                        marker.setPosition(userLocation);
                        setSelectedLocation(userLocation);
    
                        // Try to get address details from coordinates
                        getAddressFromCoordinates(userLocation);
                    },
                    () => {
                        // Handle geolocation error or permission denied
                        console.log("Unable to retrieve your location");
                    }
                );
            }
    
            // Update selected location when marker is dragged
            google.maps.event.addListener(marker, 'dragend', () => {
                const position = marker.getPosition();
                if (position) {
                    setSelectedLocation({
                        lat: position ? position.lat() : 0,
                        lng: position ? position.lng() : 0,
                    });
                }
    
                // Update address details when marker position changes
                getAddressFromCoordinates({
                    lat: position ? position.lat() : 0,
                    lng: position ? position.lng() : 0,
                });
            });
    
            // Update marker position when map is clicked
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
        }
    }, [currentTab]);

    // Function to get address details from coordinates using Geocoding API
   // Fix the getAddressFromCoordinates function
const getAddressFromCoordinates = (location: google.maps.LatLngLiteral) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: location }, (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
        if (status === "OK" && results && results[0]) {
            const addressComponents = results[0].address_components;

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
                } else if (normalizedCityName.includes("sharjah") || normalizedCityName.includes("الشارقة")) {
                    setSelectedCity("Sharjah");
                } else if (normalizedCityName.includes("ajman") || normalizedCityName.includes("عجمان")) {
                    setSelectedCity("Ajman");
                } else if (normalizedCityName.includes("umm al quwain") || normalizedCityName.includes("أم القيوين")) {
                    setSelectedCity("Umm Al Quwain");
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

    const handleNext = () => {
        // Add validation for location tab
        if (currentTab === 1 && !selectedLocation) {
            alert("الرجاء تحديد الموقع على الخريطة");
            return;
        }

        if (currentTab === 1 && !selectedCity) {
            alert("الرجاء اختيار المدينة");
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
        if (currentTab === 2) {
            if (serviceType === 'oneTime') {
                if (!selectedDate) {
                    alert("الرجاء اختيار التاريخ");
                    return;
                }

                const selectedDateObj = new Date(selectedDate);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // set the time to 00:00:00 to compare only the date

                if (new Date(selectedDate) < new Date()) {
                  alert("الرجاء اختيار  تاريخ مستقبلي.");
                  return;
                }

                // Check if the selected date is a working day (Saturday to Thursday)
                const selectedDay = selectedDateObj.getDay();
                if (selectedDay === 5 || selectedDay === 6) { // 5: Friday, 6: Saturday
                    alert("الرجاء اختيار يوم من السبت إلى الخميس.");
                    return;
                }

                if (!selectedMorningTime && !selectedAfternoonTime) {
                    alert("الرجاء اختيار الفترة الصباحية أو المسائية.");
                    return;
                }

                if (numberOfCleaners > availableCleaners) {
                    alert(`لا يوجد عدد كاف من عمال النظافة متاحين. متاح حاليا: ${availableCleaners}`);
                    return;
                }

                if (selectedMorningTime && selectedAfternoonTime) {
                  setMorningExtraHours(0);
                  setAfternoonExtraHours(0);
                }
            
           
            }

              if (serviceType === 'offer') {
                if (!selectedOffer) {
                    alert("الرجاء اختيار عرضًا.");
                    return;
                }

                if (offerTimeSlots.length < maxOfferTimes) {
                    alert(`الرجاء إضافة ${maxOfferTimes} مواعيد للعرض.`);
                    return;
                }
            }
        }

        if (currentTab < 3) {
            setCurrentTab(currentTab + 1);
        }
    };

    const handlePrev = () => {
        if (currentTab > 0) {
            setCurrentTab(currentTab - 1);
        }
    };
    const handleConfirm = async () => {
        // Prepare the data for submission
        const bookingData = {
            name: user?.name || '',  // Use name from user object
            phone: user?.phone || '',  // Use phone from user object
            city: selectedCity,
            address: addressDetails + "\n " + locationNotes,
            locationUrl: locationUrl,
            serviceType:
                serviceType === 'oneTime'
                    ? 'ONE_TIME'
                    : selectedOffer === 'offer1'
                        ? 'OFFER_4'
                        : selectedOffer === 'offer2'
                            ? 'OFFER_8'
                            : selectedOffer === 'offer3'
                                ? 'OFFER_12'
                                : 'ONE_TIME', // Default to ONE_TIME if offer is not selected.  Important!
            date: selectedDate ? new Date(selectedDate) : new Date(), // Convert to DateTime, handle empty string
            timePeriod:
                selectedMorningTime && !selectedAfternoonTime
                    ? 'MORNING'
                    : !selectedMorningTime && selectedAfternoonTime
                        ? 'EVENING'
                        : 'MORNING', // Default to MORNING if neither or both are selected. Important
            extraHours: selectedMorningTime && !selectedAfternoonTime? morningExtraHours: selectedAfternoonTime&& !selectedMorningTime ? afternoonExtraHours:0,  // Use ternary for correct hours.  Also, needs to be zero if both or neither time selected.
    
            workerCount: numberOfCleaners,
            price: totalPrice,
        };
    
        try {
            // Send the booking data to the API endpoint
            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });
    
            if (response.ok) {
                alert('تم تأكيد الحجز بنجاح!');
                // Optionally, redirect to a confirmation page or reset the form
                router.push('/confirmation');
            } else {
                const errorData = await response.json();
                alert(`حدث خطأ أثناء تأكيد الحجز: ${errorData.error || 'Unknown error'}`);
                console.error('API Error:', errorData);
            }
        } catch (error) {
            alert('حدث خطأ أثناء الاتصال بالخادم.');
            console.error('Fetch Error:', error);
        }
    };
    // Function to calculate available cleaners
    const calculateAvailableCleaners = () => {
        // This is a placeholder.  You'll need to replace this with your actual logic
        // to determine the number of available cleaners based on the selected date and time.
        // You might need to fetch this data from an API or a database.

        //For simplicity I am hardcoding the value
        return totalCleaners - numberOfCleaners;

    };

    useEffect(() => {
        // Update available cleaners when date or time changes
        setAvailableCleaners(calculateAvailableCleaners());
    }, [selectedDate, selectedMorningTime, selectedAfternoonTime, numberOfCleaners]);

    // Function to check if a date is a working day (Saturday to Thursday)
    const isWorkingDay = (dateString: string): boolean => {
        const day = new Date(dateString).getDay();
        return day >= 0 && day <= 4; // 0: Sunday, 1: Monday, ..., 4: Thursday
    };
    const handleMorningTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMorningTime(e.target.checked);
          if (selectedAfternoonTime && e.target.checked) {
            setMorningExtraHours(0);
            setAfternoonExtraHours(0);
        }
        else if (!e.target.checked) {
            setMorningExtraHours(0); // Reset extra hours if morning time is unchecked
        }
    };

    const handleAfternoonTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAfternoonTime(e.target.checked);

        if (selectedMorningTime && e.target.checked) {
             setMorningExtraHours(0);
             setAfternoonExtraHours(0);
        }
       else if (!e.target.checked) {
            setAfternoonExtraHours(0); // Reset extra hours if afternoon time is unchecked
        }
    };

    // Function to add time slot for offer
   const handleAddTimeSlot = () => {
        if (selectedDate && selectedTimeSlot) {
            // Check if the selected date is in the illegalOfferDays array
            if (illegalOfferDays.includes(selectedDate)) {
                alert("هذا اليوم محدد مسبقًا، الرجاء اختيار يوم آخر.");
                return; // Prevent adding the time slot
            }

            // Check if the selected date already exists in offerTimeSlots
            if (offerTimeSlots.some(slot => slot.date === selectedDate)) {
                alert("لا يمكنك تحديد نفس التاريخ لمرات عديدة.");
                return;
            }

            if (offerTimeSlots.length < maxOfferTimes) {
                // Check if the selected date is a working day (Saturday to Thursday)
                if (!isWorkingDay(selectedDate)) {
                    alert("الرجاء اختيار يوم من السبت إلى الخميس.");
                    return;
                }


                const today = new Date();
                today.setHours(0, 0, 0, 0);

                 if (new Date(selectedDate) < new Date()) {
                  alert("الرجاء اختيار  تاريخ مستقبلي.");
                  return;
                }
              
                const newTimeSlot: OfferTimeSlot = { date: selectedDate, timeSlot: selectedTimeSlot };
                setOfferTimeSlots([...offerTimeSlots, newTimeSlot]);

                 // Add the selected date to the illegalOfferDays array
                setIllegalOfferDays([...illegalOfferDays, selectedDate]);
            } else {
                alert(`لقد وصلت إلى الحد الأقصى لعدد المواعيد المتاحة لهذا العرض (${maxOfferTimes}).`);
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

    const calculateTotalPrice = (): number => {
      let totalPrice = 0;
  
      if (selectedCity === "Dubai") {
          totalPrice = 100;
      } else {
          totalPrice = 85;
      }
  
      if (serviceType === 'oneTime') {
          // Calculate price for one-time service
          const baseRate = 20; // Example base rate per hour
          let totalHours = 0;
          if (selectedAfternoonTime && selectedMorningTime) {
            totalHours = 4;
        }
          else if (selectedMorningTime) {
              totalHours += (morningExtraHours || 0);
          }
          else if (selectedAfternoonTime) {
              totalHours += (afternoonExtraHours || 0);
          }

  
          if (totalPrice > 0   && numberOfCleaners > 0) {
              totalPrice =   totalPrice * numberOfCleaners + (totalHours * baseRate*numberOfCleaners);
          }
      } else if (serviceType === 'offer' && selectedOfferData?.price) {
          // Use the offer price directly
          totalPrice = selectedOfferData.price;
      }
  
      return totalPrice;
  };
  

    const totalPrice = calculateTotalPrice();

  // Progress indicator component to show which step the user is on
const ProgressIndicator = () => {
  const steps = ['معلومات المستخدم', 'الموقع', 'التاريخ والوقت', 'الدفع'];
  
  return (
      <div className="progress-container">
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
                      <div className="step-label">{step}</div>
                      {index < steps.length - 1 && (
                          <div className={`step-connector ${currentTab > index ? 'active' : ''}`}></div>
                      )}
                  </div>
              ))}
          </div>
      </div>
  );
};
    return (
        <>
            {/* Load Google Maps JavaScript API */}
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAaDAaMUyqGhUKIZWQ-QbsQloq60oyBi8s&libraries=places`}
                strategy="afterInteractive"
            />

            <div   className="container">
                <ProgressIndicator />
                
                <div className="tabs">
                    <div className={`tab ${currentTab === 0 ? 'active' : ''}`}>
                        <h2>معلومات المستخدم</h2>
                        {currentTab === 0 && (
                            <div className="form-group">
                                <label>الاسم:</label>
                                <input type="text" value={user?.name || ''} readOnly />
                                <label>رقم الهاتف:</label>
                                <input type="text" value={user?.phone || ''} readOnly />
                            </div>
                        )}
                    </div>

                    <div className={`tab ${currentTab === 1 ? 'active' : ''}`}>
                        <h2>اختيار الموقع</h2>
                        {currentTab === 1 && (
                            <div className="location-container">
                                {/* Map container */}
                                <div className="map-container" ref={mapRef}></div>

                                <div className="form-group">
                                    <label>المدينة:</label>
                                    <select
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        required
                                        className="select-field"
                                    >
                                        <option value="">اختر المدينة</option>
                                        <option value="Dubai">دبي</option>
                                        <option value="Sharjah">الشارقة</option>
                                        <option value="Ajman">عجمان</option>
                                        <option value="Umm Al Quwain">أم القيوين</option>
                                    </select>

                                    <label>العنوان (للقراءة فقط):</label>
                                    <textarea
                                        value={addressDetails}
                                        readOnly
                                        placeholder="سيظهر العنوان تلقائياً عند تحديد الموقع"
                                        rows={2}
                                        className="readonly-field"
                                    />

                                    <label>ملاحظات إضافية عن الموقع:</label>
                                    <textarea
                                        value={locationNotes}
                                        onChange={(e) => setLocationNotes(e.target.value)}
                                        placeholder="أدخل أي تفاصيل إضافية عن الموقع مثل: رقم المبنى، الطابق، علامات مميزة، إلخ"
                                        rows={3}
                                    />

                                    {selectedLocation && (
                                        <>
                                            <div className="coordinates-info">
                                                <p>الإحداثيات: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}</p>
                                            </div>

                                            <label>رابط الموقع:</label>
                                            <div className="location-url-container">
                                                <input
                                                    type="text"
                                                    value={locationUrl}
                                                    readOnly
                                                    className="readonly-field"
                                                />
                                                <button
                                                    type="button"
                                                    className="copy-btn"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(locationUrl);
                                                        alert("تم نسخ الرابط بنجاح");
                                                    }}
                                                >
                                                    نسخ
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={`tab ${currentTab === 2 ? 'active' : ''}`}>
                        <h2>التاريخ والوقت</h2>
                        {currentTab === 2 && (
                            <div className="form-group">
                                <label>اختر نوع الخدمة:</label>
                                <div className="service-type-selector">
                                    <div 
                                        className={`service-option ${serviceType === 'oneTime' ? 'selected' : ''}`}
                                        onClick={() => setServiceType('oneTime')}
                                    >
                                        مرة واحدة
                                    </div>
                                    <div 
                                        className={`service-option ${serviceType === 'offer' ? 'selected' : ''}`}
                                        onClick={() => setServiceType('offer')}
                                    >
                                        عرض
                                    </div>
                                </div>

                                {serviceType === 'oneTime' && (
                                    <>
                                        <label>التاريخ:</label>
                                        <input 
                                            type="date" 
                                            value={selectedDate} 
                                            onChange={(e) => setSelectedDate(e.target.value)} 
                                            min={minDate} 
                                            className="date-input"
                                        />

                                        {selectedDate && !isWorkingDay(selectedDate) && (
                                            <p className="error-message">الرجاء اختيار يوم من السبت إلى الخميس.</p>
                                        )}
                                        {selectedDate && new Date(selectedDate) < new Date() && (
                                            <p className="error-message">الرجاء اختيار  تاريخ مستقبلي.</p>
                                        )}

                                        <label>الفترة:</label>
                                        <div className="time-period-section">
                                            <div className={`time-option ${selectedMorningTime ? 'selected' : ''}`}>
                                                <label className="checkbox-container">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedMorningTime}
                                                        onChange={handleMorningTimeChange}
                                                    />
                                                    <span className="checkmark"></span>
                                                    <span className="label-text">الفترة الصباحية</span>
                                                </label>
                                                {selectedMorningTime && !selectedAfternoonTime && (
                                                    <div className="extra-hours">
                                                        <label>عدد الساعات الإضافية:</label>
                                                        <select
                                                            value={morningExtraHours !== null ? morningExtraHours : ''}
                                                            onChange={(e) => setMorningExtraHours(parseInt(e.target.value))}
                                                            disabled={selectedAfternoonTime}
                                                            className="select-field small"
                                                        >
                                                            <option value="0">0</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </select>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className={`time-option ${selectedAfternoonTime ? 'selected' : ''}`}>
                                                <label className="checkbox-container">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedAfternoonTime}
                                                        onChange={handleAfternoonTimeChange}
                                                    />
                                                    <span className="checkmark"></span>
                                                    <span className="label-text">الفترة المسائية</span>
                                                </label>
                                                {selectedAfternoonTime && !selectedMorningTime && (
                                                    <div className="extra-hours">
                                                        <label>عدد الساعات الإضافية:</label>
                                                        <select
                                                            value={afternoonExtraHours !== null ? afternoonExtraHours : ''}
                                                            onChange={(e) => setAfternoonExtraHours(parseInt(e.target.value))}
                                                            disabled={selectedMorningTime}
                                                            className="select-field small"
                                                        >
                                                            <option value="0">0</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </select>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="cleaner-section flex flex-col space-y-2 p-4 border rounded-lg bg-gray-50 rtl"> 
    <label className="font-medium text-gray-700">عدد عمال النظافة:</label> 
    
    <div className="counter-input flex items-center justify-center space-x-2 rtl:space-x-reverse"> 
        <button  
            type="button"  
            className="w-12 h-12 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full font-bold text-lg transition-colors" 
            onClick={() => { 
                if (numberOfCleaners > 1) { 
                    setNumberOfCleaners(numberOfCleaners - 1); 
                } 
            }} 
        >-</button> 
        <span className="  font-bold text-2xl   pr-8 pl-6 text-center">{numberOfCleaners}</span> 
        <button  
            type="button"  
            className="w-12 h-12 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-2xl transition-colors" 
            onClick={() => { 
                if (numberOfCleaners < 4) { 
                    setNumberOfCleaners(numberOfCleaners + 1); 
                } 
            }} 
        >+</button> 
    </div> 
    <p className="available-cleaners text-sm text-gray-600 mt-2">عدد عمال النظافة المتاحين: {availableCleaners}</p> 
</div>
                                    </>
                                )}

                                {serviceType === 'offer' && (
                                    <>
                                        <label>اختر عرضًا:</label>
                                        <div className="offers-container">
                                            {offers.map(offer => (
                                                <div 
                                                    key={offer.id} 
                                                    className={`offer-card ${selectedOffer === offer.id ? 'selected' : ''}`}
                                                    onClick={() => setSelectedOffer(offer.id)}
                                                >
                                                    <div className="offer-details">
                                                        <span className="offer-price">{offer.price} AED</span>
                                                        <span className="offer-description">{offer.label}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {selectedOffer && (
                                            <>
                                                <div className="offer-time-slots">
                                                    <h3>المواعيد ({offerTimeSlots.length}/{maxOfferTimes})</h3>
                                                    
                                                    <div className="add-time-slot">
                                                        <div className="date-time-inputs">
                                                            <div className="input-group">
                                                                <label>التاريخ:</label>
                                                                <input 
                                                                    type="date" 
                                                                    value={selectedDate} 
                                                                    onChange={(e) => setSelectedDate(e.target.value)} 
                                                                    min={minDate}
                                                                    className="date-input"
                                                                />
                                                            </div>
                                                            
                                                            <div className="input-group">
                                                                <label>الوقت:</label>
                                                                <select 
                                                                    value={selectedTimeSlot} 
                                                                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                                                                    className="select-field"
                                                                >
                                                                    <option value="">اختر الوقت</option>
                                                                    {availableTimeSlots.map((timeSlot) => (
                                                                        <option key={timeSlot} value={timeSlot}>{timeSlot}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        
                                                        <button 
                                                            type="button" 
                                                            className="add-slot-btn" 
                                                            onClick={handleAddTimeSlot} 
                                                            disabled={offerTimeSlots.length >= maxOfferTimes}
                                                        >
                                                            إضافة موعد
                                                        </button>
                                                    </div>
                                                    
                                                    {selectedDate && new Date(selectedDate) < new Date() && (
                                                        <p className="error-message">الرجاء اختيار   تاريخ مستقبلي.</p>
                                                    )}
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
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <div className={`tab ${currentTab === 3 ? 'active' : ''}`}>
                        <h2>الدفع</h2>
                        {currentTab === 3 && (
                            <>
                                <div className="summary">
                                    <h3>ملخص الحجز</h3>
                                    <div className="summary-item">
                                        <span className="summary-label">نوع الخدمة:</span>
                                        <span className="summary-value">{serviceType === 'oneTime' ? 'مرة واحدة' : 'عرض'}</span>
                                    </div>
                                    
                                    {serviceType === 'oneTime' && (
                                        <>
                                            <div className="summary-item">
                                                <span className="summary-label">التاريخ:</span>
                                                <span className="summary-value">{selectedDate}</span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="summary-label">الفترة:</span>
                                                <span className="summary-value">
                                                    {selectedMorningTime ? 'صباحية' : ''} 
                                                    {selectedMorningTime && selectedAfternoonTime ? ' و ' : ''}
                                                    {selectedAfternoonTime ? 'مسائية' : ''}
                                                </span>
                                            </div>
                                            {selectedMorningTime && !selectedAfternoonTime && (
                                                <div className="summary-item">
                                                    <span className="summary-label">ساعات إضافية صباحية:</span>
                                                    <span className="summary-value">{morningExtraHours || 0}</span>
                                                </div>
                                            )}
                                            {selectedAfternoonTime && !selectedMorningTime && (
                                                <div className="summary-item">
                                                    <span className="summary-label">ساعات إضافية مسائية:</span>
                                                    <span className="summary-value">{afternoonExtraHours || 0}</span>
                                                </div>
                                            )}
                                            <div className="summary-item">
                                                <span className="summary-label">عدد عمال النظافة:</span>
                                                <span className="summary-value">{numberOfCleaners}</span>
                                            </div>
                                        </>
                                    )}
                                    
                                    {serviceType === 'offer' && selectedOfferData && (
                                        <>
                                            <div className="summary-item">
                                                <span className="summary-label">العرض المحدد:</span>
                                                <span className="summary-value">{selectedOfferData.label}</span>
                                            </div>
                                            {offerTimeSlots.length > 0 && (
                                                <div className="summary-item slots-summary">
                                                    <span className="summary-label">المواعيد المحددة:</span>
                                                    <div className="summary-value slots-list">
                                                        {offerTimeSlots.map((timeSlot, index) => (
                                                            <div key={index} className="slot-item">
                                                                {timeSlot.date} - {timeSlot.timeSlot}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    
                                    <div className="total-price">
                                        <span className="total-label">المجموع الكلي:</span>
                                        <span className="total-value">{totalPrice} AED</span>
                                    </div>
                                </div>

                                <div className="payment-info">
                                    <h3>معلومات بطاقة الائتمان</h3>
                                    <div className="card-container">
                                        <div className="form-group">
                                            <label>رقم البطاقة:</label>
                                            <input 
                                                type="text" 
                                                placeholder="رقم البطاقة" 
                                                className="card-input"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                            />
                                        </div>
                                        
                                        <div className="card-row">
                                            <div className="form-group half">
                                                <label>تاريخ الانتهاء:</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="MM/YY" 
                                                    className="card-input"
                                                    inputMode="numeric"
                                                />
                                            </div>
                                            <div className="form-group half">
                                                <label>رمز التحقق (CVV):</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="CVV" 
                                                    className="card-input"
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                    maxLength={4}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label>اسم حامل البطاقة:</label>
                                            <input 
                                                type="text" 
                                                placeholder="الاسم كما يظهر على البطاقة" 
                                                className="card-input"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="navigation">
                {currentTab == 0 &&  (
                          <LogoutButton text="تسجيل الخروج" />
                    )}
                    {currentTab > 0 && (
                        <button className="btn-prev" onClick={handlePrev}>
                            <span className="btn-icon">→</span>
                            <span className="btn-text">رجوع</span>
                        </button>
                    )}
                    {currentTab < 3 ? (
                        <button className="btn-next" onClick={handleNext}>
                            <span className="btn-text">التالي</span>
                            <span className="btn-icon">←</span>
                        </button>
                    ) : (
                        <button className="btn-confirm" onClick={handleConfirm}>تأكيد</button>
                    )}
                </div>
            </div>
            <style jsx>{`
                /* Base Styles */
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