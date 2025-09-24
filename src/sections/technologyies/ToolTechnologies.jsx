"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Heading from "../../components/globalcomponents/Heading";

const ToolTechnologies = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // Track if animation has run
  const [toolStyles, setToolStyles] = useState([]);
  const sectionRef = useRef(null);

  const tools = [
    { name: "React JS", icon: "/images/Group 66.png" },
    { name: "Flutter", icon: "/images/Group 67.png" },
    { name: "Vue.Js", icon: "/images/Group 68.png" },
    { name: "Mongo DB", icon: "/images/Group 69.png" },
    { name: "Laravel", icon: "/images/Group 70.png" },
    { name: "Next.Js", icon: "/images/Group 71.png" },
    { name: "Nest.Js", icon: "/images/Group 72.png" },
    { name: "Adobe XD", icon: "/images/Group 59.png" },
    { name: "CSS", icon: "/images/Group 73.png" },
    { name: "Socket.IO", icon: "/images/Group 46.png" },
    { name: "eCommerce", icon: "/images/Group 65.png" },
    { name: "Node.Js", icon: "/images/Group 48.png" },
    { name: "Bootstrap", icon: "/images/Group 49.png" },
    { name: "ChatGPT", icon: "/images/Group 50.png" },
    { name: "Meta", icon: "/images/Group 51.png" },
    { name: "Figma", icon: "/images/Group 52.png" },
    { name: "Photoshop", icon: "/images/Group 62.png" },
    { name: "HTML", icon: "/images/Group 54.png" },
    { name: "Javascript", icon: "/images/Group 55.png" },
    { name: "Angular", icon: "/images/Group 56.png" },
    { name: "Websocket", icon: "/images/Group 57.png" },
    { name: "GraphQL", icon: "/images/Group 53.png" },
    { name: "PostgreSQL", icon: "/images/Group 59.png" },
    { name: "Illustrator", icon: "/images/Group 60.png" },
  ];

  useEffect(() => {
    // Precompute random styles for each tool to avoid hydration mismatch
    const styles = tools.map((_, index) => ({
      animationDelay: `${index * 0.15}s`,
      randomX: `${Math.random() * 20 - 10}px`,
      randomRotation: `${Math.random() * 360}deg`,
    }));
    setToolStyles(styles);
  }, []); // Run once on mount to set styles

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true); // Trigger animation only if it hasn't run
          setHasAnimated(true); // Mark animation as completed
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: "0px", // No extra margin
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]); // Depend on hasAnimated to lock animation after first run

  // Group tools into batches of 6 for consistent grid layout
  const batches = [];
  for (let i = 0; i < tools.length; i += 6) {
    batches.push(tools.slice(i, i + 6));
  }

  return (
    <div ref={sectionRef} className="bg-white py-12 px-6 w-full lg:h-screen">
      <div className="md:w-[75%] mx-auto text-center">
        <Heading text={"Tools & Technologies"} />
        <h1 className="text-3xl font-bold text-gray-800 md:w-3/4 mt-2 text-center mx-auto">
          Latest tools & technologies to drive innovation in digital solutions
        </h1>
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-6 mt-8">
          {batches.map((batch, batchIndex) => (
            <React.Fragment key={batchIndex}>
              {batch.map((tool, index) => {
                const toolIndex = batchIndex * 6 + index;
                const style = toolStyles[toolIndex] || {
                  animationDelay: "0s",
                  randomX: "0px",
                  randomRotation: "0deg",
                };
                return (
                  <div
                    key={`${batchIndex}-${index}`}
                    className={`bubble-tool ${isVisible ? "pour-in" : ""}`}
                    style={{
                      animationDelay: style.animationDelay,
                      "--random-x": style.randomX,
                      "--random-rotation": style.randomRotation,
                    }}
                  >
                    <Image
                      src={tool.icon || "/placeholder.svg"}
                      alt={tool.name}
                      width={100}
                      height={100}
                      className="tool-icon"
                    />
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style jsx>{`
        .bubble-tool {
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transform: translateY(-100px) scale(0.5);
        }

        .bubble-tool.pour-in {
          animation: pourIn 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) both,
                     float 3s ease-in-out infinite;
        }

        .tool-icon {
          transition: transform 0.3s ease;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .bubble-tool:hover .tool-icon {
          transform: scale(1.1) rotate(5deg);
        }

        @keyframes pourIn {
          0% {
            opacity: 0;
            transform: translateY(-100px) translateX(var(--random-x)) 
                       rotate(var(--random-rotation)) scale(0.3);
          }
          50% {
            opacity: 0.8;
            transform: translateY(20px) translateX(calc(var(--random-x) * 0.5)) 
                       rotate(calc(var(--random-rotation) * 0.3)) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateX(0) rotate(0deg) scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 15px;
          }
        }

        @media (max-width: 480px) {
          .grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default ToolTechnologies;