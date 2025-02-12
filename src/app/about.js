import React from 'react';

const AboutComponent = () => {
 return (
   <div className="min-h-screen w-[100%] mx-auto">
     <div>
       <title>About Us - Next Graft</title>
       <meta name="description" content="Learn about Next Graft's innovative and personalized approach to hair transplantation." />
     </div>

     <main className="text-gray-800 font-sans leading-relaxed">
       {/* Orange Header Section */}
       <section className="relative w-full bg-[#FF9500] text-white py-12">
         <div className="absolute left-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
         <div className="absolute right-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
         <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
           <h1 className="text-4xl font-bold mb-4">من نحن - Next Graft</h1>
           <p className="text-lg">أهلاً بكم في Next Graft، حيث الابتكار والخبرة يتحدان لإعادة تعريف جمالكم الطبيعي.</p>
         </div>
       </section>

       {/* Main Content Section */}
       <section className="relative w-full bg-gray-100 py-12">
         <div className="absolute left-[-100vw] top-0 bottom-0  bg-gray-100" />
         <div className="absolute right-[-100vw] top-0 bottom-0  bg-gray-100" />
         <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-right">
           <h2 className="text-2xl font-semibold text-gray-900 mb-4">الشراكات الحصرية</h2>
           <p className="text-lg mb-6">لقد بنينا شبكة من الشراكات الاستراتيجية مع أفضل عيادات زراعة الشعر في تركيا والإمارات، مما يمنحكم الوصول المباشر إلى خبراء زراعة الشعر الرائدين وأحدث التقنيات في القطاع. هذه الشراكات تضمن لكم الحصول على الخدمات الطبية الأعلى جودة مع الحفاظ على الخصوصية والاهتمام الفردي.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">قارن واختر الأفضل بأسعار منافسة</h2>
           <p className="text-lg mb-6">في Next Graft، نتفهم أهمية الخيار والقيمة. لذا نوفر لكم منصة تتيح مقارنة الخدمات المتنوعة لتختاروا ما يناسبكم بأفضل الأسعار. من خلالنا، ستجدون تفصيلاً دقيقًا لكل عيادة، مما يسهل عليكم الاختيار بناءً على المعايير التي تهمكم.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">نتفاوض لكم مباشرة مع العيادات</h2>
           <p className="text-lg mb-6">نأخذ على عاتقنا مهمة التفاوض مع العيادات لضمان حصولكم على أفضل الأسعار. فريقنا المختص بالتفاوض يعمل بجد لضمان أن تحصلوا على عروض حصرية لا تتوفر إلا من خلال Next Graft. نعمل دائمًا لصالحكم لضمان تجربة خالية من التعقيدات مع التكلفة الأمثل.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">لماذا Next Graft؟</h2>
           <p className="text-lg">لأننا في Next Graft نؤمن بأن الثقة والرضا الكامل هي أساس علاقتنا بكم. نقدم لكم الاحترافية، الشفافية، والدعم الكامل في رحلتكم لاستعادة شعركم وثقتكم. اختاروا Next Graft، حيث الجودة والاهتمام بالتفاصيل يلتقيان لتقديم تجربة لا تُنسى.</p>
         </div>
       </section>

       {/* Orange Footer Section */}
       <section className="relative w-full bg-[#FF9500] text-white py-12">
         <div className="absolute left-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
         <div className="absolute right-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
         <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
           <p className="text-lg">نتطلع إلى رعايتكم في Next Graft، حيث نجعل رحلتكم نحو زراعة الشعر أكثر سلاسة ونجاحًا.</p>
         </div>
       </section>
     </main>
   </div>
 );
};

export default AboutComponent;