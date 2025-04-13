"use client"
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { ChevronRight, ChevronLeft, Calendar, Clock, MapPin, Phone, Mail, DollarSign, Users, X, Edit, ChevronDown, ChevronUp, Plus, Save, Languages } from 'lucide-react'; // Added Languages icon
import { useRouter, useSearchParams } from "next/navigation";

let golbaldate = new Date();

// --- Translation Dictionary ---
const translations = {
  en: {
    // General UI
    loadingLoginCheck: "Checking login status...",
    reservationSystemTitle: "Reservation Management System",
    editReservationTitle: "Edit Reservation",
    newBookingButton: "New Booking",
    availableWorkersInfo: "Total Available Workers:",
    workersPerPeriod: "19 workers per period (Morning/Evening)",
    previousWeek: "Previous Week",
    nextWeek: "Next Week",
    selectDatePrompt: "Please select a date to view reservations",
    loadingData: "Loading data...",
    // Table & Reservation Details
    morningPeriod: "Morning Period",
    eveningPeriod: "Evening Period",
    uncompletedReservations: "Uncompleted Reservations",
    remainingWorkers: "Remaining Workers:",
    noNewBookings: "(Cannot add new bookings)",
    noBookingsMorning: "No reservations for the morning period",
    noBookingsEvening: "No reservations for the evening period",
    noUncompletedBookings: "No uncompleted reservations",
    nameHeader: "Name",
    phoneHeader: "Phone Number",
    actionsHeader: "Actions",
    emailLabel: "Email:",
    cityLabel: "City:",
    addressLabel: "Address:",
    locationLinkLabel: "Location Link:",
    openLocation: "Open Location",
    serviceTypeLabel: "Service Type:",
    extraHoursLabel: "Extra Hours:",
    workerCountLabel: "Worker Count:",
    priceLabel: "Price:",
    currency: "AED", // Or your preferred currency symbol/code
    notAvailable: "N/A",
    confirmCall: "Confirm Call",
    // Forms
    addReservationTitle: "Add New Reservation",
    editReservationFormTitle: "Edit Reservation",
    customerNameLabel: "Customer Name*",
    phoneLabel: "Phone Number*",
    emailLabelOptional: "Email",
    cityLabelMandatory: "City*",
    addressLabelMandatory: "Address*",
    locationUrlOptional: "Location URL (Optional)",
    serviceTypeLabelForm: "Service Type",
    addDatesAndPeriods: "Add Dates and Time Periods",
    addDatePlaceholder: "Date",
    addTimePeriodPlaceholder: "Time Period",
    addButton: "Add",
    selectedDatesAndPeriods: "Selected Dates and Periods:",
    dateHeader: "Date",
    timePeriodHeader: "Time Period",
    removeButton: "Remove",
    extraHoursLabelForm: "Extra Hours",
    workerCountLabelForm: "Worker Count",
    priceLabelForm: "Price",
    cancelButton: "Cancel",
    saveChangesButton: "Save Changes",
    saveBookingButton: "Save Booking",
    // Alerts & Confirmations
    fillMandatoryFieldsError: "Please fill all mandatory fields (*)",
    selectAtLeastOneDateError: "Please select at least one date",
    fetchError: "Failed to fetch reservations. Please try again later.",
    fetchUncompletedError: "Failed to fetch uncompleted reservations. Please try again later.",
    updateCallStatusSuccess: "Reservation status updated to 'Called' successfully.",
    updateCallStatusError: "Failed to update call status. Please try again later.",
    deleteConfirm: "Are you sure you want to delete this reservation?",
    deleteSuccess: "Reservation deleted successfully.",
    deleteError: "Failed to delete reservation. Please try again later.",
    addSuccess: "Reservation added successfully.",
    editSuccess: "Reservation edited successfully.",
    addEditError: "Failed to add/edit reservation. Please try again later.",
    pastDateError: "Cannot add dates earlier than today.",
    fridayError: "Cannot add reservations on Fridays.", // Assuming Friday is the weekend
    duplicateDateError: "Cannot add the same date more than once.",
    addDateWhileEditingError: "You cannot add new dates while editing an existing multi-date reservation.",
    maxDatesError: (count: number) => `You cannot add more than ${count} dates for this offer.`,
    redirectToLogin: "Redirecting to login page...",
    // Date/Time Related
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    // Service Types
    OFFER_4: 'Offer 4 Times',
    OFFER_8: 'Offer 8 Times',
    OFFER_12: 'Offer 12 Times',
    ONE_TIME: 'One Time',
    // Time Periods
    MORNING: 'Morning',
    EVENING: 'Evening',
  },
  ar: {
    // General UI
    loadingLoginCheck: "جاري التحقق من تسجيل الدخول...",
    reservationSystemTitle: "نظام إدارة الحجوزات",
    editReservationTitle: "تعديل حجز",
    newBookingButton: "حجز جديد",
    availableWorkersInfo: "إجمالي العمال المتاحين:",
    workersPerPeriod: "19 عامل لكل فترة (صباحية/مسائية)",
    previousWeek: "الأسبوع السابق",
    nextWeek: "الأسبوع التالي",
    selectDatePrompt: "الرجاء اختيار تاريخ لعرض الحجوزات",
    loadingData: "جاري تحميل البيانات...",
    // Table & Reservation Details
    morningPeriod: "الفترة الصباحية",
    eveningPeriod: "الفترة المسائية",
    uncompletedReservations: "الحجوزات الغير مكتملة",
    remainingWorkers: "العمال المتبقين:",
    noNewBookings: "(لا يمكن إضافة حجوزات جديدة)",
    noBookingsMorning: "لا توجد حجوزات في الفترة الصباحية",
    noBookingsEvening: "لا توجد حجوزات في الفترة المسائية",
    noUncompletedBookings: "لا توجد حجوزات غير مكتملة",
    nameHeader: "الاسم",
    phoneHeader: "رقم الهاتف",
    actionsHeader: "إجراءات",
    emailLabel: "البريد الإلكتروني:",
    cityLabel: "المدينة:",
    addressLabel: "العنوان:",
    locationLinkLabel: "رابط الموقع:",
    openLocation: "فتح الموقع",
    serviceTypeLabel: "نوع الخدمة:",
    extraHoursLabel: "ساعات إضافية:",
    workerCountLabel: "عدد العمال:",
    priceLabel: "السعر:",
    currency: "درهم",
    notAvailable: "غير متوفر",
    confirmCall: "تأكيد الاتصال",
    // Forms
    addReservationTitle: "إضافة حجز جديد",
    editReservationFormTitle: "تعديل حجز",
    customerNameLabel: "اسم العميل*",
    phoneLabel: "رقم الهاتف*",
    emailLabelOptional: "البريد الإلكتروني",
    cityLabelMandatory: "المدينة*",
    addressLabelMandatory: "العنوان*",
    locationUrlOptional: "رابط الموقع (اختياري)",
    serviceTypeLabelForm: "نوع الخدمة",
    addDatesAndPeriods: "إضافة تواريخ وفترات زمنية",
    addDatePlaceholder: "التاريخ",
    addTimePeriodPlaceholder: "الفترة الزمنية",
    addButton: "إضافة",
    selectedDatesAndPeriods: "التواريخ والفترات المحددة:",
    dateHeader: "التاريخ",
    timePeriodHeader: "الفترة الزمنية",
    removeButton: "إزالة",
    extraHoursLabelForm: "ساعات إضافية",
    workerCountLabelForm: "عدد العمال",
    priceLabelForm: "السعر",
    cancelButton: "إلغاء",
    saveChangesButton: "حفظ التعديلات",
    saveBookingButton: "حفظ الحجز",
    // Alerts & Confirmations
    fillMandatoryFieldsError: "الرجاء ملء جميع الحقول الإلزامية (*)",
    selectAtLeastOneDateError: "الرجاء اختيار تاريخ واحد على الأقل",
    fetchError: "فشل في جلب الحجوزات. يرجى المحاولة مرة أخرى لاحقًا.",
    fetchUncompletedError: "فشل في جلب الحجوزات الغير مكتملة. يرجى المحاولة مرة أخرى لاحقًا.",
    updateCallStatusSuccess: "تم تحديث حالة الحجز إلى \"تم الاتصال\" بنجاح.",
    updateCallStatusError: "فشل في تحديث حالة الاتصال. يرجى المحاولة مرة أخرى لاحقًا.",
    deleteConfirm: "هل أنت متأكد من حذف هذا الحجز؟",
    deleteSuccess: "تم حذف الحجز بنجاح.",
    deleteError: "فشل في حذف الحجز. يرجى المحاولة مرة أخرى لاحقًا.",
    addSuccess: "تم إضافة الحجز بنجاح.",
    editSuccess: "تم تعديل الحجز بنجاح.",
    addEditError: (action: string) => `فشل في ${action} الحجز. يرجى المحاولة مرة أخرى لاحقًا.`,
    pastDateError: "لا يمكن إضافة تواريخ سابقة لليوم الحالي.",
    fridayError: "لا يمكن إضافة حجوزات في أيام الجمعة.",
    duplicateDateError: "لا يمكن إضافة نفس التاريخ أكثر من مرة.",
    addDateWhileEditingError: "لا يمكنك إضافة تواريخ جديدة أثناء تعديل حجز قائم متعدد التواريخ.",
    maxDatesError: (count: number) => `لا يمكنك إضافة أكثر من ${count} تواريخ لهذا العرض.`,
    redirectToLogin: "يتم التحويل إلى صفحة تسجيل الدخول...",
    // Date/Time Related
    days: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    // Service Types (Keys match the code values)
    OFFER_4: 'عرض 4 مرات',
    OFFER_8: 'عرض 8 مرات',
    OFFER_12: 'عرض 12 مرة',
    ONE_TIME: 'مرة واحدة',
    // Time Periods (Keys match the code values)
    MORNING: 'صباحي',
    EVENING: 'مسائي',
  },
};

type Language = keyof typeof translations; // 'en' | 'ar'
type TranslationKeys = keyof typeof translations.en & keyof typeof translations.ar;

// --- Service Type and Time Period Definitions (Adjusted for Translation) ---
// Keys remain constant for logic, values come from translations
const ServiceTypeKeys = ['OFFER_4', 'OFFER_8', 'OFFER_12', 'ONE_TIME'] as const;
type ServiceTypeKey = typeof ServiceTypeKeys[number];

const TimePeriodKeys = ['MORNING', 'EVENING'] as const;
type TimePeriodKey = typeof TimePeriodKeys[number];

// --- DateReader Component (No Language Change Needed Here Directly) ---
function DateReader({ setInitialDate, setCurrentDate, setRun }: {
  setInitialDate: (date: Date) => void,
  setCurrentDate: (date: Date) => void,
  setRun: (run: boolean) => void
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const dateParam = searchParams.get('date');
    let targetDate = new Date();

    if (dateParam) {
      const [day, month, year] = dateParam.split('-').map(Number);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const parsedDate = new Date(year, month - 1, day);
        if (!isNaN(parsedDate.getTime())) {
          targetDate = parsedDate;
        }
      }
    }
    targetDate.setHours(0, 0, 0, 0);
    setInitialDate(targetDate);
    setCurrentDate(targetDate);
    golbaldate = targetDate;
    setRun(false);
  }, [searchParams, setInitialDate, setCurrentDate, setRun]); // Added setRun to dependency array

  return null;
}

// --- Main Component ---
const ReservationManager = () => {
  // --- State ---
  const [language, setLanguage] = useState<Language>('ar'); // Default to Arabic
  const [logedin, setLogedin] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [loadingLoginCheck, setLoadingLoginCheck] = useState(true);
  const router = useRouter();

  const [run, setRun] = useState(true);
  const [currentDate, setCurrentDate] = useState<Date>(() => getInitialDate());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Initialize as null
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [uncompletedReservations, setUncompletedReservations] = useState<UncompletedReservation[]>([]);
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [showNewReservationForm, setShowNewReservationForm] = useState(false);
  const [editingReservationId, setEditingReservationId] = useState<number | null>(null);
  const [newReservation, setNewReservation] = useState<NewReservation>({
    name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    locationUrl: '',
    serviceType: 'OFFER_4', // Default key
    dates: [],
    extraHours: 0,
    workerCount: 1,
    price: 0
  });
  const [availableDatesCount, setAvailableDatesCount] = useState(4);
  const selectedDateRef = useRef(selectedDate);

  const [tempDate, setTempDate] = useState(new Date().toISOString().split('T')[0]);
  const [tempTimePeriod, setTempTimePeriod] = useState<TimePeriodKey>('MORNING'); // Use key

  // --- Translation Helper ---
  const t = (key: TranslationKeys | ServiceTypeKey | TimePeriodKey, args?: unknown): unknown => {
    const langDict = translations[language];
    // Type guard to ensure the key exists in the chosen language dictionary
    if (key in langDict) {
        const translation = langDict[key as keyof typeof langDict];
        if (typeof translation === 'function') {
            return (translation as (args?: unknown) => string)(args); // Handle functions like maxDatesError
        }
        return translation ; // Ensure string return type
    }
     // Fallback for keys that might only exist in one language (or error)
    console.warn(`Translation key "${key}" not found for language "${language}". Falling back to English.`);
    const fallbackLangDict = translations.en;
     if (key in fallbackLangDict) {
        const fallbackTranslation = fallbackLangDict[key as keyof typeof fallbackLangDict];
         if (typeof fallbackTranslation === 'function') {
            if (typeof args === 'number') {
                return fallbackTranslation(args);
            }
            console.warn(`Invalid argument type for translation key "${key}". Expected a number.`);
            return key; // Fallback to the key itself if the argument is invalid
        }
        return Array.isArray(fallbackTranslation) ? fallbackTranslation.join(', ') : fallbackTranslation;
     }
    return key; // Return the key itself if not found anywhere
  };

  // --- Effects ---

  // Load language from localStorage on initial mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem("appLanguage") as Language | null;
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'ar')) {
      setLanguage(storedLanguage);
    }
    // Ensure initial date is set *after* potential language load
    setSelectedDate(golbaldate);
    setCurrentDate(golbaldate); // Sync currentDate too if needed

    // Login check
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setLogedin(user.logedin || false);
      if (user.logedin && user.type === "ADMIN") {
        setAdmin(true);
      } else if (!user.logedin || user.type !== "ADMIN") {
        router.push(`/login`);
      }
    } else {
      router.push(`/login`);
    }
    setLoadingLoginCheck(false);

  }, [router]); // Run only once on mount

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("appLanguage", language);
    // Update document direction
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Redirect if not admin after login check
  useEffect(() => {
    if (!loadingLoginCheck && logedin && !admin) {
      router.push(`/login`);
    }
  }, [logedin, admin, loadingLoginCheck, router]);

  // Update week dates when currentDate changes
  useEffect(() => {
    const dates = getWeekDates(currentDate);
    setWeekDates(dates);
  }, [currentDate, language]); // Add language dependency if getWeekDates uses it (it doesn't currently)

  // Update selectedDateRef when selectedDate changes
  useEffect(() => {
    selectedDateRef.current = selectedDate;
    // Fetch data when selectedDate changes (and is not null)
    if (selectedDate && !run) { // Fetch only if run is false (meaning it wasn't set by DateReader initially)
        fetchReservations(selectedDate);
        fetchUncompletedReservations(selectedDate);
    }
  }, [selectedDate, run]); // Add run dependency

   // Fetch initial data once DateReader sets the date and run becomes false
   useEffect(() => {
       if (!run && selectedDate) {
           fetchReservations(selectedDate);
           fetchUncompletedReservations(selectedDate);
       }
   }, [run, selectedDate]); // Depend on run and selectedDate

  // Update available dates count based on service type
  useEffect(() => {
    switch (newReservation.serviceType) {
      case 'OFFER_4': setAvailableDatesCount(4); break;
      case 'OFFER_8': setAvailableDatesCount(8); break;
      case 'OFFER_12': setAvailableDatesCount(12); break;
      default: setAvailableDatesCount(1); break;
    }
    // Reset dates only if service type changes *and* it's not the initial load or editing
    if (!editingReservationId) { // Avoid resetting dates when editing form loads
        setNewReservation(prev => ({ ...prev, dates: [] }));
    }
  }, [newReservation.serviceType, editingReservationId]);

  // --- Date/Time Functions ---

  function getInitialDate() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    // Friday is 5
    if (dayOfWeek === 5) {
      const nextSaturday = new Date(today);
      nextSaturday.setDate(today.getDate() + 1);
      nextSaturday.setHours(0, 0, 0, 0);
      return nextSaturday;
    }
    today.setHours(0, 0, 0, 0);
    return today;
  };

  const getWeekDates = (date: Date): Date[] => {
    const day = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    // Adjust calculation for Saturday (6) start
    const diffToSaturday = day === 6 ? 0 : day + 1;
    const saturday = new Date(date);
    saturday.setDate(date.getDate() - diffToSaturday);
    saturday.setHours(0, 0, 0, 0); // Normalize time

    const weekDays: Date[] = [];
    for (let i = 0; i < 6; i++) { // Saturday (0) to Thursday (5)
      const current = new Date(saturday);
      current.setDate(saturday.getDate() + i);
      weekDays.push(current);
    }
    return weekDays;
  };

  const getDayName = (date: Date): string => {
    const days = t('days');
    if (Array.isArray(days)) {
        return days[date.getDay()];
    }
    console.warn("Expected 'days' to be an array, but got:", days);
    return '';
  };

  interface DateWithMonth {
    getMonth: () => number;
  }
  const getMonthName = (date: DateWithMonth): string => {
    const months = t('months');
    if (Array.isArray(months)) {
        return months[date.getMonth()];
    }
    console.warn("Expected 'months' to be an array, but got:", months);
    return '';
  };

  const formatDateForDisplay = (date: Date): string => {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long', // Use 'long' for full month name
        // year: 'numeric' // Optional: Add year if needed elsewhere
    };
    // Use BCP 47 language tags
    const locale = language === 'ar' ? 'ar-SA' : 'en-US';
    // Ensure Gregorian calendar for Arabic dates if needed, though usually default
    return new Intl.DateTimeFormat(locale, { ...options, calendar: 'gregory' }).format(date);
  };

  const formatDateForInput = (date: Date | string): string => {
      if (!date) return '';
      try {
          const d = typeof date === 'string' ? new Date(date) : date;
          if (isNaN(d.getTime())) return ''; // Invalid date check
          // Format as YYYY-MM-DD
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
      } catch (e) {
          console.error("Error formatting date for input:", e);
          return '';
      }
  };


  // --- Data Fetching & Actions ---

  interface BaseReservation {
    id: number;
    name: string;
    phone: string;
    email?: string;
    city: string;
    address: string;
    locationUrl?: string;
    serviceType: ServiceTypeKey; // Use key
    extraHours: number;
    workerCount: number;
    price: number;
  }

  interface Reservation extends BaseReservation {
      dates: { date: string; timePeriod: TimePeriodKey }[]; // API likely returns string date
      timePeriod?: TimePeriodKey; // For single-day view
  }

  interface UncompletedReservation extends BaseReservation {
      dates: { date: string; timePeriod: TimePeriodKey }[];
      timePeriod?: TimePeriodKey;
      called?: boolean; // Add this if your API includes it
  }

  interface NewReservation {
    name: string;
    phone: string;
    email: string;
    city: string;
    address: string;
    locationUrl: string;
    serviceType: ServiceTypeKey; // Use key
    dates: { date: Date; timePeriod: TimePeriodKey }[]; // Store Date objects locally
    extraHours: number;
    workerCount: number;
    price: number;
  }

   // --- Navigation and Selection ---
   const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'ar' ? 'en' : 'ar'));
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const goToPreviousWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(currentDate.getDate() - 7);
    setCurrentDate(prevWeek);
  };

  const changeMonth = () => {
    // Simple month change (might need refinement based on exact desired behavior)
    const newMonth = (currentDate.getMonth() + 1) % 12;
    const newDate = new Date(currentDate);
    newDate.setMonth(newMonth);
    // Adjust day if new month has fewer days (e.g., changing from Mar 31st)
    if (newDate.getMonth() !== newMonth) {
        newDate.setDate(0); // Go to last day of previous month (which is the target month)
    }
    setCurrentDate(newDate);
  };

  const selectDate = (date: Date) => {
      setRun(false); // Indicate manual selection
      setSelectedDate(date);
      // Fetching will be triggered by the useEffect watching selectedDate and run
  };


  const fetchReservations = async (date: Date): Promise<void> => {
    if (!date) return;
    setLoading(true);
    try {
      const formattedDate = formatDateForInput(date);
      const response = await fetch(`/api/booking?date=${formattedDate}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data: Reservation[] = await response.json();
      // Ensure dates are Date objects if needed downstream, though API likely returns strings
       setReservations(data.map(r => ({
           ...r,
           // Optional: Parse date strings back to Date objects if necessary
           // dates: r.dates.map(d => ({ ...d, date: new Date(d.date) }))
       })));
      setExpandedRows({});
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
      alert(t('fetchError'));
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUncompletedReservations = async (date: Date): Promise<void> => {
    if (!date) return;
    setLoading(true);
    const currentDateString = formatDateForInput(date);
    const link = `/api/uncompleted?date=${currentDateString}`;
    try {
      const response = await fetch(link);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data: UncompletedReservation[] = await response.json();
       setUncompletedReservations(data.map(r => ({
           ...r,
           // Optional: Parse date strings back to Date objects if necessary
           // dates: r.dates.map(d => ({ ...d, date: new Date(d.date) }))
       })));
    } catch (error) {
      console.error("Failed to fetch uncompleted reservations:", error);
      alert(t('fetchUncompletedError'));
      setUncompletedReservations([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsCalled = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(`/api/uncompleted`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, called: true }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      // Re-fetch to ensure data consistency, especially if 'called' status affects listing
      if (selectedDateRef.current) {
          fetchUncompletedReservations(selectedDateRef.current);
          alert(t('updateCallStatusSuccess'));
      }
    } catch (error) {
      console.error("Failed to update called status:", error);
      alert(t('updateCallStatusError'));
    } finally {
      setLoading(false);
    }
  };

  const toggleRowExpansion = (id: number): void => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const deleteReservation = async (id: number): Promise<void> => {
    if (window.confirm(String(t('deleteConfirm')))) {
      setLoading(true);
      try {
        const response = await fetch('/api/booking', { // Assuming same endpoint for delete
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        // Re-fetch data for the current day after deletion
        if (selectedDateRef.current) {
            fetchReservations(selectedDateRef.current);
            fetchUncompletedReservations(selectedDateRef.current); // Also refresh uncompleted
            alert(t('deleteSuccess'));
        }
      } catch (error) {
        console.error("Failed to delete reservation:", error);
        alert(t('deleteError'));
      } finally {
        setLoading(false);
      }
    }
  };

  // --- Form Handling ---

   const editReservation = (reservation: Reservation | UncompletedReservation, type: "COMPLETED" | "UNCOMPLETED") => {
    setEditingReservationId(type === "UNCOMPLETED" ? null : reservation.id); // Only set ID for completed edits

    setNewReservation({
      name: reservation.name,
      phone: reservation.phone,
      email: reservation.email || '',
      city: reservation.city,
      address: reservation.address,
      locationUrl: reservation.locationUrl || '',
      serviceType: reservation.serviceType, // Key
       // Parse dates from string (API) to Date objects (Form state)
       dates: reservation.dates ? reservation.dates.map(d => ({
           date: new Date(d.date), // Parse string date
           timePeriod: d.timePeriod // Key
       })) : [],
      extraHours: reservation.extraHours,
      workerCount: reservation.workerCount,
      price: reservation.price
    });
    setShowNewReservationForm(true);
  };

  const handleAddReservation = async () => {
    if (!newReservation.name || !newReservation.phone || !newReservation.city || !newReservation.address) {
      alert(t('fillMandatoryFieldsError'));
      return;
    }
    if (newReservation.dates.length === 0) {
      alert(t('selectAtLeastOneDateError'));
      return;
    }

    setLoading(true);
    const isEditing = !!editingReservationId;

    try {
        // For editing, we usually PUT the whole object or PATCH specific fields.
        // For adding with multiple dates, we might need multiple POSTs or a single POST with an array.
        // Assuming the API handles adding/editing based on method and ID presence.
        // If adding multiple dates requires separate POSTs, loop here.
        // If API accepts an array of dates for POST, structure payload accordingly.

        // *** Simplified Example: Assuming API handles one date per request for POST/PUT ***
        // *** Adjust based on your actual API design ***

        const results = [];
        for (const datePeriod of newReservation.dates) {
            const reservationPayload = {
                name: newReservation.name,
                phone: newReservation.phone,
                email: newReservation.email,
                city: newReservation.city,
                address: newReservation.address,
                locationUrl: newReservation.locationUrl,
                serviceType: newReservation.serviceType,
                date: datePeriod.date.toISOString(), // Send ISO string to API
                timePeriod: datePeriod.timePeriod,
                extraHours: newReservation.extraHours,
                workerCount: newReservation.workerCount,
                price: newReservation.price
            };

            let response;
            if (isEditing) {
                // Assuming PUT replaces the *entire* reservation for that specific date instance
                // Or if editing general info, maybe only send one PUT request outside the loop
                response = await fetch('/api/booking', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: editingReservationId, ...reservationPayload }),
                });
            } else {
                 // Assuming POST creates a new reservation for each date
                response = await fetch('/api/booking', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reservationPayload),
                });
            }

            if (!response.ok) {
                 // Handle potential partial failures if looping
                throw new Error(`HTTP error! status: ${response.status} for date ${formatDateForInput(datePeriod.date)}`);
            }
             results.push(await response.json()); // Collect results if needed
        }


      // After successful operations:
      alert(isEditing ? t('editSuccess') : t('addSuccess'));
      if (selectedDateRef.current) {
        fetchReservations(selectedDateRef.current); // Refresh current view
        fetchUncompletedReservations(selectedDateRef.current); // Also refresh uncompleted list
      }
      closeNewReservationForm();

    } catch (error) {
      console.error("Failed to add/edit reservation:", error);
      console.log('Payload:', newReservation); // Log for debugging
      alert(t('addEditError', { action: isEditing ? t('editReservationTitle') : t('addReservationTitle') }));
    } finally {
      setLoading(false);
    }
  };


  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    let processedValue: string | number | ServiceTypeKey = value;

    if (name === 'extraHours' || name === 'workerCount' || name === 'price') {
      processedValue = parseFloat(value) || 0;
    }
     // Handle serviceType specifically to ensure the key is stored
     if (name === 'serviceType') {
        processedValue = value as ServiceTypeKey; // Cast to the specific type
    }

    setNewReservation(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleTempDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTempDate(e.target.value);
  };

  const handleTempTimePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setTempTimePeriod(e.target.value as TimePeriodKey); // Cast to key type
  };

  const addDatePeriod = () => {
    if (!tempDate) return; // Ensure a date is selected

    const selected = new Date(tempDate + "T03:00:00Z"); // Add time/zone to avoid date shifts

    if (isNaN(selected.getTime())) {
        alert("Invalid date selected."); // Basic validation
        return;
    }

    const dayOfWeek = selected.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected < today) {
      alert(t('pastDateError'));
      return;
    }

    if (dayOfWeek === 5) { // Friday
      alert(t('fridayError'));
      return;
    }

     const isDuplicate = newReservation.dates.some(d =>
        formatDateForInput(d.date) === formatDateForInput(selected) && d.timePeriod === tempTimePeriod
    );

    if (isDuplicate) {
      alert(t('duplicateDateError'));
      return;
    }

    // Prevent adding *new* dates when editing a multi-date reservation (usually you edit existing ones)
    // Allow adding dates if it's a new reservation OR if editing a single-date one.
     if (editingReservationId && newReservation.dates.length >= 1 && newReservation.serviceType !== 'ONE_TIME') {
        // More complex logic might be needed depending on how edits should work for multi-date offers
       alert(t('addDateWhileEditingError'));
       return;
     }

    if (newReservation.dates.length < availableDatesCount) {
      setNewReservation(prev => ({
        ...prev,
        dates: [...prev.dates, { date: selected, timePeriod: tempTimePeriod }]
      }));
    } else {
      alert(t('maxDatesError', { count: availableDatesCount }));
    }
  };

  const removeDatePeriod = (index: number): void => {
      // Prevent removal if editing and it's the last/only date associated with the ID
      if (editingReservationId && newReservation.dates.length === 1) {
          alert("Cannot remove the only date while editing."); // Or provide a different workflow
          return;
      }
    const newDates = newReservation.dates.filter((_, i) => i !== index);
    setNewReservation(prev => ({ ...prev, dates: newDates }));
  };


  const closeNewReservationForm = () => {
    setShowNewReservationForm(false);
    setEditingReservationId(null);
    // Reset form to defaults
    setNewReservation({
      name: '', phone: '', email: '', city: '', address: '', locationUrl: '',
      serviceType: 'OFFER_4', // Default key
      dates: [], extraHours: 0, workerCount: 1, price: 0
    });
     // Reset temp date/time selectors as well
     setTempDate(new Date().toISOString().split('T')[0]);
     setTempTimePeriod('MORNING');
  };

  // --- Calculated Values ---
  const morningReservations = reservations.filter(res => res.timePeriod === "MORNING");
  const eveningReservations = reservations.filter(res => res.timePeriod === "EVENING");

  const totalMorningWorkers = morningReservations.reduce((sum, res) => sum + res.workerCount, 0);
  const totalEveningWorkers = eveningReservations.reduce((sum, res) => sum + res.workerCount, 0);

  const remainingMorningWorkers = Math.max(0, 19 - totalMorningWorkers);
  const remainingEveningWorkers = Math.max(0, 19 - totalEveningWorkers);

  // --- Render ---
  if (loadingLoginCheck) {
    return <div className="flex justify-center items-center h-screen">{String(t('loadingLoginCheck'))}</div>;
  }

  // Main component render logic (only if logged in and admin)
  return (
    (logedin && admin) ? (
      <div className={`flex flex-col p-4 sm:p-6 text-${language === 'ar' ? 'right' : 'left'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <Suspense fallback={<div>Loading date preference...</div>}>
          <DateReader setInitialDate={setSelectedDate} setCurrentDate={setCurrentDate} setRun={setRun} />
        </Suspense>

        {/* Header Area */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">
             {editingReservationId && showNewReservationForm ? String(t('editReservationFormTitle')) : String(t('reservationSystemTitle'))}
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
             {/* Language Switcher */}
             <button
                onClick={toggleLanguage}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-3 rounded-lg flex items-center justify-center text-sm"
                aria-label={`Switch language to ${language === 'ar' ? 'English' : 'العربية'}`}
             >
                <Languages size={18} className="me-2" />
                {language === 'ar' ? 'English' : 'العربية'}
            </button>
            {/* Worker Info */}
            <div className="bg-gray-100 p-2 sm:p-3 rounded-lg text-xs sm:text-sm flex items-center w-full sm:w-auto justify-center">
               <div className={`text-${language === 'ar' ? 'right' : 'left'} ${language === 'ar' ? 'ml-0 sm:ml-4' : 'mr-0 sm:mr-4'}`}>
                <span className="block font-medium text-gray-800">{t('availableWorkersInfo') as string}</span>
                <span className="block text-gray-600">{t('workersPerPeriod') as string}</span>
              </div>
            </div>
             {/* New Booking Button */}
             <button
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center w-full sm:w-auto text-sm sm:text-base"
              onClick={() => {
                  closeNewReservationForm(); // Reset form before showing
                  setShowNewReservationForm(true);
              }}
            >
              <Plus size={20} className="me-2" />
              {t('newBookingButton') as string}
            </button>
          </div>
        </div>

        {/* Week Navigator */}
        <div className="flex justify-between items-center mb-4 sm:mb-6 bg-gray-100 p-3 sm:p-4 rounded-lg">
          <button
            onClick={goToPreviousWeek}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-50"
            aria-label={String(t('previousWeek'))}
          >
            {language === 'ar' ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
          <div className="flex flex-col items-center">
            <button
              onClick={changeMonth}
              className="font-bold text-lg hover:underline"
            >
              {weekDates.length > 0 ? `${getMonthName(weekDates[0])} ${weekDates[0].getFullYear()}` : ''}
            </button>
          </div>
          <button
            onClick={goToNextWeek}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-50"
            aria-label={String(t('nextWeek'))}
          >
             {language === 'ar' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Week Dates Selection */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4 mb-6 sm:mb-8">
          {weekDates.map((date) => {
             const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
             const isToday = date.toDateString() === new Date().toDateString(); // Use plain new Date() for today's comparison
             return (
                <button
                key={date.toISOString()}
                onClick={() => selectDate(date)}
                className={`flex flex-col items-center p-2 sm:p-3 rounded-lg shadow-sm transition-colors text-xs sm:text-sm 
                ${isSelected ? 'bg-blue-500 text-white font-semibold' : 'bg-white hover:bg-gray-100 text-gray-700'}
                ${isToday && !isSelected ? 'ring-2 ring-blue-300' : ''}
                `}
                >
                <span className="font-medium">{getDayName(date)}</span>
                <span className="text-xs sm:text-sm mt-1">
                    {formatDateForDisplay(date)}
                </span>
                </button>
             );
            })}
        </div>

        {/* Reservations Display Area */}
        {selectedDate ? (
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
               {/* Reservations for {getDayName(selectedDate)} {formatDateForDisplay(selectedDate)} */}
               {`${t('reservationSystemTitle')} - ${getDayName(selectedDate)} ${formatDateForDisplay(selectedDate)}`}
            </h2>

            {loading ? (
              <div className="text-center py-8">{t('loadingData') as string}</div>
            ) : (
              <>
                {/* Morning Reservations */}
                <div className="mb-6 sm:mb-8">
                   <div className="flex justify-between items-center bg-blue-50 p-2 rounded mb-2 sm:mb-4 text-sm sm:text-base">
                     <div className={`font-bold flex items-center text-${language === 'ar' ? 'right' : 'left'}`}>
                       <Clock size={18} className="me-2" />
                       {t('morningPeriod') as string}
                     </div>
                     <div className="flex items-center text-xs sm:text-sm">
                      <div className={`px-2 sm:px-3 py-1 rounded-full 
                        ${remainingMorningWorkers === 0 ? 'bg-red-100 text-red-800' :
                         remainingMorningWorkers < 5 ? 'bg-yellow-100 text-yellow-800' :
                         'bg-green-100 text-green-800'}`}>
                        <span className="font-medium">{t('remainingWorkers') as string} {remainingMorningWorkers}</span>
                        {remainingMorningWorkers === 0 && <span className="ms-1 text-xs">({t('noNewBookings') as string})</span>}
                      </div>
                    </div>
                   </div>
                  {morningReservations.length === 0 ? (
                    <p className="text-gray-500 text-center py-4 text-sm">{t('noBookingsMorning') as string}</p>
                  ) : (
                     <div className="overflow-x-auto">
                         <table className={`min-w-full divide-y divide-gray-200 text-xs sm:text-sm text-${language === 'ar' ? 'right' : 'left'}`}>
                             <thead className="bg-gray-50">
                             <tr>
                                 <th className={`px-2 sm:px-6 py-2 sm:py-3 text-${language === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{String(t('nameHeader'))}</th>
                                 <th className={`px-2 sm:px-6 py-2 sm:py-3 text-${language === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{String(t('phoneHeader'))}</th>
                                 <th className={`px-2 sm:px-6 py-2 sm:py-3 text-${language === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{String(t('actionsHeader'))}</th>
                             </tr>
                             </thead>
                             <tbody className="bg-white divide-y divide-gray-200">
                             {morningReservations.map((reservation) => (
                                 <React.Fragment key={`${reservation.id}-morning`}>
                                     <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleRowExpansion(reservation.id)}>
                                         <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">{reservation.name}</td>
                                         <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                                             <a href={`tel:${reservation.phone}`} className="text-blue-500 hover:underline flex items-center" onClick={(e) => e.stopPropagation()}>
                                                 <Phone size={16} className="me-1" />
                                                 {reservation.phone}
                                             </a>
                                         </td>
                                         <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                                             <div className="flex items-center justify-center sm:justify-start gap-2">
                                                 <button className="text-blue-500 hover:text-blue-700" onClick={(e) => { e.stopPropagation(); editReservation(reservation, "COMPLETED"); }} aria-label={String(t('editReservationTitle'))}>
                                                     <Edit size={16} />
                                                 </button>
                                                 <button className="text-red-500 hover:text-red-700" onClick={(e) => { e.stopPropagation(); deleteReservation(reservation.id); }} aria-label={String(t('deleteConfirm'))}>
                                                     <X size={16} />
                                                 </button>
                                                 {expandedRows[reservation.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                             </div>
                                         </td>
                                     </tr>
                                     {/* Expanded Row */}
                                     {expandedRows[reservation.id] && (
                                         <tr>
                                            <td colSpan={3} className="px-4 py-3 bg-gray-50 text-xs sm:text-sm">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                                                    {/* Details Fields */}
                                                    <div className="flex items-start"><Mail size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('emailLabel'))}</span> {reservation.email || String(t('notAvailable'))}</div></div>
                                                    <div className="flex items-start"><MapPin size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('cityLabel'))}</span> {reservation.city}</div></div>
                                                    <div className="flex items-start md:col-span-2"><MapPin size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('addressLabel'))}</span> {reservation.address}</div></div>
                                                    {reservation.locationUrl && <div className="flex items-start"><MapPin size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('locationLinkLabel'))}</span> <a href={reservation.locationUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{String(t('openLocation'))}</a></div></div>}
                                                    <div className="flex items-start"><Calendar size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('serviceTypeLabel'))}</span> {String(t(reservation.serviceType))}</div></div>
                                                    <div className="flex items-start"><Clock size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('extraHoursLabel'))}</span> {reservation.extraHours}</div></div>
                                                    <div className="flex items-start"><Users size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('workerCountLabel'))}</span> {reservation.workerCount}</div></div>
                                                    <div className="flex items-start"><DollarSign size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('priceLabel'))}</span> {reservation.price} {String(t('currency'))}</div></div>
                                                </div>
                                            </td>
                                         </tr>
                                     )}
                                 </React.Fragment>
                             ))}
                             </tbody>
                         </table>
                     </div>
                  )}
                </div>

                {/* Evening Reservations (Similar structure to Morning) */}
                <div>
                   <div className="flex justify-between items-center bg-indigo-50 p-2 rounded mb-2 sm:mb-4 text-sm sm:text-base">
                     <div className={`font-bold flex items-center text-${language === 'ar' ? 'right' : 'left'}`}>
                       <Clock size={18} className="me-2" />
                       {t('eveningPeriod') as string}
                     </div>
                      <div className="flex items-center text-xs sm:text-sm">
                        <div className={`px-2 sm:px-3 py-1 rounded-full 
                          ${remainingEveningWorkers === 0 ? 'bg-red-100 text-red-800' :
                           remainingEveningWorkers < 5 ? 'bg-yellow-100 text-yellow-800' :
                           'bg-green-100 text-green-800'}`}>
                          <span className="font-medium">{t('remainingWorkers') as string} {remainingEveningWorkers}</span>
                          {remainingEveningWorkers === 0 && <span className="ms-1 text-xs">({t('noNewBookings') as string})</span>}
                        </div>
                      </div>
                   </div>
                  {eveningReservations.length === 0 ? (
                    <p className="text-gray-500 text-center py-4 text-sm">{String(t('noBookingsEvening'))}</p>
                  ) : (
                     <div className="overflow-x-auto">
                       {/* Table Structure identical to Morning, just map eveningReservations */}
                        <table className={`min-w-full divide-y divide-gray-200 text-xs sm:text-sm text-${language === 'ar' ? 'right' : 'left'}`}>
                             <thead className="bg-gray-50">
                             <tr>
                                 <th className={`px-2 sm:px-6 py-2 sm:py-3 text-${language === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{String(t('nameHeader'))}</th>
                                 <th className={`px-2 sm:px-6 py-2 sm:py-3 text-${language === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{String(t('phoneHeader'))}</th>
                                 <th className={`px-2 sm:px-6 py-2 sm:py-3 text-${language === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{String(t('actionsHeader'))}</th>
                             </tr>
                             </thead>
                             <tbody className="bg-white divide-y divide-gray-200">
                             {eveningReservations.map((reservation) => (
                                 <React.Fragment key={`${reservation.id}-evening`}>
                                     <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleRowExpansion(reservation.id)}>
                                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">{reservation.name}</td>
                                         <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                                             <a href={`tel:${reservation.phone}`} className="text-blue-500 hover:underline flex items-center" onClick={(e) => e.stopPropagation()}>
                                                 <Phone size={16} className="me-1" />
                                                 {reservation.phone}
                                             </a>
                                         </td>
                                         <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                                             <div className="flex items-center justify-center sm:justify-start gap-2">
                                                 <button className="text-blue-500 hover:text-blue-700" onClick={(e) => { e.stopPropagation(); editReservation(reservation, "COMPLETED"); }} aria-label={String(t('editReservationTitle'))}>
                                                     <Edit size={16} />
                                                 </button>
                                                 <button className="text-red-500 hover:text-red-700" onClick={(e) => { e.stopPropagation(); deleteReservation(reservation.id); }} aria-label={String(t('deleteConfirm'))}>
                                                     <X size={16} />
                                                 </button>
                                                 {expandedRows[reservation.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                             </div>
                                         </td>
                                     </tr>
                                     {/* Expanded Row */}
                                     {expandedRows[reservation.id] && (
                                          <tr>
                                            <td colSpan={3} className="px-4 py-3 bg-gray-50 text-xs sm:text-sm">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                                                    {/* Details Fields - Same as Morning */}
                                                    <div className="flex items-start"><Mail size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('emailLabel'))}</span> {reservation.email || String(t('notAvailable'))}</div></div>
                                                    <div className="flex items-start"><MapPin size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('cityLabel'))}</span> {reservation.city}</div></div>
                                                    <div className="flex items-start md:col-span-2"><MapPin size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('addressLabel'))}</span> {reservation.address}</div></div>
                                                    {reservation.locationUrl && <div className="flex items-start"><MapPin size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('locationLinkLabel'))}</span> <a href={reservation.locationUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{String(t('openLocation'))}</a></div></div>}
                                                    <div className="flex items-start"><Calendar size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('serviceTypeLabel'))}</span> {String(t(reservation.serviceType))}</div></div>
                                                    <div className="flex items-start"><Clock size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('extraHoursLabel'))}</span> {reservation.extraHours}</div></div>
                                                    <div className="flex items-start"><Users size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('workerCountLabel'))}</span> {reservation.workerCount}</div></div>
                                                    <div className="flex items-start"><DollarSign size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('priceLabel'))}</span> {reservation.price} {String(t('currency'))}</div></div>
                                                </div>
                                            </td>
                                         </tr>
                                     )}
                                 </React.Fragment>
                             ))}
                             </tbody>
                         </table>
                     </div>
                  )}
                </div>

                 {/* Uncompleted Reservations */}
                 <div className="mt-6 sm:mt-8">
                   <div className="flex justify-between items-center bg-orange-50 p-2 rounded mb-2 sm:mb-4 text-sm sm:text-base">
                     <div className={`font-bold flex items-center text-${language === 'ar' ? 'right' : 'left'}`}>
                       <Clock size={18} className="me-2" />
                       {String(t('uncompletedReservations'))}
                     </div>
                     {/* Optional: Add count or other info here */}
                   </div>
                    {loading ? ( // Use loading state for this section too if fetchUncompleted is separate
                       <div className="text-center py-8">{String(t('loadingData'))}</div>
                    ) : uncompletedReservations.length === 0 ? (
                        <p className="text-gray-500 text-center py-4 text-sm">{String(t('noUncompletedBookings'))}</p>
                    ) : (
                     <div className="overflow-x-auto">
                        <table className={`min-w-full divide-y divide-gray-200 text-xs sm:text-sm text-${language === 'ar' ? 'right' : 'left'}`}>
                             <thead className="bg-gray-50">
                             <tr>
                                 <th className={`px-2 sm:px-6 py-2 sm:py-3 text-${language === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{String(t('nameHeader'))}</th>
                                 <th className={`px-2 sm:px-6 py-2 sm:py-3 text-${language === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{String(t('phoneHeader'))}</th>
                                 <th className={`px-2 sm:px-6 py-2 sm:py-3 text-${language === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{String(t('actionsHeader'))}</th>
                             </tr>
                             </thead>
                             <tbody className="bg-white divide-y divide-gray-200">
                              {uncompletedReservations.map((reservation) => (
                                 <React.Fragment key={`${reservation.id}-uncompleted`}>
                                     <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleRowExpansion(reservation.id)}>
                                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">{reservation.name}</td>
                                         <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                                             <a href={`tel:${reservation.phone}`} className="text-blue-500 hover:underline flex items-center" onClick={(e) => e.stopPropagation()}>
                                                 <Phone size={16} className="me-1" />
                                                 {reservation.phone}
                                             </a>
                                         </td>
                                         <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                                             <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap"> {/* Added flex-wrap */}
                                                 {/* Confirm Call Button */}
                                                  {!reservation.called && // Optionally hide if already called
                                                    <button
                                                        className="text-green-600 hover:text-green-800 flex items-center text-xs sm:text-sm p-1 rounded border border-green-300 hover:bg-green-50"
                                                        onClick={(e) => { e.stopPropagation(); markAsCalled(reservation.id); }}
                                                        aria-label={String(t('confirmCall'))}
                                                    >
                                                        <Phone size={14} className="me-1" />
                                                        {String(t('confirmCall'))}
                                                    </button>
                                                  }
                                                  {/* Edit Button (treats uncompleted as a template for a new booking) */}
                                                 <button
                                                    className="text-blue-500 hover:text-blue-700 p-1"
                                                    onClick={(e) => { e.stopPropagation(); editReservation(reservation, "UNCOMPLETED"); }}
                                                    aria-label={String(t('editReservationTitle'))} // Or a different label like "Complete Booking"
                                                 >
                                                    <Edit size={16} />
                                                 </button>
                                                 {/* Delete Button */}
                                                 <button
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                    onClick={(e) => { e.stopPropagation(); deleteReservation(reservation.id); }} // Assuming delete works for uncompleted too
                                                    aria-label={String(t('deleteConfirm'))}
                                                  >
                                                    <X size={16} />
                                                 </button>
                                                 {/* Expand/Collapse Icon */}
                                                 <span className="p-1">
                                                    {expandedRows[reservation.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                 </span>
                                             </div>
                                         </td>
                                     </tr>
                                     {/* Expanded Row for Uncompleted */}
                                     {expandedRows[reservation.id] && (
                                          <tr>
                                            {/* Details are similar, but maybe fewer fields shown (e.g., no Price yet) */}
                                            <td colSpan={3} className="px-4 py-3 bg-gray-50 text-xs sm:text-sm">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                                                    <div className="flex items-start"><Mail size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('emailLabel'))}</span> {reservation.email || String(t('notAvailable'))}</div></div>
                                                    <div className="flex items-start"><MapPin size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('cityLabel'))}</span> {reservation.city}</div></div>
                                                    <div className="flex items-start md:col-span-2"><MapPin size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('addressLabel'))}</span> {reservation.address}</div></div>
                                                    {reservation.locationUrl && <div className="flex items-start"><MapPin size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('locationLinkLabel'))}</span> <a href={reservation.locationUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{String(t('openLocation'))}</a></div></div>}
                                                    <div className="flex items-start"><Calendar size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{String(t('serviceTypeLabel'))}</span> {String(t(reservation.serviceType))}</div></div>
                                                    {/* May not have these details yet for uncompleted */}
                                                    {/* <div className="flex items-start"><Clock size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{t('extraHoursLabel')}</span> {reservation.extraHours}</div></div> */}
                                                    {/* <div className="flex items-start"><Users size={14} className="mt-1 me-2 flex-shrink-0 text-gray-500" /><div><span className="font-medium text-gray-600">{t('workerCountLabel')}</span> {reservation.workerCount}</div></div> */}
                                                </div>
                                            </td>
                                         </tr>
                                     )}
                                 </React.Fragment>
                              ))}
                             </tbody>
                         </table>
                     </div>
                    )}
                 </div>
              </>
            )}
          </div>
        ) : (
           // Placeholder when no date is selected
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 text-sm">{t('selectDatePrompt') as string}</p>
          </div>
        )}

        {/* New/Edit Reservation Modal Form */}
        {showNewReservationForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex justify-center items-start pt-16 pb-16">
            {/* Added padding top/bottom to prevent cutoff */}
            <div className={`bg-white rounded-lg p-4 sm:p-6 shadow-lg w-full max-w-lg my-auto text-${language === 'ar' ? 'right' : 'left'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">
                  {editingReservationId ? String(t('editReservationFormTitle')) : String(t('addReservationTitle'))}
              </h2>

              {/* Form Fields */}
                <div className="space-y-3 sm:space-y-4">
                    {/* Basic Info */}
                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-1">{t('customerNameLabel') as string}</label>
                        <input type="text" id="name" name="name" value={newReservation.name} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" required/>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-1">{t('phoneLabel') as string}</label>
                        <input type="tel" id="phone" name="phone" value={newReservation.phone} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" required/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-1">{t('emailLabelOptional') as string}</label>
                        <input type="email" id="email" name="email" value={newReservation.email} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-1">{t('cityLabelMandatory') as string}</label>
                        <input type="text" id="city" name="city" value={newReservation.city} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" required/>
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-1">{t('addressLabelMandatory') as string}</label>
                        <textarea id="address" name="address" value={newReservation.address} onChange={handleFormChange} rows={2} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" required></textarea>
                    </div>
                    <div>
                        <label htmlFor="locationUrl" className="block text-gray-700 text-sm font-bold mb-1">{t('locationUrlOptional') as string}</label>
                        <input type="url" id="locationUrl" name="locationUrl" value={newReservation.locationUrl} onChange={handleFormChange} placeholder="https://maps.google.com/..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" />
                    </div>

                    {/* Service Type */}
                    <div>
                        <label htmlFor="serviceType" className="block text-gray-700 text-sm font-bold mb-1">{t('serviceTypeLabelForm') as string}</label>
                        <select
                            id="serviceType"
                            name="serviceType"
                            value={newReservation.serviceType}
                            onChange={handleFormChange}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm bg-white" // Added bg-white for consistency
                            disabled={!!editingReservationId} // Disable if editing (usually service type isn't changed post-creation)
                        >
                            {ServiceTypeKeys.map((key) => (
                                <option key={key} value={key}>{String(t(key))}</option>
                            ))}
                        </select>
                    </div>

                    {/* Date/Time Period Selection */}
                     <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">{t('addDatesAndPeriods') as string}</label>
                        <div className="flex flex-col sm:flex-row items-center gap-2 mb-3">
                            <input
                                type="date"
                                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm flex-grow"
                                value={tempDate}
                                onChange={handleTempDateChange}
                                min={formatDateForInput(new Date())} // Prevent past dates
                                aria-label={String(t('addDatePlaceholder'))}
                            />
                            <select
                                className="shadow border rounded w-full sm:w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm bg-white"
                                value={tempTimePeriod}
                                onChange={handleTempTimePeriodChange}
                                aria-label={String(t('addTimePeriodPlaceholder'))}
                            >
                                {TimePeriodKeys.map((key) => (
                                    <option key={key} value={key}>{String(t(key))}</option>
                                ))}
                            </select>
                            <button
                                onClick={addDatePeriod}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm w-full sm:w-auto flex items-center justify-center"
                                type="button"
                                // Disable add button logic if needed (e.g., during specific edits)
                                disabled={!!editingReservationId && newReservation.dates.length >= 1 && newReservation.serviceType !== 'ONE_TIME'}
                             >
                                <Plus size={16} className="inline-block me-1" />
                                {String(t('addButton'))}
                            </button>
                        </div>

                        {/* Display Selected Dates */}
                        {newReservation.dates.length > 0 && (
                            <div className="mt-3 border rounded p-2 bg-gray-50 max-h-32 overflow-y-auto">
                                <h3 className="font-semibold mb-2 text-xs text-gray-600">{String(t('selectedDatesAndPeriods'))}</h3>
                                <ul className="space-y-1">
                                  {newReservation.dates.map((datePeriod, index) => (
                                    <li key={index} className="flex justify-between items-center text-xs border-b last:border-b-0 pb-1">
                                        <span>
                                            {formatDateForDisplay(datePeriod.date)} - {String(t(datePeriod.timePeriod))  }
                                        </span>
                                        <button
                                            onClick={() => removeDatePeriod(index)}
                                            className="text-red-500 hover:text-red-700 p-1"
                                            type="button"
                                            aria-label={`${t('removeButton')} ${formatDateForDisplay(datePeriod.date)}`}
                                            // Disable removal if editing the only date
                                            disabled={!!editingReservationId && newReservation.dates.length === 1}
                                        >
                                            <X size={14} />
                                        </button>
                                    </li>
                                   ))}
                                </ul>
                            </div>
                        )}
                     </div>


                    {/* Other Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label htmlFor="extraHours" className="block text-gray-700 text-sm font-bold mb-1">{t('extraHoursLabelForm') as string}</label>
                            <input type="number" id="extraHours" name="extraHours" min="0" value={newReservation.extraHours} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" />
                        </div>
                        <div>
                            <label htmlFor="workerCount" className="block text-gray-700 text-sm font-bold mb-1">{t('workerCountLabelForm') as string}</label>
                            <input type="number" id="workerCount" name="workerCount" min="1" value={newReservation.workerCount} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-1">{t('priceLabelForm') as string}</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                min="0"
                                step="0.01"
                                value={newReservation.price}
                                onChange={handleFormChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                                // Maybe disable price editing too depending on workflow
                                // disabled={!!editingReservationId}
                             />
                        </div>
                    </div>
                </div>


              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                <button onClick={closeNewReservationForm} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm w-full sm:w-auto order-last sm:order-first" type="button">
                  {t('cancelButton') as string}
                </button>
                <button
                    onClick={handleAddReservation}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm w-full sm:w-auto flex items-center justify-center"
                    type="button"
                    disabled={loading} // Disable button while loading
                 >
                  <Save size={16} className="inline-block me-2" />
                   {loading ? String(t('loadingData')) : (editingReservationId ? String(t('saveChangesButton')) : String(t('saveBookingButton')))}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    ) : (
      // If not logged in or not admin (after check)
      !loadingLoginCheck ? <div className="flex justify-center items-center h-screen">{String(t('redirectToLogin'))}</div> : null // Show redirect message only after check is complete
    )
  );
};

export default ReservationManager;