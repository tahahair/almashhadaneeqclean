import React from 'react';

const AboutComponent = () => {
 return (
   <div className="min-h-screen w-[100%] mx-auto">
     <div>
       <title>About Us - Next Graft</title>
       <meta name="description" content="Learn about Next Graft's innovative and personalized approach to hair transplantation." />
     </div>

     <main className="text-gray-800 font-sans leading-relaxed">
       {/* Orange Header Section */}
       <section className="relative w-full bg-[#FF9500] text-white py-12">
         <div className="absolute left-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
         <div className="absolute right-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
         <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
           <h1 className="text-4xl font-bold mb-4">About Us - Next Graft</h1>
           <p className="text-lg">Welcome to Next Graft, where innovation meets expertise to redefine your natural beauty.</p>
         </div>
       </section>

       {/* Main Content Section */}
       <section className="relative w-full bg-gray-100 py-12">
         <div className="absolute left-[-100vw] top-0 bottom-0  bg-gray-100" />
         <div className="absolute right-[-100vw] top-0 bottom-0  bg-gray-100" />
         <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
           <h2 className="text-2xl font-semibold text-gray-900 mb-4">Exclusive Partnerships</h2>
           <p className="text-lg mb-6">We have built a network of strategic partnerships with the best hair transplant clinics in Turkey and the UAE, giving you direct access to leading hair transplant experts and the latest industry technologies. These partnerships ensure you receive the highest quality medical services while maintaining privacy and individual attention.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">Compare and Choose the Best at Competitive Prices</h2>
           <p className="text-lg mb-6">At Next Graft, we understand the importance of choice and value. We provide a platform that allows you to compare various services to choose what suits you at the best prices. Through us, you will find detailed information about each clinic, making it easier to choose based on the criteria that matter to you.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">We Negotiate Directly with Clinics for You</h2>
           <p className="text-lg mb-6">We take on the responsibility of negotiating with clinics to ensure you get the best prices. Our specialized negotiation team works hard to ensure you receive exclusive offers available only through Next Graft. We always work in your interest to ensure a hassle-free experience at optimal cost.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Next Graft?</h2>
           <p className="text-lg">At Next Graft, we believe that trust and complete satisfaction are the foundation of our relationship with you. We offer professionalism, transparency, and complete support in your journey to restore your hair and confidence. Choose Next Graft, where quality and attention to detail meet to deliver an unforgettable experience.</p>
         </div>
       </section>

       {/* Orange Footer Section */}
       <section className="relative w-full bg-[#FF9500] text-white py-12">
         <div className="absolute left-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
         <div className="absolute right-[-100vw] top-0 bottom-0  bg-[#FF9500]" />
         <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
           <p className="text-lg">We look forward to taking care of you at Next Graft, where we make your hair transplant journey smoother and more successful.</p>
         </div>
       </section>
     </main>
   </div>
 );
};

export default AboutComponent;