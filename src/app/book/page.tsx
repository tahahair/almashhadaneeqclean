"use client"
// pages/index.tsx
import { useState, useEffect, useRef   } from 'react';
import { useRouter } from "next/navigation";
import Script from 'next/script';
import CheckoutPage from "../components/CheckoutPage";
 import {  Menu, Shield, Home, Users, FileText,  Award, Clock, Star, ChevronDown, ChevronLeft , ChevronRight, Check, CalendarDays, User, AlertCircle } from 'lucide-react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from 'next/image';

 if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
   throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
 }
 const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


// Language content configuration
const content = {
  en: {
    direction: "ltr",
    meta: {
      title: "Cleaning Service Booking | Elegant Scene",
      description: "Book your cleaning service with Elegant Scene"
    },
    header: {
      home: "Home",
      about: "About Us",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      guarantee: "Golden Guarantee"
    },
    hero: {
      title: "Book a Cleaning Service",
      subtitle: "Easy booking in just a few steps"
    },
    bookingDetails: {
        serviceTitle: "Deep Cleaning Service",
        ratingText: "(679k reviews)",
        workersQuestion: "How many workers do you need?",
        hoursQuestion: "How many hours should they stay?",
        hoursRecommended: "Best Seller",
        serviceFrequencyQuestion: "What is the required cleaning frequency?",
        oneTimeVisit: "One-Time Visit",
        oneTimeVisitDescription: "Book a one-time cleaning session",
        bronzeOffer: "Bronze Offer",
        bronzeOfferDiscount: "15% Off per visit",
        bronzeOfferDescription1: "Includes one visit per week for 4 hours",
        bronzeOfferDescription2: "One cleaner and 4 visits per month",
        bronzeOfferDescription3: "Total hours per month is 16",
        bronzeOfferDescription4: "Additional charges apply for extra hours and workers",
        silverOffer: "Silver Offer",
        silverOfferDiscount: "16% Off per visit",
        silverOfferDescription1: "Includes two visits per week for 8 hours",
        silverOfferDescription2: "One cleaner and 8 visits per month",
        silverOfferDescription3: "Total hours per month is 32",
        silverOfferDescription4: "Additional charges apply for extra hours and workers",
        goldOffer: "Gold Offer",
        goldOfferBestSeller: "Best Seller",
        goldOfferDescription1: "Includes 3 visits per week for 12 hours",
        goldOfferDescription2: "One cleaner and 12 visits per month",
        goldOfferDescription3: "Total hours per month is 48",
        goldOfferDescription4: "Additional charges apply for extra hours and workers",
        whyChooseUsTitle: "Why Choose Our Services?",
        qualityGuarantee: "100% Quality Guarantee",
        professionalTeam: "Professional and Qualified Team",
        punctuality: "Punctuality Commitment",
        customerRating: "4.9/5 Customer Rating"
    },
    locationSelection: {
        title: "Location Selection",
        searchPlaceholder: "Search for a location on the map...",
        selectedLocationLabel: "Selected Location:",
        cityLabel: "City:",
        buildingApartmentLabel: "Building Name and Apartment Number:",
        buildingApartmentPlaceholder: "Building name, apartment number..."
    },
    userInfo: {
        title: "User Information",
        nameLabel: "Name:",
        namePlaceholder: "First Name Last Name",
        phoneLabel: "Phone Number:",
        phonePlaceholder: "050 123 4567"
    },
    dateTimePayment: {
        title: "Date, Time & Payment",
        chooseArrivalTime: "Choose Arrival Time",
        monthLabel: "Month",
        preferredArrivalTime: "Preferred Arrival Time",
        serviceTime: "Service Time:",
        bookingSummaryTitle: "Booking Summary",
        bookingType: "Booking Type",
        numberOfWorkers: "Number of Workers",
        numberOfHours: "Number of Hours",
        location: "Location",
        arrivalTime: "Arrival Time",
        date: "Date",
        totalPrice: "Total Price",
        creditCardInfo: "Credit Card Information",
        selectDateAndTimeMessage: "Please select the date and time to complete the payment.",
        importantAlertTitle: "Important Alert:",
        importantAlertMessage: "Our appointments are filling up quickly! Customers book their appointments 3-5 days in advance." ,
        contactCustomerService: "Customer service will contact you to confirm upcoming appointments"

    },
    summary: {
        bookingSummary: "Booking Summary"
    },
    button: {
        next: "Next",
        previous: "Previous",
        back: "Back",
        confirmBooking: "Confirm Booking"
    },
    alert: {
        locationNotesRequired: "Please enter building name and apartment number.",
        citySelectionRequired: "Please select a city within our service area (Dubai, Ajman, Sharjah, Umm Al Quwain).",
        enterPersonalInfo: "Please enter your personal information.",
        invalidPhoneNumber: "Please enter a valid phone number.",
        invalidName: "Please enter a valid name."

    },
    timeSlots: {
        morning: "Morning Period 11:00 AM - 11:30 AM",
        evening: "Evening Period 4:00 PM - 4:30 PM",
        availableLimitedTime: "Available for a limited time",
        workersRemaining: "Only {workerCount} workers remaining!",
        allWorkersBooked: "All workers are booked",
        unavailableForBooking: "Unavailable for booking",
        serviceTimeSelected: "Service time selected:",
        contactForOffers: "Customer service will contact you to confirm upcoming appointments"

    },
    daysOfWeek: [ 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'] ,
    monthsOfYear: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
    dayNames: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    serviceAreaText: "We serve you across all Emirates of the country | A licensed company"


  },
  ar: {
    direction: "rtl",
    meta: {
      title: "خدمة حجز التنظيف | المشهد الأنيق",
      description: "احجز خدمة التنظيف الخاصة بك مع المشهد الأنيق"
    },
    header: {
      home: "الرئيسية",
      about: "من نحن",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      guarantee: "الضمان الذهبي"
    },
    hero: {
      title: "احجز خدمة تنظيف",
      subtitle: "حجز سهل بخطوات بسيطة"
    },
    bookingDetails: {
        serviceTitle: "خدمة التنظيف العميق",
        ratingText: "(679k تقييم)",
        workersQuestion: "كم عدد العمال المطلوب؟",
        hoursQuestion: "كم عدد الساعات التي يجب أن يبقوا فيها؟",
        hoursRecommended: "الأكثر مبيعاً",
        serviceFrequencyQuestion: "ما هو معدل تكرار التنظيف المطلوب؟",
        oneTimeVisit: "زيارة واحدة",
        oneTimeVisitDescription: "حجز جلسة تنظيف لمرة واحدة",
        bronzeOffer: "العرض البرونزي",
        bronzeOfferDiscount: "خصم 15% لكل زيارة",
        bronzeOfferDescription1: "يشمل العرض زيارة واحدة أسبوعياً لمدة 4 ساعات",
        bronzeOfferDescription2: "عاملة تنظيف واحدة و 4 زيارات في الشهر",
        bronzeOfferDescription3: "إجمالي عدد الساعات هو 16 شهرياً",
        bronzeOfferDescription4: "يتم تطبيق رسوم إضافية على الساعات والعمال الإضافيين",
        silverOffer: "العرض الفضي",
        silverOfferDiscount: "خصم 16% لكل زيارة",
        silverOfferDescription1: "يشمل العرض زيارتين أسبوعياً لمدة 8 ساعات",
        silverOfferDescription2: "عاملة تنظيف واحدة و 8 زيارات في الشهر",
        silverOfferDescription3: "إجمالي عدد الساعات هو 16 شهرياً",
        silverOfferDescription4: "يتم تطبيق رسوم إضافية على الساعات والعمال الإضافيين",
        goldOffer: "العرض الذهبي",
        goldOfferBestSeller: "الأكثر مبيعاً",
        goldOfferDescription1: "يشمل العرض 3 زيارات أسبوعياً لمدة 12 ساعة",
        goldOfferDescription2: "عاملة تنظيف واحدة و 12 زيارة في الشهر",
        goldOfferDescription3: "إجمالي عدد الساعات هو 48 شهرياً",
        goldOfferDescription4: "يتم تطبيق رسوم إضافية على الساعات والعمال الإضافيين",
        whyChooseUsTitle: "لماذا تختار خدماتنا؟",
        qualityGuarantee: "ضمان الجودة 100%",
        professionalTeam: "فريق محترف ومؤهل", 
        punctuality: "التزام بالمواعيد",
        customerRating: "تقييم 4.9/5 من العملاء"
    },
    locationSelection: {
        title: "اختيار الموقع",
        searchPlaceholder: "ابحث عن موقع على الخريطة...",
        selectedLocationLabel: "الموقع المختار:",
        cityLabel: "المدينة:",
        buildingApartmentLabel: "اسم البناء ورقم الشقة:",
        buildingApartmentPlaceholder: "اسم البناء, رقم الشقة..."
    },
    userInfo: {
        title: "معلومات المستخدم",
        nameLabel: "الاسم:",
        namePlaceholder: "الاسم الأول اسم العائلة",
        phoneLabel: "رقم الهاتف:",
        phonePlaceholder: "050 123 4567"
    },
    dateTimePayment: {
        title: "التاريخ, الوقت و الدفع",
        chooseArrivalTime: "اختر وقت الوصول",
        monthLabel: "الشهر",
        preferredArrivalTime: "وقت الوصول المفضل",
        serviceTime: "وقت الخدمة:",
        bookingSummaryTitle: "ملخص الحجز",
        bookingType: "نوع الحجز",
        numberOfWorkers: "عدد العمال",
        numberOfHours: "عدد الساعات",
        location: "الموقع",
        arrivalTime: "وقت الوصول",
        date: "التاريخ",
        totalPrice: "السعر الإجمالي",
        creditCardInfo: "معلومات بطاقة الائتمان",
        selectDateAndTimeMessage: " الرجاء تحديد التاريخ والوقت لإكمال عملية الدفع.",
        importantAlertTitle: "تنبيه هام:",
        importantAlertMessage: "مواعيدنا تنفذ بسرعة! عملاؤنا يحجزون مواعيدهم قبل 3-5 أيام مقدماً.",
        contactCustomerService: "سيتم التواصل معاكم من قبل خدمة العملاء لتثبيت المواعيد القادمة"

    },
    summary: {
        bookingSummary: "ملخص الحجز"
    },
    button: {
        next: "التالي",
        previous: "رجوع",
        back: "رجوع",
        confirmBooking: "تأكيد الحجز"
    },
    alert: {
        locationNotesRequired: "الرجاء إدخال اسم البناء وؤقم الشقة .",
        citySelectionRequired: "الرجاء اختيار مدينة ضمن الخدمة دبي عجمان الشارقة ام القيوين",
        enterPersonalInfo: "الرجاء إدخال معلوماتك الشخصية",
        invalidPhoneNumber: "الرجاء إدخال رقم هاتف صحيح",
        invalidName: "الرجاء إدخال اسم صحيح."
    },
    timeSlots: {
        morning: "الفترة الصباحية من 11:00-11:30 الى 15:00-15:30",
        evening: "الفترة المسائية من 16:00-16:30 الى 20:00-20:30",
        availableLimitedTime: "متاح لفترة محدودة",
        workersRemaining: "متبقي {workerCount} عمال فقط!",
        allWorkersBooked: "تم حجز جميع العمال",
        unavailableForBooking: "غير متاح للحجز",
        serviceTimeSelected: "تم اختيار موعد الخدمة:",
        contactForOffers: "سيتم التواصل معاكم من قبل خدمة العملاء لتثبيت المواعيد القادمة"
    },
    daysOfWeek: [ 'السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
    monthsOfYear: [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
      ],
      dayNames: ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
      serviceAreaText: "نخدمك في كل إمارات الدولة | شركة مرخصة "
  }
};


// Menu items with icons
const menuItems = [
  { key: 'home', path: '/', icon: Home },
  { key: 'about', path: '/about', icon: Users },
  { key: 'privacy', path: '/privacy', icon: FileText },
  { key: 'terms', path: '/terms', icon: Shield },
  { key: 'guarantee', path: '/guarantee', icon: Award },
];
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
  const [basePrice, setBasePrice] = useState(85);
  const [workers, setWorkers] = useState(1);
  const [serviceType, setServiceType] = useState< string>('one-time');
const [totalPrice, setTotalPrice] = useState(85);
const [selectedCity, setSelectedCity] = useState("");









// إعادة تعيين حقول النموذج


const [loading, setLoading] = useState<boolean>(false);

const [locationUrl, setLocationUrl] = useState("");

const [currentTab, setCurrentTab] = useState(0);

 const calculateTotalPrice = ({hours, workers, currentBasePrice}: {hours: number; workers: number,currentBasePrice: number}) => {

    if (serviceType === 'one-time') {
        // Calculate price for one-time service
        // Example base rate per hour


        let extra = (hours - 4) * 20;

        if (hours <4) {

          extra = 0;
      }

        if (workers > 0) {

            setTotalPrice((currentBasePrice * workers) + (extra * workers));
        }

        console.log("setBasePrice", currentBasePrice);
    } else if (serviceType === 'package-4') {
      if (hours <=4 && workers === 1) {

        setTotalPrice(340);}
        else  {

            setTotalPrice((340+ (hours - 4) *4* 20)*workers);
        }
    } else if (serviceType === 'package-8') {
      if (hours <=4 && workers === 1) {

        setTotalPrice(680);}
        else  {

            setTotalPrice((680+ (hours - 4) * 8*20)*workers);
        }
    } else if (serviceType === 'package-12') {
      if (hours <=4 && workers === 1) {

        setTotalPrice(1000);}
        else  {

            setTotalPrice((1000+ (hours - 4) * 12*20)*workers);
        }
    }
};

useEffect(() => {
  if (currentTab === 3) {
window.scrollTo({
  top: document.body.scrollHeight,
  behavior: 'smooth',

});}
}, [currentTab,loading]);

const [isStripeReady, setIsStripeReady] = useState(false);

useEffect(() => {
  stripePromise.then(() => setIsStripeReady(true));
}, []);

useEffect(() => {
    console.log("totalPrice useeffect", totalPrice);
    console.log("calculateTotalPrice", selectedCity);
    let newBasePrice = 0; // Declare newBasePrice here
        if (selectedCity === 'Dubai') {
            newBasePrice = 100;
        } else {
            newBasePrice = 85;
        }

        setBasePrice(newBasePrice);
}, [ serviceType, workers, hours, locationUrl,basePrice]);

useEffect(() => {
  console.log("useEffect for totalPrice triggered - basePrice:", basePrice, "workers:", workers, "hours:", hours);
  calculateTotalPrice({ hours, workers,currentBasePrice: basePrice}); // Pass basePrice here
}, [basePrice, workers, hours,serviceType,locationUrl]); // Run when basePrice, workers, or hours change

const [showSummaryDetails, setShowSummaryDetails] = useState(false);
    // Get current language content based on the lang state
 
    const [lang, setLang] = useState<"AR" | "EN">(() => {
      if (typeof window !== "undefined") {
        const storedValue = localStorage.getItem("lang");
        if (storedValue === "AR" || storedValue === "EN") {
          return storedValue as "AR" | "EN"; // استخدم القيمة المخزنة
        }
      }
      return "AR"; // القيمة الافتراضية
    });

    useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("lang", lang); // تحديث التخزين عند تغيير اللغة
      }
    }, [lang]); // تحديث فقط عند تغيير `lang`
  
   
  
    const t = lang === "EN" ? content.en : content.ar;
    

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
          <h3 className="text-xl font-bold text-center text-gray-800 border-b pb-2">{t.summary.bookingSummary}</h3>
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

                setTotalPrice(85);
                setBasePrice(85);
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
          <div >
   <div className="border-b pb-3 mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">{t.bookingDetails.serviceTitle}</h1>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-gray-600">{t.bookingDetails.ratingText}</span>
            <span className="font-semibold">4.8/5</span>
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          </div>
        </div>
      </div>


      <div className="mb-6">
        <h2 className="text-lg font-semibold  mb-3">{t.bookingDetails.workersQuestion}</h2>
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
  <h2 className="text-lg font-semibold   mb-3">{t.bookingDetails.hoursQuestion}</h2>
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


        {/* علامة الصح عند الاختيار */}
        {hours === h &&   t.direction === "rtl" && (
          <div className="absolute -top-2 -left-2 bg-teal-500 text-white text-xs p-1 rounded-full w-6 h-6 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
           {/* علامة الصح عند الاختيار */}
           {hours === h &&   t.direction === "ltr" && (
          <div className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs p-1 rounded-full w-6 h-6 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {/* العلامة الموصى بها */}
        {hours === h && h === 4 && t.direction === "rtl" && (
          <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-md">
           {t.bookingDetails.hoursRecommended}
          </div>
        )}
         {hours === h && h === 4 && t.direction === "ltr" && (
          <div className="absolute -top-2 -left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-md">
           {t.bookingDetails.hoursRecommended}
          </div>
        )}
      </button>
    ))}
  </div>
</div>

{/* Service frequency */}
<div className="mb-6">
  <h2 className="text-xl font-bold  mb-4">{t.bookingDetails.serviceFrequencyQuestion}</h2>
  <div className="space-y-6">
    {/* زيارة واحدة */}
    <div
      className={`rounded-lg border-2 p-5 cursor-pointer transition-all duration-300 hover:shadow-md ${
        serviceType === 'one-time' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => handleserviceTypeSelect('one-time')}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="font-bold text-gray-800 text-lg">{t.bookingDetails.oneTimeVisit}</div>
        {serviceType === 'one-time' && <Check className="w-6 h-6 text-teal-600" />}
      </div>
      <div className="flex items-center text-gray-700 mt-3">
        <CalendarDays className="w-5 h-5 text-teal-600 ml-2 flex-shrink-0" />
        <div>{t.bookingDetails.oneTimeVisitDescription}</div>
      </div>
    </div>

    {/* العرض البرونزي */}
    <div
      className={`rounded-lg border-2 p-5 cursor-pointer relative transition-all duration-300 hover:shadow-md ${
        serviceType === 'package-4' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => handleserviceTypeSelect('package-4')}
    >
      <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
        {t.bookingDetails.bronzeOfferDiscount}
      </div>
      <div className="flex justify-between items-center mb-3">
        <div className="font-bold text-gray-800 text-lg">{t.bookingDetails.bronzeOffer}</div>
        {serviceType === 'package-4' && <Check className="w-6 h-6 text-teal-600" />}
      </div>

      <div className="space-y-2 mt-3">
        <div className="flex items-center text-gray-700">
          <CalendarDays className="w-5 h-5 text-teal-600 ml-2 flex-shrink-0" />
          <div>{t.bookingDetails.bronzeOfferDescription1}</div>
        </div>

        <div className="flex items-center text-gray-700">
          <User className="w-5 h-5 text-teal-600 ml-2 flex-shrink-0" />
          <div>{t.bookingDetails.bronzeOfferDescription2}</div>
        </div>

        <div className="flex items-center text-gray-700">
          <Clock className="w-5 h-5 text-teal-600 ml-2 flex-shrink-0" />
          <div>{t.bookingDetails.bronzeOfferDescription3}</div>
        </div>

        <div className="flex items-center text-gray-700">
          <AlertCircle className="w-5 h-5 text-orange-500 ml-2 flex-shrink-0" />
          <div>{t.bookingDetails.bronzeOfferDescription4}</div>
        </div>
      </div>
    </div>

    {/* العرض الفضي */}
    <div
      className={`rounded-lg border-2 p-5 cursor-pointer relative transition-all duration-300 hover:shadow-md ${
        serviceType === 'package-8' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => handleserviceTypeSelect('package-8')}
    >
      <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
        {t.bookingDetails.silverOfferDiscount}
      </div>
      <div className="flex justify-between items-center mb-3">
        <div className="font-bold text-gray-800 text-lg">{t.bookingDetails.silverOffer}</div>
        {serviceType === 'package-8' && <Check className="w-6 h-6 text-teal-600" />}
      </div>

      <div className="space-y-2 mt-3">
        <div className="flex items-center text-gray-700">
          <CalendarDays className="w-5 h-5 text-teal-600 ml-2 flex-shrink-0" />
          <div>{t.bookingDetails.silverOfferDescription1}</div>
        </div>

        <div className="flex items-center text-gray-700">
          <User className="w-5 h-5 text-teal-600 ml-2 flex-shrink-0" />
          <div>{t.bookingDetails.silverOfferDescription2}</div>
        </div>

        <div className="flex items-center text-gray-700">
          <Clock className="w-5 h-5 text-teal-600 ml-2 flex-shrink-0" />
          <div>{t.bookingDetails.silverOfferDescription3}</div>
        </div>

        <div className="flex items-center text-gray-700">
          <AlertCircle className="w-5 h-5 text-orange-500 ml-2 flex-shrink-0" />
          <div>{t.bookingDetails.silverOfferDescription4}</div>
        </div>
      </div>
    </div>

    {/* العرض الذهبي */}
    <div
      className={`rounded-lg border-2 p-5 cursor-pointer relative transition-all duration-300 hover:shadow-md ${
        serviceType === 'package-12' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => handleserviceTypeSelect('package-12')}
    >
      <div className="absolute -top-3 -right-3 bg-orange-500 text-white px-3 py-1 rounded-full font-bold shadow-lg animate-bounce">
        {t.bookingDetails.goldOfferBestSeller}
      </div>
      <div className="flex justify-between items-center mb-3">
        <div className="font-bold text-gray-800 text-lg">{t.bookingDetails.goldOffer}</div>
        {serviceType === 'package-12' && <Check className="w-6 h-6 text-teal-600" />}
      </div>

      <div className="space-y-2 mt-3">
        <div className="flex items-center text-gray-700">
          <CalendarDays className="w-5 h-5 text-teal-600 ml-2 flex-shrink-0" />
          <div>{t.bookingDetails.goldOfferDescription1}</div>
        </div>

        <div className="flex items-center text-gray-700">
          <User className="w-5 h-5 text-teal-600 ml-2 flex-shrink-0" />
          <div>{t.bookingDetails.goldOfferDescription2}</div>
        </div>

        <div className="flex items-center text-gray-700">
          <Clock className="w-5 h-5 text-teal-600 ml-2 flex-shrink-0" />
          <div>{t.bookingDetails.goldOfferDescription3}</div>
        </div>

        <div className="flex items-center text-gray-700">
          <AlertCircle className="w-5 h-5 text-orange-500 ml-2 flex-shrink-0" />
          <div>{t.bookingDetails.goldOfferDescription4}</div>
        </div>
      </div>
    </div>
  </div>
</div>
         

         <div  className="bg-blue-50 p-4 rounded-lg mb-6">
           <h3 className="text-lg font-semibold  mb-2">{t.bookingDetails.whyChooseUsTitle}</h3>
           <ul className="space-y-2">
             <li className="flex justify-start items-center gap-2">
             <Shield className="text-blue-600" size={18} />
               <span>{t.bookingDetails.qualityGuarantee}</span>
               
             </li>
             <li className="flex justify-start  items-center gap-2">
             <Award className="text-blue-600" size={18} />
               <span>{t.bookingDetails.professionalTeam}</span>
              
             </li>
             <li className="flex justify-start items-center gap-2">
             <Clock className="text-blue-600" size={18} />
               <span>{t.bookingDetails.punctuality}</span>
            
             </li>
             <li className="flex justify-start items-center gap-2">
             <Star className="text-yellow-500" size={18} />
               <span>{t.bookingDetails.customerRating}</span>
           
             </li>
           </ul>
         </div>

       </div>
     );
   };


    // All state declarations remain the same
    const [user, setUser] = useState<{ name: string; phone: string; phoneVerified: boolean } | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    console.log("mapLoaded", mapLoaded);
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [addressDetails, setAddressDetails] = useState("");
    const [locationNotes, setLocationNotes] = useState("");
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<google.maps.Map | null>(null);
    const markerRef = useRef<google.maps.Marker | null>(null)
    const router = useRouter();



    // States for Time and Offer Selection remain the same
    const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');

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
    alert("Failed to fetch reservations. Please try again later.");
  } finally {
    setLoading(false);
  }
};


    // States for offer times remain the same
    const [offerTimeSlots, setOfferTimeSlots] = useState<OfferTimeSlot[]>([]);
    let items: string[] = [];
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
console.log("selectedTimeSlot", selectedTimeSlot);
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
    console.log("selectedOfferData", selectedOfferData);
    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
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
        controlUI.title = 'Current Location';
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
          input.placeholder =  t.locationSelection.searchPlaceholder;
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
      }, [currentTab, t.locationSelection.searchPlaceholder]);

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
                email:   '',  // Use email from user object
                city: selectedCity,
                address: addressDetails + "\n " + locationNotes,
                locationUrl: locationUrl,
                serviceType:
                    serviceType === 'one-time'
                        ? 'ONE_TIME'
                        : serviceType === 'package-4'
                            ? 'OFFER_4'
                            : serviceType === 'package-8'
                                ? 'OFFER_8'
                                : serviceType === 'package-12'
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
                email:  '',  // Use email from user object
                city: selectedCity,
                address: addressDetails + "\n " + locationNotes,
                locationUrl: locationUrl,
                serviceType:
                    serviceType === 'one-time'
                        ? 'ONE_TIME'
                        : serviceType === 'package-4'
                            ? 'OFFER_4'
                            : serviceType === 'package-8'
                                ? 'OFFER_8'
                                : serviceType === 'package-12'
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

                    calculateTotalPrice({ hours, workers ,currentBasePrice: 100});
                } else if (normalizedCityName.includes("sharjah") || normalizedCityName.includes("الشارقة")) {
                    setSelectedCity("Sharjah");

                    calculateTotalPrice({ hours, workers ,currentBasePrice: 85});
                } else if (normalizedCityName.includes("ajman") || normalizedCityName.includes("عجمان")) {
                    setSelectedCity("Ajman");

                    calculateTotalPrice({ hours, workers ,currentBasePrice: 85});
                } else if (normalizedCityName.includes("umm al quwain") || normalizedCityName.includes("أم القيوين")) {
                    setSelectedCity("Umm Al Quwain");

                    calculateTotalPrice({ hours, workers,currentBasePrice: 85 });
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

const loadAddress = () => {
  const storedAddress = localStorage.getItem("userAddress");
  const parsedAddress = storedAddress ? JSON.parse(storedAddress) : {};

  // Initialize with default values first
  setAddressDetails(parsedAddress.addressDetails || "");
  setLocationNotes(parsedAddress.locationNotes || "");
  setSelectedCity(parsedAddress.selectedCity || "");
  setLocationUrl(parsedAddress.locationUrl || "");

  // Only process location URL if it exists and is valid
  if (parsedAddress.locationUrl) {
    try {
      const url = new URL(parsedAddress.locationUrl);
      const params = new URLSearchParams(url.search);
      const coordinates = params.get("q");

      if (coordinates) {
        const [lat, lng] = coordinates.split(",").map(Number);

        // Only update if both coordinates are valid numbers
        if (!isNaN(lat) && !isNaN(lng)) {
          setSelectedLocation({ lat, lng });

          // Update map and marker if references exist
          if (markerRef.current && mapInstanceRef.current) {
            markerRef.current.setPosition({ lat, lng });
            mapInstanceRef.current.setCenter({ lat, lng });
          }

          getAddressFromCoordinates({ lat, lng });
        }
      }
    } catch (error) {
      console.error("Error processing saved address:", error);
      // Optionally clear invalid location URL
      setLocationUrl("");
    }
  }
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
            alert(t.alert.enterPersonalInfo);
            return;
          }

if (user?.phone.substring(0, 2) !== "05") {
  alert(t.alert.invalidPhoneNumber);
  return;
}
          if (user?.phone.length !== 10) {
            alert(t.alert.invalidPhoneNumber);
            return;
          }

          if (user?.name.length < 3) {
            alert(t.alert.invalidName);
            return;
          }
          if (user?.name.length > 50) {
            alert(t.alert.invalidName);
            return;
          }
          if (user?.name.indexOf(" ") === -1) {
            alert(t.alert.invalidName);
            return;
          }
          if (user?.name.indexOf("  ") !== -1) {
            alert(t.alert.invalidName);
            return;
          }
          if (user?.name.split(" ").length < 2)  {
            alert(t.alert.invalidName);
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
                email:   '',  // Use email from user object
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
              console.log("errorData", errorData);
              if (errorData.error?.includes("Unique")) {
                console.log("Unique");
              }
              else {
                alert(`Error confirming booking: ${errorData.error || 'Unknown error'}`);
                console.error('API Error:', errorData);

                return;
              }

          }
        }
         catch (error) {
          alert('An error occurred while connecting to the server.');
          console.error('Fetch Error:', error);

          return;
        }


        }
        if (currentTab === 1 && (!locationNotes || locationNotes.trim() === "")) {
            alert(t.alert.locationNotesRequired);

            return;
        }

        if (currentTab === 1 && !selectedCity) {
            alert(t.alert.citySelectionRequired);
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

          let dayNames = t.dayNames;
          const today = new Date();
          today.setDate(today.getDate()+1 );
          const dayIndex = today.getDay();

          const startIndex = dayNames.indexOf(dayNames[dayIndex]);

          dayNames= [...dayNames.slice(startIndex), ...dayNames.slice(0, startIndex)]

          let monthNames = [];
          monthNames = t.monthsOfYear;


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
            monthNames= t.monthsOfYear;
            console.log("monthNames", monthNames);
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

const scrolfunction = () => {
  if (currentTab === 3) {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });}
  return true;
}

  // تحديث عرض الأيام عند تغيير بداية الأسبوع
  useEffect(() => {
    updateDisplayDays();
  }, [currentWeekStart,lang,currentTab]);

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
            <h2 className="text-xl font-bold text-center mb-4">{t.dateTimePayment.chooseArrivalTime}</h2>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center mb-2">
                <button
                  className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md"
                  onClick={goToPreviousWeek}
                  disabled={currentWeekStart <= new Date()}
                >{ lang==="AR" ?
                  <ChevronRight className="h-5 w-5" />
                  :
                  <ChevronLeft className="h-5 w-5" />

                }
                  
               
                </button>

                <h3 className="text-right font-medium">{currentMonth}</h3>

                <button
                  className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md"
                  onClick={goToNextWeek}
                >
                  { lang==="EN" ?
                  <ChevronRight className="h-5 w-5" />
                  :
                  <ChevronLeft className="h-5 w-5" />

                }


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
      const dayName = selectedDate.toLocaleDateString(lang, { weekday: "long" });
      const formattedDate = selectedDate.toLocaleDateString(lang, {
        day: "numeric",
        month: "long"
      });

      let percentage = Math.round(50.5 + ((15 - availableCleanersE) * 25 / 15) + ((15 - availableCleanersM) * 25 / 15));

      if (availableCleanersE === 0 && availableCleanersM === 0) {
        percentage = 100; // إذا كانت القيم تساوي 0، يتم ضبط النسبة إلى 100%
      }

      return `Warning: More than ${percentage}% of appointments for ${dayName} ${formattedDate} have been booked`;    })()}
  </div>
)}



            <div className="mb-8">

              <h3 className="text-lg font-semibold text-center mb-3">{t.dateTimePayment.preferredArrivalTime}</h3>

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
{ !loading && scrolfunction() && (
  <div className="max-w-2xl mx-auto">

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
          statusText = t.timeSlots.unavailableForBooking;
          statusClass = 'bg-gray-100 text-gray-500';
        } else if (!isAvailable) {
          statusText = t.timeSlots.allWorkersBooked;
          statusClass = 'bg-red-100 text-red-700';
          statusIcon = '⛔';
        } else if (workerCount <= 3) {
          statusText = t.timeSlots.workersRemaining.replace("{workerCount}", String(workerCount)) ;
          statusClass = 'bg-yellow-100 text-yellow-700 animate-pulse';
          statusIcon = '⚠️';
        } else {
          statusText = t.timeSlots.availableLimitedTime;
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
            {isSelected && scrolfunction() && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {scrolfunction()}
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
          {t.timeSlots.serviceTimeSelected} <strong>{selectedTime}</strong>
        </p>
        { serviceType !== 'one-time' && (


<div className="offer-time-slots">
<h3> {t.timeSlots.contactForOffers} </h3>


</div>
        )

        }
      </div>
    )}
   
  </div>
)}


            </div>
            {scrolfunction()}
          </div>
        );
      };



    const testfunc = (): boolean => {
      scrolfunction()
      console.log("tester value", selectedTime);

      if (selectedTime && selectedDate) {
        return true;
      }
      return false;


    };

  // Progress indicator component to show which step the user is on
const ProgressIndicator = () => {

  const steps = [t.bookingDetails.serviceTitle, t.locationSelection.title, t.userInfo.title, t.dateTimePayment.title];


  return (
    <div className="progress-container" dir={t.direction || "ltr"}>
      <div className="progress-bar">
        {/* Add the progress fill based on current step */}
        <div 
          className="progress-fill" 
          style={{ width: `${(currentTab / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>
      
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`progress-step ${currentTab >= index ? 'active' : ''} ${currentTab === index ? 'current' : ''}`}
            onClick={() => index < currentTab && setCurrentTab(index)}
            title={step} // Add title for accessibility
          >
            <div className="step-circle">
              {currentTab > index ? (
                <div className="step-check">✓</div>
              ) : (
                <div className="step-number">{index + 1}</div>
              )}
            </div>
            <div   className="text-xs text-gray-500 text-center transition-all duration-300 max-w-[1000px]  text-ellipsis whitespace-nowrap"
            >{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
};


  const [currentPath, setCurrentPath] = useState('/');
  const [showMenu, setShowMenu] = useState(false); // Add this line to define showMenu state


  const isRTL = lang === "AR";
  const isLTR = lang === "EN";

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.menu-container') && !target.closest('.menu-button')) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle menu
  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  // Navigation
  const navigateTo = (path: string) => {
    router.push(path);
    setCurrentPath(path);
    setShowMenu(false);
  };
     return (

       <div className={`${isRTL ? "rtl" : ""} ${isLTR ? "ltr" : ""}`} dir={t.direction}>
   <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white p-1 relative overflow-hidden z-50">
           <div className="absolute inset-0 opacity-10" />
           <div className={`max-w-7xl mx-auto flex items-center justify-center`}>
             <div className="overflow-hidden relative w-full">
               <p className={`text-center ${isRTL ? "mt-1 text-[90%] " : "mt-2 text-[65%] "}    md:text-[70%] lg:text-[70%] font-bold mr-4`}>
                 {isRTL ? (
                   <>
                     <span className="inline-flex items-center">
                     {t.serviceAreaText}
                       <Image src="/arabic.png" alt="Flag of the United Arab Emirates" width={12} height={12} className="mr-2" />

                     </span>
                   </>
                 ) : (
                   <>
                     <span className="inline-flex items-center text-[105%] mb-2">
                       {t.serviceAreaText}
                       <Image src="/arabic.png" alt="Flag of the United Arab Emirates" width={12} height={12} className="ml-2 " />
                     </span>
                   </>
                 )}
               </p>
             </div>
           </div>
         </div>

       {/* Header - Simple design with logo left and menu right */}
            <header dir="ltr" className="bg-white sticky top-0 z-40 border-b shadow-sm">
              <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                  {/* Logo on the left */}
                  <div className="flex items-center">
                    <div className="order-first">
                      <img
                        onClick={() => navigateTo('/')}
                        src="/logo.png"
                        alt={isRTL ? "المشهد الأنيق" : "Elegant Scene"}
                        className="h-12 cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="flex items-center cursor-pointer"
             onClick={() => window.open('https://wa.me/+971553465021', '_blank')}>
          <div className="mr-2">
            {/* WhatsApp Icon in SVG format */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <span className={`font-medium text-sm ${isRTL ? "mr-1" : "ml-1"}`}>
            {isRTL ? "اتصل بنا" : "Contact Us"}
          </span>
        </div>
                  {/* Language and menu button on the right */}
                  <div className="flex items-center gap-3">
                    <div className="flex gap-3 mr-2">
                      {['EN', 'AR'].map((langCode) => {
                        const langKey = langCode.toUpperCase() as keyof typeof langImages;
                        return (
                          <button
                            key={langCode}
                            onClick={() => setLang(langCode as "AR" | "EN")}
                            className={`relative rounded-full overflow-hidden w-8 h-8 ${
                              lang === langCode ? 'ring-2 ring-gray-400' : 'opacity-70 hover:opacity-100'
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
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg menu-button"
                      onClick={handleMenuToggle}
                    >
                      <Menu className="w-6 h-6 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Simplified Menu */}
                {showMenu && (
                  <nav className="menu-container">
                    <div className="absolute right-2 w-64 z-50 mt-2">
                      <ul className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                        {menuItems.map((item, index) => {
                          const Icon = item.icon;
                          const isActive = currentPath === item.path;

                          return (
                            <li key={item.key}>
                              <button
                                onClick={() => navigateTo(item.path)}
                                className={`w-full text-right py-3 px-4 transition-colors ${
                                  isActive
                                    ? 'bg-gray-100 text-gray-900 font-medium'
                                    : 'hover:bg-gray-50 text-gray-700'
                                } ${index !== 0 ? 'border-t border-gray-100' : ''}`}
                              >
                                <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row-reverse'}`}>
                                  <Icon className={`h-4 w-4 ${isRTL ? 'ml-3' : 'ml-3'} ${
                                    isActive ? 'text-gray-700' : 'text-gray-500'
                                  }`} />
                                  <span>
                                    {t.header[item.key as keyof typeof t.header]}
                                  </span>
                                </div>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </nav>
                )}
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
                        <h2>{t.locationSelection.title}</h2>
                        {(currentTab === 1 )  && (
            <>


      <div  className="location-container">


                              <div className="map-container" ref={mapRef}></div>

                              <label>{t.locationSelection.selectedLocationLabel}</label>
                                  <textarea
                                      value={addressDetails + "\n " + locationUrl}
                                       rows={1}
                                      readOnly
                                  />

                              <div className="form-group">
                                  <label>{t.locationSelection.cityLabel}</label>
                                  <input type="text" value={selectedCity} readOnly />



                                  <label>{t.locationSelection.buildingApartmentLabel}</label>
                                  <textarea
                                      value={locationNotes}
                                      onChange={(e) => setLocationNotes(e.target.value)}
                                      placeholder={t.locationSelection.buildingApartmentPlaceholder}
                                      rows={3}
                                  />


                              </div>
                              </div>


          </>
            )}



                    </div>

                    <div className={`tab ${currentTab === 2 ? 'active' : ''}`}>


                    <h2>{t.userInfo.title}</h2>

                            <div className="form-group">
                                <label>{t.userInfo.nameLabel}</label>
                                <input  placeholder={t.userInfo.namePlaceholder}  value={ user?.name || name}  onChange={(e) => {
                                    if (user) {
                                        user.name = e.target.value;
                                    }
                                    setName(e.target.value);
                                    handleSave();
                                }} />
                                <label>{t.userInfo.phoneLabel}</label>
                                <input type="tel" placeholder={t.userInfo.phonePlaceholder}  value={user?.phone || phone}   onChange={(e) => {
                                    if (user) {
                                        user.phone = e.target.value;
                                    }

                                    setPhone(e.target.value);
                                    handleSave();
                                }}     />


                            </div>


                    </div>

                    <div className={`tab ${currentTab === 3 ? 'active' : ''}`}>
                        <h2>{t.dateTimePayment.title}</h2>

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
                <strong>{t.dateTimePayment.importantAlertTitle}</strong> {t.dateTimePayment.importantAlertMessage}
            </div>
            
        </div>
                        {renderDateTimeSelection()}



                        {currentTab === 3 && (
                            <div className="form-group">

 

                                {serviceType != 'one-time' && (
                                    <>


                                            </>


                                )}
                            </div>
                        )}







                        {testfunc() ? (
                          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => { setSelectedTime("");}}
            >
              ✖
            </button>

            <div className="payment-info">
              <h3 className="text-lg font-semibold mb-4">
                {t.dateTimePayment.creditCardInfo}
              </h3>

            {!isStripeReady ? (
            <div className="flex justify-center items-center h-40">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
            </div>
          ) : (
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: totalPrice * 100,
                currency: "aed",
              }}
            >
              <CheckoutPage
                amount={totalPrice}
                language={lang.toLowerCase() as "ar" | "en"}
                bookingData={createBookingdata()}
              />
            </Elements>
          )}
            </div>
          </div>
        </div>
      

                        ) : (
                          <div className="error-message text-center mx-auto my-4 px-4 py-3 bg-red-100 border-l-4 border-red-500 rounded-md shadow-md animate-pulse max-w-md">
                          <span className="font-bold text-red-700">{t.dateTimePayment.selectDateAndTimeMessage}</span>
                        </div>
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
                <h3 className="text-lg font-bold text-gray-800 text-center">{t.summary.bookingSummary}</h3>
              </div>

              <div className="space-y-2 text-sm text-right">
              {serviceType && (
           <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium text-gray-800">
                {serviceType === 'one-time' ? t.bookingDetails.oneTimeVisit :
                 serviceType === 'package-4' ? t.bookingDetails.bronzeOffer :
                 serviceType === 'package-8' ? t.bookingDetails.silverOffer : t.bookingDetails.goldOffer}
              </span>
              <span className="text-gray-800 font-bold ">{t.dateTimePayment.bookingType}</span>
            </div>
          )}

          {workers > 0 && (
             <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-800">{workers} </span>
              <span className="text-gray-800 font-bold ">{t.dateTimePayment.numberOfWorkers}</span>
            </div>
          )}

          {hours > 0 && (
             <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">{hours} </span>
              <span className="text-gray-800 font-bold  ">{t.dateTimePayment.numberOfHours}</span>
            </div>
          )}

          {selectedCity && (
           <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 w-[40%] text-left ">{addressDetails + "\n " + locationUrl}</span>
              <span className="text-gray-800 font-bold ">{t.dateTimePayment.location}</span>
            </div>
          )}

          {selectedTime && (
           <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-800">{selectedTime}</span>
              <span className="text-gray-800 font-bold ">{t.dateTimePayment.arrivalTime}</span>
            </div>
          )}

          {date && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-800">{date}</span>
              <span className="text-gray-800 font-bold ">{t.dateTimePayment.date}</span>
            </div>
          )}

          {totalPrice > 0 && (
             <div className="flex justify-between items-center py-2 border-b border-gray-100">

{lang==="AR" ? (
                <span className="text-lg font-bold text-blue-600">{totalPrice} درهم</span>
) : (              <span className="text-lg font-bold text-blue-600">{totalPrice} AED</span>
)}
              <span className="text-gray-800 font-bold ">{t.dateTimePayment.totalPrice}</span>
            </div>
          )}


              </div>
            </div>
          )}

          {/* Fixed price bar */}
          <div className="p-4 bg-white flex justify-between items-center">
              {currentTab > 0 && (
            <button  onClick={handlePrev} className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1 text-sm">
                   <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{t.button.previous}</span>

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
              <span>{t.button.next}</span>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />

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
                .ltr .container {
                    direction: ltr;
                }
                .rtl .container {
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
                .rtl .select-field {
                    background-position: right 12px center;
                    padding-right: 30px;
                    padding-left: 12px;
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
                .rtl .checkmark {
                    margin-right: 10px;
                    margin-left: 0;
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
                .rtl .extra-hours label {
                    margin-right: 10px;
                    margin-left: 0;
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
                .rtl .summary-item {
                    justify-content: space-between;
                }
                .ltr .summary-item {
                    justify-content: space-between;
                }


                .summary-label {
                    color: #666;
                    flex: 1;
                }
                .rtl .summary-label {
                    text-align: right;
                }
                 .ltr .summary-label {
                    text-align: left;
                }


                .summary-value {
                    font-weight: 500;
                    color: #333;
                    flex: 1;
                    text-align: left;
                }
                 .rtl .summary-value {
                    text-align: left;
                }
                 .ltr .summary-value {
                    text-align: right;
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
                .rtl .navigation {
                    flex-direction: row-reverse;
                }
                 .ltr .navigation {
                    flex-direction: row;
                }


                .btn-prev,
                .btn-next,
                .btn-confirm {
                    padding: 12px 24px;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
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
        </div>
    );
};

export default TabsPage;