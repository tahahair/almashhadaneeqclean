import React, { useState } from 'react';
import { BarChart, Clock,ArrowDown, Users, Lightbulb, TrendingUp } from 'lucide-react';
import ImageSlider from './ImageSlider';
const StatsVisualization = () => {
  const [activeSection, setActiveSection] = useState(0);
console.log(activeSection);
const images = [
  {
    firstImage: '/im2.jpg',
    secondImage: '/b2.jpg',
  }, {
    firstImage: '/im4.png',
    secondImage: '/b4.png',
  },
  {
    firstImage: '/im5.png',
    secondImage: '/b5.png',
  },
  {
    firstImage: '/im1.jpg',
    secondImage: '/b1.jpg',
  },
];
  const stats = [
    {
      source: "معهد ستانفورد للطب التجميلي",
      year: "2023",
      mainStat: "83%",
      description: "من العملاء يحتاجون رؤية نتائجهم المتوقعة",
      Icon: Users,
      color: "from-orange-400 to-orange-600"
    },
    {
      source: "مجلة هارفارد الطبية",
      mainStat: "78%",
      year: "دراسة",
      description: "زيادة في نسبة تحويل العملاء المترددين",
      Icon: TrendingUp,
      color: "from-amber-400 to-orange-500"
    }
  ];

  const features = [
    {
      Icon: Clock,
      title: "60 ثانية فقط",
      description: "لرؤية النتيجة المتوقعة"
    },
    {
      Icon: BarChart,
      title: "78% زيادة",
      description: "في نسبة تحويل العملاء"
    },
    {
      Icon: Lightbulb,
      title: "تقنية متطورة",
      description: "مدعومة بالذكاء الاصطناعي"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      {/* Header Animation */}
 {/* Header Animation */}
<div className="max-w-4xl mx-auto mb-4 text-center relative">
  <div className="absolute inset-0 bg-gradient-to-r from-orange-300/20 via-amber-300/20 to-orange-300/20 blur-3xl -z-10"></div>
  <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-amber-500 text-transparent bg-clip-text leading-relaxed py-2">
    تحول مستقبل جراحات التجميل 🚀
  </h1>
  <p className="text-xl text-gray-600 leading-loose">
    اكتشف كيف يمكن للتكنولوجيا أن تغير قرارات عملائك
  </p>
</div>
<div className="flex justify-center animate-bounce">
            <ArrowDown className="w-16 h-16 text-[#FF8A3D]" />
          </div>
<div className="relative bg-white mb-4 w-3/4 h-110 mx-auto rounded-2xl overflow-hidden shadow-lg">
            <ImageSlider images={images} />
             
          </div>

      {/* Interactive Stats Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative group"
            onMouseEnter={() => setActiveSection(index)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-amber-400/10 blur-xl transition-all duration-300 group-hover:scale-110"></div>
            <div className="relative bg-white backdrop-blur-xl rounded-2xl p-8 border border-orange-100 hover:border-orange-300 transition-all duration-300 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-500">{stat.source}</span>
                {stat.year && (
                  <span className="px-3 py-1 bg-orange-100 rounded-full text-orange-600 text-sm">
                    {stat.year}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                <div className="text-orange-500">
                  <stat.Icon size={24} />
                </div>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-transparent bg-clip-text">
                  {stat.mainStat}
                </h2>
              </div>
              <p className="text-lg text-gray-600">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Impact Section */}
      <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 backdrop-blur-xl border border-orange-200 shadow-lg">
        <div className="mb-8">
          <span className="px-4 py-2 bg-orange-100 rounded-full text-orange-600 text-sm mb-4 inline-block">
            تأثير مباشر على مبيعاتك
          </span>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            60 ثانية تغير قرار عميلك 💫
          </h2>
          <p className="text-gray-600 text-lg">
            تخيل عميلك يرى نتيجته المتوقعة خلال دقيقة واحدة
          </p>
        </div>

    {/* Call to Action */}
<button className="relative bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg
  hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-orange-300/50
  transform hover:scale-105 overflow-hidden group">
  {/* Glowing background */}
  <span className="absolute inset-0 bg-orange-500 blur-lg opacity-0 rounded-xl transition-opacity duration-500 group-hover:opacity-80 animate-pulse"></span>
  
  {/* Button text */}
  <span className="relative z-10">
    اكتشف المستقبل الآن
  </span>
</button>

      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-orange-100 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="text-orange-500 mb-4">
              <feature.Icon size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsVisualization;