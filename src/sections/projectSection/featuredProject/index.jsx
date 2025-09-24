"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import projects from "../data/Data";
import Button from "@/components/globalcomponents/Button";

const FeatureSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true, // Animations run only on first scroll
      offset: 100,
    });
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-0 flex flex-col gap-14">
        <h1
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold text-center text-red-600 tracking-wide"
        >
          Projects We Have Worked On
        </h1>

        {projects.map((project, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row gap-8 items-center ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            }`}
          >
            {/* Text Content */}
            <div
              className="lg:w-1/2 flex flex-col justify-center bg-white rounded-2xl p-6 shadow-lg md:shadow-xl"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <span
                className="text-red-500 font-semibold uppercase text-sm"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Featured Project
              </span>
              <h2
                className="text-2xl md:text-3xl font-bold text-gray-900 mt-2"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <a
                  href={project.link}
                  target="_blank"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-700 hover:from-blue-700 hover:to-red-600 transition-all duration-300"
                >
                  {project.title}
                </a>
              </h2>
              <p
                className="text-gray-700 mt-4 text-sm md:text-base leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                {project.description}
              </p>

              <div
                className="flex flex-wrap gap-2 mt-4"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs md:text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div
                className="mt-6 w-max"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <Button text="View Project" />
              </div>
            </div>

            {/* Image */}
            <div
              className="lg:w-1/2 w-full rounded-2xl overflow-hidden shadow-lg"
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-delay="100"
            >
              <a href={project.link} target="_blank" className="block">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;