"use client";
import { Suspense  } from "react";
import {  useRouter } from "next/navigation";

function SubmitBookingContent() {
  
    const router = useRouter();
    

 

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
           
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
                    <h2 className="text-2xl font-semibold text-green-600">تم تأكيد الحجز بنجاح</h2>
                    <p className="text-gray-600 mt-2">شكراً لك! تم تأكيد حجزك بنجاح.</p>
                    <button
                        onClick={() => router.push("/")}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        العودة إلى الصفحة الرئيسية
                    </button>
                </div>
          
        </div>
    );
}

export default function SubmitBooking() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SubmitBookingContent />
        </Suspense>
    );
}
