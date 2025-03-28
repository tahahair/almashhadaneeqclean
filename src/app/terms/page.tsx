// pages/terms.tsx
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
      title: "Terms & Conditions | Elegant Scene",
      description: "Terms and conditions for Elegant Scene cleaning services"
    },
    header: {
      home: "Home",
      about: "About Us",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      guarantee: "Golden Guarantee"
    },
    hero: {
      title: "Terms & Conditions",
      subtitle: "Rules and conditions for dealing with Elegant Scene"
    },
    sections: {
      booking: {
        title: "1. Service Booking",
        items: [
          {
            title: "Advance Booking",
            content: "Service must be booked at least 24 hours in advance of the requested appointment."
          },
          {
            title: "Booking Confirmation",
            content: "Your booking will be confirmed via SMS or email."
          },
          {
            title: "Specify Requirements",
            content: "Please specify any special requirements at the time of booking (areas needing special attention, specific cleaning materials, etc.)."
          },
          {
            title: "Time Estimate",
            content: "We will inform you of the estimated time the cleaning process will take based on the size of the location."
          }
        ]
      },
      pricing: {
        title: "2. Pricing and Payment",
        items: [
          {
            title: "Price Transparency",
            content: "We offer clear and fixed prices from the start, without hidden fees."
          },
          {
            title: "Payment Methods",
            content: "We accept payment in cash, by bank cards, or through banking applications."
          },
          {
            title: "Tax Invoice",
            content: "We issue an official tax invoice for each payment."
          },
          {
            title: "Offers and Discounts",
            content: "Discounts apply only when their announced conditions are met."
          }
        ]
      },
      cancellation: {
        title: "3. Cancellation Policy",
        items: [
          {
            title: "Free Cancellation",
            content: "You can cancel your booking for free up to 12 hours before the scheduled appointment."
          },
          {
            title: "Late Cancellation Fees",
            content: "A fee of 25% of the service value will be applied for cancellations less than 12 hours before the appointment."
          },
          {
            title: "No-Show",
            content: "In case of not being present at the scheduled appointment without prior notice, a fee of 50% of the service value will be charged."
          },
          {
            title: "Rescheduling",
            content: "You can reschedule the appointment once for free up to 6 hours before the original appointment."
          }
        ]
      },
      guarantee: {
        title: "4. Golden Guarantee",
        items: [
          {
            title: "Satisfaction Guarantee",
            content: "We guarantee your complete satisfaction with our services."
          },
          {
            title: "Re-cleaning",
            content: "If you are not satisfied with the result, we will re-clean for free within 48 hours."
          },
          {
            title: "Refund",
            content: "If you are still not convinced after re-cleaning, we will refund the full amount without questions."
          },
          {
            title: "Activating the Guarantee",
            content: "The guarantee can be activated by contacting customer service and explaining the reason for dissatisfaction."
          }
        ]
      },
      responsibilities: {
        title: "5. Our Responsibilities",
        items: [
          {
            title: "Time Commitment",
            content: "We commit to arrive at the specified time punctually."
          },
          {
            title: "Qualified Team",
            content: "We provide a trained, licensed, and officially documented team."
          },
          {
            title: "Materials and Equipment",
            content: "We use high-quality cleaning materials and professional equipment."
          },
          {
            title: "Insurance",
            content: "We provide insurance against any damage that may occur during service delivery."
          }
        ]
      },
      clientResponsibilities: {
        title: "6. Client Responsibilities",
        items: [
          {
            title: "Provide Access",
            content: "You must ensure our team has access to the areas requiring cleaning."
          },
          {
            title: "Disclosure",
            content: "Please inform us of any sensitive surfaces or materials that require special care."
          },
          {
            title: "Valuable Items",
            content: "We recommend securing valuable possessions before the cleaning appointment."
          },
          {
            title: "Pets",
            content: "Please secure pets during the cleaning period."
          }
        ]
      },
      amendments: {
        title: "7. Amendments to Terms and Conditions",
        content: "We reserve the right to modify these terms and conditions at any time. You will be informed of any changes through our website or via email."
      },
      quote: {
        text: "We seek to build a transparent and sustainable relationship with you, based on mutual trust and respect",
        attribution: "Elegant Scene Management"
      }
    }
  },
  ar: {
    direction: "rtl",
    meta: {
      title: "الشروط والأحكام | المشهد الأنيق",
      description: "قواعد وشروط التعامل مع شركة المشهد الأنيق لخدمات التنظيف"
    },
    header: {
      home: "الرئيسية",
      about: "من نحن",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      guarantee: "الضمان الذهبي"
    },
    hero: {
      title: "الشروط والأحكام",
      subtitle: "قواعد وشروط التعامل مع المشهد الأنيق"
    },
    sections: {
      booking: {
        title: "1. حجز الخدمة",
        items: [
          {
            title: "الحجز المسبق",
            content: "يجب حجز خدمة التنظيف قبل 24 ساعة على الأقل من الموعد المطلوب."
          },
          {
            title: "تأكيد الحجز",
            content: "سيتم تأكيد حجزكم من خلال رسالة نصية أو بريد إلكتروني."
          },
          {
            title: "تحديد المتطلبات",
            content: "يرجى تحديد أي متطلبات خاصة وقت الحجز (مناطق تحتاج عناية خاصة، مواد تنظيف معينة، إلخ)."
          },
          {
            title: "تقدير الوقت",
            content: "سنخبركم بالمدة التقديرية التي ستستغرقها عملية التنظيف بناء على حجم المكان."
          }
        ]
      },
      pricing: {
        title: "2. الأسعار والدفع",
        items: [
          {
            title: "شفافية الأسعار",
            content: "نقدم أسعاراً واضحة وثابتة منذ البداية، بدون رسوم خفية."
          },
          {
            title: "طرق الدفع",
            content: "نقبل الدفع نقداً، بالبطاقات المصرفية، أو عبر التطبيقات البنكية."
          },
          {
            title: "فاتورة ضريبية",
            content: "نصدر فاتورة ضريبية رسمية لكل عملية دفع."
          },
          {
            title: "العروض والخصومات",
            content: "تطبق الخصومات فقط عند الوفاء بشروطها المعلنة."
          }
        ]
      },
      cancellation: {
        title: "3. سياسة الإلغاء",
        items: [
          {
            title: "إلغاء مجاني",
            content: "يمكنكم إلغاء الحجز مجاناً قبل 12 ساعة من الموعد المحدد."
          },
          {
            title: "رسوم الإلغاء المتأخر",
            content: "يتم تطبيق رسوم بنسبة 25% من قيمة الخدمة عند الإلغاء قبل أقل من 12 ساعة من الموعد."
          },
          {
            title: "عدم الحضور",
            content: "في حال عدم التواجد في الموعد المحدد دون إشعار مسبق، يتم احتساب رسوم بنسبة 50% من قيمة الخدمة."
          },
          {
            title: "إعادة الجدولة",
            content: "يمكن إعادة جدولة الموعد مرة واحدة مجاناً قبل 6 ساعات من الموعد الأصلي."
          }
        ]
      },
      guarantee: {
        title: "4. الضمان الذهبي",
        items: [
          {
            title: "ضمان الرضا",
            content: "نضمن لكم الرضا التام عن خدماتنا."
          },
          {
            title: "إعادة التنظيف",
            content: "إذا لم تكونوا راضين عن النتيجة، نقوم بإعادة التنظيف مجاناً خلال 48 ساعة."
          },
          {
            title: "استرداد الأموال",
            content: "إذا لم تقتنعوا بعد إعادة التنظيف، نسترد المبلغ كاملاً دون أسئلة."
          },
          {
            title: "آلية تفعيل الضمان",
            content: "يمكن تفعيل الضمان بالتواصل مع خدمة العملاء وتوضيح سبب عدم الرضا."
          }
        ]
      },
      responsibilities: {
        title: "5. مسؤولياتنا",
        items: [
          {
            title: "الالتزام بالمواعيد",
            content: "نلتزم بالحضور في الموعد المحدد بدقة."
          },
          {
            title: "فريق مؤهل",
            content: "نوفر فريقاً مدرباً ومرخصاً وموثقاً رسمياً."
          },
          {
            title: "المواد والمعدات",
            content: "نستخدم مواد تنظيف عالية الجودة ومعدات احترافية."
          },
          {
            title: "التأمين",
            content: "نوفر تأميناً ضد أي أضرار قد تحدث أثناء تقديم الخدمة."
          }
        ]
      },
      clientResponsibilities: {
        title: "6. مسؤوليات العميل",
        items: [
          {
            title: "توفير الوصول",
            content: "يجب تأمين وصول فريقنا إلى المناطق المطلوب تنظيفها."
          },
          {
            title: "الإفصاح",
            content: "يرجى إبلاغنا بأي أسطح أو مواد حساسة تتطلب عناية خاصة."
          },
          {
            title: "الأغراض الثمينة",
            content: "نوصي بتأمين المقتنيات الثمينة قبل موعد التنظيف."
          },
          {
            title: "الحيوانات الأليفة",
            content: "يرجى تأمين الحيوانات الأليفة خلال فترة التنظيف."
          }
        ]
      },
      amendments: {
        title: "7. التعديلات على الشروط والأحكام",
        content: "نحتفظ بحق تعديل هذه الشروط والأحكام في أي وقت. سيتم إعلامكم بأي تغييرات من خلال موقعنا الإلكتروني أو عبر البريد الإلكتروني."
      },
      quote: {
        text: "نسعى لبناء علاقة شفافة ومستدامة معكم، تقوم على الثقة المتبادلة والاحترام",
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

const TermsPage: React.FC = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
   const [currentPath, setCurrentPath] = useState('/terms');
  

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
  
   
  
    const t = lang === "EN" ? content.en : content.ar;










  // Get current language content
   const isRTL = lang === "AR";

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
                          className={`w-full text-right py-3 px-4 transition-colors ${
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

      {/* Hero Section with Gradient */}
      <div className="w-full bg-gradient-to-b from-gray-50 to-gray-100 py-16">
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
          <h2 className="text-xl md:text-2xl max-w-3xl text-gray-700 text-center">
            {t.hero.subtitle}
          </h2>
          
          {/* Decorative Bar */}
          <div className="h-1 w-24 bg-gray-500 rounded-full my-8"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <p className="text-lg leading-relaxed text-gray-700">
              {isRTL 
                ? "نرحب بكم في شركة المشهد الأنيق لخدمات التنظيف. تحدد هذه الوثيقة الشروط والأحكام التي تنظم علاقتنا المهنية معكم كعملاء كرام."
                : "Welcome to Elegant Scene Cleaning Services. This document outlines the terms and conditions that govern our professional relationship with you as valued customers."
              }
            </p>
          </div>
        </section>

        {/* 1. Service Booking */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-indigo-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-2xl font-bold text-gray-800">{t.sections.booking.title}</h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.sections.booking.items.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className={`h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 ${isRTL ? 'ml-4' : 'mr-4'} mt-1`}>
                    <svg className="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        {/* 2. Pricing and Payment */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-cyan-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-2xl font-bold text-gray-800">{t.sections.pricing.title}</h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.sections.pricing.items.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className={`h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 ${isRTL ? 'ml-4' : 'mr-4'} mt-1`}>
                    <svg className="h-5 w-5 text-cyan-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        {/* 3. Cancellation Policy */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-red-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-2xl font-bold text-gray-800">{t.sections.cancellation.title}</h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.sections.cancellation.items.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className={`h-10 w-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 ${isRTL ? 'ml-4' : 'mr-4'} mt-1`}>
                    <svg className="h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        {/* 4. Golden Guarantee */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-amber-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-2xl font-bold text-gray-800">{t.sections.guarantee.title}</h2>
          </div>

          <div className="bg-amber-50 rounded-xl p-8 border border-amber-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.sections.guarantee.items.map((item, index) => (
                <div key={index} className="flex items-start">
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

        {/* 5. Our Responsibilities */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-green-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-2xl font-bold text-gray-800">{t.sections.responsibilities.title}</h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.sections.responsibilities.items.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className={`h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 ${isRTL ? 'ml-4' : 'mr-4'} mt-1`}>
                    <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        {/* 6. Client Responsibilities */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-blue-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-2xl font-bold text-gray-800">{t.sections.clientResponsibilities.title}</h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.sections.clientResponsibilities.items.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className={`h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 ${isRTL ? 'ml-4' : 'mr-4'} mt-1`}>
                    <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        {/* 7. Amendments to Terms and Conditions */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-gray-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-2xl font-bold text-gray-800">{t.sections.amendments.title}</h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <p className="text-gray-700 leading-relaxed">
              {t.sections.amendments.content}
            </p>
          </div>
        </section>

        {/* Quote Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-10 rounded-xl text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-lg text-gray-700 italic mb-6">
              {t.sections.quote.text}
            </blockquote>
            <p className="font-bold text-gray-900">{t.sections.quote.attribution}</p>
          </div>
        </section>

        {/* Last Updated */}
        <section>
          <div className="text-center text-gray-500 italic">
            <p>
              {isRTL 
                ? "تم تحديث هذه الشروط والأحكام بتاريخ: 1 يناير 2025"
                : "These terms and conditions were updated on: January 1, 2025"
              }
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer language={lang === "EN" ? "en" : "ar"} companyName={lang === "EN" ? "Elegant Scene" : "المشهد الأنيق"} />
    </div>
  );
};

export default TermsPage;