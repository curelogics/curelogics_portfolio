"use client";
import React, { useEffect, useState } from "react";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const CareerPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("View all");

  // Job data with categories
  const jobList = [
    {
      title: "MERN Stack Developer",
      description:
        "We’re seeking a skilled MERN Stack Developer to design, develop, and maintain scalable web applications using MongoDB, Express.js, React, and Node.js. You’ll collaborate with cross-functional teams to deliver high-quality, user-focused solutions, optimize performance, and ensure robust backend infrastructure.",
      category: "Development",
    },
    {
      title: "MERN Stack Intern",
      description:
        "Join our team as a MERN Stack Intern to gain hands-on experience in full-stack development with MongoDB, Express.js, React, and Node.js. You’ll work on real-world projects, learn best practices in coding, and contribute to building dynamic web applications under the guidance of senior developers.",
      category: "Development",
    },
    {
      title: "UI/UX Intern",
      description:
        "We’re looking for a creative UI/UX Intern to assist in designing intuitive, user-friendly interfaces and enhancing user experiences for our digital products. You’ll conduct user research, create wireframes and prototypes, and collaborate with developers to ensure seamless design implementation.",
      category: "Design",
    },
    {
      title: "Business Developer Intern",
      description:
        "Join our business development team as an intern to drive strategic growth initiatives. You’ll support market research, identify new business opportunities, engage in client outreach, and assist in developing partnerships to expand our brand presence and market reach.",
      category: "Business Development",
    },
  ];

  // Filter jobs based on the selected category
  const filteredJobs =
    selectedCategory === "View all"
      ? jobList
      : jobList.filter((job) => job.category === selectedCategory);

  useEffect(() => {
    window.scrollTo(0, 0); // Reset to the top of the page
  }, []);

  return (
    <div className="w-full z-10 relative mt-20 overflow-hidden">
      {/* Header Section */}
      <div className="relative h-full mx-auto rounded-lg backdrop-blur-2xl z-30 p-3 lg:p-12 bg-white ">
        <div className="w-full mx-auto lg:text-start text-center py-12">
          <span className="p-1 px-2 text-black border rounded-full mb-2 inline-block bg-white">
            We're hiring!
          </span>
          <h1 className="text-2xl md:text-5xl font-bold text-black">
            Be part of our mission
          </h1>
          <p className="mt-4 text-lg text-black">
            We’re looking for passionate people to join us on our mission. We
            value flat hierarchies, clear communication, and full ownership and
            responsibility.
          </p>
          <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4 mx-auto">
            {[
              "View all",
              "Development",
              "Design",
              "Business Development",
              "Marketing",
              "Mobile App",
            ].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full border font-medium shadow hover:shadow-md transition cursor-pointer ${
                  selectedCategory === category
                    ? " bg-gradient-to-r from-red-500 to-blue-800 text-white"
                    : "bg-white text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <div className="w-full mx-auto overflow-auto">
          {filteredJobs.map((job, index) => (
            <div
              key={index}
              className="p-6 border-b shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-black">{job.title}</h3>
                  <p className="mt-2 text-gray-600">{job.description}</p>
                  <div className="mt-4 flex gap-2">
                    <span className="px-3 py-1 text-sm font-medium text-black bg-red-100 rounded-full flex items-center gap-1">
                      <IoLocationOutline />
                      On-site
                    </span>
                    <span className="px-3 py-1 text-sm font-medium text-black bg-red-100 rounded-full flex items-center gap-1">
                      <IoTimeOutline />
                      Full-time
                    </span>
                  </div>
                </div>
                <Link
                  onClick={() => {
                    localStorage.setItem("jobTitle", job.title);
                  }}
                  href={`/career/apply`}
                  className="text-blue-500 font-medium hover:underline flex items-center gap-2"
                >
                  Apply
                  <FaArrowRight className="-rotate-45" />
                </Link>
              </div>
            </div>
          ))}
          {filteredJobs.length === 0 && (
            <p className="text-center text-gray-600 mt-8">
              No jobs found for "{selectedCategory}" category.
            </p>
          )}
        </div>

        {/* Contact Button */}
        <div className="text-center mt-12 md:text-end">
          <button className="px-6 py-3 cursor-pointer text-white text-sm md:text-base bg-gradient-to-r from-red-500 to-blue-800 hover:opacity-90 rounded-lg shadow-md">
            Get in touch →
          </button>
        </div>
      </div>
      <div className="w-40 h-40 -z-30 bg-gradient-to-r from-red-500 to-blue-800 rounded-full absolute top-0 right-0"></div>
    </div>
  );
};

export default CareerPage;