import React from 'react';

const TermsConditionsComponent = () => {
 return (
   <div className="min-h-screen w-[100%] mx-auto">
     <div>
       <title>Şartlar ve Koşullar - Next Graft</title>
       <meta name="description" content="Next Graft web sitesi ve hizmetlerini kullanmaya ilişkin şartlar ve koşullar hakkında bilgi edinin." />
     </div>

     <main className="text-gray-800 font-sans leading-relaxed">
       {/* Orange Header Section */}
       <section className="relative w-full bg-[#FF9500] text-white py-12">
         <div className="absolute left-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
         <div className="absolute right-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
         <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
           <h1 className="text-4xl font-bold mb-4">Şartlar ve Koşullar</h1>
           <p className="text-lg">Next Graft&apos;a hoş geldiniz. Bu bölüm, web sitemizin ve hizmetlerimizin kullanımını düzenleyen yasal koşulları kapsar.</p>
         </div>
       </section>

       {/* Main Content Section */}
       <section className="relative w-full bg-gray-100 py-12">
         <div className="absolute left-[-100vw] top-0 bottom-0  bg-gray-100" />
         <div className="absolute right-[-100vw] top-0 bottom-0  bg-gray-100" />
         <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
           <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Giriş</h2>
           <p className="text-lg mb-6">Next Graft&apos;a hoş geldiniz. Bu bölüm, web sitemizin ve hizmetlerimizin kullanımını düzenleyen yasal koşulları kapsar. Next Graft web sitesine giriş yaparak ve kullanarak, bu şartlar ve koşullara uymayı açıkça kabul etmiş olursunuz.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Fikri Mülkiyet Hakları</h2>
           <p className="text-lg mb-6">Web sitesinde yayınlanan metinler, görseller, simgeler, grafikler, yazılımlar ve diğer materyaller dahil tüm içerik, Next Graft&apos;ın veya üçüncü tarafların korumalı mülkiyetidir. Sadece bu şartlara uygun olarak kullanılabilir.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Kullanıcı Yükümlülükleri</h2>
           <p className="text-lg mb-6">Kullanıcı olarak, web sitesini yasa dışı amaçlarla kullanmamayı ve web sitesinin veya sunduğumuz hizmetlerin işleyişini engelleyebilecek veya müdahale edebilecek herhangi bir faaliyetten kaçınmayı kabul edersiniz.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Sunulan Hizmetler</h2>
           <p className="text-lg mb-6">Web sitesi, Next Graft tarafından sunulan saç ekimi konsültasyonları, ameliyatları ve diğer hizmetleri belirtir. Lütfen taahhüt etmeden önce her hizmet açıklamasını dikkatlice inceleyin.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Hizmet ve Şartlarda Değişiklikler</h2>
           <p className="text-lg mb-6">Next Graft, önceden bildirimde bulunmaksızın herhangi bir hizmeti veya kullanım şartlarını değiştirme veya sonlandırma hakkını saklı tutar.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. İptal ve İade</h2>
           <p className="text-lg mb-6">İptal ve iadeler, web sitesinde yayınlanan belirli bir politikaya tabidir. Müşteriler, herhangi bir işlem yapmadan önce bu politikaya uymak ve ilgili şartları anlamakla yükümlüdür.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. İletişim</h2>
           <p className="text-lg mb-6">Bu şartlar ve koşullarla ilgili herhangi bir soru veya yorum için lütfen <a href="mailto:info@nextgraft.com" className="text-[#FF9500] hover:text-[#FF9500]/80">info@nextgraft.com</a> adresinden bizimle iletişime geçin.</p>
         </div>
       </section>

       {/* Orange Footer Section */}
       <section className="relative w-full bg-[#FF9500] text-white py-12">
         <div className="absolute left-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
         <div className="absolute right-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
         <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
           <p className="text-lg">Next Graft ile en iyi deneyimi sağlamak için size hizmet vermeyi dört gözle bekliyoruz.</p>
         </div>
       </section>
     </main>
   </div>
 );
};

export default TermsConditionsComponent;