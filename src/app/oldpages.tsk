"use client";
import Image from "next/image";
import ImageSlider from './ImageSlider';
import React, { useRef, useState } from "react";
import DropdownMenu from "./DropdownMenu"; // Import the DropdownMenu component
import ButtonWithText from "./ButtonWithText";

export default function Home() {
  const frameRef = useRef<HTMLImageElement>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isMirrored, setIsMirrored] = useState(false);

  const images = [
    {
      firstImage: '/im2.jpg', // Example image before
      secondImage: '/b2.jpg', // Example image after
    },
    {
      firstImage: '/im1.jpg',
      secondImage: '/b1.jpg',
    },
    // Add more image pairs here
  ];

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
    setIsMirrored((prev) => !prev); // Toggle mirroring
  };

  const handleSelectOption = (option: string) => {
    console.log("Selected option:", option);
    setDropdownVisible(false); // Close the dropdown after selection
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="w-full fixed top-0 left-0 z-50">
        <div className="relative w-full max-w-full">
          <Image
            src="/Frame5.svg"
            alt="Header"
            width={10000000}
            height={2000000}
            objectFit="contain"
            className="max-w-full h-auto"
          />

          <div className="text-banner">
            وفر 3500$ شاهد نتائج شعرك بالذكاء الاصطناعى فى 60 ثانيه
          </div>

          <div className="relative">
            <Image
              id="Frame2"
              src="/Frame2.svg"
              alt="Header"
              width={1000000}
              height={20000}
              className="max-w-full h-auto z-0"
              ref={frameRef}
            />
            <Image
              src="/arow.svg"
              alt="Arrow"
              width={0}
              height={0}
              style={{
                width: "8vw",
                height: "auto",
                transform: isMirrored ? "scaleY(-1)" : "scaleY(1)", // Apply mirroring
                transition: "transform 0.3s ease", // Smooth animation
              }}
              className="absolute left-[75%] top-[20%] translate-y-[-55%] z-10 cursor-pointer"
              onClick={toggleDropdown}
            />
            <Image
              src="/lOGO Png.png"
              alt="Logo"
              width={100000}
              height={0}
              quality={100} // Optional: Ensures the best image quality
              priority // Ensures the image loads quickly
              className="absolute left-[5%] top-[50%] translate-y-[-55%] z-10 cursor-pointer w-[15%]"
            />
            <Image
              src="/options.svg"
              alt="Options"
              width={100}
              height={10}
              style={{
                width: "8vw",
                height: "auto",
              }}
              className="absolute left-[87%] top-[50%] translate-y-[-55%] z-10"
            />
            <div
              className={`absolute left-[52.99%] top-[62%] bg-[#F2F2F2] shadow-md rounded-md z-20 p-2 w-[31.2%] transition-all duration-1000 ease-out transform ${
                isDropdownVisible
                  ? "translate-y-0 opacity-100" // Fully visible and in place
                  : "translate-y-[-5px] opacity-0" // Start above with transparency
              }`}
            >
              <DropdownMenu
                isVisible={isDropdownVisible}
                options={[" العربية", " الإنكليزية", " التركية"]} // Dropdown options
                logos={[
                  "/arabic.png", // Arabic logo
                  "/english.png", // English logo
                  "/turkish.png", // Turkish logo
                ]}
                onSelect={handleSelectOption} // Handle option selection
              />
            </div>

            <div className="text-lang">اللغة</div>
          </div>
        </div>
      </header>

      <main className="mt-10 flex-grow  flex-col justify-center items-center">
      <div className="flex justify-center items-center relative mt-[70%]  ">
            {/* Ensure ImageSlider is wrapped with relative positioning */}
            <ImageSlider images={images} />
          </div>
          
          <div className={" flex justify-center items-center  ml-[3%]  mt-[45%]  text-comment"}>
      فكرت تزرع شعر بس خايف من النتيجة؟ مع تطبيقنا الذكي، راح تشوف شكلك الجديد قبل ما تدفع ولا ريال! بس ارفع صورتك، وفي دقيقة واحدة، راح تعرف مستقبلك. وكمان، فرصتك توفر 3500$ من تكلفة العملية!
    </div>

    <div className="relative  ml-[10%] mt-[5%] mr-[5%] ">
          <Image
            src="/stars.svg"
            alt="Header"
            width={10000000}
            height={2000000}
            objectFit="contain"
            className="max-w-full h-auto mt-[2%]  mb-[2%]"
          />

          <div className="text-star ">
          اكثر من 10000 تقييم للتجربه
          </div>
        </div>
   
          
        <div className="flex justify-center items-center mt-[5%]  ">
          <ButtonWithText
            buttonText="قم بالتجربة مجانا"
            additionalText="صورك محمية 100% ومشفرة"
          />
        </div>

        
        

       
       
      </main>
    </div>
  );
}


