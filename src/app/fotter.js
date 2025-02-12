import React from 'react';
import { Facebook, Send, Instagram } from 'lucide-react';

const footerContent = {
  en: {
    title1: "See Your Hair Transplant",
    title2: "Results in a Minute",
    about: "About Us",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    contact: "Contact Us",
    faq: "FAQ",
    madeWith: "Made with love in UAE"
  },
  tr: {
    title1: "Saç Ekimi Sonuçlarınızı",
    title2: "Bir Dakikada Görün",
    about: "Hakkımızda",
    terms: "Şartlar ve Koşullar",
    privacy: "Gizlilik Politikası",
    contact: "Bize Ulaşın",
    faq: "Sık Sorulan Sorular",
    madeWith: "BAE'de sevgiyle yapıldı"
  },
  ar: {
    title1: "شاهد نتائج زراعة",
    title2: "شعرك في دقيقة",
    about: "من نحن",
    terms: "الشروط والاحكام",
    privacy: "سياسة الخصوصية",
    contact: "تواصل معنا",
    faq: "الاسئلة الشائعة",
    madeWith: "صنع بكل حب في الإمارات"
  }
};

const Footer = ({ language , click }) => {
  const content = footerContent[language];
  const isRTL = language === 'ar';

  return (
    <footer className="bg-gray-100 py-12 w-screen relative left-1/2 -translate-x-1/2">
      <div className="max-w-7xl mx-auto px-8 w-[96.5%]">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Section */}
          <div className={`col-span-4 space-y-4 ${isRTL ? 'order-last' : 'order-first'}`}>
            <h3 className={`text-xl font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{content.title1}</h3>
            <h3 className={`text-xl font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{content.title2}</h3>
            
            {/* Social Media Icons */}
            <div className={`flex gap-4 mt-6 ${isRTL ? 'justify-end' : 'justify-start'}`}>
              <a href="#" className="bg-orange-400 p-3 rounded-lg hover:bg-orange-500 transition-colors">
                <Facebook className="w-6 h-6 text-white" />
              </a>
              <a href="#" className="bg-orange-400 p-3 rounded-lg hover:bg-orange-500 transition-colors">
                <Send className="w-6 h-6 text-white" />
              </a>
              <a href="#" className="bg-orange-400 p-3 rounded-lg hover:bg-orange-500 transition-colors">
                <Instagram className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>

          {/* Center Section */}
          <div className={`col-span-4 space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <a onClick={() => click('about')} className="block hover:text-orange-500">{content.about}</a>
            <a onClick={() => click('terms')} className="block hover:text-orange-500">{content.terms}</a>
            <a onClick={() => click('privacy')} className="block hover:text-orange-500">{content.privacy}</a>
          </div>

          {/* Right Section */}
          <div className={`col-span-4 space-y-4 ${isRTL ? 'text-right' : 'text-left'} ${isRTL ? 'order-first' : 'order-last'}`}>
            <a onClick={() => click('call')} className="block hover:text-orange-500">{content.contact}</a>
            <a onClick={() => click('ask')}className="block hover:text-orange-500">{content.faq}</a>
          </div>
        </div>

        {/* Bottom Section with Logo */}
        <div className="flex items-center justify-between">
          <div className={` mt-10 flex items-center gap-2 ${isRTL ? 'order-last' : 'order-first'}`}>
            <img src="/arabic.png" alt="UAE Flag" className="w-8 h-8 rounded-full" />
            <span className="text-lg">{content.madeWith}</span>
          </div>
          <img src="/logo.png" alt="Next Graft" className=" w-32" onClick={() => click('main')}  />
        </div>
      </div>
    </footer>
  );
};

export default Footer;