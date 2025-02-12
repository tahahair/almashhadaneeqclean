import React, { useState } from 'react';
import { Brain, Users, ArrowLeft, CheckCircle } from 'lucide-react';
import ImageSlider from './ImageSlider';

const LandingPage = ({ images }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 overflow-hidden relative">
      {/* Responsive Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-12 -right-12 sm:top-0 sm:right-0 w-64 sm:w-96 h-64 sm:h-96 bg-orange-100/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-12 -left-12 sm:bottom-0 sm:left-0 w-48 sm:w-72 h-48 sm:h-72 bg-orange-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10 text-right order-2 md:order-1">
            {/* Main Heading and Subheading */}
            <div className="space-y-4 sm:space-y-5">
              <div dir="rtl" className="space-y-3 sm:space-y-4">
                <h2 className="font-bold leading-tight text-2xl sm:text-3xl md:text-4xl text-gray-900">
                  حل ذكي لتحدي زراعة الشعر
                </h2>
                <p className="font-medium leading-relaxed text-base sm:text-lg text-gray-700">
                  نحن متخصصون في تطوير تقنيات الذكاء الاصطناعي لقطاع زراعة الشعر
                </p>
                <p className="font-semibold text-orange-600 leading-relaxed text-base sm:text-lg">
                  التقنية الأكثر تطوراً لتحويل المترددين إلى عملاء
                </p>
              </div>
            </div>

            {/* Unique Selling Points */}
            <div dir="rtl" className="space-y-3 sm:space-y-4">
              {[
                "حلول مخصصة باستخدام الذكاء الاصطناعي",
                "تحليل دقيق للنتائج المتوقعة",
                "استشارات مهنية مجانية"
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base text-gray-700">{point}</span>
                </div>
              ))}
            </div>

            {/* Features */}
            <div dir="rtl" className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: Brain, text: "ذكاء اصطناعي توليدي" },
                { icon: Users, text: "تحويل المترددين إلى عملاء" }
              ].map(({ icon: Icon, text }, index) => (
                <div 
                  key={index}
                  className="bg-white/90 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="flex items-center gap-2 sm:gap-3 text-orange-600">
                    <Icon 
                      className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform ${isHovered ? 'rotate-6 scale-110' : ''}`} 
                    />
                    <p className="text-xs sm:text-base font-semibold">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4 sm:pt-6 md:pt-8">
              <button className="group relative w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white text-base sm:text-xl md:text-2xl font-bold py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-8 rounded-xl sm:rounded-2xl transition-all duration-500 hover:shadow-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 active:scale-95">
                <span className="relative z-10">احجز استشارة مجانية - انقر هنا</span>
                <ArrowLeft className="inline-block mr-2 sm:mr-3 w-4 h-4 sm:w-6 sm:h-6 group-hover:-translate-x-2 transition-transform duration-300 relative z-10" />
                <div className="absolute inset-0 w-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md order-1 md:order-2">
            <div className="aspect-[8/10] bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl relative group">
              <div className="absolute top-4 sm:top-8 inset-x-0 z-10 text-center">
                <span className="px-4 sm:px-6 py-1 sm:py-2 bg-white/90 backdrop-blur-sm rounded-lg text-base sm:text-2xl font-bold text-gray-800 shadow-lg ring-2 ring-orange-400 ring-offset-2 ring-offset-white/10 animate-[glow_2s_ease-in-out_infinite] hover:scale-105 transition-transform">
                  !هذا هو الحل
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 group-hover:opacity-0 transition-opacity duration-500"></div>
              <ImageSlider images={images} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
            <p dir="rtl" className="mt-3 sm:mt-6 text-center text-xs sm:text-base text-gray-600 font-medium px-4">
              تحويل المخاوف إلى ثقة - خطوتك الأولى نحو النجاح
            </p>
          </div>
        </div>
      </div>

      {/* Animated CSS for background blob effect */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 15s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;