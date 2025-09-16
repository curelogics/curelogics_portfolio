import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
const TeamMemberCard = ({ title, desc, img }) => {
  useEffect(() => {
    AOS.init({
      duration: 2000, // Animation duration in milliseconds
      once: false, // Whether animation should happen only once
    });
  }, []);
  return (
    <div>
      <div className="flex flex-col items-center bg-white  rounded-2xl w-60 lg:w-48">
        <Image
          src={img} // Replace this with the actual image URL
          alt="Founder & CEO"
          width={200}
          height={200}
          className="w-full  object-cover rounded-md"
        />
        <h2 data-aos="fade-up" className="text-sm font-bold mt-4">
          {title}
        </h2>
        <p data-aos="fade-up" className="text-sm text-gray-500 text-center">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
