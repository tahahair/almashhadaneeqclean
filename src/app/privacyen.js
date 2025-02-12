import React from 'react';

const PrivacyPolicyComponent = () => {
  return (
    <div className="min-h-screen w-[100%] mx-auto">
      <div>
        <title>Privacy Policy - Next Graft</title>
        <meta name="description" content="Learn about Next Graft's privacy policy regarding the collection and usage of personal information." />
      </div>

      <main className="text-gray-800 font-sans leading-relaxed">
        {/* Orange Header Section */}
        <section className="relative w-full bg-[#FF9500] text-white py-12">
          <div className="absolute left-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
          <div className="absolute right-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg">Welcome to the Next Graft privacy policy page, where we explain how we collect, use, and protect your personal information.</p>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="relative w-full bg-gray-100 py-12">
          <div className="absolute left-[-100vw] top-0 bottom-0  bg-gray-100" />
          <div className="absolute right-[-100vw] top-0 bottom-0  bg-gray-100" />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Policy Scope</h2>
            <p className="text-lg mb-6">This privacy policy explains how we collect, use, and protect personal information obtained from you when using the Next Graft website.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Data We Collect</h2>
            <p className="text-lg mb-6">
              <strong>Personal Data:</strong> Such as name, email address, phone number, and any other information you provide when registering for our services.
            </p>
            <p className="text-lg mb-6">
              <strong>Usage Data:</strong> Details of how you use the website and services, such as browser type, login times, viewed pages, and IP address.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-lg mb-6">We use collected information for the following purposes:</p>
            <ul className="list-disc pl-6 mb-6 text-lg">
              <li>Providing and improving our services.</li>
              <li>Communicating with you about our services or promotions.</li>
              <li>Analyzing website usage to improve user experience.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Protection and Security</h2>
            <p className="text-lg mb-6">We are committed to protecting your personal data security. We implement security measures to prevent unauthorized access or disclosure of your information.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Sharing</h2>
            <p className="text-lg mb-6">We will not sell, distribute, or lease your personal information to third parties unless we have your permission or are required by law.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. User Rights</h2>
            <p className="text-lg mb-6">You have the right to request access to personal information we hold about you and request correction or deletion of inaccurate data.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="text-lg mb-6">We use cookies to improve your experience on our website. You can manage cookie usage through your browser settings.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to Privacy Policy</h2>
            <p className="text-lg mb-6">We may modify this policy from time to time. Any changes will be posted on this page, and we encourage you to review the privacy policy regularly.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. How to Contact Us</h2>
            <p className="text-lg mb-6">If you have any questions or concerns about this privacy policy, please contact us at: <a href="mailto:info@nextgraft.com" className="text-[#FF9500] hover:text-[#FF9500]/80">info@nextgraft.com</a>.</p>
          </div>
        </section>

        {/* Orange Footer Section */}
        <section className="relative w-full bg-[#FF9500] text-white py-12">
          <div className="absolute left-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
          <div className="absolute right-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-lg">We appreciate your trust in Next Graft and work hard to protect your privacy and data security.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicyComponent;