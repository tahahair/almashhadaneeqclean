import React from 'react';

const PrivacyPolicyComponent = () => {
 return (
   <div className="min-h-screen w-[100%] mx-auto">
     <div>
       <title>سياسة الخصوصية - Next Graft</title>
       <meta name="description" content="Learn about Next Graft's privacy policy regarding the collection and usage of personal information." />
     </div>

     <main className="text-gray-800 font-sans leading-relaxed">
       {/* Orange Header Section */}
       <section className="relative w-full bg-[#FF9500] text-white py-12">
         <div className="absolute left-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
         <div className="absolute right-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
         <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
           <h1 className="text-4xl font-bold mb-4">سياسة الخصوصية</h1>
           <p className="text-lg">مرحبًا بكم في صفحة سياسة الخصوصية الخاصة بـ Next Graft، حيث نوضح كيفية جمع واستخدام وحماية معلوماتكم الشخصية.</p>
         </div>
       </section>

       {/* Main Content Section */}
       <section className="relative w-full bg-gray-100 py-12">
         <div className="absolute left-[-100vw] top-0 bottom-0  bg-gray-100" />
         <div className="absolute right-[-100vw] top-0 bottom-0  bg-gray-100" />
         <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
           <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. نطاق السياسة</h2>
           <p className="text-lg mb-6">تشرح سياسة الخصوصية هذه كيف نجمع ونستخدم ونحمي المعلومات الشخصية التي نحصل عليها منكم عند استخدامكم لموقع Next Graft.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. البيانات التي نجمعها</h2>
           <p className="text-lg mb-6">
             <strong>بيانات شخصية:</strong> مثل الاسم، عنوان البريد الإلكتروني، رقم الهاتف، وأي معلومات أخرى تقدمونها عند التسجيل للحصول على خدماتنا.
           </p>
           <p className="text-lg mb-6">
             <strong>بيانات الاستخدام:</strong> تفاصيل كيفية استخدامكم للموقع والخدمات مثل نوع المتصفح، أوقات الدخول، صفحات المشاهدة، وعنوان IP.
           </p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. كيف نستخدم معلوماتكم</h2>
           <p className="text-lg mb-6">نستخدم المعلومات التي نجمعها للأغراض التالية:</p>
           <ul className="list-disc pr-6 mb-6 text-lg">
             <li>لتقديم وتحسين خدماتنا.</li>
             <li>للتواصل معكم بخصوص خدماتنا أو العروض الترويجية.</li>
             <li>لتحليل استخدام الموقع لتحسين تجربة المستخدم.</li>
           </ul>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. حماية البيانات والأمان</h2>
           <p className="text-lg mb-6">نلتزم بحماية أمان بياناتكم الشخصية. نطبق إجراءات أمان لمنع الدخول غير المصرح به أو الكشف عن معلوماتكم.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. مشاركة البيانات</h2>
           <p className="text-lg mb-6">لن نبيع، نوزع، أو نؤجر معلوماتكم الشخصية لأطراف ثالثة ما لم نحصل على إذنكم أو يتطلب القانون ذلك.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. حقوق المستخدم</h2>
           <p className="text-lg mb-6">لديكم الحق في طلب الوصول إلى المعلومات الشخصية التي نحتفظ بها عنكم وطلب تصحيح أي بيانات غير دقيقة أو حذفها.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. الكوكيز وتقنيات التتبع</h2>
           <p className="text-lg mb-6">نستخدم الكوكيز لتحسين تجربتكم على موقعنا. يمكنكم إدارة استخدام الكوكيز من خلال إعدادات المتصفح الخاص بكم.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. التغييرات على سياسة الخصوصية</h2>
           <p className="text-lg mb-6">قد نعدل هذه السياسة من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة، ونشجعكم على مراجعة سياسة الخصوصية بانتظام.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. كيفية الاتصال بنا</h2>
           <p className="text-lg mb-6">إذا كانت لديكم أي أسئلة أو مخاوف بخصوص سياسة الخصوصية هذه، يرجى الاتصال بنا عبر البريد الإلكتروني <a href="mailto:info@nextgraft.com" className="text-[#FF9500] hover:text-[#FF9500]/80">info@nextgraft.com</a>.</p>
         </div>
       </section>

       {/* Orange Footer Section */}
       <section className="relative w-full bg-[#FF9500] text-white py-12">
         <div className="absolute left-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
         <div className="absolute right-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
         <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
           <p className="text-lg">نقدر ثقتكم في Next Graft ونعمل بجد لحماية خصوصيتكم وأمان بياناتكم.</p>
         </div>
       </section>
     </main>
   </div>
 );
};

export default PrivacyPolicyComponent;