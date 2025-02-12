import React, { useState, useEffect } from 'react';
import { Target,CreditCard,ArrowDown, HeadphonesIcon,Check, Clock, TrendingUp, Users, ArrowRight, Sparkles, Star, CircleDot } from 'lucide-react';
 import ImageSlider from './ImageSlider';
const EnhancedCallToAction = () => {
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
  const features = [
    { text: 'بدون بطاقة ائتمانية', Icon: CreditCard },
    { text: 'إلغاء في أي وقت', Icon: Clock },
    { text: 'دعم فني متواصل', Icon: HeadphonesIcon }
  ];
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile) {
        setScrollPosition(window.scrollY);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const parallaxOffset = isMobile ? 0 : -scrollPosition * 0.5;
  const backgroundElements = isMobile ? 10 : 20;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 py-8 md:py-16 px-4 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(backgroundElements)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              width: isMobile ? '8px' : '16px',
              height: isMobile ? '8px' : '16px'
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-orange-200/20 to-amber-200/20 rounded-full blur-xl"></div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-4 md:mb-4 relative">
          <div 
            style={{ transform: `translate(-50%, ${parallaxOffset}px)` }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-48 md:w-72 h-48 md:h-72 bg-gradient-to-r from-orange-300/30 to-amber-300/30 rounded-full blur-3xl"
          ></div>
          <div className="relative">
            <div className="animate-bounce-slow absolute -top-8 md:-top-12 left-1/2 -translate-x-1/2">
              <div className="relative">
                <Target className="w-12 h-12 md:w-16 md:h-16 text-orange-400" />
                <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-amber-400 absolute -top-2 -right-2 animate-spin-slow" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 pt-8 md:pt-12 bg-gradient-to-r from-orange-600 to-amber-600 text-transparent bg-clip-text transform transition-transform hover:scale-105 duration-300">
              لماذا تخاطر بخسارة عملائك؟
            </h1>
            <p className="text-2xl md:text-3xl text-orange-600 font-semibold animate-pulse">
              وأنت تقدر تجرب الحل مجاناً! 🎯
            </p>
          </div>
          <div className="flex justify-center animate-bounce">
            <ArrowDown className="w-16 h-16 text-[#FF8A3D]" />
          </div>
              <div className="relative bg-white  w-3/4 h-110 mx-auto rounded-2xl overflow-hidden shadow-lg">
            <ImageSlider images={images} />
             
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-24">
          {[
            {
              icon: Users,
              text: "أكثر من 100 عيادة متميزة تستخدم أداتنا اليوم",
              gradient: "from-orange-400 to-amber-300"
            },
            {
              icon: TrendingUp,
              text: "70% من العملاء المترددين تحولوا إلى حجوزات مؤكدة",
              gradient: "from-amber-400 to-orange-300"
            },
            {
              icon: Clock,
              text: "14 يوم تجربة مجانية لاختبار النتائج بنفسك",
              gradient: "from-orange-300 to-amber-400"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="transform transition-all duration-500 hover:scale-105 active:scale-105 touch-pan-x touch-pan-y"
              onTouchStart={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="relative group">
                <div 
                  className="absolute inset-0 bg-gradient-to-r opacity-20 blur-xl rounded-2xl transition-all duration-500 group-hover:opacity-40 group-hover:scale-110 group-active:opacity-40 group-active:scale-110"
                  style={{ background: `linear-gradient(to right, ${item.gradient})` }}
                ></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-orange-100 transform transition-all duration-500 group-hover:-translate-y-2 group-active:-translate-y-2">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-12 group-active:rotate-12">
                      <item.icon className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
                    </div>
                    <Star className={`w-5 h-5 md:w-6 md:h-6 text-amber-400 transition-opacity duration-300 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                  <p className="text-gray-700 text-base md:text-lg font-medium">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-2xl border border-orange-100 mb-12 md:mb-24 transform transition-all duration-500 hover:shadow-orange-200/50 active:shadow-orange-200/50">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 relative">
            ببساطة:
            <div className="absolute -top-4 -right-4 w-6 h-6 md:w-8 md:h-8 bg-orange-100 rounded-full animate-ping"></div>
          </h2>
          <div className="space-y-4 md:space-y-6">
            {[
              "جرب الأداة 14 يوم بدون أي تكلفة",
              "شوف النتائج بنفسك على عيادتك",
              "إذا لم تعجبك النتائج... لا تدفع شيئاً"
            ].map((text, index) => (
              <div 
                key={index}
                className="group flex items-center space-x-3 md:space-x-4 rtl:space-x-reverse p-4 md:p-6 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 active:from-orange-50 active:to-amber-50 transition-all duration-300 transform hover:scale-102 active:scale-102"
              >
                <div className="relative">
                  <Check className="w-6 h-6 md:w-8 md:h-8 text-orange-500 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 group-active:scale-110 group-active:rotate-12" />
                  <CircleDot className="w-3 h-3 md:w-4 md:h-4 text-amber-400 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="text-gray-700 text-lg md:text-xl">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-12 md:mb-24 transform hover:scale-105 active:scale-105 transition-transform duration-300">
          <div className="relative inline-block">
            <h3 className="text-2xl md:text-3xl font-bold text-red-500 mb-4 md:mb-6">
              الخسارة الحقيقية:
            </h3>
            <div className="absolute -inset-1 bg-red-100 rounded-lg blur opacity-30 group-hover:opacity-50 group-active:opacity-50 transition duration-300"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 animate-pulse">
            كم عميل راح تخسر بينما منافسيك يستخدمون الأداة؟
          </p>
        </div>

        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-amber-400/30 blur-3xl rounded-full transform scale-90 animate-pulse"></div>
          <button 
            className="group relative inline-flex items-center space-x-3 md:space-x-4 rtl:space-x-reverse bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 md:px-12 py-4 md:py-6 rounded-xl md:rounded-2xl text-xl md:text-2xl font-bold shadow-xl md:shadow-2xl hover:shadow-orange-300/50 active:shadow-orange-300/50 transform hover:scale-105 active:scale-105 transition-all duration-500 hover:from-orange-600 hover:to-amber-600 active:from-orange-600 active:to-amber-600"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            <span className="relative">
              <Sparkles className={`absolute -top-2 -left-2 w-4 h-4 md:w-5 md:h-5 text-amber-200 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
              ابدأ تجربتك المجانية الآن
            </span>
            <ArrowRight className={`w-6 h-6 md:w-8 md:h-8 transition-all duration-500 ${isHovered ? 'transform translate-x-2 rtl:-translate-x-2' : ''}`} />
          </button>

          <div className="mt-8 md:mt-12 flex flex-wrap justify-center items-center gap-4 md:gap-6">
      {features.map(({ text, Icon }, index) => (
        <div 
          key={index} 
          className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 text-sm md:text-base transform transition-transform duration-300 hover:scale-105 active:scale-105"
        >
          <Icon className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
          <span>{text}</span>
        </div>
      ))}
    </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .animate-float {
            animation-duration: 3s;
          }
          
          .animate-bounce-slow {
            animation-duration: 2s;
          }
          
          .animate-spin-slow {
            animation-duration: 3s;
          }
        }
        
        @supports (-webkit-touch-callout: none) {
          .touch-pan-x {
            touch-action: pan-x;
          }
          
          .touch-pan-y {
            touch-action: pan-y;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedCallToAction;