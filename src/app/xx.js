import React from 'react';

const RefinedInnerGlow = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="pt-8 pb-4">
          {/* Question Section */}
          <div className="text-center space-y-3 mb-8">
            <h1 className="text-2xl font-bold text-gray-800 leading-tight px-4 mb-2">
              كم عميل تخسر عيادتك
            </h1>
            <p className="text-2xl font-bold text-blue-600 px-4">
              بسبب  أن خايف من النتيجة ؟
            </p>
          </div>

          {/* Button with Inner Glow Only */}
                    <div className="relative">
                        <div className="w-48 sm:w-56 mx-auto">
                        {/* Main Button */}
                        <button className="relative w-full h-12 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 rounded-lg overflow-hidden group">
                            {/* Inner Shimmer */}
                            <div 
                            className="absolute inset-0 opacity-75"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                animation: 'shimmer 2s infinite'
                            }}
                            ></div>
                            
                            <span className="relative text-white font-bold text-lg">
                            !هذا هو الحل
                            </span>

                            {/* Connection Point */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-gradient-to-b from-amber-500 to-transparent opacity-50"></div>
                        </button>
                        </div>

                        {/* Integrated Arrow Section - Without Orange Background */}
                        <div className="relative h-32 mt-0">
                        {/* Central Connection Line */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full">
                            <div 
                            className="absolute top-0 w-full h-full bg-gradient-to-b from-amber-500 to-transparent opacity-50"
                            style={{animation: 'flowLine 2s infinite'}}
                            ></div>
                        </div>

                        {/* Animated Arrows */}
                        {[...Array(4)].map((_, i) => (
                            <div 
                            key={i}
                            className="absolute left-1/2 -translate-x-1/2"
                            style={{
                                animation: `integratedArrowFlow 2s infinite ${i * 0.4}s ease-out`,
                                top: '0'
                            }}
                            >
                            <svg width="40" height="60" viewBox="0 0 40 60">
                                <defs>
                                <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#9CA3AF" />
                                    <stop offset="100%" stopColor="#6B7280" />
                                </linearGradient>
                                </defs>
                                <path
                                d="M20 0 L20 40 L10 30 M20 40 L30 30"
                                fill="none"
                                stroke="url(#arrowGradient)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                />
                            </svg>
                            </div>
                        ))}

                        {/* Impact Effect */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                            {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute origin-bottom"
                                style={{
                                width: '2px',
                                height: '20px',
                                background: 'linear-gradient(to bottom, #9CA3AF, transparent)',
                                transform: `rotate(${i * 30}deg)`,
                                animation: 'rayBurst 2s infinite',
                                animationDelay: `${i * 0.1}s`
                                }}
                            />
                            ))}
                        </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes flowLine {
          0% {
            transform: scaleY(0);
            opacity: 0;
          }
          50% {
            transform: scaleY(1);
            opacity: 0.5;
          }
          100% {
            transform: scaleY(1);
            opacity: 0;
          }
        }

        @keyframes integratedArrowFlow {
          0% {
            transform: translate(-50%, 0) scale(0.8);
            opacity: 0;
          }
          20% {
            transform: translate(-50%, 40px) scale(1);
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, 120px) scale(1);
            opacity: 0;
          }
        }

        @keyframes rayBurst {
          0% { transform: rotate(var(--rotation)) scale(0); opacity: 0; }
          50% { transform: rotate(var(--rotation)) scale(1.2); opacity: 0.8; }
          100% { transform: rotate(var(--rotation)) scale(0.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default RefinedInnerGlow;