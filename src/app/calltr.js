import React from 'react';

const ContactUsComponent = () => {
 return (
   <div className="min-h-screen w-[100%] mx-auto">
     <div>
       <title>Bize Ulaşın - Next Graft</title>
       <meta name="description" content="Next Graft ile destek ve talepleriniz için WhatsApp ve e-posta üzerinden iletişime geçin." />
     </div>

     <main className="text-gray-800 font-sans leading-relaxed">
       {/* Orange Header Section */}
       <section className="relative w-full bg-[#FF9500] text-white py-12">
         <div className="absolute  top-0 bottom-0  bg-[#FF9500]" />
         <div className="absolute   top-0 bottom-0  bg-[#FF9500]" />
         <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
           <h1 className="text-4xl font-bold mb-4">Bize Ulaşın</h1>
           <p className="text-lg">Next Graft olarak sizinle iletişimde olmaktan mutluluk duyarız. WhatsApp ve e-posta aracılığıyla 7/24 destek ve sorularınıza yanıt sağlıyoruz.</p>
         </div>
       </section>

       {/* Main Content Section */}
       <section className="relative w-full bg-gray-100 py-12">
         <div className="absolute   top-0 bottom-0  bg-gray-100" />
         <div className="absolute   top-0 bottom-0  bg-gray-100" />
         <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
           <h2 className="text-2xl font-semibold text-gray-900 mb-4">E-posta</h2>
           <p className="text-lg mb-6">
             E-posta yoluyla bizimle iletişime geçebilirsiniz: 
             <a href="mailto:info@nextgraft.com" className="text-[#FF9500] hover:text-[#FF9500]/80">info@nextgraft.com</a>
           </p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">Çalışma Saatleri</h2>
           <p className="text-lg mb-6">Haftanın her günü, 24 saat hizmetinizdeyiz.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sosyal Medya Hesaplarımız</h2>
           <p className="text-lg mb-6">Son haberler ve güncellemeler için sosyal medya hesaplarımızdan bizi takip edin:</p>
           <ul className="list-disc pl-6 mb-6">
             <li>
               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#FF9500] hover:text-[#FF9500]/80">
                 Instagram
               </a>
             </li>
             <li>
               <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-[#FF9500] hover:text-[#FF9500]/80">
                 TikTok
               </a>
             </li>
           </ul>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">WhatsApp Üzerinden Bize Ulaşın</h2>
           <a 
             href="https://wa.me/yourwhatsapplink" 
             className="inline-block px-6 py-3 bg-[#FF9500] text-white rounded-lg shadow-md hover:bg-[#FF9500]/90 transition"
           >
             WhatsApp ile Bize Ulaşın
           </a>
         </div>
       </section>

       {/* Orange Footer Section */}
       <section className="relative w-full bg-[#FF9500] text-white py-12">
         <div className="absolute  top-0 bottom-0  bg-[#FF9500]" />
         <div className="absolute   top-0 bottom-0  bg-[#FF9500]" />
         <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
           <p className="text-lg">Next Graft olarak, müşterilerimize en üst düzeyde destek ve özen sunmayı taahhüt ediyoruz. Size yardımcı olmak için buradayız ve sizden haber almayı sabırsızlıkla bekliyoruz.</p>
         </div>
       </section>
     </main>
   </div>
 );
};

export default ContactUsComponent;