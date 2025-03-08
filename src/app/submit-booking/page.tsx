"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SubmitBooking() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSent, setIsSent] = useState(false);
    const [bookingData, setBookingData] = useState(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const redirect_status = searchParams.get("redirect_status");

        // If redirect_status is not "succeeded", show an error message
        if (redirect_status !== "succeeded") {
            setError("حدث خطأ أثناء تأكيد الحجز.");
            setIsLoading(false);
            return;
        }

        // Process the booking data if needed
        // Assuming that bookingData will be fetched or set here

        setIsSent(true); // Assuming booking was successful when redirect_status is "succeeded"
        setIsLoading(false);
    }, [searchParams]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
            {isLoading && (
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-700">Processing your booking...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-md max-w-md">
                    <p>{error}</p>
                </div>
            )}

            {isSent && !isLoading && !error && (
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
            )}
        </div>
    );
}
