"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const Banner = () => {
  const [projectsCompleted, setProjectsCompleted] = useState(0);
  const [activeClients, setActiveClients] = useState(0);
  const [satisfiedClients, setSatisfiedClients] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef(null);
  const pathname = usePathname() || "/"; // Fallback to "/" if pathname is undefined

  const duration = 2000;
  const animateValue = (setter, targetValue) => {
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      setter(Math.floor(progress * targetValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => setIsVisible(entries[0].isIntersecting),
      { threshold: 0.5 }
    );
    if (bannerRef.current) observer.observe(bannerRef.current);
    return () => bannerRef.current && observer.unobserve(bannerRef.current);
  }, []);

  useEffect(() => {
    if (isVisible) {
      animateValue(setProjectsCompleted, 250);
      animateValue(setActiveClients, 900);
      animateValue(setSatisfiedClients, 900);
    }
  }, [isVisible]);

  // Handle navigation to #contact
  const handleStartProjectClick = () => {
    if (pathname === "/") {
      const element = document.querySelector("#contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = "/#contact"; // Navigate to /#contact
    }
  };

  return (
    <div
      ref={bannerRef}
      className="relative bg-white py-12 md:py-16 px-4 sm:px-6 md:px-10 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-red-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-tr from-blue-500/10 to-red-500/10 rounded-full blur-3xl"></div>

        <div className="absolute top-16 left-1/4 w-2 h-2 bg-red-500 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-28 right-1/3 w-3 h-3 bg-blue-500 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-red-400 rounded-full opacity-50"></div>

        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59 130 246) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-blue-50 border border-red-100 rounded-full text-xs md:text-sm font-medium text-gray-700">
              <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-blue-500 rounded-full animate-pulse"></div>
              Ready to innovate
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <span className="text-gray-800">Let's Build</span>
              <br />
              <span className="bg-gradient-to-r from-red-600 to-blue-900 bg-clip-text text-transparent">
                Something Awesome
              </span>
              <br />
              <span className="text-gray-800">Together!</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
              Transform your ideas into reality with our expert development team.
              We create digital solutions that make a difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleStartProjectClick}
                className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-red-600 to-blue-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Project
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="px-6 md:px-8 py-3 md:py-4 text-gray-700 font-semibold border-2 border-gray-200 rounded-xl hover:border-red-300 hover:text-red-600 transition-all duration-300">
                View Portfolio
              </button>
            </div>
          </div>

          {/* Right Stats */}
          <div className="lg:w-1/2 flex justify-center w-full">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl p-6 md:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                {/* Stat cards */}
                {[
                  {
                    value: projectsCompleted,
                    title: "Complete Projects",
                    iconPath:
                      "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                  },
                  {
                    value: activeClients,
                    title: "Active Clients",
                    iconPath:
                      "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
                  },
                  {
                    value: satisfiedClients,
                    title: "Satisfied Clients",
                    iconPath:
                      "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="text-center group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                      <div className="relative bg-white rounded-2xl p-4 md:p-6 border border-gray-100 group-hover:border-red-200 transition-all duration-300">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-xl mx-auto mb-3 md:mb-4 flex items-center justify-center">
                          <svg
                            className="w-5 h-5 md:w-6 md:h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={item.iconPath}
                            />
                          </svg>
                        </div>
                        <p className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mb-1 md:mb-2">
                          {item.value}+
                        </p>
                        <p className="text-gray-600 text-sm md:text-base font-medium">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust indicators */}
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-100">
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Agile Process</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Quality Assured</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Right Stats */}
        </div>
      </div>
    </div>
  );
};

export default Banner;