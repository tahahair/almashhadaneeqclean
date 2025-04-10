"use client"
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Calendar, Clock, MapPin, Phone, Mail, DollarSign, Users, X, Edit, ChevronDown, ChevronUp, Plus, Save } from 'lucide-react';
// استيراد useSearchParams لقراءة معلمات الرابط
import { useRouter, useSearchParams } from "next/navigation";

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


// --- وظيفة مساعدة خارج الكومبوننت لتحليل التاريخ من الرابط ---
const parseDateFromParam = (dateParam: string | undefined | null): Date | null => {
    if (!dateParam || typeof dateParam !== 'string') return null;

    // توقع الصيغة DD-MM-YYYY
    const parts = dateParam.split('-');
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10); // الشهر في الرابط يبدأ من 1
        const year = parseInt(parts[2], 10);

        // التحقق من صحة الأجزاء
        if (!isNaN(day) && !isNaN(month) && !isNaN(year) && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
            // إنشاء كائن التاريخ (الشهر في الدالة يبدأ من 0)
            const parsedDate = new Date(year, month - 1, day);

            // التحقق النهائي للتأكد من صحة التاريخ (مثل 31 فبراير)
            if (!isNaN(parsedDate.getTime()) &&
                parsedDate.getFullYear() === year &&
                parsedDate.getMonth() === month - 1 &&
                parsedDate.getDate() === day) {
                return parsedDate;
            }
        }
    }
    console.warn("Invalid or unsupported date format in URL parameter:", dateParam);
    return null;
};

// --- وظيفة مساعدة خارج الكومبوننت للحصول على التاريخ الافتراضي ---
const getDefaultInitialDate = (): Date => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    // يوم الجمعة هو 5
    if (dayOfWeek === 5) {
        const daysUntilSaturday = 1;
        const nextSaturday = new Date(today);
        nextSaturday.setDate(today.getDate() + daysUntilSaturday);
        return nextSaturday;
    }
    return today;
};


const ReservationManager = () => {

    const router = useRouter();
    // استخدام useSearchParams للوصول إلى معلمات الرابط
    const searchParams = useSearchParams();

    // --- تحديد التاريخ الأولي ---
    // 1. حاول قراءة التاريخ من معلمة الرابط 'date'
    const dateFromUrl = parseDateFromParam(searchParams.get('date'));
    // 2. إذا لم يوجد تاريخ في الرابط أو كان غير صالح، استخدم المنطق الافتراضي
    const initialDateToUse = dateFromUrl || getDefaultInitialDate();

    // --- تعريف الحالات ---
    const [logedin, setLogedin] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [loadingLoginCheck, setLoadingLoginCheck] = useState(true);

    // --- استخدام التاريخ الأولي المحدد في حالة الكومبوننت ---
    const [currentDate, setCurrentDate] = useState(initialDateToUse);
    const [selectedDate, setSelectedDate] = useState(initialDateToUse);
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
    // لا حاجة لـ selectedDateRef الآن لأن التأثير يعتمد مباشرة على selectedDate
    // const selectedDateRef = useRef(selectedDate);

    const [tempDate, setTempDate] = useState(initialDateToUse.toISOString().split('T')[0]);
    const [tempTimePeriod, setTempTimePeriod] = useState('MORNING');


    // --- التأثيرات الجانبية (useEffect) ---

    // تحديث حالة تسجيل الدخول والتحقق من صلاحيات الأدمن
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setLogedin(user.logedin || false);
            if (user.logedin && user.type === "ADMIN") {
                setAdmin(true);
            } else if (user.logedin && user.type !== "ADMIN") {
                router.push(`/login`); // توجيه إذا كان مسجل دخول ولكن ليس أدمن
            } else {
                 router.push(`/login`); // توجيه إذا لم يكن مسجل دخول
            }
        } else {
            router.push(`/login`); // توجيه إذا لا يوجد مستخدم مخزن
        }
        setLoadingLoginCheck(false);
    }, [router]); // أضف router إلى مصفوفة الاعتماديات

    // useEffect للتحقق بعد اكتمال فحص تسجيل الدخول
    useEffect(() => {
        if (!loadingLoginCheck && (!logedin || !admin)) {
             // لا تقم بالتوجيه هنا مباشرة إذا كان الفحص الأول يقوم به بالفعل
             // قد تحتاج إلى منطق أكثر تفصيلاً إذا كان يمكن للحالة أن تتغير ديناميكيًا
        }
    }, [logedin, admin, loadingLoginCheck, router]);


    // تحديث تواريخ الأسبوع عند تغيير currentDate
    useEffect(() => {
        const dates = getWeekDates(currentDate);
        setWeekDates(dates);
    }, [currentDate]);

    // جلب الحجوزات عند تغيير selectedDate
    useEffect(() => {
        // التحقق من وجود selectedDate قبل الجلب
        if (selectedDate) {
            fetchReservations(selectedDate);
            fetchUncompletedReservations(selectedDate);
            // تحديث tempDate في النموذج عند تغيير selectedDate
            setTempDate(selectedDate.toISOString().split('T')[0]);
        }
    }, [selectedDate]); // الاعتماد فقط على selectedDate


    // تحديث عدد التواريخ المتاحة بناءً على نوع الخدمة
    useEffect(() => {
        switch (newReservation.serviceType) {
            case 'OFFER_4': setAvailableDatesCount(4); break;
            case 'OFFER_8': setAvailableDatesCount(8); break;
            case 'OFFER_12': setAvailableDatesCount(12); break;
            default: setAvailableDatesCount(1); break;
        }
        // مسح التواريخ عند تغيير نوع الخدمة إذا لم يكن في وضع التعديل
        if (!editingReservationId) {
           setNewReservation(prev => ({ ...prev, dates: [] }));
        }
    }, [newReservation.serviceType, editingReservationId]);


    // --- الوظائف الأخرى (getWeekDates, getArabicDayName, etc.) ---
    // لا تغييرات مطلوبة هنا بشكل عام

     const getWeekDates = (date: Date): Date[] => {
       // تأكد من أن 'date' هو كائن Date صالح
       if (!(date instanceof Date) || isNaN(date.getTime())) {
           console.error("getWeekDates received an invalid date:", date);
           // استخدم تاريخ اليوم كاحتياطي أو أرجع مصفوفة فارغة
           date = new Date();
       }
       const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
       // نريد البدء من السبت (6)
       const diffToSaturday = day >= 0 ? 6 - day : 0; // if Sunday (0), diff is 6. If Saturday (6), diff is 0.

       const saturdayDate = new Date(date);
       saturdayDate.setDate(date.getDate() + diffToSaturday);

       const weekDays: Date[] = [];
       // عرض الأسبوع من السبت إلى الخميس (6 أيام)
       for (let i = 0; i < 6; i++) {
           const currentDate = new Date(saturdayDate);
           currentDate.setDate(saturdayDate.getDate() + i);
           weekDays.push(currentDate);
       }
       return weekDays;
   };


   const getArabicDayName = (date: Date): string => {
       if (!(date instanceof Date) || isNaN(date.getTime())) return "";
       const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
       return days[date.getDay()];
   };

   interface DateWithMonth {
       getMonth: () => number;
   }

   const getArabicMonthName = (date: Date | DateWithMonth): string => {
       // التأكد من أن date هو كائن صالح يحتوي على getMonth
        if (!date || typeof date.getMonth !== 'function') return "";
        try {
             const monthIndex = date.getMonth();
             if (isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) return "";
             const months: string[] = [
                 'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
             ];
             return months[monthIndex];
        } catch (error) {
            console.error("Error getting Arabic month name for date:", date, error);
            return "";
        }
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



   interface Reservation {
       id: number;
       name: string;
       phone: string;
       email?: string;
       city: string;
       address: string;
       locationUrl?: string;
       serviceType: string;
       // تأكد من أن الواجهة تتطابق مع البيانات الفعلية العائدة من الـ API
       dates: { date: string | Date; timePeriod: string }[]; // قد يكون التاريخ سلسلة نصية
       extraHours: number;
       workerCount: number;
       price: number;
       timePeriod?: string; // قد يكون هذا الحقل موجودًا على مستوى الحجز الفردي
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
       // لا حاجة لاستدعاء fetch هنا، useEffect [selectedDate] سيهتم بذلك

       // --- تحديث الرابط عند اختيار تاريخ جديد (اختياري ولكن جيد) ---
       const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
       // استخدم replace لتجنب إضافة سجلات متتالية في تاريخ المتصفح لنفس الصفحة
       router.replace(`/admin-dashboard?date=${formattedDate}`, { scroll: false });
   };


   const fetchReservations = async (date: Date): Promise<void> => {
       if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
            console.error("fetchReservations called with invalid date:", date);
            setReservations([]); // مسح الحجوزات إذا كان التاريخ غير صالح
            return;
       }

       setLoading(true);
       try {
           const year = date.getFullYear();
           const month = String(date.getMonth() + 1).padStart(2, '0');
           const day = String(date.getDate()).padStart(2, '0');
           const formattedDate = `${year}-${month}-${day}`; // YYYY-MM-DD المتوافقة مع API

           const response = await fetch(`/api/booking?date=${formattedDate}`);

           if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
           }

           const data: Reservation[] = await response.json();
           console.log('Fetched reservations for', formattedDate, ':', data);

        

           // يمكنك تحديث حالة مخصصة لكل فترة إذا أردت، أو دمجها كما في الكود الأصلي
           setReservations(data); // أو setReservations([...fetchedMorningReservations, ...fetchedEveningReservations]);
           setExpandedRows({});
       } catch (error) {
           console.error("Failed to fetch reservations:", error);
           // alert("فشل في جلب الحجوزات. يرجى المحاولة مرة أخرى لاحقًا.");
           setReservations([]); // مسح الحجوزات عند حدوث خطأ
       } finally {
           setLoading(false);
       }
   };


   interface UncompletedReservation extends Reservation { // يمكن أن ترث من Reservation إذا كانت الحقول متشابهة
       called?: boolean; // إضافة حقل `called` إذا كان موجوداً
   }

   const fetchUncompletedReservations = async (date: Date): Promise<void> => {
       if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
           console.error("fetchUncompletedReservations called with invalid date:", date);
           setUncompletedReservations([]);
           return;
       }
       setLoading(true); // قد ترغب في استخدام حالة تحميل منفصلة لهذه
       const currentDateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
       console.log('Fetching uncompleted reservations for date:', currentDateString);
       const link = `/api/uncompleted?date=${currentDateString}`; // التأكد من أن الـ API يتوقع التاريخ بهذا الشكل
       try {
           const response = await fetch(link);
           if (!response.ok) {
               // قد يكون من الطبيعي عدم وجود حجوزات غير مكتملة (404)، تحقق من ذلك
               if (response.status === 404) {
                   console.log('No uncompleted reservations found for this date.');
                   setUncompletedReservations([]);
               } else {
                   throw new Error(`HTTP error! status: ${response.status}`);
               }
           } else {
               const data: UncompletedReservation[] = await response.json();
               console.log('Fetched uncompleted reservations:', data);
               setUncompletedReservations(data);
           }
       } catch (error) {
           console.error("Failed to fetch uncompleted reservations:", error);
           // alert("فشل في جلب الحجوزات الغير مكتملة. يرجى المحاولة مرة أخرى لاحقًا.");
           setUncompletedReservations([]);
       } finally {
           setLoading(false); // أو حالة التحميل المنفصلة
       }
   };


   const markAsCalled = async (id: number): Promise<void> => {
       setLoading(true); // قد تحتاج لحالة تحميل محددة لهذه العملية
       try {
           const response = await fetch(`/api/uncompleted`, { // تأكد من أن هذا هو الـ endpoint الصحيح
               method: 'PUT',
               headers: {
                   'Content-Type': 'application/json',
               },
               // تأكد من أن الـ API يتوقع الجسم بهذا الشكل
               body: JSON.stringify({ id, called: true }),
           });

           if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
           }
            const result = await response.json(); // قراءة الاستجابة
            console.log("Mark as called result:", result);

           // إعادة جلب القائمة لتحديث الواجهة بأحدث البيانات من الخادم
           if (selectedDate) {
              fetchUncompletedReservations(selectedDate);
           }
           alert('تم تحديث حالة الحجز إلى "تم الاتصال" بنجاح');

       } catch (error) {
           console.error("Failed to update called status:", error);
           alert("فشل في تحديث حالة الاتصال. يرجى المحاولة مرة أخرى لاحقًا.");
       } finally {
           setLoading(false);
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

   // interface DeleteReservationResponse {
   //     ok: boolean;
   //     status: number;
   // }

   const deleteReservation = async (id: number): Promise<void> => {
        // تأكد من أن id هو رقم صالح
        if (typeof id !== 'number' || isNaN(id)) {
            console.error("Invalid ID for deletion:", id);
            alert("معرف الحجز غير صالح.");
            return;
        }

       if (window.confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
           setLoading(true); // حالة تحميل عامة أو مخصصة
           try {
               const response = await fetch('/api/booking', { // تأكد من أن الـ API يتوقع DELETE بهذا الشكل
                   method: 'DELETE',
                   headers: {
                       'Content-Type': 'application/json',
                   },
                   body: JSON.stringify({ id }), // تأكد من أن الـ API يتوقع الـ ID في الجسم
               });

               if (!response.ok) {
                    // محاولة قراءة رسالة الخطأ من الخادم إن وجدت
                    let errorMsg = `HTTP error! status: ${response.status}`;
                    try {
                        const errorData = await response.json();
                        errorMsg += ` - ${errorData.message || 'No additional details'}`;
                    } catch  {
                        // فشل في قراءة JSON، استخدم النص العادي
                        errorMsg += ` - ${await response.text()}`;
                    }
                    throw new Error(errorMsg);
               }

               // إزالة الحجز من الحالة المحلية فورًا لتحديث الواجهة
               setReservations(prev => prev.filter(res => res.id !== id));
               setUncompletedReservations(prev => prev.filter(res => res.id !== id)); // قم بإزالته من كلاهما احتياطاً
               alert('تم حذف الحجز بنجاح');

               // إعادة جلب البيانات للتأكد من التزامن مع الخادم (اختياري إذا كنت تثق بالحالة المحلية)
               // if (selectedDate) {
               //    fetchReservations(selectedDate);
               //    fetchUncompletedReservations(selectedDate);
               // }

           } catch (error) {
               console.error("Failed to delete reservation:", error);
               alert(`فشل في حذف الحجز: ${error instanceof Error ? error.message : String(error)}`);
           } finally {
               setLoading(false);
           }
       }
   };

   const editReservation = (reservation: Reservation | UncompletedReservation, type: "COMPLETED" | "UNCOMPLETED") => {
       // تحديد ما إذا كان الحجز قيد التعديل بالفعل أم لا
       if (type === "UNCOMPLETED") {
            setEditingReservationId(null); // تحويل حجز غير مكتمل إلى حجز جديد
            console.log("Editing UNCOMPLETED as a new reservation template.");
        } else {
            setEditingReservationId(reservation.id);
            console.log("Editing COMPLETED reservation with ID:", reservation.id);
        }

       // تحويل التواريخ المستلمة (قد تكون سلاسل نصية) إلى كائنات Date
       const datesAsDateObjects = reservation.dates
           ? reservation.dates
               .map((d: { date: string | number | Date; timePeriod: string; }) => {
                   try {
                       // محاولة إنشاء كائن Date من القيمة المستلمة
                       const dateObj = new Date(d.date);
                       // التحقق من صلاحية الكائن الناتج
                       if (!isNaN(dateObj.getTime())) {
                           return { date: dateObj, timePeriod: d.timePeriod as keyof typeof TimePeriod };
                       } else {
                           console.warn(`Invalid date format encountered during edit: ${d.date}`);
                           return null; // تجاهل التاريخ غير الصالح
                       }
                   } catch (e) {
                       console.error(`Error parsing date during edit: ${d.date}`, e);
                       return null;
                   }
               })
               .filter(d => d !== null) as { date: Date; timePeriod: keyof typeof TimePeriod }[] // تصفية القيم الفارغة والتأكيد على النوع
           : [];

       // تعيين حالة النموذج بالبيانات الحالية للحجز
       setNewReservation({
           name: reservation.name || '',
           phone: reservation.phone || '',
           email: reservation.email || '',
           city: reservation.city || '',
           address: reservation.address || '',
           locationUrl: reservation.locationUrl || '',
           serviceType: reservation.serviceType || 'OFFER_4', // قيمة افتراضية إذا لم تكن موجودة
           // استخدام التواريخ المحولة
           dates: datesAsDateObjects,
           extraHours: reservation.extraHours || 0,
           workerCount: reservation.workerCount || 1,
           price: reservation.price || 0
       });
       setShowNewReservationForm(true); // إظهار النموذج
   };

   const handleAddReservation = async () => {
       // التحقق الأساسي من الحقول
       if (!newReservation.name || !newReservation.phone || !newReservation.city || !newReservation.address) {
           alert('الرجاء ملء جميع الحقول الإلزامية (*)');
           return;
       }
       if (newReservation.dates.length === 0) {
           alert('الرجاء اختيار تاريخ واحد على الأقل');
           return;
       }
       // التحقق من عدد العمال والسعر
       if (newReservation.workerCount <= 0) {
            alert('يجب أن يكون عدد العمال أكبر من صفر.');
            return;
       }
        if (newReservation.price < 0) {
            alert('لا يمكن أن يكون السعر سالبًا.');
            return;
        }

       setLoading(true);
       const isEditing = !!editingReservationId; // هل نحن في وضع التعديل؟

       try {
           // في حالة التعديل، يجب إرسال طلب واحد فقط PUT
           if (isEditing) {
               // تأكد من أن لديك تاريخ واحد فقط في dates عند التعديل (أو عدّل الـ API ليقبل التعديل المتعدد)
               if (newReservation.dates.length !== 1) {
                  // هذا يعتمد على تصميم الـ API. إذا كان تعديل الحجز يعدل *مثيل* حجز معين في يوم معين،
                  // فيجب أن يكون هناك تاريخ واحد فقط في dates.
                  alert('عند تعديل حجز، يرجى تحديد تاريخ واحد فقط للمتابعة.');
                   setLoading(false);
                   return;
               }
               const datePeriod = newReservation.dates[0];
               const reservationPayload = {
                   id: editingReservationId, // إرسال الـ ID للتعديل
                   name: newReservation.name,
                   phone: newReservation.phone,
                   email: newReservation.email,
                   city: newReservation.city,
                   address: newReservation.address,
                   locationUrl: newReservation.locationUrl,
                   serviceType: newReservation.serviceType,
                   // إرسال التاريخ والفترة المحددة للتعديل
                   date: datePeriod.date.toISOString(), // تحويل إلى ISO string
                   timePeriod: datePeriod.timePeriod,
                   extraHours: newReservation.extraHours,
                   workerCount: newReservation.workerCount,
                   price: newReservation.price
               };

               console.log("Sending PUT request with payload:", reservationPayload);

               const response = await fetch('/api/booking', {
                   method: 'PUT',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify(reservationPayload),
               });

               if (!response.ok) {
                   const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
                   throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || response.statusText}`);
               }
               const responseData = await response.json();
               console.log("Edit response:", responseData);
               alert('تم تعديل الحجز بنجاح');

           } else {
               // في حالة الإضافة، قد تحتاج إلى إرسال طلب POST لكل تاريخ محدد
               // أو تعديل الـ API ليقبل مصفوفة من التواريخ في طلب واحد

               // --- الطريقة الحالية: إرسال طلب لكل تاريخ ---
                let successCount = 0;
                const totalDates = newReservation.dates.length;

               for (const datePeriod of newReservation.dates) {
                   const reservationPayload = {
                       // لا يوجد id عند الإنشاء
                       name: newReservation.name,
                       phone: newReservation.phone,
                       email: newReservation.email,
                       city: newReservation.city,
                       address: newReservation.address,
                       locationUrl: newReservation.locationUrl,
                       serviceType: newReservation.serviceType,
                       date: datePeriod.date.toISOString(), // تحويل إلى ISO string
                       timePeriod: datePeriod.timePeriod,
                       extraHours: newReservation.extraHours,
                       workerCount: newReservation.workerCount,
                       price: newReservation.price
                   };

                   console.log("Sending POST request with payload:", reservationPayload);

                   const response = await fetch('/api/booking', {
                       method: 'POST',
                       headers: { 'Content-Type': 'application/json' },
                       body: JSON.stringify(reservationPayload),
                   });

                   if (!response.ok) {
                        const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
                        // أبلغ عن الخطأ لكن استمر في محاولة إضافة التواريخ الأخرى
                        console.error(`Failed to add reservation for date ${datePeriod.date.toISOString().split('T')[0]}: ${response.status} - ${errorData.message || response.statusText}`);
                        alert(`فشل في إضافة الحجز للتاريخ ${datePeriod.date.toLocaleDateString('ar-SA')}. يرجى المحاولة مرة أخرى لاحقًا.`);
                        // يمكنك اختيار إيقاف العملية بأكملها هنا إذا أردت:
                        // throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || response.statusText}`);
                    } else {
                        successCount++;
                        const responseData = await response.json();
                        console.log("Add response for date", datePeriod.date.toISOString().split('T')[0], ":", responseData);
                    }
               }
                 alert(`تم إضافة ${successCount} من ${totalDates} حجوزات بنجاح.`);
                // --- نهاية طريقة إرسال طلب لكل تاريخ ---
           }

           // إعادة تعيين النموذج وإغلاقه وتحديث القائمة بعد النجاح
           setShowNewReservationForm(false);
           setEditingReservationId(null);
           setNewReservation({ /* ... الحالة الافتراضية الفارغة ... */
                name: '', phone: '', email: '', city: '', address: '', locationUrl: '',
                serviceType: 'OFFER_4', dates: [], extraHours: 0, workerCount: 1, price: 0
           });
           // إعادة جلب الحجوزات للتاريخ المحدد حاليًا
           if (selectedDate) {
              fetchReservations(selectedDate);
              fetchUncompletedReservations(selectedDate); // تحديث الحجوزات غير المكتملة أيضاً
           }

       } catch (error) {
           console.error("Failed to add/edit reservation:", error);
           alert(`فشل في ${isEditing ? 'تعديل' : 'إضافة'} الحجز: ${error instanceof Error ? error.message : String(error)}`);
       } finally {
           setLoading(false);
       }
   };


   const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
       const { name, value } = e.target;
       let processedValue: string | number = value;
       if (name === 'extraHours' || name === 'workerCount' || name === 'price') {
            // السماح بقيم فارغة مؤقتًا أثناء الكتابة، ولكن تحويلها إلى 0 عند فقدان التركيز أو الحفظ
            // التحويل إلى رقم عشري هنا مباشرةً قد يكون أفضل
            processedValue = value === '' ? '' : parseFloat(value); // احتفظ بالسلسلة الفارغة مؤقتًا أو استخدم 0
            if (isNaN(processedValue as number) && value !== '') {
                // إذا لم يكن رقمًا صالحًا وليس فارغًا، لا تقم بالتحديث (أو أظهر خطأ)
                console.warn(`Invalid number input for ${name}: ${value}`);
                return; // منع تحديث الحالة بقيمة غير رقمية (باستثناء الفارغة)
            }
             // التأكد من أن القيمة النهائية ليست NaN
             if (name === 'price' && (processedValue as number) < 0) processedValue = 0; // منع السعر السالب
             if (name === 'workerCount' && (processedValue as number) < 0) processedValue = 1; // منع عدد عمال سالب (اجعله 1 افتراضيًا)
             if (name === 'extraHours' && (processedValue as number) < 0) processedValue = 0; // منع ساعات إضافية سالبة
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
       setTempTimePeriod(e.target.value);
   };


   const addDatePeriod = () => {
        // التحقق من التاريخ المؤقت
        if (!tempDate) {
            alert('الرجاء تحديد تاريخ أولاً.');
            return;
        }
        const selectedDateToAdd = new Date(tempDate + 'T00:00:00'); // تأكد من أن الوقت غير مؤثر في المقارنات
        selectedDateToAdd.setHours(3, 0, 0, 0); // توحيد الوقت لتجنب مشاكل المنطقة الزمنية

        // التحقق من صلاحية التاريخ
        if (isNaN(selectedDateToAdd.getTime())) {
            alert('التاريخ المحدد غير صالح.');
            return;
        }

        const dayOfWeek = selectedDateToAdd.getDay();
        const today = new Date();
        today.setHours(0, 0, 0, 0); // مقارنة مع بداية اليوم الحالي

        if (selectedDateToAdd < today) {
            alert('لا يمكن إضافة تواريخ سابقة لليوم الحالي.');
            return;
        }

        if (dayOfWeek === 5) { // الجمعة
            alert('لا يمكن إضافة حجوزات في أيام الجمعة.');
            return;
        }

        // التحقق من التكرار (مقارنة التواريخ فقط)
        const isDuplicate = newReservation.dates.some(d => {
            const existingDate = new Date(d.date);
            existingDate.setHours(3, 0, 0, 0); // توحيد الوقت للمقارنة
            return existingDate.getTime() === selectedDateToAdd.getTime();
        });

        if (isDuplicate) {
            alert('لا يمكن إضافة نفس التاريخ أكثر من مرة.');
            return;
        }

        // منع إضافة تواريخ جديدة عند التعديل (إذا كان هذا هو المطلوب)
        if (editingReservationId && newReservation.dates.length > 0) {
             // السماح بإضافة تاريخ *واحد فقط* عند التعديل إذا كانت القائمة فارغة
             if (newReservation.dates.length === 0) {
                 // اسمح بالإضافة
             } else {
                alert('لا يمكنك إضافة تواريخ جديدة أثناء تعديل حجز موجود. قم بحفظ التعديلات أولاً أو قم بإنشاء حجز جديد.');
                return;
             }
        }


        // التحقق من الحد الأقصى للتواريخ المسموح به
        if (newReservation.dates.length >= availableDatesCount && !editingReservationId) {
             alert(`لا يمكنك إضافة أكثر من ${availableDatesCount} تواريخ لهذا العرض.`);
             return;
        }
         // إذا كان في وضع التعديل، اسمح فقط بإضافة تاريخ واحد إجمالاً
         if (editingReservationId && newReservation.dates.length >= 1) {
              alert('يمكن تعديل تاريخ واحد فقط في المرة الواحدة.');
              return;
         }


        // إضافة التاريخ والفترة
        setNewReservation(prev => ({
            ...prev,
            dates: [...prev.dates, { date: selectedDateToAdd, timePeriod: tempTimePeriod as keyof typeof TimePeriod }]
        }));
        console.log("Added date:", selectedDateToAdd, "Period:", tempTimePeriod);

         // مسح حقل التاريخ المؤقت بعد الإضافة (اختياري)
         // setTempDate('');
   };


   const removeDatePeriod = (index: number): void => {
       // لا تسمح بإزالة التاريخ الوحيد عند التعديل
       if (editingReservationId && newReservation.dates.length === 1) {
            alert('لا يمكنك إزالة التاريخ الوحيد أثناء التعديل. يمكنك تغيير التاريخ أو إلغاء التعديل.');
            return;
       }
       const newDates = newReservation.dates.filter((_, i) => i !== index);
       setNewReservation(prev => ({ ...prev, dates: newDates }));
   };


   // حسابات الفترات والعمال المتبقين
   const morningReservations = reservations.filter(res => res.timePeriod === "MORNING");
   const eveningReservations = reservations.filter(res => res.timePeriod === "EVENING");

   const totalMorningWorkers = morningReservations.reduce((sum, res) => sum + (res.workerCount || 0), 0);
   const totalEveningWorkers = eveningReservations.reduce((sum, res) => sum + (res.workerCount || 0), 0);

   const MAX_WORKERS_PER_PERIOD = 19; // تعريف ثابت
   const remainingMorningWorkers = Math.max(0, MAX_WORKERS_PER_PERIOD - totalMorningWorkers);
   const remainingEveningWorkers = Math.max(0, MAX_WORKERS_PER_PERIOD - totalEveningWorkers);


   const closeNewReservationForm = () => {
       setShowNewReservationForm(false);
       setEditingReservationId(null); // التأكد من إلغاء وضع التعديل
       setNewReservation({ // إعادة تعيين النموذج بالكامل
           name: '', phone: '', email: '', city: '', address: '', locationUrl: '',
           serviceType: 'OFFER_4', dates: [], extraHours: 0, workerCount: 1, price: 0
       });
        // إعادة تعيين tempDate إلى التاريخ المحدد حاليًا
        if (selectedDate) {
            setTempDate(selectedDate.toISOString().split('T')[0]);
        }
   };


    // --- العرض (Render) ---

    // عرض رسالة التحميل أثناء التحقق من تسجيل الدخول
    if (loadingLoginCheck) {
        return <div className="flex justify-center items-center h-screen">جاري التحقق من تسجيل الدخول...</div>;
    }

    // إذا لم يكن مسجل دخول أو ليس أدمن بعد التحقق، لا تعرض شيئًا (أو رسالة خطأ)
    // التوجيه يتم في useEffect
    if (!logedin || !admin) {
        return <div className="flex justify-center items-center h-screen">يتم التوجيه إلى صفحة تسجيل الدخول...</div>;
    }


    // العرض الرئيسي للوحة التحكم
    return (
        <div className="flex flex-col p-4 sm:p-6 text-right" dir="rtl">
            {/* --- رأس الصفحة والأزرار --- */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-4">
                <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-right">
                   {showNewReservationForm ? (editingReservationId ? 'تعديل حجز' : 'إضافة حجز جديد') : 'نظام إدارة الحجوزات'}
                </h1>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <div className="bg-gray-100 p-2 sm:p-3 rounded-lg text-xs sm:text-sm flex items-center justify-center sm:justify-start w-full sm:w-auto">
                        <div className="text-center sm:text-right">
                            <span className="block font-medium text-gray-800">إجمالي العمال المتاحين:</span>
                            <span className="block text-gray-600">{MAX_WORKERS_PER_PERIOD} عامل لكل فترة</span>
                        </div>
                    </div>
                    {/* زر إضافة حجز جديد يظهر فقط إذا لم يكن النموذج مفتوحًا */}
                    {!showNewReservationForm && (
                       <button
                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center w-full sm:w-auto transition-colors duration-200"
                            onClick={() => {
                                setNewReservation({ // إعادة تعيين النموذج قبل فتحه
                                    name: '', phone: '', email: '', city: '', address: '', locationUrl: '',
                                    serviceType: 'OFFER_4', dates: [], extraHours: 0, workerCount: 1, price: 0
                                });
                                // تعيين التاريخ المؤقت إلى التاريخ المحدد حاليًا
                                 if (selectedDate) {
                                    setTempDate(selectedDate.toISOString().split('T')[0]);
                                 }
                                setEditingReservationId(null); // التأكد من أنه ليس وضع تعديل
                                setShowNewReservationForm(true);
                            }}
                        >
                            <Plus size={20} className="ml-2" />
                            حجز جديد
                        </button>
                    )}
                </div>
            </div>

             {/* --- قسم التنقل في التقويم --- */}
             {!showNewReservationForm && ( // إخفاء التقويم عند عرض النموذج
                <>
                    <div className="flex justify-between items-center mb-4 sm:mb-6 bg-gray-100 p-3 sm:p-4 rounded-lg shadow-sm">
                        <button
                            onClick={goToPreviousWeek}
                            className="p-2 bg-white rounded-full shadow hover:bg-gray-200 transition-colors"
                            aria-label="الأسبوع السابق"
                        >
                            <ChevronRight size={20} />
                        </button>

                        <div className="flex flex-col items-center font-bold text-lg">
                             {/* عرض الشهر والسنة لليوم الأول في الأسبوع المعروض */}
                             {weekDates.length > 0 && !isNaN(weekDates[0].getTime()) ? (
                                 <span>
                                     {getArabicMonthName(weekDates[0])} {weekDates[0].getFullYear()}
                                 </span>
                             ) : (
                                 // عرض الشهر والسنة للتاريخ المحدد في حالة عدم وجود تواريخ أسبوع
                                 !isNaN(selectedDate?.getTime()) ? (
                                     <span>
                                         {getArabicMonthName(selectedDate)} {selectedDate.getFullYear()}
                                     </span>
                                 ) : null
                             )}
                         </div>

                        <button
                            onClick={goToNextWeek}
                            className="p-2 bg-white rounded-full shadow hover:bg-gray-200 transition-colors"
                            aria-label="الأسبوع التالي"
                        >
                            <ChevronLeft size={20} />
                        </button>
                    </div>

                    {/* --- عرض أيام الأسبوع --- */}
                   <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4 mb-6 sm:mb-8">
                        {weekDates.map((date) => {
                            // التحقق من صلاحية التاريخ قبل عرضه
                            if (!(date instanceof Date) || isNaN(date.getTime())) {
                                return <div key={Math.random()} className="p-2 sm:p-4 rounded-lg bg-gray-200 animate-pulse"></div>; // عنصر نائب أو رسالة خطأ
                            }
                            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                            // تحديد هل اليوم هو اليوم الافتراضي الأصلي (لتمييزه)
                            const isDefaultToday = date.toDateString() === getDefaultInitialDate().toDateString();
                            const isFriday = date.getDay() === 5; // الجمعة

                            return (
                                <button
                                    key={date.toISOString()}
                                    onClick={() => !isFriday && selectDate(date)} // تعطيل النقر ليوم الجمعة
                                    disabled={isFriday} // تعطيل الزر ليوم الجمعة
                                    className={`flex flex-col items-center p-2 sm:p-4 rounded-lg shadow-sm transition-all duration-200 text-sm sm:text-base relative
                                        ${isSelected ? 'bg-blue-600 text-white scale-105 shadow-md' : 'bg-white hover:bg-gray-100'}
                                        ${isFriday ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70' : ''}
                                        ${isDefaultToday && !isSelected && !isFriday ? 'ring-2 ring-offset-1 ring-green-500' : ''}
                                    `}
                                    aria-label={`اختيار يوم ${getArabicDayName(date)} ${date.getDate()} ${getArabicMonthName(date)}`}
                                    aria-pressed={isSelected}
                                >
                                    <span className={`font-bold ${isFriday ? 'text-gray-500' : ''}`}>{getArabicDayName(date)}</span>
                                    <span className={`text-xs sm:text-sm mt-1 ${isFriday ? 'text-gray-500' : (isSelected ? 'text-blue-100' : 'text-gray-600')}`}>
                                        {date.getDate()} {getArabicMonthName(date)}
                                    </span>
                                     {/* إضافة نقطة زرقاء إذا كان اليوم محدداً */}
                                     {isSelected && <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></span>}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}


            {/* --- عرض الحجوزات لليوم المحدد أو رسالة اختيار تاريخ --- */}
            {!showNewReservationForm && ( // إخفاء هذا القسم عند عرض النموذج
                <>
                    {selectedDate && !isNaN(selectedDate.getTime()) ? (
                        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center sm:text-right border-b pb-2">
                                حجوزات يوم {getArabicDayName(selectedDate)} {selectedDate.getDate()} {getArabicMonthName(selectedDate)}
                            </h2>

                            {loading ? (
                                <div className="text-center py-10 text-gray-500">
                                    <div role="status" className="flex justify-center items-center">
                                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span className="ml-3">جاري تحميل الحجوزات...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6 sm:space-y-8">
                                    {/* --- الفترة الصباحية --- */}
                                    <div>
                                        <div className="flex flex-col sm:flex-row justify-between items-center bg-blue-50 p-2 sm:p-3 rounded-t-lg mb-0 border-b border-blue-200">
                                            <div className="font-bold text-base sm:text-lg flex items-center text-blue-800">
                                                <Clock size={18} className="ml-2" />
                                                الفترة الصباحية
                                            </div>
                                            <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mt-1 sm:mt-0
                                                ${remainingMorningWorkers === 0 ? 'bg-red-100 text-red-800' :
                                                remainingMorningWorkers < 5 ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'}`}>
                                                العمال المتبقين: {remainingMorningWorkers}
                                                {remainingMorningWorkers === 0 && <span className="mr-1 text-xs hidden sm:inline">(ممتلئ)</span>}
                                            </div>
                                        </div>
                                        {morningReservations.length === 0 ? (
                                            <p className="text-gray-500 text-center py-4 text-sm bg-gray-50 rounded-b-lg">لا توجد حجوزات</p>
                                        ) : (
                                            <div className="overflow-x-auto rounded-b-lg">
                                                <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-right font-medium text-gray-600">الاسم</th>
                                                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-right font-medium text-gray-600 hidden md:table-cell">الهاتف</th>
                                                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-center font-medium text-gray-600">إجراءات</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {morningReservations.map((reservation) => (
                                                          <ReservationRow
                                                             key={`m-${reservation.id}`}
                                                             reservation={reservation}
                                                             expanded={!!expandedRows[reservation.id]}
                                                             onToggleExpand={() => toggleRowExpansion(reservation.id)}
                                                             onEdit={() => editReservation(reservation, "COMPLETED")}
                                                             onDelete={() => deleteReservation(reservation.id)}
                                                             type="COMPLETED"
                                                          />
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>

                                    {/* --- الفترة المسائية --- */}
                                    <div>
                                        <div className="flex flex-col sm:flex-row justify-between items-center bg-indigo-50 p-2 sm:p-3 rounded-t-lg mb-0 border-b border-indigo-200">
                                            <div className="font-bold text-base sm:text-lg flex items-center text-indigo-800">
                                                <Clock size={18} className="ml-2" />
                                                الفترة المسائية
                                            </div>
                                            <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mt-1 sm:mt-0
                                                ${remainingEveningWorkers === 0 ? 'bg-red-100 text-red-800' :
                                                remainingEveningWorkers < 5 ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'}`}>
                                                العمال المتبقين: {remainingEveningWorkers}
                                                {remainingEveningWorkers === 0 && <span className="mr-1 text-xs hidden sm:inline">(ممتلئ)</span>}
                                            </div>
                                        </div>
                                        {eveningReservations.length === 0 ? (
                                            <p className="text-gray-500 text-center py-4 text-sm bg-gray-50 rounded-b-lg">لا توجد حجوزات</p>
                                        ) : (
                                           <div className="overflow-x-auto rounded-b-lg">
                                                <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
                                                     <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-right font-medium text-gray-600">الاسم</th>
                                                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-right font-medium text-gray-600 hidden md:table-cell">الهاتف</th>
                                                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-center font-medium text-gray-600">إجراءات</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {eveningReservations.map((reservation) => (
                                                            <ReservationRow
                                                                key={`e-${reservation.id}`}
                                                                reservation={reservation}
                                                                expanded={!!expandedRows[reservation.id]}
                                                                onToggleExpand={() => toggleRowExpansion(reservation.id)}
                                                                onEdit={() => editReservation(reservation, "COMPLETED")}
                                                                onDelete={() => deleteReservation(reservation.id)}
                                                                type="COMPLETED"
                                                            />
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>

                                     {/* --- الحجوزات غير المكتملة --- */}
                                     <div>
                                         <div className="flex flex-col sm:flex-row justify-between items-center bg-orange-50 p-2 sm:p-3 rounded-t-lg mb-0 border-b border-orange-200">
                                             <div className="font-bold text-base sm:text-lg flex items-center text-orange-800">
                                                 <Clock size={18} className="ml-2" /> {/* أو أيقونة أخرى */}
                                                 الحجوزات غير المكتملة (لهذا اليوم)
                                             </div>
                                             {/* يمكن إضافة عددها هنا إذا أردت */}
                                             <span className="text-xs text-orange-700 font-medium">{uncompletedReservations.length} حجز</span>
                                         </div>
                                         {loading ? (
                                             <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-b-lg">جاري تحميل...</div>
                                         ) : uncompletedReservations.length === 0 ? (
                                             <p className="text-gray-500 text-center py-4 text-sm bg-gray-50 rounded-b-lg">لا توجد حجوزات غير مكتملة</p>
                                         ) : (
                                             <div className="overflow-x-auto rounded-b-lg">
                                                 <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
                                                      <thead className="bg-gray-50">
                                                         <tr>
                                                             <th className="px-3 sm:px-6 py-2 sm:py-3 text-right font-medium text-gray-600">الاسم</th>
                                                             <th className="px-3 sm:px-6 py-2 sm:py-3 text-right font-medium text-gray-600 hidden md:table-cell">الهاتف</th>
                                                             <th className="px-3 sm:px-6 py-2 sm:py-3 text-center font-medium text-gray-600">إجراءات</th>
                                                         </tr>
                                                     </thead>
                                                     <tbody className="bg-white divide-y divide-gray-200">
                                                         {uncompletedReservations.map((reservation) => (
                                                             <ReservationRow
                                                                 key={`u-${reservation.id}`}
                                                                 reservation={reservation}
                                                                 expanded={!!expandedRows[reservation.id]}
                                                                 onToggleExpand={() => toggleRowExpansion(reservation.id)}
                                                                 // تحويل إلى حجز جديد عند الضغط على تعديل
                                                                 onEdit={() => editReservation(reservation, "UNCOMPLETED")}
                                                                 onDelete={() => deleteReservation(reservation.id)} // استخدام نفس وظيفة الحذف
                                                                 onMarkCalled={() => markAsCalled(reservation.id)} // تمرير وظيفة التأكيد
                                                                 type="UNCOMPLETED"
                                                                 called={reservation.called} // تمرير حالة الاتصال
                                                             />
                                                         ))}
                                                     </tbody>
                                                 </table>
                                             </div>
                                         )}
                                     </div>
                                </div>
                            )}
                        </div>
                    ) : (
                         // عرض رسالة إذا لم يتم اختيار تاريخ بعد (بعد التحميل الأولي)
                         !loading && (
                            <div className="bg-white rounded-lg shadow p-8 text-center mt-8">
                                <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
                                <p className="text-gray-500 text-sm">الرجاء اختيار تاريخ من الأعلى لعرض الحجوزات</p>
                            </div>
                        )
                    )}
                </>
            )}

             {/* --- نموذج إضافة/تعديل الحجز (Modal) --- */}
             {showNewReservationForm && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex justify-center items-start pt-16 sm:pt-24 pb-16" dir="rtl">
                    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-xl w-full max-w-xl mx-4 sm:mx-auto" >
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                           <h2 className="text-lg sm:text-xl font-bold">{editingReservationId ? 'تعديل حجز' : 'إضافة حجز جديد'}</h2>
                            <button onClick={closeNewReservationForm} className="text-gray-400 hover:text-gray-600">
                               <X size={24} />
                           </button>
                        </div>

                        {/* حقول النموذج */}
                        <div className="space-y-3 sm:space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                            {/* الاسم */}
                            <div>
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-1">اسم العميل<span className="text-red-500">*</span></label>
                                <input type="text" id="name" name="name" value={newReservation.name} onChange={handleFormChange} required className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm" />
                            </div>
                            {/* الهاتف */}
                            <div>
                                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-1">رقم الهاتف<span className="text-red-500">*</span></label>
                                <input type="tel" id="phone" name="phone" value={newReservation.phone} onChange={handleFormChange} required className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm ltr text-left" placeholder="e.g., 05xxxxxxxx" />
                            </div>
                            {/* البريد الإلكتروني */}
                            <div>
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-1">البريد الإلكتروني</label>
                                <input type="email" id="email" name="email" value={newReservation.email} onChange={handleFormChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm ltr text-left" placeholder="example@domain.com"/>
                            </div>
                            {/* المدينة */}
                            <div>
                                <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-1">المدينة<span className="text-red-500">*</span></label>
                                <input type="text" id="city" name="city" value={newReservation.city} onChange={handleFormChange} required className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm" />
                            </div>
                            {/* العنوان */}
                            <div>
                                <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-1">العنوان<span className="text-red-500">*</span></label>
                                <textarea id="address" name="address" value={newReservation.address} onChange={handleFormChange} required rows={2} className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"></textarea>
                            </div>
                            {/* رابط الموقع */}
                             <div>
                                <label htmlFor="locationUrl" className="block text-gray-700 text-sm font-bold mb-1">رابط الموقع (Google Maps)</label>
                                <input type="url" id="locationUrl" name="locationUrl" value={newReservation.locationUrl} onChange={handleFormChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm ltr text-left" placeholder="https://maps.app.goo.gl/..." />
                            </div>

                            {/* نوع الخدمة */}
                             <div>
                                <label htmlFor="serviceType" className="block text-gray-700 text-sm font-bold mb-1">نوع الخدمة</label>
                                <select
                                    id="serviceType"
                                    name="serviceType"
                                    value={newReservation.serviceType}
                                    onChange={handleFormChange}
                                    className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm bg-white"
                                    disabled={!!editingReservationId} // تعطيل عند التعديل (لتجنب تغيير نوع الباقة)
                                >
                                    {Object.entries(ServiceType).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                                {!!editingReservationId && <p className="text-xs text-gray-500 mt-1">لا يمكن تغيير نوع الخدمة عند تعديل حجز قائم.</p>}
                            </div>


                            {/* إضافة التواريخ والفترات */}
                            <div className="border-t pt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">التواريخ والفترات الزمنية<span className="text-red-500">*</span></label>
                                {/* إظهار حقل الإضافة فقط إذا لم يكن في وضع التعديل أو إذا كانت قائمة التواريخ فارغة في وضع التعديل */}
                                {(!editingReservationId || newReservation.dates.length === 0) && (
                                   <div className={`flex flex-col sm:flex-row items-stretch mb-3 gap-2 ${newReservation.dates.length >= availableDatesCount && !editingReservationId ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        <input
                                            type="date"
                                            className="shadow-sm appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm flex-grow disabled:bg-gray-200"
                                            value={tempDate}
                                            onChange={handleTempDateChange}
                                            min={new Date().toISOString().split('T')[0]} // منع التواريخ الماضية
                                             disabled={newReservation.dates.length >= availableDatesCount && !editingReservationId}
                                        />
                                        <select
                                            className="shadow-sm border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm bg-white disabled:bg-gray-200"
                                            value={tempTimePeriod}
                                            onChange={handleTempTimePeriodChange}
                                             disabled={newReservation.dates.length >= availableDatesCount && !editingReservationId}
                                        >
                                            {Object.entries(TimePeriod).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={addDatePeriod}
                                            className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline text-sm flex items-center justify-center transition-colors ${newReservation.dates.length >= availableDatesCount && !editingReservationId ? 'disabled:opacity-50 cursor-not-allowed' : ''}`}
                                            type="button"
                                             disabled={newReservation.dates.length >= availableDatesCount && !editingReservationId}
                                        >
                                            <Plus size={16} className="ml-1" />
                                            إضافة
                                        </button>
                                    </div>
                                )}

                                {/* عرض التواريخ المضافة */}
                                {newReservation.dates.length > 0 && (
                                    <div className="mt-3 border rounded p-2 bg-gray-50 max-h-40 overflow-y-auto">
                                        <h3 className="font-semibold mb-2 text-xs text-gray-600">التواريخ المحددة ({newReservation.dates.length}/{availableDatesCount}):</h3>
                                        <ul className="space-y-1">
                                            {newReservation.dates.map((datePeriod, index) => (
                                                <li key={index} className="flex justify-between items-center bg-white p-1 px-2 rounded border text-xs">
                                                    <div>
                                                       <span className="font-medium">{datePeriod.date ? new Date(datePeriod.date).toLocaleDateString('ar-EG', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : 'غير محدد'}</span>
                                                       <span className="text-gray-600 mr-2">({TimePeriod[datePeriod.timePeriod as keyof typeof TimePeriod]})</span>
                                                    </div>
                                                     {/* السماح بالحذف إذا لم يكن في وضع التعديل أو إذا كان هناك أكثر من تاريخ */}
                                                     {(!editingReservationId || newReservation.dates.length > 1) && (
                                                         <button
                                                             onClick={() => removeDatePeriod(index)}
                                                             className="text-red-500 hover:text-red-700 p-1"
                                                             type="button"
                                                             aria-label="إزالة التاريخ"
                                                         >
                                                             <X size={14} />
                                                         </button>
                                                     )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>


                            {/* عدد العمال */}
                             <div>
                                <label htmlFor="workerCount" className="block text-gray-700 text-sm font-bold mb-1">عدد العمال<span className="text-red-500">*</span></label>
                                <input type="number" id="workerCount" name="workerCount" value={newReservation.workerCount} onChange={handleFormChange} required min="1" className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm" />
                            </div>
                             {/* ساعات إضافية */}
                             <div>
                                <label htmlFor="extraHours" className="block text-gray-700 text-sm font-bold mb-1">ساعات إضافية</label>
                                <input type="number" id="extraHours" name="extraHours" value={newReservation.extraHours} onChange={handleFormChange} min="0" className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm" />
                            </div>
                           {/* السعر */}
                            <div>
                                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-1">السعر (درهم)<span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={newReservation.price}
                                    onChange={handleFormChange}
                                    required
                                    min="0"
                                    step="0.01" // السماح بالكسور العشرية
                                    className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
                                    // تعطيل السعر عند التعديل إذا كان يأتي من نوع الخدمة
                                    // disabled={!!editingReservationId && ['OFFER_4', 'OFFER_8', 'OFFER_12'].includes(newReservation.serviceType)}
                                />
                                {/* {!!editingReservationId && ['OFFER_4', 'OFFER_8', 'OFFER_12'].includes(newReservation.serviceType) &&
                                    <p className="text-xs text-gray-500 mt-1">السعر محدد بناءً على نوع العرض المختار.</p>
                                } */}
                            </div>
                        </div>

                        {/* أزرار الإجراءات */}
                        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 sm:space-x-reverse mt-5 border-t pt-4">
                            <button onClick={closeNewReservationForm} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm w-full sm:w-auto transition-colors" type="button">
                                إلغاء
                            </button>
                            <button onClick={handleAddReservation} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm w-full sm:w-auto flex items-center justify-center transition-colors" type="button" disabled={loading}>
                                {loading ? (
                                    <>
                                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                       </svg>
                                       جاري الحفظ...
                                    </>
                                ) : (
                                    <>
                                        <Save size={16} className="ml-2" />
                                        {editingReservationId ? 'حفظ التعديلات' : 'حفظ الحجز'}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div> // نهاية div الرئيسي للوحة التحكم
    ); // نهاية return للكومبوننت
}; // نهاية ReservationManager


// --- كومبوننت مساعد لعرض صف الحجز وتفاصيله ---
interface ReservationRowProps {
    reservation: {
        id: number;
        name: string;
        phone: string;
        email?: string;
        city: string;
        address: string;
        locationUrl?: string;
        serviceType: string;
        dates: { date: string | Date; timePeriod: string }[];
        extraHours: number;
        workerCount: number;
        price: number;
        timePeriod?: string;
    } ;
    expanded: boolean;
    onToggleExpand: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onMarkCalled?: () => void; // اختياري للحجوزات غير المكتملة
    type: 'COMPLETED' | 'UNCOMPLETED';
    called?: boolean; // اختياري للحجوزات غير المكتملة
}

const ReservationRow: React.FC<ReservationRowProps> = ({
    reservation, expanded, onToggleExpand, onEdit, onDelete, onMarkCalled, type, called
}) => {
    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    return (
        <React.Fragment>
            {/* الصف الرئيسي للحجز */}
            <tr
                className={`hover:bg-gray-50 cursor-pointer ${expanded ? 'bg-gray-50' : ''}`}
                onClick={onToggleExpand}
                aria-expanded={expanded}
            >
                {/* الاسم */}
                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">{reservation.name}</span>
                    {/* عرض الهاتف تحت الاسم في الشاشات الصغيرة */}
                    <a href={`tel:${reservation.phone}`} className="text-blue-600 hover:underline flex items-center text-xs mt-1 md:hidden" onClick={stopPropagation}>
                        <Phone size={12} className="ml-1" />
                        {reservation.phone}
                    </a>
                </td>
                 {/* رقم الهاتف (مخفي في الشاشات الصغيرة) */}
                 <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden md:table-cell">
                     <a href={`tel:${reservation.phone}`} className="text-blue-600 hover:underline flex items-center" onClick={stopPropagation}>
                         <Phone size={14} className="ml-1" />
                         {reservation.phone}
                     </a>
                 </td>
                {/* إجراءات */}
                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                        {/* زر تأكيد الاتصال (فقط للحجوزات غير المكتملة وغير المؤكدة) */}
                        {type === 'UNCOMPLETED' && onMarkCalled && !called && (
                           <button
                                className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-100 transition-colors flex items-center text-xs sm:text-sm"
                                onClick={(e) => { stopPropagation(e); onMarkCalled(); }}
                                title="تأكيد الاتصال"
                           >
                                <Phone size={16} className="ml-1" />
                                <span className="hidden sm:inline">اتصال</span>
                           </button>
                        )}
                         {/* إظهار علامة صح إذا تم الاتصال */}
                         {type === 'UNCOMPLETED' && called && (
                             <span className="text-green-600 p-1 flex items-center text-xs sm:text-sm" title="تم الاتصال">
                                 <Save size={16} className="ml-1"/> {/* أو Check */}
                                 <span className="hidden sm:inline">تم</span>
                             </span>
                         )}
                        {/* زر التعديل */}
                        <button
                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100 transition-colors"
                             onClick={(e) => { stopPropagation(e); onEdit(); }}
                             title={type === 'UNCOMPLETED' ? "تحويل إلى حجز" : "تعديل"}
                        >
                            <Edit size={16} />
                        </button>
                        {/* زر الحذف */}
                        <button
                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-100 transition-colors"
                            onClick={(e) => { stopPropagation(e); onDelete(); }}
                            title="حذف"
                        >
                            <X size={16} />
                        </button>
                        {/* زر التوسيع/الطي */}
                        <button className="text-gray-500 hover:text-gray-700 p-1" onClick={onToggleExpand} aria-label={expanded ? "طي التفاصيل" : "عرض التفاصيل"}>
                           {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                    </div>
                </td>
            </tr>

            {/* الصف المخفي للتفاصيل */}
            {expanded && (
                <tr>
                    <td colSpan={3} className="px-4 py-3 bg-gray-100 border-t border-gray-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                            {/* البريد الإلكتروني */}
                            <div className="flex items-start">
                                <Mail size={14} className="mt-1 ml-2 text-gray-500" />
                                <div>
                                    <span className="text-gray-500 font-medium">البريد:</span>
                                    <p className="text-gray-800">{reservation.email || 'لا يوجد'}</p>
                                </div>
                            </div>
                            {/* المدينة */}
                            <div className="flex items-start">
                                <MapPin size={14} className="mt-1 ml-2 text-gray-500" />
                                <div>
                                    <span className="text-gray-500 font-medium">المدينة:</span>
                                    <p className="text-gray-800">{reservation.city}</p>
                                </div>
                            </div>
                            {/* العنوان */}
                            <div className="flex items-start sm:col-span-2 lg:col-span-1">
                                <MapPin size={14} className="mt-1 ml-2 text-gray-500" />
                                <div>
                                    <span className="text-gray-500 font-medium">العنوان:</span>
                                    <p className="text-gray-800 break-words">{reservation.address}</p>
                                </div>
                            </div>
                             {/* رابط الموقع */}
                             {reservation.locationUrl && (
                                 <div className="flex items-start">
                                     <MapPin size={14} className="mt-1 ml-2 text-blue-500" />
                                     <div>
                                         <span className="text-gray-500 font-medium">الموقع:</span>
                                         <p>
                                             <a href={reservation.locationUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                 فتح على الخريطة
                                             </a>
                                         </p>
                                     </div>
                                 </div>
                             )}
                            {/* نوع الخدمة */}
                            <div className="flex items-start">
                                <Calendar size={14} className="mt-1 ml-2 text-gray-500" />
                                <div>
                                    <span className="text-gray-500 font-medium">الخدمة:</span>
                                    <p className="text-gray-800">{ServiceType[reservation.serviceType] || reservation.serviceType}</p>
                                </div>
                            </div>
                            {/* ساعات إضافية */}
                            <div className="flex items-start">
                                <Clock size={14} className="mt-1 ml-2 text-gray-500" />
                                <div>
                                    <span className="text-gray-500 font-medium">ساعات إضافية:</span>
                                    <p className="text-gray-800">{reservation.extraHours}</p>
                                </div>
                            </div>
                            {/* عدد العمال */}
                            <div className="flex items-start">
                                <Users size={14} className="mt-1 ml-2 text-gray-500" />
                                <div>
                                    <span className="text-gray-500 font-medium">عدد العمال:</span>
                                    <p className="text-gray-800">{reservation.workerCount}</p>
                                </div>
                            </div>
                            {/* السعر (فقط للحجوزات المكتملة) */}
                            {type === 'COMPLETED' && (
                               <div className="flex items-start">
                                    <DollarSign size={14} className="mt-1 ml-2 text-green-600" />
                                    <div>
                                        <span className="text-gray-500 font-medium">السعر:</span>
                                        <p className="text-gray-800 font-semibold">{reservation.price} درهم</p>
                                    </div>
                                </div>
                            )}
                             {/* عرض تواريخ الباقة (إذا كانت موجودة ومختلفة عن تاريخ اليوم) */}
                              {reservation.dates && reservation.dates.length > 1 && (
                                <div className="sm:col-span-2 lg:col-span-3">
                                    <span className="text-gray-500 font-medium">تواريخ الباقة الأخرى:</span>
                                     <div className="flex flex-wrap gap-1 mt-1">
                                         {reservation.dates
                                         .map((d: { date: string | Date; timePeriod: string }, i: number) => (
                                          <span key={i} className="bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded text-xs">
                                             {new Date(d.date).toLocaleDateString('ar-SA', { day: '2-digit', month: 'short'})} ({TimePeriod[d.timePeriod as keyof typeof TimePeriod].substring(0,3)})
                                           </span>
                                         ))}
                                   </div>
                                </div>
                              )}
                        </div>
                    </td>
                </tr>
            )}
        </React.Fragment>
    );
};


export default ReservationManager;