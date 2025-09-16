import React, { useEffect } from "react";
import Card from "./Card";
import servises from "./serviseData";
import AOS from "aos";
import "aos/dist/aos.css";
import Heading from "../Heading";
import servicesData from "./serviseData";

const ServicesSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000, // Animation duration in milliseconds
      once: false, // Whether animation should happen only once
    });
  }, []);
  return (
    <section className="py-12 bg-gray-50 flex flex-col items-center">
      <Heading text={"Our Services"} />
      <div className="container mx-auto text-center">
        <h1
          data-aos="fade-down"
          className="text-4xl font-bold text-gray-800 mb-6"
        >
          Transform Your Vision into Digital Triumphs
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          With CureLogics' Dynamic Services
        </p>
        <div className="w-full">
          <div className=" w-full px-4  md:w-[80%] md:mx-auto  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 place-items-center">
            {servicesData.map((service) => (
              <Card key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
