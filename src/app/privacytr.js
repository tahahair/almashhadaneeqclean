import React from 'react';

const PrivacyPolicyComponent = () => {
  return (
    <div className="min-h-screen w-[100%] mx-auto">
      <div>
        <title>Gizlilik Politikası - Next Graft</title>
        <meta name="description" content="Next Graft'ın kişisel bilgilerin toplanması ve kullanımı ile ilgili gizlilik politikasını öğrenin." />
      </div>

      <main className="text-gray-800 font-sans leading-relaxed">
        {/* Orange Header Section */}
        <section className="relative w-full bg-[#FF9500] text-white py-12">
          <div className="absolute left-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
          <div className="absolute right-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Gizlilik Politikası</h1>
            <p className="text-lg">Next Graft gizlilik politikası sayfasına hoş geldiniz. Bu sayfada, kişisel bilgilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklıyoruz.</p>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="relative w-full bg-gray-100 py-12">
          <div className="absolute left-[-100vw] top-0 bottom-0  bg-gray-100" />
          <div className="absolute right-[-100vw] top-0 bottom-0  bg-gray-100" />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Politika Kapsamı</h2>
            <p className="text-lg mb-6">Bu gizlilik politikası, Next Graft web sitesini kullanırken sizden elde ettiğimiz kişisel bilgileri nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklar.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Topladığımız Veriler</h2>
            <p className="text-lg mb-6">
              <strong>Kişisel Veriler:</strong> Ad, e-posta adresi, telefon numarası ve hizmetlerimize kayıt olurken sağladığınız diğer bilgiler.
            </p>
            <p className="text-lg mb-6">
              <strong>Kullanım Verileri:</strong> Tarayıcı türü, giriş süreleri, görüntülenen sayfalar ve IP adresi gibi web sitesi ve hizmet kullanım detayları.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Bilgilerinizi Nasıl Kullanıyoruz</h2>
            <p className="text-lg mb-6">Topladığımız bilgileri şu amaçlarla kullanırız:</p>
            <ul className="list-disc pl-6 mb-6 text-lg">
              <li>Hizmetlerimizi sunmak ve geliştirmek.</li>
              <li>Hizmetlerimiz veya promosyonlarımız hakkında sizinle iletişim kurmak.</li>
              <li>Kullanıcı deneyimini iyileştirmek için web sitesi kullanımını analiz etmek.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Veri Koruma ve Güvenlik</h2>
            <p className="text-lg mb-6">Kişisel verilerinizin güvenliğini sağlamak için çeşitli güvenlik önlemleri uyguluyoruz. Yetkisiz erişim veya bilgilerin ifşa edilmesini önlemek için gerekli tüm önlemleri alıyoruz.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Veri Paylaşımı</h2>
            <p className="text-lg mb-6">Kişisel bilgilerinizi izniniz olmadan veya yasal olarak gerekli olmadıkça üçüncü taraflarla paylaşmayacağız, satmayacağız veya kiralamayacağız.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Kullanıcı Hakları</h2>
            <p className="text-lg mb-6">Bizde bulunan kişisel bilgilere erişim talep etme, hatalı verilerin düzeltilmesini veya silinmesini isteme hakkına sahipsiniz.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Çerezler ve Takip Teknolojileri</h2>
            <p className="text-lg mb-6">Web sitemizde deneyiminizi geliştirmek için çerezler kullanıyoruz. Çerez kullanımını tarayıcı ayarlarınızdan yönetebilirsiniz.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Gizlilik Politikasındaki Değişiklikler</h2>
            <p className="text-lg mb-6">Bu politikayı zaman zaman güncelleyebiliriz. Herhangi bir değişiklik bu sayfada yayınlanacaktır ve gizlilik politikasını düzenli olarak gözden geçirmenizi öneririz.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Bizimle Nasıl İletişime Geçebilirsiniz</h2>
            <p className="text-lg mb-6">Bu gizlilik politikası hakkında herhangi bir sorunuz veya endişeniz varsa lütfen şu e-posta adresinden bizimle iletişime geçin: <a href="mailto:info@nextgraft.com" className="text-[#FF9500] hover:text-[#FF9500]/80">info@nextgraft.com</a>.</p>
          </div>
        </section>

        {/* Orange Footer Section */}
        <section className="relative w-full bg-[#FF9500] text-white py-12">
          <div className="absolute left-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
          <div className="absolute right-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-lg">Next Graft&apos;a duyduğunuz güvenden dolayı teşekkür ederiz. Gizliliğinizi ve veri güvenliğinizi korumak için çok çalışıyoruz.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicyComponent;