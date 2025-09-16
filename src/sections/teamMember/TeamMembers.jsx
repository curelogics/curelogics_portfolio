"use client";
import React from "react";
import TeamMemberCard from "./TeamMemberCard";
import { FaArrowRight, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

// Founder's Message Component with your theme
const FounderMessage = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full mx-auto md:w-[95%] lg:w-[85%] 2xl:w-[80%]">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Founder's Image */}
          <div className="lg:w-2/5 relative" data-aos="fade-right">
            <div className="relative">
              {/* Decorative elements with your theme colors */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-red-100 animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-100 rounded-full"></div>

              {/* Main image container */}
              <div className="relative z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-blue-600 rounded-2xl transform rotate-3 shadow-xl opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]">
                  <Image
                    src="/images/founder.png"             // must be inside /public
                    alt="Company Founder"
                    width={1200}                          // set a reasonable width
                    height={500}                          // set a reasonable height
                    className="w-full h-[500px] object-cover"
                    style={{
                      filter: "contrast(110%) brightness(105%)",
                    }}
                    priority                               // optional: loads immediately
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Experience badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-2xl border-2 border-red-100 z-20 backdrop-blur-sm">
                <div className="text-center px-4">
                  <span className="text-red-500 font-bold text-lg block mb-1">Experience</span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-bold text-4xl bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">10+</span>
                    <span className="text-gray-700 font-medium">Years</span>
                  </div>
                  <span className="text-gray-600 text-sm block mt-1">Since 2014</span>
                </div>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="lg:w-3/5" data-aos="fade-left">
            <div className="inline-block px-6 py-2 rounded-full bg-red-100 text-red-600 font-bold text-sm mb-6 hover:bg-red-200 transition-colors">
              A Message From Our Founder
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 leading-tight">
              Transforming Healthcare Through{" "}
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-blue-600 bg-clip-text text-transparent">
                Innovation & Excellence
              </span>
            </h2>

            {/* Quote with enhanced styling */}
            <div className="space-y-6 text-gray-700 relative bg-white/80 rounded-2xl p-8 shadow-lg border border-gray-100">
              {/* Decorative quote marks */}
              <div className="absolute -left-4 -top-4 text-8xl text-red-200 font-serif leading-none">"</div>

              <p className="relative z-10 text-lg leading-relaxed">
                When I founded CureLogics, I envisioned a company that would revolutionize healthcare through cutting-edge technology and unwavering commitment to patient care. Our mission goes beyond just providing solutions — we're dedicated to improving lives.
              </p>
              <p className="text-lg leading-relaxed">
                What makes CureLogics unique is our team of brilliant minds who share a passion for innovation. Together, we've built a culture of excellence where every project is an opportunity to make a meaningful impact in the healthcare industry.
              </p>
              <p className="text-lg leading-relaxed">
                As we continue to grow and evolve, our commitment remains the same: delivering exceptional healthcare solutions that drive real results and create lasting value for our partners and patients alike.
              </p>

              <div className="absolute -right-4 bottom-0 text-8xl text-blue-200 font-serif leading-none">"</div>
            </div>

            {/* Signature area */}
            <div className="mt-12 flex flex-col sm:flex-row gap-8 items-center">
              <div className="h-20 w-48 relative group">
                <div className="absolute inset-0 bg-red-50 rounded-lg transform -rotate-2 group-hover:rotate-0 transition-transform"></div>
                <Image
                  src="/images/signature.png" // Update with your signature image path
                  alt="Founder's Signature"
                  className="h-full w-full object-contain relative z-10"
                  width={100}
                  height={100}
                />
              </div>
              <div className="border-l-4 border-red-500 pl-8">
                <h3 className="text-2xl font-bold text-gray-800">Usman Khalid</h3> {/* Update with founder name */}
                <p className="text-red-600 font-bold">Founder & CEO</p>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-10 flex flex-wrap gap-4">
              {[
                {
                  name: "LinkedIn",
                  icon: FaLinkedin,
                  url: "https://linkedin.com/in/founder",
                  color: "hover:bg-blue-600 hover:text-white"
                },
                {
                  name: "Twitter",
                  icon: FaTwitter,
                  url: "https://twitter.com/founder",
                  color: "hover:bg-blue-500 hover:text-white"
                },
                {
                  name: "Email",
                  icon: FaEnvelope,
                  url: "mailto:founder@curelogics.com",
                  color: "hover:bg-red-600 hover:text-white"
                }
              ].map((platform) => {
                const IconComponent = platform.icon;
                return (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target={platform.name !== "Email" ? "_blank" : undefined}
                    rel={platform.name !== "Email" ? "noopener noreferrer" : undefined}
                    className={`px-6 py-3 rounded-xl text-sm font-bold bg-white border-2 border-gray-200 text-gray-700 ${platform.color} transition-all flex items-center gap-2 shadow-sm hover:shadow-md hover:scale-105 transform`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {platform.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TeamMembers = () => {
  return (
    <>
      <section className="w-full lg:h-auto py-6">
        <div className="w-full mx-auto md:w-[100%] lg:w-[80%] 2xl:w-[80%] h-full flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center justify-center gap-8">
            <h1 className="text-red-500 font-bold text-lg" data-aos="fade-up">Team Members</h1>
            <h2
              data-aos="fade-down"
              className="text-2xl md:text-4xl font-bold text-center"
            >
              Meet the Brilliant Minds Behind 
              
              <span className="bg-gradient-to-r from-red-600 to-blue-900 bg-clip-text text-transparent font-semibold"> CureLogics' Success</span>
            </h2>
          </div>
          <div className="w-full relative h-full flex flex-col items-center justify-center gap-8">
            <div className="flex justify-center items-center" data-aos="zoom-in">
              <TeamMemberCard
                title={"Founder & CEO"}
                desc={"Curelogics visionary leader"}
                img={"/images/team1.png"}
              />
            </div>

            <div className="lg:top-[18%] w-[85%] lg:absolute flex flex-col lg:flex-row justify-around items-center gap-8">
              <div data-aos="fade-right" data-aos-delay="100">
                <TeamMemberCard
                  title={"MERN Stack Developer"}
                  desc={"Web Developer"}
                  img={"/images/team2.png"}
                />
              </div>
              <div data-aos="fade-left" data-aos-delay="200">
                <TeamMemberCard
                  title={"Full Stack Developer"}
                  desc={"Web Developer"}
                  img={"/images/team3.png"}
                />
              </div>
            </div>

            <div className="flex w-full items-center justify-between flex-col lg:flex-row gap-8">
              <div data-aos="fade-up" data-aos-delay="300">
                <TeamMemberCard
                  title={"Senior Developer"}
                  desc={"Backend Specialist"}
                  img={"/images/team4.png"}
                />
              </div>

              <Link
                href={"/career"}
                className="relative group lg:block bottom-0 hidden self-end w-40 h-32 border-2 border-red-600 overflow-hidden rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-red-500 to-blue-600 translate-y-[90%] group-hover:translate-y-0 transition-all duration-500"></div>
                <div className="relative z-10 flex items-center justify-center h-full gap-2 px-3 text-xl font-bold cursor-pointer text-gray-800 group-hover:text-white transition-colors">
                  <FaArrowRight />
                  Join Now
                </div>
              </Link>

              <div className="transition-all duration-500 hover:scale-105 hover:shadow-xl" data-aos="fade-up" data-aos-delay="500">
                <TeamMemberCard
                  title={"UI/UX Designer"}
                  desc={"Creative Designer"}
                  img={"/images/team5.png"}
                />
              </div>

              <Link
                href={"/career"}
                className="relative group bottom-0 lg:hidden self-center w-40 h-36 border-2 border-red-500 overflow-hidden rounded-full shadow-lg hover:shadow-xl transition-all"
                data-aos="zoom-in"
                data-aos-delay="600"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-red-500 to-blue-500 translate-y-[100%] group-hover:translate-y-0 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-red-500 to-blue-500 translate-y-[95%] group-hover:hidden transition-transform duration-300 rounded-t-full"></div>
                <div className="relative z-10 flex items-center justify-center h-full gap-2 px-3 text-xl font-bold cursor-pointer text-gray-800 group-hover:text-white">
                  <FaArrowRight />
                  Join Now
                </div>
              </Link>
            </div>
          </div>

          {/* Team Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 w-full" data-aos="fade-up">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent mb-2">50+</h3>
              <p className="text-gray-700 font-medium">Team Members</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent mb-2">99%</h3>
              <p className="text-gray-700 font-medium">Client Satisfaction</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent mb-2">500+</h3>
              <p className="text-gray-700 font-medium">Projects Completed</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent mb-2">10+</h3>
              <p className="text-gray-700 font-medium">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Message Section */}
      <FounderMessage />
    </>
  );
};

export default TeamMembers;