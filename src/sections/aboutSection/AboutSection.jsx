"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Heading from "@/components/globalcomponents/Heading";
import Button from "@/components/globalcomponents/Button";
import Image from "next/image"; // Ensure you have the correct import for Next.js Image component

const AboutSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000, // Animation duration in milliseconds
      once: false, // Whether animation should happen only once
    });
  }, []);
  return (
    <div>
      <section className=" md:py-16 lg:h-screen overflow-hidden grid place-items-center py-11 bg-about">
        <div className="container  lg:w-[80%] h-auto md:w-full lg:h-full mx-auto flex  overflow-hidden flex-col-reverse md:flex-row-reverse items-center justify-between gap-4">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <div data-aos="fade-up" className="">
              <Heading text={"About Curelogics"} />
            </div>
            <h1
              data-aos="fade-up"
              className=" lg:text-[40px] font-bold leading-tight text-black"
            >
              Empowering Healthcare & Businesses Through IT
              <div className="py-1">
                <span className="text-blue-900 block">Solutions</span>
              </div>
            </h1>
            <p
              data-aos="fade-up"
              className="mt-4 text-gray-600 text-sm md:text-base "
            >
              At Curelogics, we’re your one-stop destination for all your
              digital needs. From software development and design to SEO,
              marketing, and beyond, we provide comprehensive solutions to
              propel your business forward. With our expertise and dedication,
              we help you achieve your goals and stand out in today’s
              competitive market
            </p>
            <div data-aos="fade-up" className="mt-6">
              <Button text={"Learn More"} />
            </div>
          </div>

          {/* Image Content */}
          <div className="md:w-1/2 flex justify-center mb-10 relative rounded">
            <div
              style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
              className="lg:w-[450px]  lg:h-[450px] w-[300px] h-[300px]  bg-red-500 rotating-div flex justify-center items-center bg-gradient-to-r from-[#E21E2D] to-[#2D4E93]"
            ></div>
            <Image
              className="absolute object-cover"
              src="/images/about.png"
              width={450}
              height={450}
              alt=""
            />
            <div className="md:bottom-0 left-[50%] md:top-[80%] top-1/2 right-1/2 translate-x-[-25%] translate-y-[-50%] md:translate-x-0 md:translate-y-0  md:right-5 absolute z-50 flex justify-center items-center">
              <Image
                className="w-[60px] md:w-auto md:h-auto sm:h-[60px]"
                src="/images/1k.png"
                width={100}
                height={100}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
