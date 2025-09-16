"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import AOS from "aos";
import "aos/dist/aos.css";
import Heading from "../../components/globalcomponents/Heading";

const FAQs = () => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const faqs = [
    {
      question: "What services does CureLogics offer?",
      answer:
        "CureLogics offers comprehensive software solutions including development, design, and marketing services to meet all your digital needs.",
    },
    {
      question: "Why choose CureLogics for software development?",
      answer:
        "CureLogics excels in software development with a team of skilled professionals dedicated to delivering innovative and high-quality solutions tailored to your requirements.",
    },
    {
      question: "What's CureLogics' app development expertise?",
      answer:
        "CureLogics specializes in mobile app development, creating intuitive, feature-rich applications for seamless user experiences across platforms.",
    },
    {
      question: "How does CureLogics develop websites?",
      answer:
        "CureLogics prioritizes user experience and scalability, ensuring your website effectively communicates your brand and achieves your goals.",
    },
    {
      question: "How does CureLogics ensure design excellence?",
      answer:
        "CureLogics' design team combines creativity and expertise to craft visually stunning and user-friendly interfaces that elevate your brand and captivate your audience.",
    },
    {
      question: "What's CureLogics' graphic design expertise?",
      answer:
        "CureLogics employs a collaborative process, combining creativity and strategic thinking to deliver graphic designs that align with your brand identity.",
    },
    {
      question: "What marketing strategies does CureLogics employ?",
      answer:
        "CureLogics employs data-driven marketing strategies to enhance your online presence, drive traffic, & maximize your ROI through targeted campaigns and analytics-driven insights.",
    },
    {
      question: "What e-commerce solutions does CureLogics offer?",
      answer:
        "CureLogics provides end-to-end e-commerce solutions, including platform development, customization, integration, to launch and scale your online store effectively.",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true
    });
  }, []);

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex flex-col items-center">
            <Heading text={"FAQs"} />
            <h2
              data-aos="fade-up"
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-red-600 to-blue-900 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p 
              data-aos="fade-up" 
              data-aos-delay="100"
              className="mt-4 text-lg text-gray-600 max-w-2xl"
            >
              Find answers to common questions about our services and solutions
            </p>
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              data-aos="fade-up"
              data-aos-delay={index * 50}
              key={index}
              className={`group bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:border-blue-200 cursor-pointer ${
                expandedItems.has(index) ? 'shadow-lg border-blue-300' : 'hover:shadow-md'
              }`}
              onClick={() => toggleExpanded(index)}
            >
              {/* Question Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                    <Image
                      width={16}
                      height={16}
                      src="/images/icon.png"
                      alt="CureLogics Icon"
                      className="w-4 h-6"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 pr-8">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      expandedItems.has(index) ? 'rotate-45 text-blue-600' : 'group-hover:text-blue-600'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </div>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedItems.has(index) 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-16 opacity-70'
                }`}
              >
                <div className="ml-12">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>

              {/* Read More Indicator */}
              {!expandedItems.has(index) && (
                <div className="ml-12 mt-2">
                  <span className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                    Click to read more →
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="200">
          <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl p-8 max-w-2xl mx-auto border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our team is here to help you with any additional questions you might have.
            </p>
            <button className="bg-gradient-to-r from-red-600 to-blue-900 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;