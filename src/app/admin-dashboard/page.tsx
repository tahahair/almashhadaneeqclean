"use client"
import React, { useState, useEffect, useRef,Suspense   } from 'react';

import { ChevronRight, ChevronLeft, Calendar, Clock, MapPin, Phone, Mail,  DollarSign, Users, X, Edit, ChevronDown, ChevronUp, Plus, Save } from 'lucide-react';
import { useRouter ,useSearchParams } from "next/navigation";


function DateReader({ setInitialDate }: { setInitialDate: (date: Date) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const dateParam = searchParams.get('date');
    if (dateParam) {
      // --- منطق تحويل النص من الرابط إلى كائن تاريخ ---
      // مثال بسيط (قد تحتاج لتعديله حسب صيغة التاريخ DD-MM-YYYY)
      const parts = dateParam.split('-'); // [DD, MM, YYYY]
      if (parts.length === 3) {
         // انتبه: شهر JS يبدأ من 0 (يناير=0)، لذا نطرح 1
         const parsedDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
         if (!isNaN(parsedDate.getTime())) { // تحقق من صحة التاريخ
           setInitialDate(parsedDate);
           return; // تم التعيين بنجاح
         }
      }
      console.warn("Invalid date format in URL, using default.");
    }
    // في حال عدم وجود بارامتر أو فشل التحويل، استخدم تاريخ اليوم كافتراضي
    setInitialDate(new Date());

  }, [searchParams, setInitialDate]); // الاعتماديات

  return null; // هذا المكون لا يعرض شيئاً بنفسه
}
// --- نهاية المكون الداخلي ---


// أنواع الخدمات
const ServiceType: { [key: string]: string } = {
  OFFER_4: 'عرض 4 مرات',
  OFFER_8: 'عرض 8 مرات',
  OFFER_12: 'عرض 12 مرة',
  ONE_TIME: 'مرة واحدة'
};

// أنواع الفترات الزمنية
const TimePeriod = {
  MORNING: 'صباحي',
  EVENING: 'مسائي'
};


const ReservationManager = () => {


 const [logedin, setLogedin] = useState(false);
 const [admin, setAdmin] = useState(false);
 const [loadingLoginCheck, setLoadingLoginCheck] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);

      setLogedin(user.logedin || false);
      if (user.logedin) {
        if (user.type === "ADMIN") {
          setAdmin(true);
        }
      }
    } else {
      router.push(`/login`);
    }
    setLoadingLoginCheck(false);
  }, []);

  useEffect(() => {
    if (!loadingLoginCheck && logedin && !admin) {
      router.push(`/login`);
    }
  }, [logedin, admin, loadingLoginCheck, router]);


  const getInitialDate = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    if (dayOfWeek === 5) {
      const daysUntilSaturday =  1;
      const nextSaturday = new Date(today);
      nextSaturday.setDate(today.getDate() + daysUntilSaturday);
      return nextSaturday;
    }
    return today;
  };

  const initialDate = getInitialDate();

  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);
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
    serviceType: 'OFFER_4',
    dates: [],
    extraHours: 0,
    workerCount: 1,
    price: 0
  });
  const [availableDatesCount, setAvailableDatesCount] = useState(4);
  const selectedDateRef = useRef(selectedDate);

  const [tempDate, setTempDate] = useState(initialDate.toISOString().split('T')[0]);
  const [tempTimePeriod, setTempTimePeriod] = useState('MORNING');


  useEffect(() => {
    const dates = getWeekDates(currentDate);
    setWeekDates(dates);
  }, [currentDate]);

  useEffect(() => {
    selectedDateRef.current = selectedDate;
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDateRef.current) {
      fetchReservations(selectedDateRef.current);

    } else {
      fetchReservations(initialDate);

    }
     fetchUncompletedReservations(selectedDateRef.current);
  }, [selectedDateRef]);

  useEffect(() => {
    switch (newReservation.serviceType) {
      case 'OFFER_4':
        setAvailableDatesCount(4);
        break;
      case 'OFFER_8':
        setAvailableDatesCount(8);
        break;
      case 'OFFER_12':
        setAvailableDatesCount(12);
        break;
      default:
        setAvailableDatesCount(1);
        break;
    }
    setNewReservation(prev => ({ ...prev, dates: [] }));
  }, [newReservation.serviceType]);


  const getWeekDates = (date: Date): Date[] => {
    const day = date.getDay();
    const diff = day === 0 ? -1 : 6 - day;
    const saturdayDate = new Date(date);
    saturdayDate.setDate(date.getDate() + diff);
    const weekDays: Date[] = [];
    for (let i = 0; i < 6; i++) {
      const currentDate = new Date(saturdayDate);
      currentDate.setDate(saturdayDate.getDate() + i);
      weekDays.push(currentDate);
    }
    return weekDays;
  };


  const getArabicDayName = (date: Date): string => {
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    return days[date.getDay()];
  };

  interface DateWithMonth {
    getMonth: () => number;
  }

  const getArabicMonthName = (date: DateWithMonth): string => {
    const months: string[] = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    return months[date.getMonth()];
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
    const newMonth = (currentDate.getMonth() + 1) % 12;
    const newDate = new Date(currentDate);
    newDate.setMonth(newMonth);
    setCurrentDate(newDate);
  };

  interface Reservation {
    id: number;
    name: string;
    phone: string;
    email?: string;
    city: string;
    address: string;
    locationUrl?: string;
    serviceType: string;
    dates: { date: Date; timePeriod: string }[];
    extraHours: number;
    workerCount: number;
    price: number;
    timePeriod?: string;
  }


  interface NewReservation {
    name: string;
    phone: string;
    email: string;
    city: string;
    address: string;
    locationUrl: string;
    serviceType: string;
    dates: { date: Date; timePeriod: keyof typeof TimePeriod }[];
    extraHours: number;
    workerCount: number;
    price: number;
  }

  const selectDate = (date: Date) => {
    setSelectedDate(date);
    fetchReservations(date);
    fetchUncompletedReservations(date);
  };


  interface Reservation {
    id: number;
    name: string;
    phone: string;
    email?: string;
    city: string;
    address: string;
    locationUrl?: string;
    serviceType: string;
    dates: { date: Date; timePeriod: string }[];
    extraHours: number;
    workerCount: number;
    price: number;
    timePeriod?: string;
  }

  const fetchReservations = async (date: Date): Promise<void> => {
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

      const data: Reservation[] = await response.json();
      console.log('Fetched reservations:', data);
      setReservations(data);
      setExpandedRows({});
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
      alert("فشل في جلب الحجوزات. يرجى المحاولة مرة أخرى لاحقًا.");
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };


  interface UncompletedReservation {
    id: number;
    name: string;
    phone: string;
    email?: string;
    city: string;
    address: string;
    locationUrl?: string;
    serviceType: string;
    dates: { date: Date; timePeriod: string }[];
    extraHours: number;
    workerCount: number;
    price: number;
    timePeriod?: string;
  }

  const fetchUncompletedReservations = async (date: Date): Promise<void> => {
    setLoading(true);
    const currentDateString = date.toISOString().split('T')[0];
    console.log('currentDateString:', currentDateString);
    const link = '/api/uncompleted?date=' + currentDateString;
    try {
      const response = await fetch(link);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: UncompletedReservation[] = await response.json();
      console.log('Fetched uncompleted reservations:', data);
      setUncompletedReservations(data);
    } catch (error) {
      console.error("Failed to fetch uncompleted reservations:", error);
      alert("فشل في جلب الحجوزات الغير مكتملة. يرجى المحاولة مرة أخرى لاحقًا.");
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, called: true }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setUncompletedReservations(prev =>
        prev.map(res => res.id === id ? { ...res, called: true } : res)
      );
      alert('تم تحديث حالة الحجز إلى "تم الاتصال" بنجاح');
      fetchUncompletedReservations(selectedDateRef.current);
    } catch (error) {
      console.error("Failed to update called status:", error);
      alert("فشل في تحديث حالة الاتصال. يرجى المحاولة مرة أخرى لاحقًا.");
    } finally {
      setLoading(false);
      fetchUncompletedReservations(selectedDateRef.current);
    }
  };


  interface ExpandedRowsState {
    [key: number]: boolean;
  }

  const toggleRowExpansion = (id: number): void => {
    setExpandedRows((prev: ExpandedRowsState) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  interface DeleteReservationResponse {
    ok: boolean;
    status: number;
  }

  const deleteReservation = async (id: number): Promise<void> => {
    if (window.confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
      setLoading(true);
      try {
        const response: DeleteReservationResponse = await fetch('/api/booking', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setReservations(prev => prev.filter(res => res.id !== id));
        alert('تم حذف الحجز بنجاح');
      } catch (error) {
        console.error("Failed to delete reservation:", error);
        alert("فشل في حذف الحجز. يرجى المحاولة مرة أخرى لاحقًا.");
      } finally {
        setLoading(false);
      }
    }
  };

  const editReservation = (reservation: Reservation, type: string) => {
    if (type === "UNCOMPLETED") {
      setEditingReservationId(null);
    }else{
      setEditingReservationId(reservation.id);
    }
    
    setNewReservation({
      name: reservation.name,
      phone: reservation.phone,
      email: reservation.email || '',
      city: reservation.city,
      address: reservation.address,
      locationUrl: reservation.locationUrl || '',
      serviceType: reservation.serviceType,
      dates: reservation.dates ? reservation.dates.map((d: { date: string | number | Date; timePeriod: string; }) => ({date: new Date(d.date), timePeriod: d.timePeriod as keyof typeof TimePeriod})) : [],
      extraHours: reservation.extraHours,
      workerCount: reservation.workerCount,
      price: reservation.price
    });
    setShowNewReservationForm(true);
  };

  const handleAddReservation = async () => {
    if (!newReservation.name || !newReservation.phone || !newReservation.city || !newReservation.address) {
      alert('الرجاء ملء جميع الحقول الإلزامية');
      return;
    }
    if (newReservation.dates.length === 0) {
      alert('الرجاء اختيار تاريخ واحد على الأقل');
      return;
    }

    setLoading(true);
    try {


 for (const datePeriod of newReservation.dates) {
  const reservationPayload = {
    name: newReservation.name,
    phone: newReservation.phone,
    email: newReservation.email,
    city: newReservation.city,
    address: newReservation.address,
    locationUrl: newReservation.locationUrl,
    serviceType: newReservation.serviceType,
    date: datePeriod.date.toISOString(),
    timePeriod: datePeriod.timePeriod,
    extraHours: newReservation.extraHours,
    workerCount: newReservation.workerCount,
    price: newReservation.price
  };

  let response;
  if (editingReservationId ) {

    response = await fetch('/api/booking', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: editingReservationId, ...reservationPayload }),
    });
  } else {
    response = await fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationPayload),
    });
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
      const responseData = await response.json();

      if (editingReservationId) {
        setReservations(prevReservations =>
          prevReservations.map(res => res.id === editingReservationId ? { ...res, ...newReservation, id: editingReservationId } : res)
        );
        alert('تم تعديل الحجز بنجاح');
      } else {
        setReservations(prevReservations => [...prevReservations, { ...newReservation, id: responseData.id }]);
        alert('تم إضافة الحجز بنجاح');
      }
    }
      fetchReservations(selectedDateRef.current);
      setNewReservation({
        name: '',
        phone: '',
        email: '',
        city: '',
        address: '',
        locationUrl: '',
        serviceType: 'OFFER_4',
        dates: [],
        extraHours: 0,
        workerCount: 1,
        price: 0
      });
      setShowNewReservationForm(false);
      setEditingReservationId(null);
    } catch (error) {
      console.log('New reservation:', newReservation);
      console.error("Failed to add/edit reservation:", error);
      alert(`فشل في ${editingReservationId ? 'تعديل' : 'إضافة'} الحجز. يرجى المحاولة مرة أخرى لاحقًا.`);
    } finally {
      setLoading(false);
    }
  };


  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    let processedValue: string | number = value;
    if (name === 'extraHours' || name === 'workerCount' || name === 'price') {
      processedValue = parseFloat(value) || 0;
    }
    setNewReservation({
      ...newReservation,
      [name]: processedValue
    });
  };


  const handleTempDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTempDate(e.target.value);
  };

  const handleTempTimePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setTempTimePeriod(e.target.value);
  };


  const addDatePeriod = () => {
    const selectedDate = new Date(tempDate);
    const dayOfWeek = selectedDate.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(3, 0, 0, 0);

    if (selectedDate < today) {
      alert('لا يمكن إضافة تواريخ سابقة لليوم الحالي.');
      return;
    }

    if (  dayOfWeek === 5) {
      alert('لا يمكن إضافة حجوزات في أيام  الجمعة.');
      return;
    }

    const isDuplicate = newReservation.dates.some(d => {
      const existingDate = new Date(d.date);
      existingDate.setHours(3, 0, 0, 0);
      return existingDate.getTime() === selectedDate.getTime();
    });

    if (isDuplicate) {
      alert('لا يمكن إضافة نفس التاريخ أكثر من مرة.');
      return;
    }
if (editingReservationId && newReservation.dates.length > 0) {
  alert('لا يمكنك إضافة تواريخ جديدة أثناء التعديل.');
  return;
}

    if (newReservation.dates.length < availableDatesCount) {
      setNewReservation(prev => ({
        ...prev,
        dates: [...prev.dates, { date: selectedDate, timePeriod: tempTimePeriod as keyof typeof TimePeriod }]
      }));
    } else {
      alert(`لا يمكنك إضافة أكثر من ${availableDatesCount} تواريخ لهذا العرض.`);
    }
  };


  const removeDatePeriod = (index: number): void => {
    const newDates = newReservation.dates.filter((_, i) => i !== index);
    setNewReservation(prev => ({ ...prev, dates: newDates }));
  };


  const morningReservations = reservations.filter(res => res.timePeriod ===  "MORNING");
  const eveningReservations = reservations.filter(res => res.timePeriod === "EVENING");


  const totalMorningWorkers = morningReservations.reduce((sum, res) => sum + res.workerCount, 0);
  const totalEveningWorkers = eveningReservations.reduce((sum, res) => sum + res.workerCount, 0);

  const remainingMorningWorkers = Math.max(0, 19 - totalMorningWorkers);
  const remainingEveningWorkers = Math.max(0, 19 - totalEveningWorkers);


  const closeNewReservationForm = () => {
    setShowNewReservationForm(false);
    setEditingReservationId(null);
    setNewReservation({
      name: '',
      phone: '',
      email: '',
      city: '',
      address: '',
      locationUrl: '',
      serviceType: 'OFFER_4',
      dates: [],
      extraHours: 0,
      workerCount: 1,
      price: 0
    });
  };


  if (loadingLoginCheck) {
    return <div>جاري التحقق من تسجيل الدخول...</div>;
  }


  return (
    
    (logedin && admin) ? (
      
    <div className="flex flex-col p-4 sm:p-6 text-right" dir="rtl"> {/* تقليل الـ padding للشاشات الصغيرة */}
     <Suspense fallback={<div>Loading date preference...</div>}>
        {/* نمرر دالة تحديث الحالة للمكون الداخلي */}
        <DateReader setInitialDate={setSelectedDate} />
      </Suspense>
       <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6"> {/* تخطيط عمودي على الشاشات الصغيرة وأفقي على المتوسطة والكبيرة */}
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">{editingReservationId ? 'تعديل حجز' : 'نظام إدارة الحجوزات'}</h1> {/* تصغير حجم الخط على الشاشات الصغيرة */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4"> {/* تخطيط عمودي على الشاشات الصغيرة وأفقي على المتوسطة والكبيرة */}
          <div className="bg-gray-100 p-3 rounded-lg text-sm flex items-center ml-0 sm:ml-4"> {/* إزالة الهامش الأيسر على الشاشات الصغيرة */}
            <div className="ml-0 sm:ml-4"> {/* إزالة الهامش الأيسر على الشاشات الصغيرة */}
              <span className="block font-medium text-gray-800">إجمالي العمال المتاحين:</span>
              <span className="block text-gray-600">19 عامل لكل فترة (صباحية/مسائية)</span>
            </div>
          </div>
          <button
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center w-full sm:w-auto" 
            onClick={() => {
              setNewReservation({
                ...newReservation,
                dates: [],
                serviceType: 'OFFER_4'
              });
              setEditingReservationId(null);
              setShowNewReservationForm(true);
            }}
          >
            <Plus size={20} className="ml-2" />
            حجز جديد
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 sm:mb-6 bg-gray-100 p-3 sm:p-4 rounded-lg"> {/* تقليل الـ padding للشاشات الصغيرة */}
        <button
          onClick={goToPreviousWeek}
          className="p-2 bg-white rounded-full shadow hover:bg-gray-50"
        >
          <ChevronRight size={20} />
        </button>

        <div className="flex flex-col items-center">
          <button
            onClick={changeMonth}
            className="font-bold text-lg hover:underline"
          >
            {weekDates.length > 0 ? getArabicMonthName(weekDates[0]) : ''} {weekDates.length > 0 ? weekDates[0].getFullYear() : ''}
          </button>
        </div>

        <button
          onClick={goToNextWeek}
          className="p-2 bg-white rounded-full shadow hover:bg-gray-50"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4 mb-6 sm:mb-8"> {/* تقليل عدد الأعمدة والـ gap على الشاشات الصغيرة */}
        {weekDates.map((date) => (
          <button
            key={date.toISOString()}
            onClick={() => selectDate(date)}
            className={`flex flex-col items-center p-2 sm:p-4 rounded-lg shadow-sm transition-colors text-sm sm:text-base 
              ${selectedDate && date.toDateString() === selectedDate.toDateString()
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-50'}
              ${date.toDateString() === initialDate.toDateString() ? 'ring-2 ring-blue-500' : ''}`}
            
          >
            <span className="font-bold">{getArabicDayName(date)}</span>
            <span className="text-xs sm:text-sm mt-1"> {/* تقليل حجم الخط على الشاشات الصغيرة */}
              {date.getDate()} {getArabicMonthName(date)}
            </span>
          </button>
        ))}
      </div>

      {selectedDate ? (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6"> {/* تقليل الـ padding للشاشات الصغيرة */}
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"> {/* تصغير حجم الخط على الشاشات الصغيرة */}
            حجوزات يوم {getArabicDayName(selectedDate)} {selectedDate.getDate()} {getArabicMonthName(selectedDate)}
          </h2>

          {loading ? (
            <div className="text-center py-8">جاري تحميل البيانات...</div>
          ) : (
            <>
              <div className="mb-6 sm:mb-8"> {/* تقليل الـ mb للشاشات الصغيرة */}
                <div className="flex justify-between items-center bg-blue-50 p-2 rounded mb-2 sm:mb-4"> {/* تقليل الـ mb للشاشات الصغيرة */}
                <div className="font-bold text-lg flex items-center">
                  <Clock size={18} className="ml-2" />
                  الفترة الصباحية
                </div>
                <div className="flex items-center text-xs sm:text-sm"> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                  <div className={`px-2 sm:px-3 py-1 rounded-full text-sm 
                    remainingMorningWorkers === 0 ? 'bg-red-100 text-red-800' :
                    remainingMorningWorkers < 5 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    <span className="font-medium">العمال المتبقين: {remainingMorningWorkers}</span>
                    {remainingMorningWorkers === 0 &&
                      <span className="mr-1 text-xs">(لا يمكن إضافة حجوزات جديدة)</span>
                    }
                  </div>
                </div>
              </div>

                {morningReservations.length === 0 ? (
                  <p className="text-gray-500 text-center py-4 text-sm">لا توجد حجوزات في الفترة الصباحية</p> 
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm"> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-2 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500">الاسم</th> {/* تقليل الـ padding */}
                          <th className="px-2 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500">رقم الهاتف</th> {/* تقليل الـ padding */}
                          <th className="px-2 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500">إجراءات</th> {/* تقليل الـ padding */}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {morningReservations.map((reservation) => (
                          <React.Fragment key={reservation.id}>
                            <tr
                              className="hover:bg-gray-50 cursor-pointer"
                              onClick={() => toggleRowExpansion(reservation.id)}
                            >
                              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">{reservation.name}</td> {/* تقليل الـ padding */}
                              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"> {/* تقليل الـ padding */}
                                <a href={`tel:${reservation.phone}`} className="text-blue-500 hover:underline flex items-center" onClick={(e) => e.stopPropagation()}>
                                  <Phone size={16} className="ml-1" />
                                  {reservation.phone}
                                </a>
                              </td>
                              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"> {/* تقليل الـ padding */}
                                <div className="flex items-center justify-center sm:justify-start"> {/* توسيط الأيقونات على الشاشات الصغيرة */}
                                  <button
                                    className="text-blue-500 hover:text-blue-700 ml-2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      editReservation(reservation, "COMPLETED");
                                    }}
                                  >
                                    <Edit size={16} />
                                  </button>
                                  <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteReservation(reservation.id);
                                    }}
                                  >
                                    <X size={16} />
                                  </button>
                                  {expandedRows[reservation.id] ?
                                    <ChevronUp size={16} className="mr-2" /> :
                                    <ChevronDown size={16} className="mr-2" />
                                  }
                                </div>
                              </td>
                            </tr>
                            {expandedRows[reservation.id] && (
                              <tr>
                                <td colSpan={3} className="px-4 py-3 bg-gray-50"> {/* تقليل الـ padding */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4"> {/* تقليل الـ gap على الشاشات الصغيرة */}
                                    <div className="flex items-start">
                                      <Mail size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">البريد الإلكتروني:</span>
                                        <p className="text-sm">{reservation.email || 'غير متوفر'}</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <MapPin size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">المدينة:</span>
                                        <p className="text-sm">{reservation.city}</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <MapPin size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">العنوان:</span>
                                        <p className="text-sm">{reservation.address}</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
                                    {reservation.locationUrl && (
                                      <div className="flex items-start">
                                        <MapPin size={16} className="mt-1 ml-2" />
                                        <div>
                                          <span className="text-sm text-gray-500">رابط الموقع:</span>
                                          <p className="text-sm"> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                            <a href={reservation.locationUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                              فتح الموقع
                                            </a>
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                    <div className="flex items-start">
                                      <Calendar size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">نوع الخدمة:</span>
                                        <p className="text-sm">{reservation.serviceType}</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Clock size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">ساعات إضافية:</span>
                                        <p className="text-sm">{reservation.extraHours}</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Users size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">عدد العمال:</span>
                                        <p className="text-sm">{reservation.workerCount}</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <DollarSign size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">السعر:</span>
                                        <p className="text-sm">{reservation.price} درهم</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
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

              <div>
                <div className="flex justify-between items-center bg-indigo-50 p-2 rounded mb-2 sm:mb-4"> {/* تقليل الـ mb للشاشات الصغيرة */}
                <div className="font-bold text-lg flex items-center">
                  <Clock size={18} className="ml-2" />
                  الفترة المسائية
                </div>
                <div className="flex items-center text-xs sm:text-sm"> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                  <div className={`px-2 sm:px-3 py-1 rounded-full text-sm 
                    remainingEveningWorkers === 0 ? 'bg-red-100 text-red-800' :
                    remainingEveningWorkers < 5 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    <span className="font-medium">العمال المتبقين: {remainingEveningWorkers}</span>
                    {remainingEveningWorkers === 0 &&
                      <span className="mr-1 text-xs">(لا يمكن إضافة حجوزات جديدة)</span>
                    }
                  </div>
                </div>
              </div>

                {eveningReservations.length === 0 ? (
                  <p className="text-gray-500 text-center py-4 text-sm">لا توجد حجوزات في الفترة المسائية</p> 
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm"> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-2 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500">الاسم</th> {/* تقليل الـ padding */}
                          <th className="px-2 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500">رقم الهاتف</th> {/* تقليل الـ padding */}
                          <th className="px-2 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500">إجراءات</th> {/* تقليل الـ padding */}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {eveningReservations.map((reservation) => (
                          <React.Fragment key={reservation.id}>
                            <tr
                              className="hover:bg-gray-50 cursor-pointer"
                              onClick={() => toggleRowExpansion(reservation.id)}
                            >
                              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">{reservation.name}</td> {/* تقليل الـ padding */}
                              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"> {/* تقليل الـ padding */}
                                <a href={`tel:${reservation.phone}`} className="text-blue-500 hover:underline flex items-center" onClick={(e) => e.stopPropagation()}>
                                  <Phone size={16} className="ml-1" />
                                  {reservation.phone}
                                </a>
                              </td>
                              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"> {/* تقليل الـ padding */}
                                <div className="flex items-center justify-center sm:justify-start"> {/* توسيط الأيقونات على الشاشات الصغيرة */}
                                  <button
                                    className="text-blue-500 hover:text-blue-700 ml-2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      editReservation(reservation, "COMPLETED");
                                    }}
                                  >
                                    <Edit size={16} />
                                  </button>
                                  <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteReservation(reservation.id);
                                    }}
                                  >
                                    <X size={16} />
                                  </button>
                                  {expandedRows[reservation.id] ?
                                    <ChevronUp size={16} className="mr-2" /> :
                                    <ChevronDown size={16} className="mr-2" />
                                  }
                                </div>
                              </td>
                            </tr>
                            {expandedRows[reservation.id] && (
                              <tr>
                                <td colSpan={3} className="px-4 py-3 bg-gray-50"> {/* تقليل الـ padding */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4"> {/* تقليل الـ gap على الشاشات الصغيرة */}
                                    <div className="flex items-start">
                                      <Mail size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">البريد الإلكتروني:</span>
                                        <p className="text-sm">{reservation.email || 'غير متوفر'}</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <MapPin size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">المدينة:</span>
                                        <p className="text-sm">{reservation.city}</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <MapPin size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">العنوان:</span>
                                        <p className="text-sm">{reservation.address}</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
                                    {reservation.locationUrl && (
                                      <div className="flex items-start">
                                        <MapPin size={16} className="mt-1 ml-2" />
                                        <div>
                                          <span className="text-sm text-gray-500">رابط الموقع:</span>
                                          <p className="text-sm"> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                            <a href={reservation.locationUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                              فتح الموقع
                                            </a>
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                    <div className="flex items-start">
                                      <Calendar size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">نوع الخدمة:</span>
                                        <p className="text-sm">{reservation.serviceType}</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Clock size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">ساعات إضافية:</span>
                                        <p className="text-sm">{reservation.extraHours}</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Users size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">عدد العمال:</span>
                                        <p className="text-sm">{reservation.workerCount}</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <DollarSign size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">السعر:</span>
                                        <p className="text-sm">{reservation.price} ريال</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
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


              <div className="mt-6 sm:mt-8"> {/* تقليل الـ mt للشاشات الصغيرة */}
                <div className="flex justify-between items-center bg-orange-50 p-2 rounded mb-2 sm:mb-4"> {/* تقليل الـ mb للشاشات الصغيرة */}
                  <div className="font-bold text-lg flex items-center">
                    <Clock size={18} className="ml-2" />
                    الحجوزات الغير مكتملة
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-8">جاري تحميل البيانات...</div>
                ) : uncompletedReservations.length === 0 ? (
                  <p className="text-gray-500 text-center py-4 text-sm">لا توجد حجوزات غير مكتملة</p> 
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm"> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-2 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500">الاسم</th> {/* تقليل الـ padding */}
                          <th className="px-2 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500">رقم الهاتف</th> {/* تقليل الـ padding */}
                          <th className="px-2 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500">الإجراءات</th> {/* تقليل الـ padding */}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {uncompletedReservations.map((reservation) => (
                          <React.Fragment key={reservation.id}>
                            <tr
                              className="hover:bg-gray-50 cursor-pointer"
                              onClick={() => toggleRowExpansion(reservation.id)}
                            >
                              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">{reservation.name}</td> {/* تقليل الـ padding */}
                              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"> {/* تقليل الـ padding */}
                                <a href={`tel:${reservation.phone}`} className="text-blue-500 hover:underline flex items-center" onClick={(e) => e.stopPropagation()}>
                                  <Phone size={16} className="ml-1" />
                                  {reservation.phone}
                                </a>
                              </td>
                              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap"> {/* تقليل الـ padding */}
                                <div className="flex items-center justify-center sm:justify-start"> {/* توسيط الأيقونات على الشاشات الصغيرة */}
                                  <button
                                    className="text-green-500 hover:text-green-700 ml-2 flex items-center" /* إضافة flex items-center لتوسيط الأيقونة والنص عمودياً */
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      markAsCalled(reservation.id);
                                    }}
                                  >
                                    <Phone size={16} className="ml-1" />
                                    تأكيد الاتصال
                                  </button>
                                  <button
                                    className="text-blue-500 hover:text-blue-700 ml-2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                       
                                      editReservation(reservation,"UNCOMPLETED");
                                    }}
                                  >
                                    <Edit size={16} />
                                  </button>
                                  <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteReservation(reservation.id);
                                    }}
                                  >
                                    <X size={16} />
                                  </button>
                                  {expandedRows[reservation.id] ?
                                    <ChevronUp size={16} className="mr-2" /> :
                                    <ChevronDown size={16} className="mr-2" />
                                  }
                                </div>
                              </td>
                            </tr>
                            {expandedRows[reservation.id] && (
                              <tr>
                                <td colSpan={3} className="px-4 py-3 bg-gray-50"> {/* تقليل الـ padding */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4"> {/* تقليل الـ gap على الشاشات الصغيرة */}
                                    <div className="flex items-start">
                                      <Mail size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">البريد الإلكتروني:</span>
                                        <p className="text-sm">{reservation.email || 'غير متوفر'}</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <MapPin size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">المدينة:</span>
                                        <p className="text-sm">{reservation.city}</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <MapPin size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">العنوان:</span>
                                        <p className="text-sm">{reservation.address}</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
                                    {reservation.locationUrl && (
                                      <div className="flex items-start">
                                        <MapPin size={16} className="mt-1 ml-2" />
                                        <div>
                                          <span className="text-sm text-gray-500">رابط الموقع:</span>
                                          <p className="text-sm"> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                            <a href={reservation.locationUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                              فتح الموقع
                                            </a>
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                    <div className="flex items-start">
                                      <Calendar size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">نوع الخدمة:</span>
                                        <p className="text-sm">{reservation.serviceType}</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Clock size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">ساعات إضافية:</span>
                                        <p className="text-sm">{reservation.extraHours}</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Users size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">عدد العمال:</span>
                                        <p className="text-sm">{reservation.workerCount}</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                                      </div>
                                    </div>
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
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500 text-sm">الرجاء اختيار تاريخ لعرض الحجوزات</p> {/* تصغير حجم الخط على الشاشات الصغيرة */}
        </div>
      )}

      {showNewReservationForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto  p-8  pt-48 w-full z-50 flex justify-center items-center" dir="rtl">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg w-full max-w-lg mt-[120%]  mb-16 " > {/* تقليل الـ padding للشاشات الصغيرة */}
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">{editingReservationId ? 'تعديل حجز' : 'إضافة حجز جديد'}</h2> {/* تصغير حجم الخط والـ mb على الشاشات الصغيرة */}

            <div className="mb-3 sm:mb-4"> {/* تقليل الـ mb للشاشات الصغيرة */}
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">اسم العميل*</label>
              <input type="text" id="name" name="name" value={newReservation.name} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" /> {/* تصغير حجم الخط على الشاشات الصغيرة */}
            </div>
            <div className="mb-3 sm:mb-4"> {/* تقليل الـ mb للشاشات الصغيرة */}
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">رقم الهاتف*</label>
              <input type="tel" id="phone" name="phone" value={newReservation.phone} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" /> {/* تصغير حجم الخط على الشاشات الصغيرة */}
            </div>
            <div className="mb-3 sm:mb-4"> {/* تقليل الـ mb للشاشات الصغيرة */}
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">البريد الإلكتروني</label>
              <input type="email" id="email" name="email" value={newReservation.email} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" /> {/* تصغير حجم الخط على الشاشات الصغيرة */}
            </div>
            <div className="mb-3 sm:mb-4"> {/* تقليل الـ mb للشاشات الصغيرة */}
              <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">المدينة*</label>
              <input type="text" id="city" name="city" value={newReservation.city} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" /> {/* تصغير حجم الخط على الشاشات الصغيرة */}
            </div>
            <div className="mb-3 sm:mb-4"> {/* تقليل الـ mb للشاشات الصغيرة */}
              <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">العنوان*</label>
              <textarea id="address" name="address" value={newReservation.address} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"></textarea> {/* تصغير حجم الخط على الشاشات الصغيرة */}
            </div>
            <div className="mb-3 sm:mb-4"> {/* تقليل الـ mb للشاشات الصغيرة */}
              <label htmlFor="locationUrl" className="block text-gray-700 text-sm font-bold mb-2">رابط الموقع (اختياري)</label>
              <input type="url" id="locationUrl" name="locationUrl" value={newReservation.locationUrl} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" /> {/* تصغير حجم الخط على الشاشات الصغيرة */}
            </div>

            <div className="mb-3 sm:mb-4"> {/* تقليل الـ mb للشاشات الصغيرة */}
              <label htmlFor="serviceType" className="block text-gray-700 text-sm font-bold mb-2">نوع الخدمة</label>
              <select
                id="serviceType"
                name="serviceType"
                value={newReservation.serviceType}
                onChange={handleFormChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" /* تصغير حجم الخط على الشاشات الصغيرة */
                disabled={!!editingReservationId}
              >
                {Object.keys(ServiceType).map((key) => (
                  <option key={key} value={key}>{ServiceType[key as keyof typeof ServiceType]}</option>
                ))}
              </select>
            </div>


            <div className="mb-3 sm:mb-4"> {/* تقليل الـ mb للشاشات الصغيرة */}
              <label className="block text-gray-700 text-sm font-bold mb-2">إضافة تواريخ وفترات زمنية</label>
              <div className="flex flex-col sm:flex-row items-center mb-2 space-y-2 sm:space-y-0 sm:space-x-2"> {/* تخطيط عمودي على الشاشات الصغيرة وأفقي على المتوسطة والكبيرة */}
                <input
                  type="date"
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" /* تصغير حجم الخط على الشاشات الصغيرة */
                  value={tempDate}
                  onChange={handleTempDateChange}
                  min={new Date().toISOString().split('T')[0]}
                />
                <select
                  className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" /* تصغير حجم الخط على الشاشات الصغيرة */
                  value={tempTimePeriod}
                  onChange={handleTempTimePeriodChange}
                >
                  {Object.keys(TimePeriod).map((key) => (
                    <option key={key} value={key}>{TimePeriod[key as keyof typeof TimePeriod]}</option>
                  ))}
                </select>
                <button
                  onClick={addDatePeriod}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm w-full sm:w-auto" /* تصغير حجم الخط وجعل الزر يأخذ العرض الكامل على الشاشات الصغيرة */
                  type="button"
                >
                  <Plus size={16} className="inline-block ml-2" />
                  إضافة
                </button>
              </div>


              {newReservation.dates.length > 0 && (
                <div className="mt-2 sm:mt-4"> {/* تقليل الـ mt للشاشات الصغيرة */}
                  <h3 className="font-bold mb-2 text-sm">التواريخ والفترات المحددة:</h3> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                  <div className="overflow-x-auto"> {/* إضافة تمرير أفقي إذا لزم الأمر */}
                    <table className="min-w-full text-xs sm:text-sm"> {/* تصغير حجم الخط على الشاشات الصغيرة */}
                      <thead>
                        <tr>
                          <th className="px-2 sm:px-4 py-1 sm:py-2 text-right text-xs">التاريخ</th> {/* تقليل الـ padding وحجم الخط */}
                          <th className="px-2 sm:px-4 py-1 sm:py-2 text-right text-xs">الفترة الزمنية</th> {/* تقليل الـ padding وحجم الخط */}
                          <th className="px-2 sm:px-4 py-1 sm:py-2 text-right text-xs"></th> {/* تقليل الـ padding وحجم الخط */}
                        </tr>
                      </thead>
                      <tbody>
                        {newReservation.dates.map((datePeriod, index) => (
                          <tr key={index}>
                            <td className="border px-2 sm:px-4 py-1 sm:py-2 text-xs">{datePeriod.date ? new Date(datePeriod.date).toLocaleDateString('ar-SA', { calendar: 'gregory' }) : 'غير محدد'}</td> {/* تقليل الـ padding وحجم الخط */}
                            <td className="border px-2 sm:px-4 py-1 sm:py-2 text-xs">{TimePeriod[datePeriod.timePeriod as keyof typeof TimePeriod]}</td> {/* تقليل الـ padding وحجم الخط */}
                            <td className="border px-2 sm:px-4 py-1 sm:py-2 text-xs"> {/* تقليل الـ padding وحجم الخط */}
                              <button
                                onClick={() => removeDatePeriod(index)}
                                className="text-red-500 hover:text-red-700"
                                type="button"
                              >
                                <X size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>


            <div className="mb-3 sm:mb-4"> {/* تقليل الـ mb للشاشات الصغيرة */}
              <label htmlFor="extraHours" className="block text-gray-700 text-sm font-bold mb-2">ساعات إضافية</label>
              <input type="number" id="extraHours" name="extraHours" value={newReservation.extraHours} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" /> {/* تصغير حجم الخط على الشاشات الصغيرة */}
            </div>
            <div className="mb-3 sm:mb-4"> {/* تقليل الـ mb للشاشات الصغيرة */}
              <label htmlFor="workerCount" className="block text-gray-700 text-sm font-bold mb-2">عدد العمال</label>
              <input type="number" id="workerCount" name="workerCount" value={newReservation.workerCount} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" /> {/* تصغير حجم الخط على الشاشات الصغيرة */}
            </div>
            <div className="mb-4 sm:mb-6"> {/* تقليل الـ mb للشاشات الصغيرة */}
              <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">السعر</label>
              <input
                type="number"
                id="price"
                name="price"
                value={newReservation.price}
                onChange={handleFormChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" /* تصغير حجم الخط على الشاشات الصغيرة */
                disabled={!!editingReservationId}
              />
            </div>


            <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2"> {/* تخطيط عمودي على الشاشات الصغيرة وأفقي على المتوسطة والكبيرة */}
              <button onClick={closeNewReservationForm} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm w-full sm:w-auto" type="button"> {/* تصغير حجم الخط وجعل الزر يأخذ العرض الكامل على الشاشات الصغيرة */}
                إلغاء
              </button>
              <button onClick={handleAddReservation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm w-full sm:w-auto" type="button"> {/* تصغير حجم الخط وجعل الزر يأخذ العرض الكامل على الشاشات الصغيرة */}
                <Save size={16} className="inline-block ml-2" />
                {editingReservationId ? 'حفظ التعديلات' : 'حفظ الحجز'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    ) : (
     (router.push('/login'),
      !loadingLoginCheck ? <div>يتم التحويل إلى صفحة تسجيل الدخول...</div> : null)
    )
  );
};

export default ReservationManager;