"use client";
import React, { useEffect } from "react";
import Image from "next/image";

import Heading from "../../components/globalcomponents/Heading";
const ToolTechnologies = () => {
  const tools = [
    {
      name: "React JS",
      icon: "/images/Group 66.png",
    },
    {
      name: "Flutter",
      icon: "/images/Group 67.png",
    },
    {
      name: "Vue.Js",
      icon: "/images/Group 68.png",
    },
    {
      name: "Mongo DB",
      icon: "/images/Group 69.png",
    },
    {
      name: "Laravel",
      icon: "/images/Group 70.png",
    },
    {
      name: "Next.Js",
      icon: "/images/Group 71.png",
    },
    {
      name: "Nest.Js",
      icon: "/images/Group 72.png",
    },
    {
      name: "Adobe XD",
      icon: "/images/Group 59.png",
    },
    {
      name: "CSS",
      icon: "/images/Group 73.png",
    },
    {
      name: "Socket.IO",
      icon: "/images/Group 46.png",
    },
    {
      name: "eCommerce",
      icon: "/images/Group 65.png",
    },
    {
      name: "Node.Js",
      icon: "/images/Group 48.png",
    },
    {
      name: "Bootstrap",
      icon: "/images/Group 49.png",
    },
    {
      name: "ChatGPT",
      icon: "/images/Group 50.png",
    },
    {
      name: "Meta",
      icon: "/images/Group 51.png",
    },
    {
      name: "Figma",
      icon: "/images/Group 52.png",
    },
    {
      name: "Photoshop",
      icon: "/images/Group 62.png",
    },
    {
      name: "HTML",
      icon: "/images/Group 54.png",
    },
    {
      name: "Javascript",
      icon: "/images/Group 55.png",
    },
    {
      name: "Angular",
      icon: "/images/Group 56.png",
    },
    {
      name: "Websocket",
      icon: "/images/Group 57.png",
    },
    {
      name: "GraphQL",
      icon: "/images/Group 53.png",
    },
    {
      name: "PostgreSQL",
      icon: "/images/Group 59.png",
    },
    {
      name: "Illustrator",
      icon: "/images/Group 60.png",
    },
  ];

  return (
    <div className="bg-white py-12 px-6 w-full lg:h-screen">
      <div className=" md:w-[75%] mx-auto text-center">
        <Heading data-aos="fade-left" text={"Tools & Technologies"} />
        <h1
          data-aos="fade-right"
          className="text-3xl font-bold text-gray-800 md:w-3/4 mt-2 text-center mx-auto"
        >
          Latest tools & technologies to drive innovation in digital solutions
        </h1>
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-6  mt-8">
          {tools.map((tool, index) => (
            <Image
              key={index}
              src={tool.icon}
              alt={tool.name}
              width={100}
              height={100}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolTechnologies;
