import React from "react";

const Card = ({ service }) => {
  return (
    <div className=" grid place-items-center  hover:bg-gradient-to-r from-red-500 to-blue-500   card-container">
      <div
        className={`h-full w-full  ${service.bgColor} gap-4 transition-all duration-200 ease-in-out shadow-md p-2 text-center flex flex-col items-center hover:justify-start justify-center card-content center-div py-6 `}
      >
        <div className="flex justify-center mb-4">
          <img
            src={service.icon}
            alt="Web Development Icon"
            className="w-16 h-16"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800">{service.title}</h2>
        <p className="text-sm text-gray-600 mt-2">{service.description}</p>
        <button className="px-4 py-2 bottom-4  cursor-pointer  border-red-600 transition-all duration-500  text-white text-sm md:text-base bg-gradient-to-r from-red-500 to-blue-500 rounded-lg shadow-md hover:opacity-90 focus:outline-none btn-block ">
          Learn More →
        </button>
      </div>
    </div>
  );
};

export default Card;
