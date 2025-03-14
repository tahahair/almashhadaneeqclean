"use client"
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Calendar, Clock, MapPin, Phone, Mail,  DollarSign, Users, X, Edit, ChevronDown, ChevronUp, Plus, Save } from 'lucide-react';

// أنواع الخدمات
const ServiceType = {
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
  // دالة للحصول على التاريخ الأولي (اليوم أو السبت القادم)
  const getInitialDate = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    if (dayOfWeek === 4 || dayOfWeek === 5) {
      const daysUntilSaturday = dayOfWeek === 4 ? 2 : 1;
      const nextSaturday = new Date(today);
      nextSaturday.setDate(today.getDate() + daysUntilSaturday);
      return nextSaturday;
    }
    return today;
  };

  const initialDate = getInitialDate();

  // حالات التطبيق
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [reservations, setReservations] = useState([]);
  const [uncompletedReservations, setUncompletedReservations] = useState([]); // حالة جديدة للحجوزات غير المكتملة
  const [expandedRows, setExpandedRows] = useState({});
  const [loading, setLoading] = useState(false);
  const [showNewReservationForm, setShowNewReservationForm] = useState(false);
  const [editingReservationId, setEditingReservationId] = useState(null);
  const [newReservation, setNewReservation] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    locationUrl: '',
    serviceType: 'OFFER_4',
    dates: [], // مصفوفة للتواريخ والفترات الزمنية
    extraHours: 0,
    workerCount: 1,
    price: 0
  });
  const [availableDatesCount, setAvailableDatesCount] = useState(4);
  const selectedDateRef = useRef(selectedDate);

  // حالات مؤقتة لاختيار التاريخ والفترة قبل الإضافة
  const [tempDate, setTempDate] = useState(initialDate.toISOString().split('T')[0]);
  const [tempTimePeriod, setTempTimePeriod] = useState('MORNING');

  // تأثيرات جانبية
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
     // جلب الحجوزات غير المكتملة عند تحميل الصفحة وفي كل تحديث
  }, [selectedDateRef]);

  useEffect(() => {
    // تحديث عدد التواريخ المتاحة بناءً على نوع الخدمة
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
        setAvailableDatesCount(1); // لمرة واحدة
        break;
    }
    setNewReservation(prev => ({ ...prev, dates: [] })); // إعادة تهيئة التواريخ عند تغيير نوع الخدمة
  }, [newReservation.serviceType]);

  // دوال التقويم الأسبوعي



  const getWeekDates = (date: Date): Date[] => {
    const day = date.getDay();
    const diff = day === 0 ? -1 : 6 - day;
    const saturdayDate = new Date(date);
    saturdayDate.setDate(date.getDate() + diff);
    const weekDays: Date[] = [];
    for (let i = 0; i < 5; i++) {
      const currentDate = new Date(saturdayDate);
      currentDate.setDate(saturdayDate.getDate() + i);
      weekDays.push(currentDate);
    }
    return weekDays;
  };

  const getArabicDayName = (date) => {
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    return days[date.getDay()];
  };

  const getArabicMonthName = (date) => {
    const months = [
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

  const selectDate = (date) => {
    setSelectedDate(date);
    fetchReservations(date);
    fetchUncompletedReservations(date);
  };

  // دالة جلب الحجوزات
  const fetchReservations = async (date) => {
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

  // دالة جلب الحجوزات الغير مكتملة
  const fetchUncompletedReservations = async (date) => {
    setLoading(true);
    const currentDateString =  date.toISOString().split('T')[0];
console.log('currentDateString:', currentDateString);
const link= '/api/uncompleted?date='+currentDateString;
    try {
      const response = await fetch(link); // استدعاء الاي بي اي الخاص بالحجوزات الغير مكتملة
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
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

  // دالة تحديث حالة الاتصال في الحجوزات الغير مكتملة
  const markAsCalled = async (id) => {
    setLoading(true);
    try {
        const response = await fetch(`/api/uncompleted`, { // استخدام API الـ PUT الحالية
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, called: true }), // إرسال id مع البيانات
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


  // دوال إدارة الحجوزات
  const toggleRowExpansion = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const deleteReservation = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
      setLoading(true);
      try {
        const response = await fetch('/api/booking', {
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

  const editReservation = (reservation) => {
    setEditingReservationId(reservation.id);
    setNewReservation({
      name: reservation.name,
      phone: reservation.phone,
      email: reservation.email || '',
      city: reservation.city,
      address: reservation.address,
      locationUrl: reservation.locationUrl || '',
      serviceType: reservation.serviceType,
      dates: reservation.dates ? reservation.dates.map(d => ({date: new Date(d.date), timePeriod: d.timePeriod})) : [],
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
 

 // حلقة تكرارية على كل تاريخ وفترة زمنية في newReservation.dates
 for (const datePeriod of newReservation.dates) {
  const reservationPayload = {
    name: newReservation.name,
    phone: newReservation.phone,
    email: newReservation.email,
    city: newReservation.city,
    address: newReservation.address,
    locationUrl: newReservation.locationUrl,
    serviceType: newReservation.serviceType,
    date: datePeriod.date.toISOString(), // إرسال التاريخ الحالي في التكرار
    timePeriod: datePeriod.timePeriod,   // إرسال الفترة الزمنية الحالية في التكرار
    extraHours: newReservation.extraHours,
    workerCount: newReservation.workerCount,
    price: newReservation.price
  };

  let response;
  if (editingReservationId) {
    // في حالة التعديل، قد تحتاج إلى طريقة مختلفة لتحديث التواريخ.
    // هذا المثال يفترض أن التعديل يتم على الحجز الرئيسي وليس على كل تاريخ على حدة.
    response = await fetch('/api/booking', { // قد تحتاج إلى تعديل المسار ونوع الطلب (PUT/PATCH)
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: editingReservationId, ...reservationPayload }), // إرسال بيانات التاريخ الحالي مع ID التعديل
    });
  } else {
    response = await fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationPayload), // إرسال بيانات التاريخ الحالي
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

  // دوال معالجة تغييرات النموذج
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === 'extraHours' || name === 'workerCount' || name === 'price') {
      processedValue = parseFloat(value) || 0;
    }
    setNewReservation({
      ...newReservation,
      [name]: processedValue
    });
  };

 

  const handleTempDateChange = (e) => {
    setTempDate(e.target.value);
  };

  const handleTempTimePeriodChange = (e) => {
    setTempTimePeriod(e.target.value);
  };


  // دالة إضافة تاريخ وفترة زمنية مؤقتة إلى قائمة الحجوزات
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

    if (dayOfWeek === 4 || dayOfWeek === 5) {
      alert('لا يمكن إضافة حجوزات في أيام الخميس والجمعة.');
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
        dates: [...prev.dates, { date: selectedDate, timePeriod: tempTimePeriod }]
      }));
    } else {
      alert(`لا يمكنك إضافة أكثر من ${availableDatesCount} تواريخ لهذا العرض.`);
    }
  };


  // دالة حذف تاريخ وفترة زمنية من قائمة الحجوزات
  const removeDatePeriod = (index) => {
    const newDates = newReservation.dates.filter((_, i) => i !== index);
    setNewReservation(prev => ({ ...prev, dates: newDates }));
  };


  // تصفية الحجوزات حسب الفترة الزمنية
  const morningReservations = reservations.filter(res => res.timePeriod ===  "MORNING");
  const eveningReservations = reservations.filter(res => res.timePeriod === "EVENING");

  // حساب عدد العمال المحجوزين والمتبقين
  const totalMorningWorkers = morningReservations.reduce((sum, res) => sum + res.workerCount, 0);
  const totalEveningWorkers = eveningReservations.reduce((sum, res) => sum + res.workerCount, 0);

  const remainingMorningWorkers = Math.max(0, 19 - totalMorningWorkers);
  const remainingEveningWorkers = Math.max(0, 19 - totalEveningWorkers);

  // دالة إغلاق نموذج الحجز الجديد
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


  return (
    <div className="flex flex-col p-6 text-right" dir="rtl">
      {/* ... (واجهة المستخدم كما في الكود السابق) ... */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{editingReservationId ? 'تعديل حجز' : 'نظام إدارة الحجوزات'}</h1>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-100 p-3 rounded-lg text-sm flex items-center ml-4">
            <div className="ml-4">
              <span className="block font-medium text-gray-800">إجمالي العمال المتاحين:</span>
              <span className="block text-gray-600">19 عامل لكل فترة (صباحية/مسائية)</span>
            </div>
          </div>
          <button
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center"
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

      <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg">
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

      <div className="grid grid-cols-5 gap-4 mb-8">
        {weekDates.map((date) => (
          <button
            key={date.toISOString()}
            onClick={() => selectDate(date)}
            className={`flex flex-col items-center p-4 rounded-lg shadow-sm transition-colors ${
              selectedDate && date.toDateString() === selectedDate.toDateString()
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-50'
            } ${date.toDateString() === initialDate.toDateString() ? 'ring-2 ring-blue-500' : ''}`}
          >
            <span className="font-bold">{getArabicDayName(date)}</span>
            <span className="text-sm mt-1">
              {date.getDate()} {getArabicMonthName(date)}
            </span>
          </button>
        ))}
      </div>

      {selectedDate ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">
            حجوزات يوم {getArabicDayName(selectedDate)} {selectedDate.getDate()} {getArabicMonthName(selectedDate)}
          </h2>

          {loading ? (
            <div className="text-center py-8">جاري تحميل البيانات...</div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex justify-between items-center bg-blue-50 p-2 rounded mb-4">
                <div className="font-bold text-lg flex items-center">
                  <Clock size={18} className="ml-2" />
                  الفترة الصباحية
                </div>
                <div className="flex items-center">
                  <div className={`px-3 py-1 rounded-full text-sm ${
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
                  <p className="text-gray-500 text-center py-4">لا توجد حجوزات في الفترة الصباحية</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">الاسم</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">رقم الهاتف</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">إجراءات</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {morningReservations.map((reservation) => (
                          <React.Fragment key={reservation.id}>
                            <tr
                              className="hover:bg-gray-50 cursor-pointer"
                              onClick={() => toggleRowExpansion(reservation.id)}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">{reservation.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <a href={`tel:${reservation.phone}`} className="text-blue-500 hover:underline flex items-center" onClick={(e) => e.stopPropagation()}>
                                  <Phone size={16} className="ml-1" />
                                  {reservation.phone}
                                </a>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <button
                                    className="text-blue-500 hover:text-blue-700 ml-2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      editReservation(reservation);
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
                                <td colSpan={3} className="px-6 py-4 bg-gray-50">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start">
                                      <Mail size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">البريد الإلكتروني:</span>
                                        <p>{reservation.email || 'غير متوفر'}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <MapPin size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">المدينة:</span>
                                        <p>{reservation.city}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <MapPin size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">العنوان:</span>
                                        <p>{reservation.address}</p>
                                      </div>
                                    </div>
                                    {reservation.locationUrl && (
                                      <div className="flex items-start">
                                        <MapPin size={16} className="mt-1 ml-2" />
                                        <div>
                                          <span className="text-sm text-gray-500">رابط الموقع:</span>
                                          <p>
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
                                        <p>{reservation.serviceType}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Clock size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">ساعات إضافية:</span>
                                        <p>{reservation.extraHours}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Users size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">عدد العمال:</span>
                                        <p>{reservation.workerCount}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <DollarSign size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">السعر:</span>
                                        <p>{reservation.price} درهم</p>
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
                <div className="flex justify-between items-center bg-indigo-50 p-2 rounded mb-4">
                <div className="font-bold text-lg flex items-center">
                  <Clock size={18} className="ml-2" />
                  الفترة المسائية
                </div>
                <div className="flex items-center">
                  <div className={`px-3 py-1 rounded-full text-sm ${
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
                  <p className="text-gray-500 text-center py-4">لا توجد حجوزات في الفترة المسائية</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">الاسم</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">رقم الهاتف</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">إجراءات</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {eveningReservations.map((reservation) => (
                          <React.Fragment key={reservation.id}>
                            <tr
                              className="hover:bg-gray-50 cursor-pointer"
                              onClick={() => toggleRowExpansion(reservation.id)}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">{reservation.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <a href={`tel:${reservation.phone}`} className="text-blue-500 hover:underline flex items-center" onClick={(e) => e.stopPropagation()}>
                                  <Phone size={16} className="ml-1" />
                                  {reservation.phone}
                                </a>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <button
                                    className="text-blue-500 hover:text-blue-700 ml-2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      editReservation(reservation);
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
                                <td colSpan={3} className="px-6 py-4 bg-gray-50">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start">
                                      <Mail size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">البريد الإلكتروني:</span>
                                        <p>{reservation.email || 'غير متوفر'}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <MapPin size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">المدينة:</span>
                                        <p>{reservation.city}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <MapPin size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">العنوان:</span>
                                        <p>{reservation.address}</p>
                                      </div>
                                    </div>
                                    {reservation.locationUrl && (
                                      <div className="flex items-start">
                                        <MapPin size={16} className="mt-1 ml-2" />
                                        <div>
                                          <span className="text-sm text-gray-500">رابط الموقع:</span>
                                          <p>
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
                                        <p>{reservation.serviceType}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Clock size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">ساعات إضافية:</span>
                                        <p>{reservation.extraHours}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Users size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">عدد العمال:</span>
                                        <p>{reservation.workerCount}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <DollarSign size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">السعر:</span>
                                        <p>{reservation.price} ريال</p>
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

              {/* إضافة قسم الحجوزات الغير مكتملة هنا */}
              <div className="mt-8">
                <div className="flex justify-between items-center bg-orange-50 p-2 rounded mb-4">
                  <div className="font-bold text-lg flex items-center">
                    <Clock size={18} className="ml-2" />
                    الحجوزات الغير مكتملة
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-8">جاري تحميل البيانات...</div>
                ) : uncompletedReservations.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">لا توجد حجوزات غير مكتملة</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">الاسم</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">رقم الهاتف</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {uncompletedReservations.map((reservation) => (
                          <React.Fragment key={reservation.id}>
                            <tr
                              className="hover:bg-gray-50 cursor-pointer"
                              onClick={() => toggleRowExpansion(reservation.id)}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">{reservation.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <a href={`tel:${reservation.phone}`} className="text-blue-500 hover:underline flex items-center" onClick={(e) => e.stopPropagation()}>
                                  <Phone size={16} className="ml-1" />
                                  {reservation.phone}
                                </a>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <button
                                    className="text-green-500 hover:text-green-700 ml-2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      markAsCalled(reservation.id);
                                    }}
                                  >
                                    <Phone size={16} />
                                    تأكيد الاتصال
                                  </button>
                                  <button
                                    className="text-blue-500 hover:text-blue-700 ml-2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      editReservation(reservation); // يمكنك تعديل هذه الدالة لتناسب الحجوزات الغير مكتملة إذا لزم الأمر
                                    }}
                                  >
                                    <Edit size={16} />
                                  </button>
                                  <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteReservation(reservation.id); // يمكنك تعديل هذه الدالة لتناسب الحجوزات الغير مكتملة إذا لزم الأمر
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
                                <td colSpan={3} className="px-6 py-4 bg-gray-50">
                                  {/* عرض تفاصيل الحجز الغير مكتمل هنا بشكل مشابه للفترة الصباحية والمسائية */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start">
                                      <Mail size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">البريد الإلكتروني:</span>
                                        <p>{reservation.email || 'غير متوفر'}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <MapPin size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">المدينة:</span>
                                        <p>{reservation.city}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <MapPin size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">العنوان:</span>
                                        <p>{reservation.address}</p>
                                      </div>
                                    </div>
                                    {reservation.locationUrl && (
                                      <div className="flex items-start">
                                        <MapPin size={16} className="mt-1 ml-2" />
                                        <div>
                                          <span className="text-sm text-gray-500">رابط الموقع:</span>
                                          <p>
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
                                        <p>{reservation.serviceType}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Clock size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">ساعات إضافية:</span>
                                        <p>{reservation.extraHours}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Users size={16} className="mt-1 ml-2" />
                                      <div>
                                        <span className="text-sm text-gray-500">عدد العمال:</span>
                                        <p>{reservation.workerCount}</p>
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
          <p className="text-gray-500">الرجاء اختيار تاريخ لعرض الحجوزات</p>
        </div>
      )}

      {showNewReservationForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center" dir="rtl">
          <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-6 text-center">{editingReservationId ? 'تعديل حجز' : 'إضافة حجز جديد'}</h2>

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">اسم العميل*</label>
              <input type="text" id="name" name="name" value={newReservation.name} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">رقم الهاتف*</label>
              <input type="tel" id="phone" name="phone" value={newReservation.phone} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">البريد الإلكتروني</label>
              <input type="email" id="email" name="email" value={newReservation.email} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">المدينة*</label>
              <input type="text" id="city" name="city" value={newReservation.city} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">العنوان*</label>
              <textarea id="address" name="address" value={newReservation.address} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="locationUrl" className="block text-gray-700 text-sm font-bold mb-2">رابط الموقع (اختياري)</label>
              <input type="url" id="locationUrl" name="locationUrl" value={newReservation.locationUrl} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div className="mb-4">
              <label htmlFor="serviceType" className="block text-gray-700 text-sm font-bold mb-2">نوع الخدمة</label>
              <select
                id="serviceType"
                name="serviceType"
                value={newReservation.serviceType}
                onChange={handleFormChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={!!editingReservationId}
              >
                {Object.keys(ServiceType).map((key) => (
                  <option key={key} value={key}>{ServiceType[key]}</option>
                ))}
              </select>
            </div>


            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">إضافة تواريخ وفترات زمنية</label>
              <div className="flex items-center mb-2 space-x-2">
                <input
                  type="date"
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={tempDate}
                  onChange={handleTempDateChange}
                  min={new Date().toISOString().split('T')[0]}
                />
                <select
                  className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={tempTimePeriod}
                  onChange={handleTempTimePeriodChange}
                >
                  {Object.keys(TimePeriod).map((key) => (
                    <option key={key} value={key}>{TimePeriod[key]}</option>
                  ))}
                </select>
                <button
                  onClick={addDatePeriod}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  <Plus size={16} className="inline-block ml-2" />
                  إضافة
                </button>
              </div>


              {newReservation.dates.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-bold mb-2">التواريخ والفترات المحددة:</h3>
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-right">التاريخ</th>
                        <th className="px-4 py-2 text-right">الفترة الزمنية</th>
                        <th className="px-4 py-2 text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {newReservation.dates.map((datePeriod, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">{datePeriod.date ? datePeriod.date.toLocaleDateString('ar-SA', { calendar: 'gregory' }) : 'غير محدد'}</td>
                          <td className="border px-4 py-2">{TimePeriod[datePeriod.timePeriod]}</td>
                          <td className="border px-4 py-2">
                            <button
                              onClick={() => removeDatePeriod(index)}
                              className="text-red-500 hover:text-red-700"
                              type="button"
                            >
                              <X size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>


            <div className="mb-4">
              <label htmlFor="extraHours" className="block text-gray-700 text-sm font-bold mb-2">ساعات إضافية</label>
              <input type="number" id="extraHours" name="extraHours" value={newReservation.extraHours} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="workerCount" className="block text-gray-700 text-sm font-bold mb-2">عدد العمال</label>
              <input type="number" id="workerCount" name="workerCount" value={newReservation.workerCount} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-6">
              <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">السعر</label>
              <input
                type="number"
                id="price"
                name="price"
                value={newReservation.price}
                onChange={handleFormChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={!!editingReservationId}
              />
            </div>


            <div className="flex justify-between">
              <button onClick={closeNewReservationForm} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                إلغاء
              </button>
              <button onClick={handleAddReservation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                <Save size={16} className="inline-block ml-2" />
                {editingReservationId ? 'حفظ التعديلات' : 'حفظ الحجز'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationManager;