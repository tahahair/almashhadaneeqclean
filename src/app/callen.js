import React from 'react';

const ContactUsComponent = () => {
 return (
   <div className="min-h-screen w-[100%] mx-auto">
     <div>
       <title>Contact Us - Next Graft</title>
       <meta name="description" content="Get in touch with Next Graft for support and inquiries via WhatsApp and email." />
     </div>

     <main className="text-gray-800 font-sans leading-relaxed">
       {/* Orange Header Section */}
       <section className="relative w-full bg-[#FF9500] text-white py-12">
         <div className="absolute   top-0 bottom-0  bg-[#FF9500]" />
         <div className="absolute   top-0 bottom-0  bg-[#FF9500]" />
         <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
           <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
           <p className="text-lg">
             At Next Graft, we welcome your communication anytime. We are available 24/7 to provide support and answer your inquiries through WhatsApp and email.
           </p>
         </div>
       </section>

       {/* Main Content Section */}
       <section className="relative w-full bg-gray-100 py-12">
         <div className="absolute   top-0 bottom-0  bg-gray-100" />
         <div className="absolute   top-0 bottom-0  bg-gray-100" />
         <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
           <h2 className="text-2xl font-semibold text-gray-900 mb-4">Email</h2>
           <p className="text-lg mb-6">
             You can contact us via email at: 
             <a href="mailto:info@nextgraft.com" className="text-[#FF9500] hover:text-[#FF9500]/80"> info@nextgraft.com</a>
           </p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">Working Hours</h2>
           <p className="text-lg mb-6">We are available to serve you 24 hours daily, throughout the week.</p>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">Follow Us on Social Media</h2>
           <p className="text-lg mb-6">
             Stay connected with us by following our social media for the latest news and updates:
           </p>
           <ul className="list-disc pl-6 mb-6">
             <li>
               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#FF9500] hover:text-[#FF9500]/80">
                 Instagram
               </a>
             </li>
             <li>
               <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-[#FF9500] hover:text-[#FF9500]/80">
                 TikTok
               </a>
             </li>
           </ul>

           <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us via WhatsApp</h2>
           <a 
             href="https://wa.me/yourwhatsapplink" 
             className="inline-block px-6 py-3 bg-[#FF9500] text-white rounded-lg shadow-md hover:bg-[#FF9500]/90 transition"
           >
             Contact us via WhatsApp
           </a>
         </div>
       </section>

       {/* Orange Footer Section */}
       <section className="relative w-full bg-[#FF9500] text-white py-12">
         <div className="absolute top-0 bottom-0  bg-[#FF9500]" />
         <div className="absolute  top-0 bottom-0  bg-[#FF9500]" />
         <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
           <p className="text-lg">
             At Next Graft, we are committed to providing the highest levels of support and care to our clients. We are here to help and look forward to hearing from you.
           </p>
         </div>
       </section>
     </main>
   </div>
 );
};

export default ContactUsComponent;