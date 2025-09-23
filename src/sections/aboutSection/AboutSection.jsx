// "use client";
// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Heading from "@/components/globalcomponents/Heading";
// import Button from "@/components/globalcomponents/Button";
// import Image from "next/image"; // Ensure you have the correct import for Next.js Image component

// const AboutSection = () => {
//   useEffect(() => {
//     AOS.init({
//       duration: 2000, // Animation duration in milliseconds
//       once: false, // Whether animation should happen only once
//     });
//   }, []);
//   return (
//     <div>
//       <section className=" md:py-16 lg:h-screen overflow-hidden grid place-items-center py-11 bg-about">
//         <div className="container  lg:w-[80%] h-auto md:w-full lg:h-full mx-auto flex  overflow-hidden flex-col-reverse md:flex-row-reverse items-center justify-between gap-4">
//           {/* Text Content */}
//           <div className="md:w-1/2 text-center md:text-left">
//             <div data-aos="fade-up" className="">
//               <Heading text={"About Curelogics"} />
//             </div>
//             <h1
//               data-aos="fade-up"
//               className=" lg:text-[40px] font-bold leading-tight text-black"
//             >
//               Empowering Healthcare & Businesses Through IT
//               <div className="py-1">
//                 <span className="text-blue-900 block">Solutions</span>
//               </div>
//             </h1>
//             <p
//               data-aos="fade-up"
//               className="mt-4 text-gray-600 text-sm md:text-base "
//             >
//               At Curelogics, we’re your one-stop destination for all your
//               digital needs. From software development and design to SEO,
//               marketing, and beyond, we provide comprehensive solutions to
//               propel your business forward. With our expertise and dedication,
//               we help you achieve your goals and stand out in today’s
//               competitive market
//             </p>
//             <div data-aos="fade-up" className="mt-6">
//               <Button text={"Learn More"} />
//             </div>
//           </div>

//           {/* Image Content */}
//           <div className="md:w-1/2 flex justify-center mb-10 relative rounded">
//             <div
//               style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
//               className="lg:w-[450px]  lg:h-[450px] w-[300px] h-[300px]  bg-red-500 rotating-div flex justify-center items-center bg-gradient-to-r from-[#E21E2D] to-[#2D4E93]"
//             ></div>
//             <Image
//               className="absolute object-cover"
//               src="/images/about.png"
//               width={450}
//               height={450}
//               alt=""
//             />
//             <div className="md:bottom-0 left-[50%] md:top-[80%] top-1/2 right-1/2 translate-x-[-25%] translate-y-[-50%] md:translate-x-0 md:translate-y-0  md:right-5 absolute z-50 flex justify-center items-center">
//               <Image
//                 className="w-[60px] md:w-auto md:h-auto sm:h-[60px]"
//                 src="/images/1k.png"
//                 width={100}
//                 height={100}
//                 alt=""
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutSection;


"use client"
import React, { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import Image from "next/image"
import Heading from "@/components/globalcomponents/Heading"
import Button from "@/components/globalcomponents/Button"

const AboutSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: "ease-out-cubic", 
      once: false, 
      offset: 100, 
    })
  }, [])

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 md:w-[95%] lg:w-[85%] 2xl:w-[80%]">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image Content */}
          <div className="lg:w-2/5 relative" data-aos="fade-right" data-aos-delay="100">
            <div className="relative">
              {/* Decorative circles */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-red-100 animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-100 rounded-full"></div>

              {/* Main image container */}
              <div className="relative z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-blue-900 rounded-2xl transform rotate-3 shadow-xl opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]">
                  <Image
                    src="/images/aboutimage.webp"
                    alt="Curelogics Team"
                    width={1200}
                    height={500}
                    className="w-full h-[400px] md:h-[500px] object-cover"
                    style={{
                      filter: "contrast(110%) brightness(105%)",
                    }}
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Badge */}
              <div
                className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-2xl border-2 border-red-100 z-20 backdrop-blur-sm"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <Image
                  src="/images/1k.png"
                  alt="Achievement Badge"
                  width={60}
                  height={60}
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-3/5" data-aos="fade-left" data-aos-delay="100">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div data-aos="fade-up" data-aos-delay="200">
                <Heading text="About Curelogics" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mt-4 mb-6 leading-tight">
                Empowering Healthcare & Businesses
                <span className="block bg-gradient-to-r from-red-600 to-blue-900 bg-clip-text text-transparent">
                  Through IT Solutions
                </span>
              </h2>
              <p
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-gray-700 text-base md:text-lg leading-relaxed mb-8"
              >
                At Curelogics, we’re your one-stop destination for all your digital
                needs. From software development and design to SEO, marketing, and
                beyond, we provide comprehensive solutions to propel your business
                forward. With our expertise and dedication, we help you achieve your
                goals and stand out in today’s competitive market.
              </p>
              <div data-aos="fade-up" data-aos-delay="400" className="flex justify-center lg:justify-start">
                <Button text="Learn More" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection;