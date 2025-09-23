"use client"; // Add this at the top for client-side rendering
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Button from "../../components/globalcomponents/Button";
import Image from "next/image"; // Ensure you have the correct import for Next.js Image component`
// Ensure you have the correct import for Next.js Image component

export default function HeroSection() {
  const features = [
    { icon: "🌐", title: "24/7 Support" },
    { icon: "🚀", title: "Scalable Growth" },
    { icon: "🤝", title: "Customer First" },
    { icon: "🔒", title: "Security Focused" },
    { icon: "⚡", title: "Fast Performance" },
    { icon: "🛠", title: "Custom Solutions" },
    { icon: "📊", title: "Data Insights" },
  ];

  const animation = { duration: 5000, easing: (t) => t };

  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    drag: false,
    slides: { perView: 2, spacing: 10 }, // Adjust perView as needed
    created(s) {
      s.moveToIdx(2, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 2, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 2, true, animation);
    },
  });

  return (
    <section className="py-16 mt-4 md:mt-12 overflow-hidden">
      <div className="w-[95%] lg:w-[75%] mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="md:w-1/2 w-full text-center md:text-left">
          <div className="mb-4 ">
            <span className="inline-block px-4 py-2 mt-2 md:mt-0 text-sm font-medium text-red-500 bg-red-100 rounded-md">
              Better Future
            </span>
          </div>
          <h1 className="lg:text-[45px] font-bold leading-tight text-black">
            Elevating Your Business with <br />
            Innovative Software <br />
            <div className="text-5xl py-2 px-2 mt-2 flex flex-col overflow-hidden h-12">
              <span className="animate-words flex flex-col">
                <span className="text-yellow-500 block">Experties</span>
                <span className="text-green-700 block">Services</span>
                <span className="text-blue-700 block">Agency</span>
                <span className="text-red-700 block">Developers</span>
                <span className="text-purple-700 block">Design</span>
              </span>
            </div>
          </h1>
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            At Curelogics, we specialize in delivering cutting-edge software
            solutions tailored to your business needs. Our team of experts is
            dedicated to transforming your ideas into reality.
          </p>
          <div className="mt-6">
            <Button text={"Start Project"} />
          </div>
        </div>

        {/* Image & Feature Scroller */}
        <div className="md:w-[40%] w-3/4 flex relative flex-col items-center justify-center">
          <div className="w-full flex justify-center items-center flex-col">
            {/* Feature Scroller */}

            <div
              ref={sliderRef}
              className="keen-slider w-[12rem]  h-10 text-sm flex gap-"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="keen-slider__slide flex items-center  gap-2 text-gray-800 text-sm w-auto"
                >
                  <div className="flex items-center gap-2 w-[20rem]  ">
                    <span className="">{feature.icon}</span>
                    <span className="text-sm ">{feature.title}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Image */}
            <Image
              src="/images/home.png"
              width={500}
              height={500}
              alt="Developer Illustration"
            />
          </div>

          {/* Yellow Badge */}
          <div className="absolute bottom-0 hidden md:block rounded-full left-1 transform rotating-div">
            <Image
              src="/images/circlelogo.png"
              width={100}
              height={100}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
