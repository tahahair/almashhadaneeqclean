import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // Import required modules
import "swiper/css"; // Import Swiper styles
import "swiper/css/pagination"; // Optional pagination styles
import "./globals.css"; // Import custom styles if needed
import Image from 'next/image';
const SvgImageSwapper = () => {
  
  return (
    <div>
      <Swiper 
        modules={[Autoplay, Pagination]} // Register modules
        spaceBetween={20} // Space between slides
        slidesPerView={2.25} // Default slides per view
        pagination={{ bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
          renderBullet: (index, className) => {
            return `<span class="${className}" style="background-color: #FF9500"></span>`;
          },
          clickable: true }} // Enable clickable dots
        autoplay={{
          delay: 1000, // 2 seconds delay for autoplay
          disableOnInteraction: false, // Continue autoplay after interaction
        }}
        loop={true} 
        breakpoints={{
          640: {
            slidesPerView: 1, // 1 slide for smaller screens
          },
          768: {
            slidesPerView: 2, // 2 slides for medium screens
          },
          1024: {
            slidesPerView: 3, // 3 slides for larger screens
          },
        }}
        effect="slide" // Slide transition effect
      >


<SwiperSlide className="slide-container">
          <Image src="/logo/Gemini.png" alt="Image 1" className="swiper-image"  layout="responsive"  width={100} 
  height={100}  />
        </SwiperSlide>

<SwiperSlide className="slide-container">
          <Image src="/logo/chatgpt.png" alt="Image 1" className="swiper-image"  layout="responsive"  width={100} 
  height={100}  />
        </SwiperSlide>

        {/* Slide 1 */}
        <SwiperSlide className="slide-container">
          <Image src="/logo/azure.png" alt="Image 1" className="swiper-image"  layout="responsive"  width={100} 
  height={100}  />
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="slide-container">
          <Image src="/logo/Jasper.png" alt="Image 2" className="swiper-image"  layout="responsive"  width={100} 
  height={100}  />
        </SwiperSlide>

     
      </Swiper>
    </div>
  );
};

export default SvgImageSwapper;