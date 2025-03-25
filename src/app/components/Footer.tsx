// components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

interface FooterProps {
  companyName?: string;
  language?: 'en' | 'ar';
}

// Translations for the footer
const translations = {
  en: {
    aboutUs: 'About Us',
    privacyPolicy: 'Privacy Policy',
    termsAndConditions: 'Terms and Conditions',
    goldenGuarantee: 'Golden Guarantee',
    allRightsReserved: 'All rights reserved.',
  },
  ar: {
    aboutUs: 'من نحن',
    privacyPolicy: 'سياسة الخصوصية',
    termsAndConditions: 'الشروط والأحكام',
    goldenGuarantee: 'الضمان الذهبي',
    allRightsReserved: 'All rights reserved.',
  }
};

const Footer: React.FC<FooterProps> = ({ 
    companyName = 'Almashhad Alaneeq Cleaning Services',
    language = 'en'
}) => {
  const t = translations[language];
  const isRTL = language === 'ar';
  
  return (
    <footer 
      className={`bg-gray-100 border-t ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Main content with fixed structure regardless of language */}
        <div className="grid grid-cols-12 gap-6">
          {/* Logo - fixed on the left side regardless of language */}
          <div className={`${isRTL ? 'col-start-1' : 'col-start-1'} col-span-4 sm:col-span-3`}>
            <Link href="/" className="block">
              <Image 
                src="/logo.png" 
                alt="Company Logo" 
                width={120} 
                height={40} 
                className="h-10 w-auto"
              />
            </Link>
          </div>
          
          {/* Footer Links - in two columns on the right side */}
          <div className={`${isRTL ? 'col-end-13' : 'col-end-13'} col-span-8 sm:col-span-6`}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t.aboutUs}
              </Link>
              <Link 
                href="/privacy" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t.privacyPolicy}
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t.termsAndConditions}
              </Link>
              <Link 
                href="/guarantee" 
                className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                {t.goldenGuarantee}
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} {companyName}. {t.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;