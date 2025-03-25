import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const images = [
  { url: ' /images/1.jpg', alt: 'Story 1', title: 'تستاهلون' },
  { url: ' /images/2.jpg', alt: 'Story 2', title: 'طيبين' },
  { url: ' /images/3.jpg', alt: 'Story 3', title: 'ريفيو' },
  { url: ' /images/4.jpg', alt: 'Story 4', title: 'محترمين' },
  { url: ' /images/5.jpg', alt: 'Story 5', title: 'اعتمد عليكم' },
  { url: ' /images/6.jpg', alt: 'Story 6', title: 'تعامل راقي' },
  { url: ' /images/7.jpg', alt: 'Story 7', title: 'خدمة ممتازة' },
  { url: ' /images/8.jpg', alt: 'Story 8', title: 'نظيف جدا' },
  { url: ' /images/9.jpg', alt: 'Story 9', title: 'شاطرين' },
  { url: ' /images/10.jpg', alt: 'Story 10', title: 'تجربة شخصية' },
  { url: ' /images/11.jpg', alt: 'Story 11', title: 'استفسارات' },
  { url: ' /images/12.jpg', alt: 'Story 12', title: 'شغل مرتب' },
  { url: ' /images/13.jpg', alt: 'Story 13', title: 'بياض وجه' },
  { url: ' /images/14.jpg', alt: 'Story 14', title: 'ولا اروع' },
  { url: ' /images/15.jpg', alt: 'Story 15', title: 'شغلهم ممتاز' },
  { url: ' /images/16.jpg', alt: 'Story 16', title: 'ما راح اغير من عندك' },
  { url: ' /images/17.jpg', alt: 'Story 17', title: 'نظيف وسريع' },
  { url: ' /images/18.jpg', alt: 'Story 18', title: 'اهتمام ومتابعة' },
  { url: ' /images/19.jpg', alt: 'Story 19', title: 'امينات ومخلصات' },
  { url: ' /images/20.jpg', alt: 'Story 20', title: 'المنقذين' },
  { url: ' /images/21.jpg', alt: 'Story 21', title: 'ادق التفاصيل' },
  { url: ' /images/22.jpg', alt: 'Story 22', title: 'شغل نظيف' }
];

const StoriesGallery = () => {
  const [currentStory, setCurrentStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeHintIndex, setActiveHintIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollRef = useRef(null);
  const modalRef = useRef(null);
  const scrollTimeout = useRef(null);
  const hintInterval = useRef(null);

  // إعداد الحركة التلقائية للنص
  useEffect(() => {
    hintInterval.current = setInterval(() => {
      if (!isScrolling && !currentStory) {
        setActiveHintIndex((prev) => (prev + 1) % images.length);

        // تمرير تلقائي للعرض إذا كان العنصر خارج نطاق الرؤية
        const container = scrollRef.current;
        const elements = container?.getElementsByClassName('story-item');
        if (container && elements) {
          const nextElement = elements[activeHintIndex + 1];
          if (nextElement) {
            const containerRect = container.getBoundingClientRect();
            const elementRect = nextElement.getBoundingClientRect();

            if (elementRect.right >= containerRect.right || elementRect.left <= containerRect.left) {
              const scrollAmount = nextElement.offsetLeft - container.offsetLeft - containerRect.width / 2 + nextElement.offsetWidth / 2 - 100;
              container.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
              });
            }
          }
        }
      }
    }, 2000); // تغيير كل 2 ثانية

    return () => {
      if (hintInterval.current) {
        clearInterval(hintInterval.current);
      }
    };
  }, [isScrolling, currentStory, activeHintIndex]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const openStory = (index) => {
    if (!isScrolling) {

      setCurrentStory(images[index]);
      setCurrentIndex(index);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeStory = () => {
    setCurrentStory(null);
    document.body.style.overflow = 'auto';
  };

  const navigateStory = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = Math.min(currentIndex + 1, images.length - 1);
    } else {
      newIndex = Math.max(currentIndex - 1, 0);
    }

    setCurrentStory(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleImageClick = () => {

    if (currentIndex < images.length - 1) {
      console.log('next');
      navigateStory('next');
    } else {
      closeStory();
    }
  };

  const handleScroll = () => {
    setIsScrolling(true);

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!currentStory) return;

      switch (e.key) {
        case 'ArrowRight':
          if (currentIndex < images.length - 1) navigateStory('next');
          break;
        case 'ArrowLeft':
          console.log('ArrowLeft');
          if (currentIndex > 0) navigateStory('prev');
          break;
        case 'Escape':
          closeStory();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [currentStory, currentIndex]);

  return (
    <div className="relative max-w-7xl">
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-[60%] -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-[#4B0082]" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-[60%] -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-[#4B0082]" />
        </button>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto hide-scrollbar pt-16 px-12"
          style={{ scrollBehavior: 'smooth' }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="story-item flex-shrink-0 cursor-pointer transform transition-transform hover:scale-105 flex flex-col items-center relative"
              onClick={() => openStory(index)}
            >
              {activeHintIndex === index && !currentStory && !isScrolling && (
                <div className="absolute -top-12  inset-x-0 flex justify-center transition-all duration-500">
                  <div className="relative transform group-hover:-translate-y-1">
                    <div className="relative bg-white border border-orange-100 rounded-lg shadow overflow-hidden">
                      <div className="absolute inset-0 bg-orange-50 opacity-50 group-hover:opacity-70 transition-opacity"></div>
                      <div className="relative flex items-center gap-2 px-3 py-2">
                        <div className="relative">
                          <div className="absolute w-1 h-1 bg-orange-500 rounded-full animate-ping opacity-75"></div>
                          <div className="relative w-1 h-1 bg-orange-600 rounded-full"></div>
                        </div>
                        <span className="text-xs font-medium text-orange-700 whitespace-nowrap">
                          انقر للمشاهدة
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-r from-[#0088CC] to-[#4B0082] shadow-golden-glow">

                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-1">{image.title}</p>

            </div>

          ))}
        </div>
      </div>

      {currentStory && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        >
          <button
            onClick={closeStory}
            className="absolute top-4 right-4 hover:text-gray-300 transition-colors z-50 p-1 rounded-full bg-black/20"
          >
            <X className="w-8 h-8 text-white stroke-2" />
          </button>

          {currentIndex > 0 && (
            <button
              onClick={() => navigateStory('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 hover:text-gray-300 transition-colors z-50 p-2 rounded-full bg-black/20"
            >
              <ChevronLeft className="w-12 h-12 text-white stroke-2" />
            </button>
          )}

          {currentIndex < images.length - 1 && (
            <button
              onClick={() => navigateStory('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-gray-300 transition-colors z-50 p-2 rounded-full bg-black/20"
            >
              <ChevronRight className="w-12 h-12 text-white stroke-2" />
            </button>
          )}

          <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 z-50">
            {images.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden"
              >
                <div
                  className={`h-full bg-white transition-transform duration-300 ${index === currentIndex ? 'w-full' :
                      index < currentIndex ? 'w-full' : 'w-0'}`}
                />
              </div>
            ))}
          </div>

          <div className="w-full h-full flex items-center justify-center" onClick={handleImageClick}>
            <img
              src={currentStory.url}
              alt={currentStory.alt}
              className="w-full h-full object-contain cursor-pointer"
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default StoriesGallery;