import React from 'react';
import { Clock, Users, DollarSign, TrendingDown } from 'lucide-react';

const ChallengesPage = () => {
  const challenges = [
    {
      icon: Users,
      title: "Potansiyel Hasta Kaybı",
      description: "Çoğu hasta kliniğinizden randevu almadan ayrılıyor",
      color: "bg-orange-100",
      iconColor: "text-orange-500"
    },
    {
      icon: Clock,
      title: "Boşa Geçen Doktor Saatleri",
      description: "Doktorlarınızın değerli konsültasyon saatleri kararsız hastalarla harcanıyor",
      color: "bg-blue-100",
      iconColor: "text-blue-500"
    },
    {
      icon: TrendingDown,
      title: "Aylık %70 Kayıp",
      description: "Her ay ilgilenen hastaların %70'ini kaybediyorsunuz",
      color: "bg-red-100",
      iconColor: "text-red-500"
    },
    {
      icon: DollarSign,
      title: "Pazarlama Bütçesi İsrafı",
      description: "Pazarlama bütçeniz sonuçsuz konsültasyonlara harcanıyor",
      color: "bg-green-100",
      iconColor: "text-green-500"
    }
  ];

  return (
    <div className="  bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 px-4">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-8 sm:mb-12 text-center relative px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-200/20 via-orange-300/20 to-orange-200/20 blur-3xl -z-10 rounded-full"></div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400 mb-3 sm:mb-4 animate-pulse">
          ⚡️ Kliniğinizin Bugün Karşılaştığı Zorluklar ⚡️
        </h1>
        <div className="w-24 sm:w-40 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mb-4 sm:mb-6 rounded-full"></div>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
          Hızla gelişen bir dünyada, klinikler hasta sadakatini korumada artan zorluklarla karşılaşıyor
        </p>
      </div>

      {/* Challenges Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-4 mb-8 sm:mb-12">
        {challenges.map((challenge, index) => (
          <div
            key={index}
            className={`${challenge.color} rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 
              transform hover:scale-105 hover:shadow-xl cursor-pointer
              border border-white/50 backdrop-blur-sm`}
          >
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className={`${challenge.iconColor} p-2 sm:p-3 rounded-lg bg-white/80`}>
                <challenge.icon size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
                  {challenge.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {challenge.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto mt-8 sm:mt-12 text-center px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-orange-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
            Değişim Zamanı! 🚀
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto">
            Kliniğinizin daha fazla potansiyel hasta kaybetmesine izin vermeyin. Zorlukları başarı fırsatlarına dönüştürmenize yardımcı olmak için buradayız.
          </p>
          <button className="relative bg-orange-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium
    hover:bg-orange-600 transition-colors duration-300 shadow-lg
    text-sm sm:text-base overflow-hidden group">
  <span className="absolute inset-0 bg-orange-400 blur-lg opacity-0 rounded-lg transition-opacity duration-500 group-hover:opacity-100 animate-pulse"></span>
  <span className="relative z-10">   Şimdi İletişime Geçin</span>
</button>
          
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;