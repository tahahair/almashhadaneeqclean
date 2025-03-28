// pages/privacy.tsx
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
      title: "Privacy Policy | Elegant Scene",
      description: "Learn about our commitment to protecting your privacy at Elegant Scene Cleaning Services"
    },
    header: {
      home: "Home",
      about: "About Us",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      guarantee: "Golden Guarantee"
    },
    hero: {
      title: "Privacy Policy",
      subtitle: "Our Commitment to Protecting Your Privacy"
    },
    sections: {
      intro: {
        content: "At Elegant Scene Cleaning Services, we place the highest priority on your privacy. We fully understand the sensitivity of our team entering your home, and we ensure the utmost levels of respect and confidentiality."
      },
      dataProtection: {
        title: "Your Information is Secure",
        description: "We adhere to the following standards to protect your privacy:",
        items: [
          {
            title: "Limited Data Collection",
            content: "We only collect information necessary to provide an outstanding cleaning service."
          },
          {
            title: "No Unnecessary Personal Information",
            content: "We never request personal information that isn't essential."
          },
          {
            title: "Secure Data Storage",
            content: "We store data with the latest protection and encryption systems."
          }
        ]
      },
      homePrivacy: {
        title: "Protecting Your Home's Privacy",
        items: [
          {
            title: "Strict Confidentiality Agreements",
            content: "All our employees have signed strict confidentiality agreements."
          },
          {
            title: "No Photography",
            content: "Taking photos inside customers' homes is strictly prohibited."
          },
          {
            title: "Regular Training",
            content: "Our team undergoes regular training on respecting customer privacy."
          }
        ]
      },
      personalData: {
        title: "Protecting Your Personal Data",
        items: [
          {
            title: "No Third-Party Sharing",
            content: "We will not share your information with any third party without your consent."
          },
          {
            title: "Purposeful Use Only",
            content: "We use your data only for the purposes for which it was collected."
          },
          {
            title: "No Unauthorized Marketing",
            content: "We do not use customer data for unauthorized marketing purposes."
          }
        ]
      },
      trustedStaff: {
        title: "Trusted Employees",
        description: "We take strict measures to ensure the security and privacy of your home:",
        items: [
          {
            title: "Comprehensive Background Checks",
            content: "For all employees before hiring"
          },
          {
            title: "Official ID Cards",
            content: "Carried by the team while providing the service"
          },
          {
            title: "Mandatory Training",
            content: "On privacy standards and professional conduct"
          },
          {
            title: "Consistent Team",
            content: "For each home to maintain privacy and security"
          }
        ]
      },
      rights: {
        title: "Your Rights",
        description: "As a customer of Elegant Scene, you have the right to:",
        items: [
          {
            title: "Access",
            content: "Your personal data that we maintain"
          },
          {
            title: "Modify or Update",
            content: "Your information at any time"
          },
          {
            title: "Delete",
            content: "Your data from our database upon request"
          },
          {
            title: "Request No Marketing Contact",
            content: "Opt out of marketing communications"
          }
        ]
      },
      paymentSecurity: {
        title: "Payment Security",
        description: "We use the latest electronic payment protection technologies to ensure the security of your financial transactions:",
        items: [
          {
            title: "SSL Encryption",
            content: "For all financial transactions"
          },
          {
            title: "Authorized Payment Gateways",
            content: "Licensed in the UAE"
          },
          {
            title: "Multiple Payment Options",
            content: "To meet your needs"
          }
        ]
      },
      quote: {
        text: "We treat your home and your data with the same level of respect and care that we would expect for our own homes and personal data",
        attribution: "Elegant Scene Management"
      },
      lastUpdated: "This policy was updated on: January 1, 2025"
    }
  },
  ar: {
    direction: "rtl",
    meta: {
      title: "سياسة الخصوصية | المشهد الأنيق",
      description: "تعرف على التزامنا بحماية خصوصيتك في شركة المشهد الأنيق لخدمات التنظيف"
    },
    header: {
      home: "الرئيسية",
      about: "من نحن",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      guarantee: "الضمان الذهبي"
    },
    hero: {
      title: "سياسة الخصوصية",
      subtitle: "التزامنا بحماية خصوصيتك"
    },
    sections: {
      intro: {
        content: "في المشهد الأنيق لخدمات التنظيف، نولي خصوصية عملائنا أهمية قصوى. نفهم تماماً حساسية دخول فريقنا إلى منزلك، ونضمن أقصى درجات الاحترام والسرية."
      },
      dataProtection: {
        title: "معلوماتك في أمان",
        description: "نلتزم بالمعايير التالية لحماية خصوصيتك:",
        items: [
          {
            title: "جمع البيانات المحدود",
            content: "نجمع فقط المعلومات الضرورية لتقديم خدمة تنظيف متميزة"
          },
          {
            title: "لا نطلب معلومات غير ضرورية",
            content: "لا نطلب أبداً معلومات شخصية غير ضرورية"
          },
          {
            title: "تخزين آمن للبيانات",
            content: "نخزن البيانات بأحدث أنظمة الحماية والتشفير"
          }
        ]
      },
      homePrivacy: {
        title: "حماية خصوصية منزلك",
        items: [
          {
            title: "اتفاقيات سرية صارمة",
            content: "جميع موظفينا موقعون على اتفاقية سرية صارمة"
          },
          {
            title: "منع التصوير",
            content: "يمنع منعاً باتاً التقاط صور داخل منازل العملاء"
          },
          {
            title: "تدريب دوري",
            content: "تدريب دوري لفريقنا على احترام خصوصية العميل"
          }
        ]
      },
      personalData: {
        title: "حماية بياناتك الشخصية",
        items: [
          {
            title: "عدم مشاركة البيانات",
            content: "لن نشارك معلوماتك مع أي طرف ثالث دون موافقتك"
          },
          {
            title: "استخدام محدد للبيانات",
            content: "نستخدم بياناتك فقط للأغراض التي جمعت من أجلها"
          },
          {
            title: "لا تسويق غير مصرح",
            content: "لا نستخدم بيانات العملاء لأغراض تسويقية غير مرخصة"
          }
        ]
      },
      trustedStaff: {
        title: "موظفون موثوقون",
        description: "نتخذ إجراءات صارمة لضمان أمن وخصوصية منزلك:",
        items: [
          {
            title: "فحص شامل للخلفية الأمنية",
            content: "لجميع الموظفين قبل التوظيف"
          },
          {
            title: "بطاقات هوية رسمية",
            content: "يحملها الفريق أثناء تقديم الخدمة"
          },
          {
            title: "تدريب إلزامي",
            content: "على معايير الخصوصية والسلوك المهني"
          },
          {
            title: "فريق ثابت",
            content: "لكل منزل للحفاظ على الخصوصية والأمان"
          }
        ]
      },
      rights: {
        title: "حقوقك",
        description: "كعميل للمشهد الأنيق، لديك الحق في:",
        items: [
          {
            title: "الاطلاع",
            content: "على بياناتك الشخصية التي نحتفظ بها"
          },
          {
            title: "تعديل أو تحديث",
            content: "معلوماتك في أي وقت"
          },
          {
            title: "حذف",
            content: "بياناتك من قاعدة بياناتنا عند الطلب"
          },
          {
            title: "طلب عدم التواصل",
            content: "التسويقي معك"
          }
        ]
      },
      paymentSecurity: {
        title: "أمان المدفوعات",
        description: "نستخدم أحدث تقنيات حماية المدفوعات الإلكترونية لضمان أمن معاملاتك المالية:",
        items: [
          {
            title: "تشفير SSL",
            content: "لجميع المعاملات المالية"
          },
          {
            title: "بوابات دفع معتمدة",
            content: "ومرخصة في الإمارات"
          },
          {
            title: "خيارات دفع متعددة",
            content: "تلبي احتياجاتك"
          }
        ]
      },
      quote: {
        text: "نتعامل مع منزلك وبياناتك بنفس المستوى من الاحترام والعناية الذي نتوقعه لمنازلنا وبياناتنا الشخصية",
        attribution: "إدارة المشهد الأنيق"
      },
      lastUpdated: "تم تحديث هذه السياسة بتاريخ: 1 يناير 2025"
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

const PrivacyPolicyPage: React.FC = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
   const [currentPath, setCurrentPath] = useState('/privacy');
  
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
      <div className="w-full bg-gradient-to-b from-blue-50 to-blue-100 py-16">
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
          <div className="h-1 w-24 bg-blue-500 rounded-full my-8"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Introduction Section */}
        <section className="mb-12">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <p className="text-lg leading-relaxed text-gray-700">
              {t.sections.intro.content}
            </p>
          </div>
        </section>

        {/* Data Protection Section */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-blue-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-3xl font-bold text-gray-800">{t.sections.dataProtection.title}</h2>
          </div>
          
          <p className="mb-6 text-lg text-gray-700">{t.sections.dataProtection.description}</p>
          
          <div className="mb-10 bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl border border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.sections.dataProtection.items.map((item, index) => (
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
          
          {/* Home Privacy */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{t.sections.homePrivacy.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.sections.homePrivacy.items.map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                  <div className="flex items-center space-x-4 space-x-reverse mb-2">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  </div>
                  <p className={`mt-2 text-gray-600 ${isRTL ? 'mr-14' : 'ml-14'}`}>{item.content}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Personal Data Protection */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{t.sections.personalData.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.sections.personalData.items.map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                  <div className="flex items-center space-x-4 space-x-reverse mb-2">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  </div>
                  <p className={`mt-2 text-gray-600 ${isRTL ? 'mr-14' : 'ml-14'}`}>{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted Staff Section */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-green-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-3xl font-bold text-gray-800">{t.sections.trustedStaff.title}</h2>
          </div>
          
          <p className="mb-6 text-lg text-gray-700">{t.sections.trustedStaff.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.sections.trustedStaff.items.map((item, index) => (
              <div key={index} className="bg-green-50 p-6 rounded-lg border border-green-100">
                <div className="flex items-center mb-3">
                  <svg className={`h-8 w-8 text-green-600 ${isRTL ? 'ml-3' : 'mr-3'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                </div>
                <p className={`text-gray-700 ${isRTL ? 'mr-11' : 'ml-11'}`}>{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Your Rights Section */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-purple-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-3xl font-bold text-gray-800">{t.sections.rights.title}</h2>
          </div>
          
          <p className="mb-6 text-lg text-gray-700">{t.sections.rights.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.sections.rights.items.map((item, index) => (
              <div key={index} className="flex items-start p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
                <div className={`h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 ${isRTL ? 'ml-4' : 'mr-4'}`}>
                  <svg className="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Payment Security Section */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-yellow-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-3xl font-bold text-gray-800">{t.sections.paymentSecurity.title}</h2>
          </div>
          
          <p className="mb-6 text-lg text-gray-700">{t.sections.paymentSecurity.description}</p>
          
          <div className="bg-yellow-50 rounded-xl p-8 border border-yellow-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.sections.paymentSecurity.items.map((item, index) => (
                <div key={index} className="text-center p-4">
                  <div className="h-16 w-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="h-8 w-8 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-10 rounded-xl text-center">
            <svg className="w-12 h-12 text-blue-300 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
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
            <p>{t.sections.lastUpdated}</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer language={lang === "EN" ? "en" : "ar"} companyName={lang === "EN" ? "Elegant Scene" : "المشهد الأنيق"} />
    </div>
  );
};

export default PrivacyPolicyPage;