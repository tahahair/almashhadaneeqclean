"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "../../../lib/convertToSubcurrency";
import { PaymentRequest } from "@stripe/stripe-js";

const CheckoutPage = ({
  amount,
  language,
  
  bookingData,
}: {
  amount: number;
  language: "ar" | "en";
   
  bookingData: string[];
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);

  // Create PaymentIntent and set the client secret.
  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  // Set up the Payment Request for Apple Pay and other supported wallets.
  useEffect(() => {
    if (stripe && clientSecret) {
      const pr = stripe.paymentRequest({
        country: "AE", // Adjust based on your business location
        currency: "aed",
        total: {
          label: language === "ar" ? "المبلغ الكلي" : "Total",
          amount: convertToSubcurrency(amount),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // Check if the browser supports Payment Request (Apple Pay, etc.)
      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });

      // Handle the payment method event when the user uses the Payment Request Button.
      pr.on("paymentmethod", async (ev) => {
        setLoading(true);
        const bookingId: string[] = [];
        try {
          // Process the booking API calls
          for (let i = 0; i < bookingData.length; i++) {
            const response = await fetch("/api/booking", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: bookingData[i],
            });
            if (response.ok) {
              const responseData = await response.json();
              bookingId.push(responseData.id);
            } else {
              const errorData = await response.json();
              alert(
                `${
                  language === "ar"
                    ? "حدث خطأ أثناء تأكيد الحجز: "
                    : "Error while confirming booking: "
                } ${errorData.error || "Unknown error"}`
              );
              ev.complete("fail");
              setLoading(false);
              return;
            }
          }
        } catch {
          alert(
            language === "ar"
              ? "حدث خطأ أثناء الاتصال بالخادم."
              : "Server error during booking."
          );
          ev.complete("fail");
          setLoading(false);
          return;
        }

        // Confirm the PaymentIntent using the payment method from the Payment Request.
        const { error: confirmError } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: ev.paymentMethod.id,
          },
          { handleActions: false }
        );

        if (confirmError) {
          ev.complete("fail");
          setErrorMessage(confirmError.message);
          // Delete the bookings on failure
          for (let i = 0; i < bookingId.length; i++) {
            await fetch("/api/booking", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: bookingId[i] }),
            });
          }
          setLoading(false);
        } else {
          ev.complete("success");
          setLoading(false);
          window.location.href = `https://almashhadaneeq.vercel.app/submit-booking?redirect_status=succeeded`;
        }
      });
    }
  }, [stripe, clientSecret, amount, language, bookingData]);

  // Traditional form submission for PaymentElement (e.g. card payments)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const bookingId: string[] = [];

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    try {
      // Process the booking API calls
      for (let i = 0; i < bookingData.length; i++) {
        const response = await fetch("/api/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: bookingData[i],
        });

        if (response.ok) {
          const responseData = await response.json();
          bookingId.push(responseData.id);


          const responseUN = await fetch("/api/uncompleted", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: bookingData[i],
          });
          if (responseUN.ok) {
             
            console.log("Un deleted:");
          } else {
            const errorData = await response.json();
            alert(
              language === "ar"
                ? `حدث خطأ أثناء حذف الحجز: ${errorData.error || "Unknown error"}`
                : `Error while deleting booking: ${errorData.error || "Unknown error"}`
            );
          }


          
        } else {
          const errorData = await response.json();
          alert(
            language === "ar"
              ? `حدث خطأ أثناء تأكيد الحجز: ${errorData.error || "Unknown error"}`
              : `Error while confirming booking: ${errorData.error || "Unknown error"}`
          );
          setLoading(false);
          return;
        }
      }
    } catch (e){
      console.log("error",e);
      alert(
        language === "ar"
          ? "حدث خطأ أثناء الاتصال بالخادم."
          : "Server error during booking."
      );
      setLoading(false);
      return;
    }

    
    interface BookingData {
      serviceType: 'ONE_TIME' | 'OFFER_4' | 'OFFER_8' | 'OFFER_12';
      timePeriod: 'MORNING'  | 'EVENING';
      date: string;
      extraHours?: number;
      city: string;
      address: string;
      workerCount: number;
      price: number;
      name: string;
      phone: string;
    }

    interface ExtractedBookingInfo {
      type: string;
      workers: number;
      hours: number;
      location: string;
      time: string;
      date: string;
      price: number;
      customerName: string;
      customerPhone: string;
    }

    function extractBookingInfo(bookingData: string | BookingData): ExtractedBookingInfo {
      // تحليل البيانات إذا كانت سلسلة نصية
      const data: BookingData = typeof bookingData === 'string' ? JSON.parse(bookingData) : bookingData;
      
      // تحويل نوع الخدمة إلى نص مفهوم بالعربية
      let bookingType: string;
      switch (data.serviceType) {
      case 'ONE_TIME':
        if (language === 'ar' ){
          bookingType = 'زيارة واحدة';
        } else {
          bookingType = 'One Time Visit';
        }
         break;
      case 'OFFER_4':
        if (language === 'ar' ){
          bookingType = 'العرض البرونزي';
        }
        else {
          bookingType = 'Bronze Offer';
        }
        
        break;
      case 'OFFER_8':
        if (language === 'ar' ){
          bookingType = 'العرض الفضي';
        }
        else {
          bookingType = 'Silver Offer';
        }
        
        break;
        case 'OFFER_12':
          if (language === 'ar' ){
            bookingType = 'العرض الذهبي';
          }
          else {
            bookingType = 'Golden Offer';
          }
           break;
      default:
      if (language === 'ar' ){  
        bookingType = 'زيارة واحدة';
      }
      else {
        bookingType = 'One Time Visit';
      }
      }
      
      // تحويل فترة الوقت إلى نص مفهوم بالعربية
      let arrivalTime: string;
      switch (data.timePeriod) {
      case 'MORNING':
        arrivalTime = '9:00 AM - 9:30 AM';
        break;
      
      case 'EVENING':
        arrivalTime = '14:30 PM - 15:00 PM';
        break;
      default:
        arrivalTime = '08:00 AM - 11:00 AM';
      }
      
      // تحويل التاريخ إلى الصيغة المناسبة (YYYY-MM-DD)
      const dateObj = new Date(data.date);
      const formattedDate: string = dateObj.toISOString().split('T')[0];
      
      // احتساب عدد الساعات (افتراض 4 ساعات أساسية + ساعات إضافية)
      const baseHours = 4;
      const hours: number = baseHours + (data.extraHours || 0);
      
      // تجميع الموقع من المدينة والعنوان
      const location: string = `${data.city} - ${data.address.split('\n')[0]}`;
      
      // إنشاء كائن بالمعلومات المطلوبة
      return {
      type: bookingType,
      workers: data.workerCount,
      hours: hours,
      location: location,
      time: arrivalTime,
      date: formattedDate,
      price: data.price,
      // معلومات إضافية للعميل يمكن إضافتها
      customerName: data.name,
      customerPhone: data.phone
      };
    }
    interface ExtractedBookingInfo {
      type: string;
      workers: number;
      hours: number;
      location: string;
      time: string;
      date: string;
      price: number;
      customerName: string;
      customerPhone: string;
    }

    function createConfirmationLink(bookingData: string): string {
      const extractedData: ExtractedBookingInfo = extractBookingInfo(bookingData);
      
      // إنشاء كائن URL
      const url = new URL('/submit-booking', window.location.origin);
      
      // إضافة المعلمات إلى الرابط
      url.searchParams.append('type', encodeURIComponent(extractedData.type));
      url.searchParams.append('workers', extractedData.workers.toString());
      url.searchParams.append('hours', extractedData.hours.toString());
      url.searchParams.append('location', encodeURIComponent(extractedData.location));
      url.searchParams.append('time', encodeURIComponent(extractedData.time));
      url.searchParams.append('date', encodeURIComponent(extractedData.date));
      url.searchParams.append('price', extractedData.price.toString());
      
      // يمكن إضافة معلومات العميل أيضًا إذا كنت تريد عرضها في صفحة التأكيد
      url.searchParams.append('name', encodeURIComponent(extractedData.customerName));
      url.searchParams.append('phone', encodeURIComponent(extractedData.customerPhone));
      
      return url.toString();
    }
     
   


    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${createConfirmationLink(bookingData[0])}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      try {
        // Delete the bookings if payment confirmation fails
        for (let i = 0; i < bookingId.length; i++) {
          const response = await fetch("/api/booking", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: bookingId[i] }),
          });
          if (response.ok) {
            const responseData = await response.json();
            console.log("Booking deleted:", responseData.message);
          } else {
            const errorData = await response.json();
            alert(
              language === "ar"
                ? `حدث خطأ أثناء حذف الحجز: ${errorData.error || "Unknown error"}`
                : `Error while deleting booking: ${errorData.error || "Unknown error"}`
            );
          }
        }
      } catch {
        alert(
          language === "ar"
            ? "حدث خطأ أثناء الاتصال بالخادم."
            : "Server error during booking deletion."
        );
      }
      setLoading(false);
      return;
    } else {
      setLoading(false);
      return;
    }
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            {language === "ar" ? "جارٍ التحميل..." : "Loading..."}
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {/* Render the Apple Pay / Payment Request Button if available */}
      {paymentRequest && (
        <div className="mb-4">
          <PaymentRequestButtonElement
            options={{ paymentRequest }}
            className="payment-request-button"
          />
        </div>
      )}

      {/* Render the traditional PaymentElement as an alternative */}
      <div className="mb-4">{clientSecret && <PaymentElement />}</div>

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading
          ? language === "ar"
            ? `ادفع ${amount} درهم`
            : `Pay AED ${amount}`
          : language === "ar"
          ? "جاري المعالجة..."
          : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
