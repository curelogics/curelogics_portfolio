"use client";
import React, { useState, useEffect } from "react";

const ServicesTree = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative text-gray-900 py-16 px-6 md:px-12 min-h-screen overflow-hidden bg-white">
      {/* Enhanced Mouse Glow Effect */}
      {/* <div
        className="pointer-events-none fixed z-0"
        style={{
          top: position.y,
          left: position.x,
          transform: "translate(-50%, -50%)",
        }}
      >
      
        <div 
          className="absolute w-[400px] h-[400px] rounded-full opacity-30 blur-[100px] animate-pulse"
          style={{
            background: `radial-gradient(circle, rgba(253, 3, 3, 0.4) 0%, rgba(41, 34, 195, 0.3) 50%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        
       
        <div 
          className="absolute w-[200px] h-[200px] rounded-full opacity-50 blur-[50px]"
          style={{
            background: `radial-gradient(circle, rgba(253, 3, 3, 0.6) 0%, rgba(41, 34, 195, 0.4) 60%, transparent 80%)`,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        
        
        <div 
          className="absolute w-[80px] h-[80px] rounded-full opacity-40 blur-[20px]"
          style={{
            background: `radial-gradient(circle, rgba(253, 3, 3, 0.8) 0%, rgba(41, 34, 195, 0.6) 50%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        
       
        <div 
          className="absolute w-[20px] h-[20px] rounded-full opacity-60 blur-[5px]"
          style={{
            background: `linear-gradient(45deg, rgba(253, 3, 3, 1) 29%, rgba(41, 34, 195, 1) 100%)`,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </div> */}

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
          Our Services & 
          <span 
            className="ml-3 bg-clip-text text-transparent"
            style={{
              background: `linear-gradient(45deg, rgba(253, 3, 3, 1) 29%, rgba(41, 34, 195, 1) 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Skills
          </span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Explore our interconnected expertise across multiple domains
        </p>
      </div>

      <div className="relative z-20 mt-12 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
        
        {/* UI/UX Design Card */}
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-full max-w-sm lg:w-1/3 text-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100/80">
          <h3 className="flex items-center text-xl font-semibold mb-4"
              style={{ color: 'rgba(253, 3, 3, 1)' }}>
            🎨 UI/UX Design
            <span className="ml-auto text-sm text-gray-500">• Creative</span>
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg hover:bg-gray-100/80 transition-colors">
              <span className="font-medium">Figma Design</span>
              <span className="text-green-600 font-semibold">✓ Expert</span>
            </div>
            <div className="flex justify-between bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg hover:bg-gray-100/80 transition-colors">
              <span className="font-medium">User Research</span>
              <span className="text-yellow-600 font-semibold">🔥 Advanced</span>
            </div>
            <div className="flex justify-between bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg hover:bg-gray-100/80 transition-colors">
              <span className="font-medium">Prototyping</span>
              <span className="text-blue-600 font-semibold">👍 Skilled</span>
            </div>
            <div className="flex justify-between bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg hover:bg-gray-100/80 transition-colors">
              <span className="font-medium">⭐ Design Rating</span>
              <span className="text-yellow-500 font-semibold">4.9 / 5.0</span>
            </div>
          </div>
        </div>

        {/* Tree Structure - Central Connection */}
        <div className="relative h-[20rem] lg:h-[25rem] w-full lg:w-1/3 flex justify-center items-center">
          
          {/* Horizontal Branch for Desktop */}
          <div className="hidden lg:block absolute w-full h-[3px] top-1/2 left-0 transform -translate-y-1/2 z-10"
               style={{
                 background: `linear-gradient(90deg, rgba(253, 3, 3, 1) 0%, rgba(41, 34, 195, 1) 50%, rgba(253, 3, 3, 1) 100%)`
               }}>
          </div>

          {/* Vertical Branch for Mobile */}
          <div className="lg:hidden absolute h-full w-[3px] left-1/2 top-0 transform -translate-x-1/2 z-10"
               style={{
                 background: `linear-gradient(180deg, rgba(253, 3, 3, 1) 0%, rgba(41, 34, 195, 1) 50%, rgba(253, 3, 3, 1) 100%)`
               }}>
          </div>

          {/* Central Hub */}
          <div className="relative z-20">
            <div 
              className="w-20 h-20 border-2 rounded-full flex justify-center items-center shadow-lg bg-white"
              style={{
                borderColor: 'rgba(253, 3, 3, 1)'
              }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                style={{
                  background: `linear-gradient(45deg, rgba(253, 3, 3, 1) 29%, rgba(41, 34, 195, 1) 100%)`
                }}
              >
                ⚡
              </div>
            </div>

            {/* Animated Branch Extensions */}
            <div className="absolute inset-0 flex justify-center items-center">
              {/* Left flowing element */}
              <div 
                className="absolute -left-20 w-8 h-8 rounded-md blur-sm animate-pulse"
                style={{
                  background: `linear-gradient(45deg, rgba(253, 3, 3, 0.7) 29%, rgba(41, 34, 195, 0.7) 100%)`,
                  animation: 'flowLeft 3s ease-in-out infinite'
                }}
              ></div>

              {/* Right flowing element */}
              <div 
                className="absolute -right-20 w-8 h-8 rounded-md blur-sm animate-pulse"
                style={{
                  background: `linear-gradient(45deg, rgba(41, 34, 195, 0.7) 29%, rgba(253, 3, 3, 0.7) 100%)`,
                  animation: 'flowRight 3s ease-in-out infinite'
                }}
              ></div>
            </div>
          </div>

          {/* Branch Connection Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top branches */}
            <div className="hidden lg:block absolute top-[30%] left-[25%] w-[25%] h-[2px] transform -rotate-45"
                 style={{
                   background: `linear-gradient(45deg, rgba(253, 3, 3, 0.4) 29%, rgba(41, 34, 195, 0.4) 100%)`
                 }}>
            </div>
            <div className="hidden lg:block absolute top-[30%] right-[25%] w-[25%] h-[2px] transform rotate-45"
                 style={{
                   background: `linear-gradient(45deg, rgba(41, 34, 195, 0.4) 29%, rgba(253, 3, 3, 0.4) 100%)`
                 }}>
            </div>

            {/* Bottom branches */}
            <div className="hidden lg:block absolute bottom-[30%] left-[25%] w-[25%] h-[2px] transform rotate-45"
                 style={{
                   background: `linear-gradient(45deg, rgba(253, 3, 3, 0.4) 29%, rgba(41, 34, 195, 0.4) 100%)`
                 }}>
            </div>
            <div className="hidden lg:block absolute bottom-[30%] right-[25%] w-[25%] h-[2px] transform -rotate-45"
                 style={{
                   background: `linear-gradient(45deg, rgba(41, 34, 195, 0.4) 29%, rgba(253, 3, 3, 0.4) 100%)`
                 }}>
            </div>
          </div>
        </div>

        {/* Web Development Card */}
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-full max-w-sm lg:w-1/3 relative text-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100/80">
          <h3 className="flex items-center text-xl font-semibold mb-4"
              style={{ color: 'rgba(41, 34, 195, 1)' }}>
            💻 Web Development
            <span className="ml-auto text-sm text-gray-500">• Technical</span>
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg hover:bg-gray-100/80 transition-colors">
              <span className="font-medium">React & Next.js</span>
              <span className="text-green-600 font-semibold">✓ Expert</span>
            </div>
            <div className="flex justify-between bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg hover:bg-gray-100/80 transition-colors">
              <span className="font-medium">Node.js/Express</span>
              <span className="text-yellow-600 font-semibold">🔥 Advanced</span>
            </div>
            <div className="flex justify-between bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg hover:bg-gray-100/80 transition-colors">
              <span className="font-medium">Database Design</span>
              <span className="text-blue-600 font-semibold">👍 Skilled</span>
            </div>
            <div className="flex justify-between bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg hover:bg-gray-100/80 transition-colors">
              <span className="font-medium">⭐ Dev Rating</span>
              <span className="text-yellow-500 font-semibold">4.8 / 5.0</span>
            </div>
          </div>

          {/* Live Status Badge */}
          {/* <span 
            className="absolute top-4 right-4 px-3 py-1 text-white font-semibold text-sm rounded-lg shadow-lg"
            style={{
              background: `linear-gradient(45deg, rgba(253, 3, 3, 1) 29%, rgba(41, 34, 195, 1) 100%)`
            }}
          >
            Active
          </span> */}
        </div>
      </div>

      {/* Bottom Services Row */}
      <div className="relative z-20 mt-12 flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
        
        {/* SEO Card */}
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-full md:w-1/2 text-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100/80">
          <h3 className="flex items-center text-xl font-semibold mb-4"
              style={{ color: 'rgba(253, 3, 3, 1)' }}>
            🔍 SEO Optimization
            <span className="ml-auto text-sm text-gray-500">• Growth</span>
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg text-center hover:bg-gray-100/80 transition-colors">
              <div className="font-medium text-sm">Keywords</div>
              <div className="text-green-600 text-xs mt-1">✓ Optimized</div>
            </div>
            <div className="bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg text-center hover:bg-gray-100/80 transition-colors">
              <div className="font-medium text-sm">Analytics</div>
              <div className="text-blue-600 text-xs mt-1">📊 Tracking</div>
            </div>
            <div className="bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg text-center hover:bg-gray-100/80 transition-colors">
              <div className="font-medium text-sm">Content</div>
              <div className="text-yellow-600 text-xs mt-1">🔥 Strategy</div>
            </div>
            <div className="bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg text-center hover:bg-gray-100/80 transition-colors">
              <div className="font-medium text-sm">Rating</div>
              <div className="text-yellow-500 text-xs mt-1">⭐ 4.7/5</div>
            </div>
          </div>
        </div>

        {/* DevOps Card */}
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-full md:w-1/2 text-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100/80">
          <h3 className="flex items-center text-xl font-semibold mb-4"
              style={{ color: 'rgba(41, 34, 195, 1)' }}>
            ☁️ DevOps & Cloud
            <span className="ml-auto text-sm text-gray-500">• Infrastructure</span>
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg text-center hover:bg-gray-100/80 transition-colors">
              <div className="font-medium text-sm">AWS</div>
              <div className="text-green-600 text-xs mt-1">✓ Certified</div>
            </div>
            <div className="bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg text-center hover:bg-gray-100/80 transition-colors">
              <div className="font-medium text-sm">Docker</div>
              <div className="text-blue-600 text-xs mt-1">🐳 Container</div>
            </div>
            <div className="bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg text-center hover:bg-gray-100/80 transition-colors">
              <div className="font-medium text-sm">CI/CD</div>
              <div className="text-yellow-600 text-xs mt-1">🔥 Pipeline</div>
            </div>
            <div className="bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg text-center hover:bg-gray-100/80 transition-colors">
              <div className="font-medium text-sm">Rating</div>
              <div className="text-yellow-500 text-xs mt-1">⭐ 4.6/5</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes flowLeft {
          0%, 100% { transform: translateX(0) scale(1); opacity: 0.7; }
          50% { transform: translateX(-30px) scale(1.2); opacity: 1; }
        }
        
        @keyframes flowRight {
          0%, 100% { transform: translateX(0) scale(1); opacity: 0.7; }
          50% { transform: translateX(30px) scale(1.2); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default ServicesTree;