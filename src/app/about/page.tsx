// pages/about.tsx
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
      title: "About Us | Elegant Scene",
      description: "Elegant Scene - An Emirati success story in the world of professional cleaning"
    },
    header: {
      home: "Home",
      about: "About Us",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      guarantee: "Golden Guarantee"
    },
    hero: {
      title: "About Us",
      subtitle: "Elegant Scene - An Emirati success story in the world of professional cleaning"
    },
    sections: {
      vision: {
        title: "From Vision to Reality",
        content: "Elegant Scene was established in the United Arab Emirates as a solution to a problem we all face as homeowners and families: the difficulty of obtaining reliable cleaning services with consistent quality. We started our journey with a small team and a big dream: to revolutionize the home cleaning sector. Today, after years of continuous work, we have become the first name in deep cleaning in the UAE."
      },
      features: {
        title: "What Makes Us Special",
        items: [
          {
            title: "Specialists in Deep Cleaning Only",
            content: "We focus on what we excel at"
          },
          {
            title: "Consistent Team for Each Home",
            content: "To ensure continuity of quality and privacy"
          },
          {
            title: "More Than 9,080 Happy Homes",
            content: "Trust built day by day"
          },
          {
            title: "95% Customer Satisfaction Rate",
            content: "That's why most of our customers book with us again"
          },
          {
            title: "100% Licensed Emirati Company",
            content: "Operating according to local laws and regulations"
          }
        ]
      },
      team: {
        title: "Our Team",
        content: "The Elegant Scene team consists of a professional group trained to the highest global and Islamic cleaning standards. All members of our team are:",
        items: [
          {
            title: "Officially Documented",
            content: "With legal work permits"
          },
          {
            title: "Professionally Trained",
            content: "On deep cleaning techniques"
          },
          {
            title: "Subject to Background Checks",
            content: "To ensure the safety of your home and family"
          },
          {
            title: "Minimum 3 Years Experience",
            content: "In professional cleaning"
          }
        ]
      },
      commitment: {
        title: "Our Commitment",
        items: [
          {
            title: "Time Commitment",
            content: "Your time is valuable, we always respect it"
          },
          {
            title: "Consistency in Quality",
            content: "Same excellent level of service in every visit"
          },
          {
            title: "Transparency in Pricing",
            content: "Clear and fixed price from the beginning, without hidden fees"
          },
          {
            title: "Golden Guarantee",
            content: "If you don't like the result, get your money back in full"
          }
        ]
      },
      responsibility: {
        title: "Our Social Responsibility",
        content: "We believe that success comes with responsibility. Therefore, we are keen on:",
        items: [
          "Using environmentally friendly products",
          "Providing decent and sustainable job opportunities",
          "Supporting community initiatives in the UAE"
        ]
      },
      certifications: {
        title: "Our Certifications and Accreditations",
        items: [
          {
            title: "Official License",
            content: "From the Department of Economic Development 🇦🇪"
          },
          {
            title: "Approved",
            content: "By the UAE Chamber of Commerce and Industry"
          },
          {
            title: "ISO 9001 Global Quality Certificate",
            content: ""
          }
        ]
      },
      quote: {
        text: "Because we were once customers looking for distinguished cleaning service... we understood your needs and designed the optimal solution",
        attribution: "Elegant Scene Management"
      }
    }
  },
  ar: {
    direction: "rtl",
    meta: {
      title: "من نحن | المشهد الأنيق",
      description: "المشهد الأنيق - قصة نجاح إماراتية في عالم التنظيف الاحترافي"
    },
    header: {
      home: "الرئيسية",
      about: "من نحن",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      guarantee: "الضمان الذهبي"
    },
    hero: {
      title: "من نحن",
      subtitle: "المشهد الأنيق - قصة نجاح إماراتية في عالم التنظيف الاحترافي"
    },
    sections: {
      vision: {
        title: "من رؤية إلى حقيقة",
        content: "تأسست شركة المشهد الأنيق في دولة الإمارات العربية المتحدة كحل لمشكلة واجهناها جميعاً كأصحاب منازل وعائلات: صعوبة الحصول على خدمة تنظيف موثوقة بجودة ثابتة. بدأنا مسيرتنا بفريق صغير وحلم كبير: إحداث ثورة في قطاع التنظيف المنزلي. واليوم، وبعد سنوات من العمل المتواصل، أصبحنا الاسم الأول في مجال التنظيف العميق في الإمارات."
      },
      features: {
        title: "ما يميزنا",
        items: [
          {
            title: "متخصصون في التنظيف العميق فقط",
            content: "نركز على ما نتقنه"
          },
          {
            title: "فريق ثابت لكل منزل",
            content: "لضمان استمرارية الجودة والخصوصية"
          },
          {
            title: "أكثر من 9,080 منزل سعيد",
            content: "ثقة تبنى يوماً بعد يوم"
          },
          {
            title: "نسبة رضا عملاء 95%",
            content: "ولذلك معظم عملائنا يحجزون معنا مجدداً"
          },
          {
            title: "شركة إماراتية مرخصة 100%",
            content: "تعمل وفق القوانين واللوائح المحلية"
          }
        ]
      },
      team: {
        title: "فريقنا",
        content: "يتكون فريق المشهد الأنيق من مجموعة محترفة مدربة على أعلى معايير النظافة العالمية والإسلامية. جميع أعضاء فريقنا:",
        items: [
          {
            title: "موثقون رسمياً",
            content: "بتصاريح عمل قانونية"
          },
          {
            title: "مدربون مهنياً",
            content: "على تقنيات التنظيف العميق"
          },
          {
            title: "خاضعون لفحص الخلفية الأمنية",
            content: "لضمان أمان منزلك وعائلتك"
          },
          {
            title: "خبرة لا تقل عن 3 سنوات",
            content: "في مجال التنظيف الاحترافي"
          }
        ]
      },
      commitment: {
        title: "التزامنا",
        items: [
          {
            title: "الالتزام بالمواعيد",
            content: "وقتك ثمين، نحترمه دائماً"
          },
          {
            title: "الثبات في الجودة",
            content: "نفس مستوى الخدمة المتميز في كل زيارة"
          },
          {
            title: "الشفافية في الأسعار",
            content: "سعر واضح وثابت من البداية، بدون رسوم خفية"
          },
          {
            title: "الضمان الذهبي",
            content: "إذا لم تعجبك النتيجة، استرد أموالك كاملة"
          }
        ]
      },
      responsibility: {
        title: "مسؤوليتنا المجتمعية",
        content: "نؤمن أن النجاح يأتي مع المسؤولية. لذلك نحرص على:",
        items: [
          "استخدام منتجات صديقة للبيئة",
          "توفير فرص عمل كريمة ومستدامة",
          "دعم المبادرات المجتمعية في الإمارات"
        ]
      },
      certifications: {
        title: "شهاداتنا واعتماداتنا",
        items: [
          {
            title: "ترخيص رسمي",
            content: "من دائرة التنمية الاقتصادية 🇦🇪"
          },
          {
            title: "معتمدون",
            content: "من غرفة تجارة وصناعة الإمارات"
          },
          {
            title: "شهادة الجودة العالمية ISO 9001",
            content: ""
          }
        ]
      },
      quote: {
        text: "لأننا كنا في يوم من الأيام عملاء نبحث عن خدمة تنظيف مميزة... فهمنا احتياجاتكم وصممنا الحل الأمثل",
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

const AboutPage: React.FC = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [lang, setLang] = useState("AR"); // Default to Arabic
  const [currentPath, setCurrentPath] = useState('/about');
  
  // Get current language content
  const t = lang === "EN" ? content.en : content.ar;
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
            
            {/* Language and menu button on the right */}
            <div className="flex items-center gap-3">
              <div className="flex gap-3 mr-2">
                {['EN', 'AR'].map((langCode) => {
                  const langKey = langCode.toUpperCase() as keyof typeof langImages;
                  return (
                    <button 
                      key={langCode}
                      onClick={() => setLang(langCode)}
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
        {/* Vision to Reality Section */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-blue-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-3xl font-bold text-gray-800">{t.sections.vision.title}</h2>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <p className="text-lg leading-relaxed text-gray-700">
              {t.sections.vision.content}
            </p>
          </div>
        </section>

        {/* What Makes Us Special Section */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-blue-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-3xl font-bold text-gray-800">{t.sections.features.title}</h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.sections.features.items.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className={`h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 ${isRTL ? 'ml-4' : 'mr-4'} mt-1`}>
                    <svg className="h-5 w-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        {/* Our Team Section */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-blue-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-3xl font-bold text-gray-800">{t.sections.team.title}</h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <p className="text-lg mb-8 text-gray-700">
              {t.sections.team.content}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.sections.team.items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
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

        {/* Our Commitment Section */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-blue-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-3xl font-bold text-gray-800">{t.sections.commitment.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.sections.commitment.items.map((item, index) => (
              <div key={index} className="p-6 bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <svg className={`h-8 w-8 text-sky-600 ${isRTL ? 'ml-3' : 'mr-3'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                </div>
                <p className="text-gray-700">{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Social Responsibility Section */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-blue-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-3xl font-bold text-gray-800">{t.sections.responsibility.title}</h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <p className="text-lg mb-6 text-gray-700">
              {t.sections.responsibility.content}
            </p>
            <div className="bg-gray-50 p-8 rounded-xl">
              <ul className="space-y-4">
                {t.sections.responsibility.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className={`h-6 w-6 text-green-600 ${isRTL ? 'ml-3' : 'mr-3'} mt-0.5`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="mb-12">
          <div className={`border-${isRTL ? 'r' : 'l'}-4 border-blue-500 ${isRTL ? 'pr-6' : 'pl-6'} mb-8`}>
            <h2 className="text-3xl font-bold text-gray-800">{t.sections.certifications.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.sections.certifications.items.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition">
                <div className="h-16 w-16 mx-auto mb-4 flex items-center justify-center">
                  {index === 0 ? (
                    <span className="text-4xl">🇦🇪</span>
                  ) : (
                    <svg className="h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.content}</p>
              </div>
            ))}
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
      </main>

      {/* Footer */}
      <Footer language={lang === "EN" ? "en" : "ar"} companyName={lang === "EN" ? "Elegant Scene" : "المشهد الأنيق"} />
    </div>
  );
};

export default AboutPage;