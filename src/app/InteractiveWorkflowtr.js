import React, { useState } from 'react';
import { Camera, Brain, Clock, Calendar, Sparkles, Target, Award, ArrowRight } from 'lucide-react';

const InteractiveWorkflow = () => {
  const [activeCard, setActiveCard] = useState(0);

  const steps = [
    {
      Icon: Camera,
      title: "Fotoğrafınızı Çekin",
      description: "Tek bir fotoğraf dönüşümün kapısını açar",
      bgColor: "from-orange-100 to-amber-50",
      iconColor: "text-orange-500",
      delay: "delay-0"
    },
    {
      Icon: Brain,
      title: "Akıllı Analiz",
      description: "Yapay zeka özelliklerinizi hassas şekilde analiz eder",
      bgColor: "from-orange-200 to-amber-100",
      iconColor: "text-orange-600",
      delay: "delay-100"
    },
    {
      Icon: Sparkles,
      title: "Sonuçları Görün",
      description: "Yeni görünümünüzü 60 saniye içinde görün",
      bgColor: "from-orange-300 to-amber-200",
      iconColor: "text-orange-700",
      delay: "delay-200"
    },
    {
      Icon: Calendar,
      title: "Randevu Alın",
      description: "Güvenle karar verin ve hemen randevunuzu alın",
      bgColor: "from-orange-400 to-amber-300",
      iconColor: "text-orange-800",
      delay: "delay-300"
    }
  ];

  const stats = [
    {
      value: "80%",
      label: "Hasta Dönüşüm Oranı",
      Icon: Target
    },
    {
      value: "70%",
      label: "Zamandan Tasarruf",
      Icon: Clock
    },
    {
      value: "2x",
      label: "İşlem Artışı",
      Icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-16 px-4">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-br from-orange-300/20 to-amber-300/20 blur-3xl rounded-full"></div>
        <div className="relative text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-orange-600 to-amber-600 text-transparent bg-clip-text leading-tight">
            60 Saniye
            <br />
            Hastalarınızın Geleceğini Değiştirin
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Kararsız adayları sadece bir dakikada kararlı hastalara dönüştürmeyi keşfedin
          </p>
        </div>
      </div>

      {/* Interactive Steps */}
      <div className="max-w-6xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`group relative ${step.delay} transform transition-all duration-500 
                ${activeCard === index ? 'scale-105 z-10' : 'hover:scale-102'}`}
              onMouseEnter={() => setActiveCard(index)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} blur-xl opacity-50 
                transition-opacity duration-300 group-hover:opacity-100 rounded-2xl`}></div>
              <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-8 h-full border border-orange-100
                transition-all duration-300 group-hover:bg-white/90 group-hover:shadow-2xl">
                <div className="mb-6 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl 
                    flex items-center justify-center transform transition-transform duration-300 
                    group-hover:rotate-6">
                    <step.Icon className={`w-8 h-8 ${step.iconColor}`} />
                  </div>
                  <div className="absolute top-2 right-2 text-orange-300 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-5xl mx-auto mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
          Teknolojimizi Kullanan Kliniklerden Gerçek Sonuçlar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="transform transition-all duration-300 hover:scale-105">
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-orange-100">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-400 rounded-xl 
                    flex items-center justify-center shadow-lg">
                    <stat.Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-center pt-8">
                  <div className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 
                    text-transparent bg-clip-text mb-3">
                    {stat.value}
                  </div>
                  <p className="text-gray-600 text-lg">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 
            blur-2xl rounded-3xl transform rotate-3"></div>
          <div className="relative bg-white rounded-2xl p-12 shadow-2xl border border-orange-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Kliniğinizde Yapay Zeka Gücünü Denemeye Hazır mısınız?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Bugün başlayın ve teknolojimizin kararsız adayları nasıl kararlı hastalara dönüştürdüğünü görün
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-10 py-4 
              rounded-xl font-bold text-xl hover:from-orange-600 hover:to-amber-600 
              transition-all duration-300 shadow-lg hover:shadow-orange-300/50 transform 
              hover:scale-105 hover:-rotate-2">
              Ücretsiz Denemeyi Başlat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveWorkflow;