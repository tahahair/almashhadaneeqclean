"use client"
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react'

// Define interface for booking data
interface BookingData {
  bookingType: string;
  workers: number;
  hours: number;
  location: string;
  arrivalTime: string;
  date: string;
  totalPrice: number;
}

// Default booking data (fallback) - keep in Arabic for default as per original code
const defaultBookingData: BookingData = {
  bookingType: "زيارة واحدة",
  workers: 1,
  hours: 4,
  location: "CV5 - Al Mamzar - Sharjah",
  arrivalTime: "11:00 AM - 11:30 AM",
  date: "2025-03-27",
  totalPrice: 85
};

// Language dictionary
const langDict = {
  EN: {
    loadingData: "Loading booking data...",
    successPopupTitle: "Congratulations!",
    successPopupMessage: "All booking steps completed successfully.",
    bookingConfirmationTitle: "Booking Confirmed Successfully!",
    bookingConfirmationSubtitle: "Thank you! Your booking has been confirmed successfully.",
    orderDetails: "Order Details",
    bookingTypeLabel: "Booking Type",
    workersLabel: "Number of Workers",
    hoursLabel: "Number of Hours",
    locationLabel: "Location",
    arrivalTimeLabel: "Arrival Time",
    dateLabel: "Date",
    totalPriceLabel: "Total Price",
    currency: "AED",
    supportMessage1: "Our team will contact you soon to confirm the details.",
    supportMessage2: "If you have any questions or inquiries, you can contact our support team:",
    whatsappButtonText: "Contact via WhatsApp",
    homeButtonText: "Back to Home",
  },
  AR: {
    loadingData: "جاري تحميل بيانات الحجز...",
    successPopupTitle: "تهانينا!",
    successPopupMessage: "تم الانتهاء من جميع خطوات الحجز بنجاح",
    bookingConfirmationTitle: "تم تأكيد الحجز بنجاح!",
    bookingConfirmationSubtitle: "شكراً لك! تم تأكيد حجزك بنجاح.",
    orderDetails: "تفاصيل الحجز",
    bookingTypeLabel: "نوع الحجز",
    workersLabel: "عدد العمال",
    hoursLabel: "عدد الساعات",
    locationLabel: "الموقع",
    arrivalTimeLabel: "وقت الوصول",
    dateLabel: "التاريخ",
    totalPriceLabel: "السعر الإجمالي",
    currency: "درهم",
    supportMessage1: "سيقوم فريقنا بالتواصل معك قريباً لتأكيد التفاصيل",
    supportMessage2: "في حال لديك أي سؤال أو استفسار، يمكنك التواصل مع فريق الدعم الخاص بنا:",
    whatsappButtonText: "تواصل عبر واتساب",
    homeButtonText: "العودة إلى الصفحة الرئيسية",
  },
};


  

export default function BookingConfirmation() {
  // Load language from local storage or default to 'AR'
  const [lang, setLang] = useState<'EN' | 'AR'>('AR');
let searchParams: ReturnType<typeof useSearchParams> | null = null;

  function Search() {
    searchParams = useSearchParams();
   
    return <input placeholder="Search..." />
  }


  
  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as 'EN' | 'AR';
    if (storedLang) {
      setLang(storedLang);
    }
  }, []);
    const [isLoading, setIsLoading] = useState(true);
  const [bookingData, setBookingData] = useState<BookingData>(defaultBookingData);


  useEffect(() => {
    // Load language from local storage on mount
    const storedLang = localStorage.getItem('lang') as 'EN' | 'AR';
    if (storedLang) {
      setLang(storedLang);
    }
  }, []);




  

  useEffect(() => {
    // Function to parse booking data from URL query parameters
    const parseBookingData = () => {
      // Get individual parameters from URL
      const type = searchParams ? searchParams.get('type') : null;
      const workers = searchParams ? searchParams.get('workers') : null;
      const hours = searchParams ? searchParams.get('hours') : null;
      const location = searchParams ? searchParams.get('location') : null;
      const time = searchParams ? searchParams.get('time') : null;
      const date = searchParams ? searchParams.get('date') : null;
      const price = searchParams ? searchParams.get('price') : null;


      // If we have at least some of the parameters, create a new booking data object
      if (type || workers || hours || location || time || date || price) {
        try {
          const newBookingData = {
            ...defaultBookingData, // Use defaults as fallback

            // Override with values from URL if they exist
            ...(type && { bookingType: decodeURIComponent(type) }),
            ...(workers && { workers: parseInt(workers, 10) || defaultBookingData.workers }),
            ...(hours && { hours: parseInt(hours, 10) || defaultBookingData.hours }),
            ...(location && { location: decodeURIComponent(location) }),
            ...(time && { arrivalTime: decodeURIComponent(time) }),
            ...(date && { date: decodeURIComponent(date) }),
            ...(price && { totalPrice: parseInt(price, 10) || defaultBookingData.totalPrice })
          };

          setBookingData(newBookingData);
        } catch (error) {
          console.error('Error parsing booking data:', error);
          // Keep default data if parsing fails
        }
      }

      // Show loading spinner for a set time before revealing content
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);

        // Show success popup after loading completes
        showSuccessPopup();

        // Start confetti animation
        createConfetti();

        // Subtle shine effect for success icon
        addShineEffect();
      }, 2000); // Show loading spinner for 2 seconds

      return () => clearTimeout(loadingTimer);
    };

    parseBookingData();
  }, [searchParams]);




  const showSuccessPopup = (): void => {
    const popup = document.getElementById('successPopup');
    if (!popup) return;

    popup.style.display = 'block';

    // Animate popup
    popup.animate(
      [
        { transform: 'translate(-50%, -50%) scale(0.7)', opacity: 0 },
        { transform: 'translate(-50%, -50%) scale(1.05)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 }
      ],
      {
        duration: 600,
        easing: 'ease-out',
        fill: 'forwards'
      }
    );

    // Hide popup after delay
    setTimeout(() => {
      popup.animate(
        [
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
          { transform: 'translate(-50%, -50%) scale(0.8)', opacity: 0 }
        ],
        {
          duration: 400,
          easing: 'ease-in',
          fill: 'forwards'
        }
      );

      setTimeout(() => {
        if (popup) {
          popup.style.display = 'none';
        }
      }, 400);
    }, 2500);
  };

  const createConfetti = (): void => {
    const container = document.getElementById('celebrationContainer');
    if (!container) return;

    const colors = ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0'];
    const shapes = ['circle', 'square', 'triangle'];

    // Create lightweight confetti
    const confettiCount = window.innerWidth < 480 ? 40 : 80;

    for (let i = 0; i < confettiCount; i++) {
      createConfettiPiece(container, colors, shapes);
    }
  };

  const createConfettiPiece = (
    container: HTMLElement,
    colors: string[],
    shapes: string[]
  ): void => {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';

    // Randomize properties
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = Math.random() * 8 + 4;
    const leftPos = Math.random() * 100;

    // Apply styles
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = color;
    confetti.style.left = `${leftPos}%`;

    // Apply shape
    if (shape === 'circle') {
      confetti.style.borderRadius = '50%';
    } else if (shape === 'triangle') {
      confetti.style.width = '0';
      confetti.style.height = '0';
      confetti.style.backgroundColor = 'transparent';
      confetti.style.borderLeft = `${size}px solid transparent`;
      confetti.style.borderRight = `${size}px solid transparent`;
      confetti.style.borderBottom = `${size * 1.5}px solid ${color}`;
    }

    container.appendChild(confetti);

    // Calculate animation parameters
    const duration = 2000 + Math.random() * 1000;
    const delay = Math.random() * 500;

    // Animate confetti fall with wobble
    confetti.animate(
      [
        {
          transform: 'translateY(0) rotate(0deg)',
          opacity: 1
        },
        {
          transform: `translateY(${window.innerHeight * 0.3}px) rotate(${Math.random() * 180 - 90}deg)`,
          opacity: 1,
          offset: 0.4
        },
        {
          transform: `translateY(${window.innerHeight * 0.75}px) rotate(${Math.random() * 360}deg)`,
          opacity: 0.7,
          offset: 0.8
        },
        {
          transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 720}deg)`,
          opacity: 0
        }
      ],
      {
        duration: duration,
        delay: delay,
        easing: 'cubic-bezier(0.21, 0.53, 0.29, 0.8)',
        fill: 'forwards'
      }
    );

    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, duration + delay);
  };

  const addShineEffect = (): void => {
    const successIcon = document.querySelector('.success-icon');
    if (!successIcon) return;

    // Create shine element
    const shine = document.createElement('div');
    shine.style.position = 'absolute';
    shine.style.top = '0';
    shine.style.left = '-100%';
    shine.style.width = '50%';
    shine.style.height = '100%';
    shine.style.background = 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%)';
    shine.style.transform = 'skewX(-25deg)';
    (successIcon as HTMLElement).style.overflow = 'hidden';
    successIcon.appendChild(shine);

    // Animate shine effect
    shine.animate(
      [
        { left: '-100%' },
        { left: '200%' }
      ],
      {
        duration: 2000,
        delay: 700,
        iterations: 2,
        easing: 'ease-in-out'
      }
    );
  };
  if (isLoading) {
    return 
    (
        <Suspense>
        <Search />
      </Suspense>
    ) // Show loading spinner while loading
}

  return (
    <>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">{langDict[lang].loadingData}</div>
        </div>
      )}

      <div className="celebration-container" id="celebrationContainer"></div>

      <div className="success-popup" id="successPopup">
        <div className="success-popup-icon">✓</div>
        <h2>{langDict[lang].successPopupTitle}</h2>
        <p>{langDict[lang].successPopupMessage}</p>
      </div>

      {/* Only show content when loading is complete */}
      <div className="container" style={{ display: isLoading ? 'none' : 'block', direction: lang === 'AR' ? 'rtl' : 'ltr' }}>
        <div className="thank-you-card animate__animated animate__fadeIn" style={{ direction: lang === 'AR' ? 'rtl' : 'ltr' }}>
          <div className="success-icon">✓</div>
          <h1 className="animate__animated animate__bounceIn animate__delay-1s">{langDict[lang].bookingConfirmationTitle}</h1>
          <p className="subtitle animate__animated animate__fadeIn animate__delay-1s">{langDict[lang].bookingConfirmationSubtitle}</p>

          <div className="divider"></div>

          <div className="order-summary animate__animated animate__fadeIn animate__delay-1s">
            <h2 className="order-title">{langDict[lang].orderDetails}</h2>

            <div className="order-detail">
              <span className="order-detail-label">{langDict[lang].bookingTypeLabel}</span>
              <span className="order-detail-value">{bookingData.bookingType}</span>
            </div>

            <div className="order-detail">
              <span className="order-detail-label">{langDict[lang].workersLabel}</span>
              <span className="order-detail-value">{bookingData.workers}</span>
            </div>

            <div className="order-detail">
              <span className="order-detail-label">{langDict[lang].hoursLabel}</span>
              <span className="order-detail-value">{bookingData.hours}</span>
            </div>

            <div className="order-detail">
              <span className="order-detail-label">{langDict[lang].locationLabel}</span>
              <span className="order-detail-value">{bookingData.location}</span>
            </div>

            <div className="order-detail">
              <span className="order-detail-label">{langDict[lang].arrivalTimeLabel}</span>
              <span className="order-detail-value">{bookingData.arrivalTime}</span>
            </div>

            <div className="order-detail">
              <span className="order-detail-label">{langDict[lang].dateLabel}</span>
              <span className="order-detail-value">{bookingData.date}</span>
            </div>

            <div className="divider"></div>

            <div className="order-detail">
              <span className="order-detail-label">{langDict[lang].totalPriceLabel}</span>
              <span className="total-price">
                {bookingData.totalPrice} {langDict[lang].currency}
              </span>
            </div>
          </div>

          <div className="support-info animate__animated animate__fadeIn animate__delay-2s">
            <p>{langDict[lang].supportMessage1}</p>
            <p>{langDict[lang].supportMessage2}</p>
            <a href="https://wa.me/971553465021" className="whatsapp-button">
              <span style={{ marginLeft: lang === 'EN' ? '8px' : '0', marginRight: lang === 'AR' ? '8px' : '0' }}>{langDict[lang].whatsappButtonText}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.6 6.32C16.4 5.12 14.8 4.4 13.2 4.4C9.8 4.4 7.1 7.1 7.1 10.5C7.1 11.7 7.4 12.8 8 13.8L7 17L10.3 16C11.2 16.6 12.2 16.8 13.2 16.8C16.5 16.8 19.3 14.1 19.3 10.7C19.3 9.1 18.7 7.5 17.6 6.32ZM13.2 15.6C12.3 15.6 11.4 15.4 10.7 14.9L10.5 14.8L8.4 15.4L9 13.4L8.8 13.2C8.3 12.4 8 11.5 8 10.5C8 7.7 10.3 5.4 13.1 5.4C14.4 5.4 15.7 5.9 16.6 6.9C17.5 7.8 18 9.1 18 10.4C18.2 13.3 15.9 15.6 13.2 15.6ZM15.9 11.9C15.7 11.8 14.8 11.4 14.6 11.3C14.4 11.2 14.3 11.2 14.2 11.4C14.1 11.6 13.8 12 13.7 12.1C13.6 12.2 13.5 12.2 13.3 12.1C12.4 11.7 11.8 11.3 11.2 10.4C11 10.1 11.3 10.1 11.5 9.70001C11.6 9.60001 11.5 9.50001 11.5 9.40001C11.5 9.30001 11.2 8.40001 11.1 8.00001C11 7.50001 10.8 7.60001 10.7 7.60001C10.6 7.60001 10.5 7.60001 10.4 7.60001C10.3 7.60001 10.1 7.60001 9.9 7.80001C9.7 8.00001 9.3 8.40001 9.3 9.30001C9.3 10.2 9.9 11.1 10 11.2C10.1 11.3 11.1 12.9 12.7 13.6C13.9 14.2 14.3 14.2 14.8 14.1C15.1 14.1 15.8 13.7 16 13.3C16.2 12.9 16.2 12.5 16.1 12.4C16 12.3 15.9 12.3 15.7 12.2L15.9 11.9Z" fill="white"/>
              </svg>
            </a>
          </div>

          <Link href="/" className="home-button animate__animated animate__fadeIn animate__delay-2s">
            {langDict[lang].homeButtonText}
          </Link>
        </div>
      </div>

      <style jsx global>{`
        :root {
          --primary-color: #4CAF50;
          --secondary-color: #4285F4;
          --text-color: #333;
          --light-bg: #f9f9f9;
          --border-color: #e0e0e0;
          --success-bg: #e8f5e9;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: ${lang === 'AR' ? "'Tajawal', Arial, sans-serif" : "'Arial', sans-serif"};
        }

        body {
          background-color: #f5f5f5;
          color: var(--text-color);
          line-height: 1.6;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .container {
          width: 90%;
          max-width: 500px;
          margin: 0 auto;
          padding: 20px 0;
          position: relative;
          z-index: 10;
        }

        .thank-you-card {
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          padding: 25px 20px;
          margin-top: 40px;
          position: relative;
          overflow: hidden;
          text-align: ${lang === 'AR' ? 'right' : 'left'}; /* For right-to-left text */
        }

        .success-icon {
          width: 70px;
          height: 70px;
          background-color: var(--success-bg);
          border-radius: 50%;
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-color);
          font-size: 35px;
          position: relative;
        }

        h1 {
          color: var(--primary-color);
          text-align: center;
          margin-bottom: 10px;
          font-size: 24px;
        }

        .subtitle {
          text-align: center;
          margin-bottom: 20px;
          color: #666;
          font-size: 16px;
        }

        .divider {
          border-top: 1px solid var(--border-color);
          margin: 15px 0;
        }

        .order-summary {
          background-color: var(--light-bg);
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 15px;
        }

        .order-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 12px;
          color: var(--text-color);
        }

        .order-detail {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          direction: ${lang === 'AR' ? 'rtl' : 'ltr'};
        }

        .order-detail-label {
          color: #666;
        }

        .order-detail-value {
          font-weight: bold;
        }

        .total-price {
          font-size: 18px;
          font-weight: bold;
          color: var(--secondary-color);
          text-align: left; /* Keep left aligned for numbers */
        }

        .support-info {
          text-align: center;
          margin: 15px 0;
        }

        .whatsapp-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #25D366;
          color: white;
          padding: 10px 18px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: bold;
          margin-top: 10px;
          transition: all 0.3s ease;
          flex-direction: ${lang === 'AR' ? 'row-reverse' : 'row'}; /* Reverse for Arabic */
        }

        .home-button {
          display: block;
          background-color: var(--secondary-color);
          color: white;
          padding: 12px;
          border-radius: 8px;
          text-align: center;
          text-decoration: none;
          font-weight: bold;
          margin-top: 15px;
          transition: all 0.3s ease;
        }

        /* Animation Styles */
        .celebration-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 20;
          overflow: hidden;
        }

        .confetti {
          position: absolute;
          top: -10px;
          will-change: transform;
        }

        .success-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
          text-align: center;
          z-index: 30;
          max-width: 80%;
          display: none;
        }

        .success-popup-icon {
          width: 60px;
          height: 60px;
          background-color: var(--primary-color);
          border-radius: 50%;
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 30px;
        }

        .success-popup h2 {
          color: var(--primary-color);
          margin-bottom: 5px;
          font-size: 20px;
        }

        .success-popup p {
          color: #666;
          font-size: 14px;
          margin: 0;
        }

        /* Loading spinner styles */
        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 50;
        }

        .loading-spinner {
          width: 60px;
          height: 60px;
          border: 5px solid var(--light-bg);
          border-top: 5px solid var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .loading-text {
          position: absolute;
          margin-top: 80px;
          font-size: 16px;
          color: var(--primary-color);
          font-weight: bold;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Responsive styles */
        @media (max-width: 480px) {
          .container {
            width: 95%;
            padding: 10px 0;
          }

          .thank-you-card {
            padding: 20px 15px;
            margin-top: 30px;
          }

          .success-icon {
            width: 60px;
            height: 60px;
            font-size: 30px;
          }

          h1 {
            font-size: 20px;
          }

          .subtitle {
            font-size: 14px;
          }

          .order-summary {
            padding: 12px;
          }

          .order-title {
            font-size: 16px;
          }

          .success-popup {
            padding: 15px;
          }

          .success-popup-icon {
            width: 50px;
            height: 50px;
            font-size: 25px;
          }

          .loading-spinner {
            width: 50px;
            height: 50px;
          }

          .loading-text {
            font-size: 14px;
            margin-top: 70px;
          }
        }
      `}</style>
    </>
  );
}