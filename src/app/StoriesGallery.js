import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const images = [
  { url: ' /images/1.jpg', alt: 'Story 1' },
  { url: ' /images/2.jpg', alt: 'Story 2' },
  { url: ' /images/3.jpg', alt: 'Story 3' },
  { url: ' /images/4.jpg', alt: 'Story 4' },
  { url: ' /images/5.jpg', alt: 'Story 5' },
  { url: ' /images/6.jpg', alt: 'Story 6' },
  { url: ' /images/7.jpg', alt: 'Story 7' },
  { url: ' /images/8.jpg', alt: 'Story 8' },
  { url: ' /images/9.jpg', alt: 'Story 9' },
  { url: ' /images/10.jpg', alt: 'Story 10' },
  { url: ' /images/11.jpg', alt: 'Story 11' },
  { url: ' /images/12.jpg', alt: 'Story 12' },
  { url: ' /images/13.jpg', alt: 'Story 13' },
  { url: ' /images/14.jpg', alt: 'Story 14' },
  { url: ' /images/15.jpg', alt: 'Story 15' },
  { url: ' /images/16.jpg', alt: 'Story 16' },
  { url: ' /images/17.jpg', alt: 'Story 17' },
  { url: ' /images/18.jpg', alt: 'Story 18' },
  { url: ' /images/19.jpg', alt: 'Story 19' },
  { url: ' /images/20.jpg', alt: 'Story 20' },
  { url: ' /images/21.jpg', alt: 'Story 21' },
  { url: ' /images/22.jpg', alt: 'Story 22' }
];

const StoriesGallery = () => {
  const [currentStory, setCurrentStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const modalRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const openStory = (index) => {
    setCurrentStory(images[index]);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeStory = () => {
    setCurrentStory(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const navigateStory = (direction) => {
    const newIndex = direction === 'next' 
      ? Math.min(currentIndex + 1, images.length - 1)
      : Math.max(currentIndex - 1, 0);
    setCurrentStory(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (!currentStory) return;
      
      switch(e.key) {
        case 'ArrowRight':
          if (currentIndex < images.length - 1) navigateStory('next');
          break;
        case 'ArrowLeft':
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
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentStory, currentIndex]);

  return (
    <div className="relative max-w-7xl  ">
      {/* Stories Thumbnails */}
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-[#4B0082]" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-[#4B0082]" />
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar py-4 px-12"
          style={{ scrollBehavior: 'smooth' }}
        >
          {images.map((image, index) => (
            <div 
              key={index}
              onClick={() => openStory(index)}
              className="flex-shrink-0 cursor-pointer transform transition-transform hover:scale-105"
            >
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-r from-[#0088CC] to-[#4B0082]">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {currentStory && (
        <div 
          ref={modalRef}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === modalRef.current) closeStory();
          }}
        >
          <button 
            onClick={closeStory}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>

          {currentIndex > 0 && (
            <button 
              onClick={() => navigateStory('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-50"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>
          )}
          
          {currentIndex < images.length - 1 && (
            <button 
              onClick={() => navigateStory('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-50"
            >
              <ChevronRight className="w-12 h-12" />
            </button>
          )}

          <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 z-50">
            {images.map((_, index) => (
              <div 
                key={index} 
                className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden"
              >
                <div 
                  className={`h-full bg-white transition-transform duration-300 ${
                    index === currentIndex ? 'w-full' : 
                    index < currentIndex ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="w-full h-full flex items-center justify-center">
            <img 
              src={currentStory.url} 
              alt={currentStory.alt} 
              className="w-full h-full object-contain"
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