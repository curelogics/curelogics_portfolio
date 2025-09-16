import React from "react";
import Heading from "../../components/globalcomponents/Heading";
import Image from "next/image";

const WhyCureLogics = () => {
  return (
    <section className="  w-full text-sm flex  items-start ">
      <div className="container px-6 md:w-[80%] mx-auto  ">
        <Heading text={"Why CureLogics"} />
        <h3 className="text-2xl font-extrabold text-gray-900 leading-snug mb-10">
          Why CureLogics Stands Out as Your <br />
          <span className="bg-gradient-to-r from-red-600 to-blue-900 bg-clip-text text-transparent font-semibold">Premier Digital Partner?</span>
          
        </h3>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Section: Text */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Image
                src="/images/expert (1).png"
                width={25}
                height={25}
                alt="img"
              />

              <div className="ml-4 md:flex justify-center items-center gap-2">
                <p className=" font-bold text-gray-800">Expert Team</p>
                <p className="text-gray-600">
                  Our diverse team delivers custom solutions.
                </p>
              </div>
            </div>

            <div className="flex items-center ">
              <Image
                src="/images/industry.png"
                alt="img"
                width={25}
                height={25}
              />
              <div className="ml-4 md:flex justify-center items-center gap-2">
                <p className=" font-bold text-gray-800">Industry Leading</p>
                <p className="text-gray-600">
                  Achieve industry success with our proven solutions.
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Image
                width={25}
                height={25}
                src="/images/global.png"
                alt="/images/global.png"
              />
              <div className="ml-4 md:flex justify-center items-center gap-2">
                <p className=" font-bold text-gray-800">Global Reach</p>
                <p className="text-gray-600">
                  Seamless collaboration, anywhere, anytime.
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Image width={20} height={20} src="/images/24hour.png" alt="" />
              <div className="ml-4 md:flex justify-center items-center gap-2">
                <p className=" font-bold text-gray-800">
                  24/7 Customer Support
                </p>
                <p className="text-gray-600">
                  Your satisfaction is our priority.
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Image width={20} height={20} src="/images/client.png" alt="" />
              <div className="ml-4 md:flex justify-center items-center gap-2">
                <p className=" font-bold text-gray-800 text-sm w-[12rem] ">
                  Client-Centric Approach
                </p>
                <p className="text-gray-600">
                  Personalized support, exceeding expectations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section: Image */}
          <div className="relative w-full flex items-center justify-center  h-full">
            <Image
              className=" rotating-div w-28 h-28 md:w-42 md:h-42 self-start"
              src="/images/tableanimation.png"
              alt=""
              width={200}
              height={200}
            />
            <Image
              width={350}
              height={350}
              src="/images/tableman.png"
              alt="Illustration"
              className=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCureLogics;
