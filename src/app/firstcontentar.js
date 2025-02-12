import React from 'react';
import { ArrowDown,  Users, Camera, ArrowLeft } from 'lucide-react';
import ImageSlider from './ImageSlider';
 
const HairClinicInterface = () => {
  const images = [
    {
      firstImage: '/im2.jpg',
      secondImage: '/b2.jpg',
    }, {
      firstImage: '/im4.png',
      secondImage: '/b4.png',
    },
    {
      firstImage: '/im5.png',
      secondImage: '/b5.png',
    },
    {
      firstImage: '/im1.jpg',
      secondImage: '/b1.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 mb-4 to-white p-2 font-sans text-gray-800 relative overflow-hidden">
      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto space-y-4">
       

        {/* Solution Section */}
       
      {/* Header Section */}
<div className="text-center space-y-1 relative">
  {/* Main Title Section */}
  <div className="relative py-1 text-center">
    {/* Subtle animated gradient background */}
    <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50 animate-subtle-shift rounded-lg"></div>
    
    {/* Main heading with coordinated animations */}
    <div className="relative space-y-1">
      <h1 className="text-2xl md:text-3xl font-bold">
        <div className="mb-1 text-gray-800">
          كم عميل تخسر عيادتك
        </div>
        <div className="relative inline-flex flex-col items-center">
          <span className="absolute inset-0 bg-orange-100 rounded-lg blur-md animate-subtle-pulse"></span>
          <span className="relative text-[#FF8A3D]">
            بسبب انه خايف من النتيجة ؟
          </span>
        
        </div>
      </h1>
      
      {/* Decorative line with gradient */}
    </div>
  </div>
</div>

          {/* Solution Title */}
          <div className="relative   text-center">
   
          {/* Button with Inner Glow Only */}
          <div className="relative ">
                        <div className="w-48 sm:w-56 mx-auto">
                        {/* Main Button */}
                        <button className="relative w-full h-12 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 rounded-lg overflow-hidden group">
                            {/* Inner Shimmer */}
                            <div 
                            className="absolute inset-0 opacity-75"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                animation: 'shimmer 2s infinite'
                            }}
                            ></div>
                            
                            <span dir = "rtl" className="relative text-white font-bold text-lg">
                            هذا هو الحل !
                            </span>

                            {/* Connection Point */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-gradient-to-b from-amber-500 to-transparent opacity-50"></div>
                        </button>
                        </div>

                           <div className="flex mt-2 justify-center animate-bounce">
                                   <ArrowDown className="w-16 h-16 text-[#FF8A3D]" />
                                 </div>
            
          </div>
          </div>

          {/* Image Slider Section */}
          <div className="relative bg-white  w-5/6 h-110 mx-auto rounded-2xl overflow-hidden shadow-lg top-[-1rem]">
            <ImageSlider images={images} />
             
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            <div className="bg-orange-50 p-3 rounded-xl text-center">
            <h1 className="font-bold mb-1 text-3xl"> ✨</h1>
           
           
              <h3 className="font-bold mb-1 text-sm">تقنيات ذكاء اصطناعي متطورة</h3>
              <p className="text-gray-600 text-xs">أحدث التقنيات لتحليل وتخطيط العملية</p>
            </div>
            
            <div className="bg-orange-50 p-3 rounded-xl text-center">
              <Users className="w-8 h-8 mx-auto text-[#FF8A3D] mb-2" />
              <h3 className="font-bold mb-1 text-sm">تحويل المترددين إلى عملاء</h3>
              <p className="text-gray-600 text-xs">حلول مبتكرة لبناء ثقة العملاء</p>
            </div>

            <div className="bg-orange-50 p-3 rounded-xl text-center">
              <Camera className="w-8 h-8 mx-auto text-[#FF8A3D] mb-2" />
              <h3 className="font-bold mb-1 text-sm">تقنية متخصصة</h3>
              <p className="text-gray-600 text-xs">خبرة متخصصة في قطاع زراعة الشعر</p>
            </div>
          </div>
     

        {/* CTA Button */}
        <div className="pt-2">
          <button className="group relative w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white text-lg font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-xl">
            احجز استشاره مجانيه - انقر هنا
             {/* Inner Shimmer */}
             <div 
                            className="absolute inset-0 opacity-75"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                animation: 'shimmer 2s infinite'
                            }}
                            ></div>
            <ArrowLeft className="inline-block mr-2 w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300" />
            <div className="absolute inset-0 w-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes subtle-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes subtle-pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes smooth-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes width-pulse {
          0%, 100% { width: 80px; opacity: 0.7; }
          50% { width: 96px; opacity: 1; }
        }
        
        @keyframes sparkle-fade {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        @keyframes subtle-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        
        @keyframes expand {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .animate-subtle-shift {
          animation: subtle-shift 8s ease-in-out infinite;
          background-size: 200% 200%;
        }
        
        .animate-subtle-pulse {
          animation: subtle-pulse 3s ease-in-out infinite;
        }
        
        .animate-smooth-float {
          animation: smooth-float 3s ease-in-out infinite;
        }
        
        .animate-width-pulse {
          animation: width-pulse 4s ease-in-out infinite;
        }
        
        .animate-sparkle-fade {
          animation: sparkle-fade 2s ease-in-out infinite;
        }
        
        .animate-subtle-glow {
          animation: subtle-glow 3s ease-in-out infinite;
        }
        
        .animate-expand {
          animation: expand 1s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 100ms;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
 @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes flowLine {
          0% {
            transform: scaleY(0);
            opacity: 0;
          }
          50% {
            transform: scaleY(1);
            opacity: 0.5;
          }
          100% {
            transform: scaleY(1);
            opacity: 0;
          }
        }

        @keyframes integratedArrowFlow {
          0% {
            transform: translate(-50%, 0) scale(0.8);
            opacity: 0;
          }
          20% {
            transform: translate(-50%, 40px) scale(1);
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, 120px) scale(1);
            opacity: 0;
          }
        }

        @keyframes rayBurst {
          0% { transform: rotate(var(--rotation)) scale(0); opacity: 0; }
          50% { transform: rotate(var(--rotation)) scale(1.2); opacity: 0.8; }
          100% { transform: rotate(var(--rotation)) scale(0.8); opacity: 0; }
        }



      `}</style>
    </div>
  );
};

export default HairClinicInterface;