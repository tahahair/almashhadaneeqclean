// pages/guarantee.tsx
"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Footer from '../components/Footer';
import { Menu, Home, Users, FileText, Award, Shield } from 'lucide-react';
import { useRouter } from "next/navigation";

// Language content configuration
const content = {
  en: {
    direction: "ltr",
    meta: {
      title: "Golden Guarantee | Elegant Scene",
      description: "Golden Guarantee - 100% satisfaction guaranteed or your money back from Elegant Scene Cleaning Services"
    },
    header: {
      home: "Home",
      about: "About Us",
       privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      guarantee: "Golden Guarantee"
    },
    hero: {
      title: "Golden Guarantee",
      subtitle: "100% Guarantee or Your Money Back"
    },
    sections: {
      why: {
        title: "Why We Offer This Guarantee?",
        content: "At Elegant Scene, we fully trust the quality of our services. We don't ask you to trust us... we prove that you can. That's why we offer an unprecedented golden guarantee in the cleaning service sector:",
        guarantee: "\"If you're not 100% satisfied with the results, we either redo the cleaning for free or you get your money back.\""
      },
      how: {
        title: "How Our Guarantee Works?",
        steps: [
          {
            number: "1",
            title: "Service Evaluation",
            content: "After finishing cleaning your home, we ask you to evaluate the result with complete honesty."
          },
          {
            number: "2",
            title: "If You're Not Satisfied",
            content: "If you're not satisfied with any aspect of the service, contact us within 48 hours and tell us specifically what you didn't like."
          },
          {
            number: "3",
            title: "Quick Solution",
            content: "You have two options:",
            options: [
              {
                title: "Recleaning:",
                content: "We send our team again within 24 hours to correct any deficiencies"
              },
              {
                title: "Refund:",
                content: "We return the full amount to you within 3 business days, with no questions asked"
              }
            ]
          }
        ]
      },
      covers: {
        title: "What Our Guarantee Covers?",
        items: [
          {
            title: "Cleaning Quality",
            content: "This includes all agreed surfaces and areas"
          },
          {
            title: "Time Commitment",
            content: "Team arriving at the scheduled time"
          },
          {
            title: "Professional Conduct",
            content: "Professionalism and ethics of the work team"
          },
          {
            title: "Using Appropriate Materials",
            content: "Safe and effective cleaning materials"
          },
          {
            title: "Final Result",
            content: "Appearance, smell, and overall cleaning quality"
          }
        ]
      },
      able: {
        title: "Why We Can Offer This Guarantee?",
        intro: "We are able to offer this unique guarantee for several reasons:",
        reasons: [
          {
            title: "Strict Training System",
            content: "For all members of our team"
          },
          {
            title: "Systematic Cleaning Process",
            content: "Tested and proven"
          },
          {
            title: "High Quality Cleaning Materials",
            content: "Specially imported"
          },
          {
            title: "Professional Equipment",
            content: "Advanced and efficient"
          },
          {
            title: "Continuous Quality Control",
            content: "To ensure the highest standards"
          }
        ]
      },
      testimonials: {
        title: "What Our Customers Say",
        quotes: [
          {
            quote: "I haven't had to use the Golden Guarantee yet, but its mere existence gave me the confidence to deal with Elegant Scene.",
            name: "Sarah M.",
            location: "Dubai"
          },
          {
            quote: "I activated the guarantee once when I wasn't satisfied with the cleanliness of the kitchen. They came back the same day and the kitchen was gleaming! Truly exceptional service.",
            name: "Ahmed K.",
            location: "Abu Dhabi"
          },
          {
            quote: "A company that keeps its word. Competitors promise a lot and don't deliver. Elegant Scene promises little and delivers a lot.",
            name: "Noura S.",
            location: "Sharjah"
          }
        ]
      },
      activation: {
        title: "Activating the Guarantee is Easy and Quick",
        intro: "To take advantage of the Golden Guarantee, just:",
        contact: "Send a WhatsApp message to",
        phone: "+971 50 723 5772",
        cta: "Click here to contact directly"
      },
      quote: {
        text: "Because we are confident in the quality of our services... we take the risk instead of you",
        attribution: "Elegant Scene Management"
      }
    }
  },
  ar: {
    direction: "rtl",
    meta: {
      title: "الضمان الذهبي | المشهد الأنيق",
      description: "الضمان الذهبي - ضمان 100% أو استرد أموالك كاملة من شركة المشهد الأنيق لخدمات التنظيف"
    },
    header: {
      home: "الرئيسية",
      about: "من نحن",
       privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      guarantee: "الضمان الذهبي"
    },
    hero: {
      title: "الضمان الذهبي",
      subtitle: "ضمان 100% أو استرد أموالك كاملة"
    },
    sections: {
      why: {
        title: "لماذا نقدم هذا الضمان؟",
        content: "في المشهد الأنيق، نثق تماماً بجودة خدماتنا. نحن لا نطلب منك أن تثق بنا... بل نثبت لك أنك تستطيع ذلك. لهذا السبب، نقدم ضماناً ذهبياً غير مسبوق في قطاع خدمات التنظيف:",
        guarantee: "\"إذا لم تكن راضياً عن النتيجة 100%، إما نعيد التنظيف مجاناً أو تسترد أموالك كاملة.\""
      },
      how: {
        title: "كيف يعمل ضماننا الذهبي؟",
        steps: [
          {
            number: "١",
            title: "تقييم الخدمة",
            content: "بعد الانتهاء من تنظيف منزلك، نطلب منك تقييم النتيجة بكل صراحة."
          },
          {
            number: "٢",
            title: "إذا لم تكن راضياً",
            content: "في حال عدم رضاك عن أي جانب من جوانب الخدمة، تواصل معنا خلال 48 ساعة وأخبرنا بالتحديد ما الذي لم يعجبك."
          },
          {
            number: "٣",
            title: "الحل السريع",
            content: "لديك خياران:",
            options: [
              {
                title: "إعادة التنظيف:",
                content: "نرسل فريقنا مجدداً خلال 24 ساعة لتصحيح أي قصور"
              },
              {
                title: "استرداد الأموال:",
                content: "نعيد لك المبلغ كاملاً خلال 3 أيام عمل، بدون أي أسئلة"
              }
            ]
          }
        ]
      },
      covers: {
        title: "ما الذي يغطيه ضماننا؟",
        items: [
          {
            title: "جودة التنظيف",
            content: "وهذا يشمل جميع الأسطح والمناطق المتفق عليها"
          },
          {
            title: "الالتزام بالوقت",
            content: "وصول الفريق في الموعد المحدد"
          },
          {
            title: "السلوك المهني",
            content: "احترافية وأخلاقيات فريق العمل"
          },
          {
            title: "استخدام المواد المناسبة",
            content: "مواد تنظيف آمنة وفعالة"
          },
          {
            title: "النتيجة النهائية",
            content: "المظهر والرائحة وجودة التنظيف بشكل عام"
          }
        ]
      },
      able: {
        title: "لماذا نستطيع تقديم هذا الضمان؟",
        intro: "نحن قادرون على تقديم هذا الضمان الفريد لعدة أسباب:",
        reasons: [
          {
            title: "نظام تدريب صارم",
            content: "لجميع أفراد فريقنا"
          },
          {
            title: "عملية تنظيف منهجية",
            content: "مختبرة ومثبتة"
          },
          {
            title: "مواد تنظيف عالية الجودة",
            content: "نستوردها خصيصاً"
          },
          {
            title: "معدات احترافية",
            content: "متطورة وفعالة"
          },
          {
            title: "رقابة جودة مستمرة",
            content: "لضمان أعلى المعايير"
          }
        ]
      },
      testimonials: {
        title: "ما يقوله عملاؤنا",
        quotes: [
          {
            quote: "لم أضطر لاستخدام الضمان الذهبي حتى الآن، لكن مجرد وجوده أعطاني الثقة للتعامل مع المشهد الأنيق.",
            name: "سارة م.",
            location: "دبي"
          },
          {
            quote: "قمت بتفعيل الضمان مرة واحدة عندما لم أكن راضياً عن نظافة المطبخ. عادوا في نفس اليوم وأصبح المطبخ يلمع! خدمة استثنائية حقاً.",
            name: "أحمد ك.",
            location: "أبوظبي"
          },
          {
            quote: "شركة تحترم كلمتها. المنافسون يعدون بالكثير ولا ينفذون. المشهد الأنيق تعد بالقليل وتقدم الكثير.",
            name: "نورة س.",
            location: "الشارقة"
          }
        ]
      },
      activation: {
        title: "تفعيل الضمان سهل وسريع",
        intro: "للاستفادة من الضمان الذهبي، ما عليك سوى:",
        contact: "إرسال رسالة واتساب على",
        phone: "+971 50 723 5772",
        cta: "انقر هنا للتواصل مباشرة"
      },
      quote: {
        text: "لأننا واثقون من جودة خدماتنا... نتحمل المخاطرة بدلاً منك",
        attribution: "إدارة المشهد الأنيق"
      }
    }
  }
};

const langImages = {
  EN: '/english.png',
  AR: '/arabic.png'
};

 
// Menu items with icons
const menuItems = [
    { key: 'home', path: '/', icon: Home },
    { key: 'about', path: '/about', icon: Users },
    { key: 'privacy', path: '/privacy', icon: FileText },
    { key: 'terms', path: '/terms', icon: Shield },
    { key: 'guarantee', path: '/guarantee', icon: Award },
  ];

const GoldenGuaranteePage: React.FC = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
     const [currentPath, setCurrentPath] = useState('/guarantee');
  // Get current language content

    const [lang, setLang] = useState<"AR" | "EN">(() => {
      if (typeof window !== "undefined") {
        const storedValue = localStorage.getItem("lang");
        if (storedValue === "AR" || storedValue === "EN") {
          return storedValue as "AR" | "EN"; // استخدم القيمة المخزنة
        }
      }
      return "AR"; // القيمة الافتراضية
    });

    useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("lang", lang); // تحديث التخزين عند تغيير اللغة
      }
    }, [lang]); // تحديث فقط عند تغيير `lang`
  
   
  
    const t = lang === "EN" ? content.en : content.ar;  const isRTL = lang === "AR";

 
 

 
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.menu-container') && !target.closest('.menu-button')) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle menu
  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  // Navigation
  const navigateTo = (path: string) => {
    router.push(path);
    setCurrentPath(path);
    setShowMenu(false);
  };
  const textar  = "نخدمك في كل إمارات الدولة | شركة مرخصة "  ;
  const texten= "We serve you across all Emirates of the country | A licensed company";
  return (
    <div className={isRTL ? "rtl" : "ltr"} dir={t.direction}>
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white p-1 relative overflow-hidden z-50">
                <div className="absolute inset-0 opacity-10" />
                <div className={`max-w-7xl mx-auto flex items-center justify-center`}>
                  <div className="overflow-hidden relative w-full">
                    <p className={`text-center ${isRTL ? "mt-1 text-[90%] " : "mt-2 text-[65%] "}    md:text-[70%] lg:text-[70%] font-bold mr-4`}>
                      {isRTL ? (
                        <>
                          <span className="inline-flex items-center">
                          {textar}
                            <Image src="/arabic.png" alt="Flag of the United Arab Emirates" width={12} height={12} className="mr-2" />
                            
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="inline-flex items-center text-[105%] mb-2">
                            {texten}
                            <Image src="/arabic.png" alt="Flag of the United Arab Emirates" width={12} height={12} className="ml-2 " />
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
      {/* Header - Simple design with logo left and menu right */}
      <header dir="ltr" className="bg-white sticky top-0 z-40 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo on the left */}
            <div className="flex items-center">
              <div className="order-first">
                <img 
                  onClick={() => navigateTo('/')} 
                  src="/logo.png" 
                  alt={isRTL ? "المشهد الأنيق" : "Elegant Scene"} 
                  className="h-12 cursor-pointer" 
                />
              </div>
            </div>
            <div className="flex items-center cursor-pointer" 
       onClick={() => window.open('https://wa.me/+971553465021', '_blank')}>
    <div className="mr-2">
      {/* WhatsApp Icon in SVG format */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </div>
    <span className={`font-medium text-sm ${isRTL ? "mr-1" : "ml-1"}`}>
      {isRTL ? "اتصل بنا" : "Contact Us"}
    </span>
  </div>
            {/* Language and menu button on the right */}
            <div className="flex items-center gap-3">
              <div className="flex gap-3 mr-2">
                {['EN', 'AR'].map((langCode) => {
                  const langKey = langCode.toUpperCase() as keyof typeof langImages;
                  return (
                    <button 
                      key={langCode}
                      onClick={() => setLang(langCode as "AR" | "EN")}
                      className={`relative rounded-full overflow-hidden w-8 h-8 ${
                        lang === langCode ? 'ring-2 ring-gray-400' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={langImages[langKey]}
                        alt={langKey} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg menu-button"
                onClick={handleMenuToggle}
              >
                <Menu className="w-6 h-6 text-gray-700" /> 
              </button>
            </div>
          </div>
          
          {/* Simplified Menu */}
          {showMenu && (
            <nav className="menu-container">
              <div className="absolute right-2 w-64 z-50 mt-2">
                <ul className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.path;
                    
                    return (
                      <li key={item.key}>
                        <button 
                          onClick={() => navigateTo(item.path)}
                          className={`w-full text-right py-3 px-4   transition-colors ${
                            isActive 
                              ? 'bg-gray-100 text-gray-900 font-medium' 
                              : 'hover:bg-gray-50 text-gray-700'
                          } ${index !== 0 ? 'border-t border-gray-100' : ''}`}
                        >
                          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row-reverse'}`}>
                            <Icon className={`h-4 w-4 ${isRTL ? 'ml-3' : 'ml-3'} ${
                              isActive ? 'text-gray-700' : 'text-gray-500'
                            }`} />
                            <span>
                              {t.header[item.key as keyof typeof t.header]}
                            </span>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>
          )}
        </div>
      </header>

      <Head>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
      </Head>

      {/* Hero Section with Gold Gradient */}
      <div className="w-full bg-gradient-to-b from-amber-50 to-amber-100 py-16">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
          {/* Logo */}
          <div className="mb-8">
            <Image 
              src="/logo.png" 
              alt={isRTL ? "شعار المشهد الأنيق" : "Elegant Scene Logo"} 
              width={180} 
              height={120} 
              className="h-auto w-auto"
              priority
            />
          </div>
          
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 text-center">{t.hero.title}</h1>
          <h2 className="text-xl md:text-2xl max-w-3xl text-amber-700 text-center font-semibold">
            {t.hero.subtitle}
          </h2>
          
          {/* Gold Bar */}
          <div className="h-1 w-24 bg-amber-500 rounded-full my-8"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Why We Offer This Guarantee Section */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-amber-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-3xl font-bold text-gray-800">{t.sections.why.title}</h2>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <p className="text-lg leading-relaxed text-gray-700">
              {t.sections.why.content.split('...')[0]}<span className="font-bold">{isRTL ? " نحن لا نطلب منك أن تثق بنا... " : " We don't ask you to trust us... "}</span>{t.sections.why.content.split('...')[1]}
            </p>
            <div className="my-6 bg-amber-50 p-6 border-r-4 border-amber-500 rounded-md">
              <p className="text-xl font-semibold text-amber-800 text-center">
                {t.sections.why.guarantee}
              </p>
            </div>
          </div>
        </section>

        {/* How Our Guarantee Works Section */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-amber-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-3xl font-bold text-gray-800">{t.sections.how.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.sections.how.steps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-amber-500 h-2 w-full"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 ${isRTL ? 'ml-4' : 'mr-4'}`}>
                      <span className="text-amber-700 text-xl font-bold">{step.number}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">
                    {step.content}
                  </p>
                  {step.options && (
                    <ul className="mt-2 space-y-2">
                      {step.options.map((option, optIndex) => (
                        <li key={optIndex} className="flex items-start">
                          <svg className={`h-5 w-5 text-amber-600 ${isRTL ? 'ml-2' : 'mr-2'} mt-0.5`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700"><span className="font-semibold">{option.title}</span> {option.content}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What Our Guarantee Covers */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-amber-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-3xl font-bold text-gray-800">{t.sections.covers.title}</h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.sections.covers.items.map((item, index) => (
                <div key={index} className={`flex items-start ${index === 4 ? 'md:col-span-2' : ''}`}>
                  <div className={`h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 ${isRTL ? 'ml-4' : 'mr-4'} mt-1`}>
                    <svg className="h-5 w-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why We Can Offer This Guarantee */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-amber-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-3xl font-bold text-gray-800">{t.sections.able.title}</h2>
          </div>

          <div className="p-8 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl">
            <p className="text-lg mb-6 text-gray-700">
              {t.sections.able.intro}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.sections.able.reasons.map((reason, index) => (
                <div 
                  key={index} 
                  className={`bg-white p-6 rounded-lg shadow-sm ${
                    index === 4 ? 'md:col-span-2 md:col-start-1' : ''
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <svg className={`h-8 w-8 text-amber-600 ${isRTL ? 'ml-3' : 'mr-3'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    <h3 className="text-lg font-bold text-gray-800">{reason.title}</h3>
                  </div>
                  <p className={`text-gray-600 ${isRTL ? 'mr-11' : 'ml-11'}`}>{reason.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-amber-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-3xl font-bold text-gray-800">{t.sections.testimonials.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.sections.testimonials.quotes.map((quote, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="mb-4">
                  <svg className="w-10 h-10 text-amber-300 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <blockquote className="text-gray-700 text-center mb-4">
                  {quote.quote}
                </blockquote>
                <div className="text-center">
                  <p className="font-bold text-amber-700">{quote.name}</p>
                  <p className="text-sm text-gray-500">{quote.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Activating the Guarantee */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-amber-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-3xl font-bold text-gray-800">{t.sections.activation.title}</h2>
          </div>

          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-8 shadow-sm">
            <p className="text-lg mb-6 text-gray-700">
              {t.sections.activation.intro}
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
              <a 
                href="https://wa.me/971507235772" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-6 bg-white rounded-lg shadow-sm text-center flex-1 max-w-xs hover:bg-green-50 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-lg font-bold text-gray-800">{t.sections.activation.contact}</p>
                <p dir="ltr" className="text-2xl font-bold text-amber-700 mt-2">{t.sections.activation.phone}</p>
                <span className="inline-block mt-3 text-green-600 text-sm">{t.sections.activation.cta}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Final Quote */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-10 rounded-xl text-center">
            <svg className="w-12 h-12 text-amber-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-lg text-gray-700 italic mb-6">
              {t.sections.quote.text}
            </blockquote>
            <p className="font-bold text-gray-900">{t.sections.quote.attribution}</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer language={lang === "EN" ? "en" : "ar"} companyName={lang === "EN" ? "Elegant Scene" : "المشهد الأنيق"} />
    </div>
  );
};

export default GoldenGuaranteePage;