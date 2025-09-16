import React from "react";

const InputBox = ({ label, icon, placeholder, type }) => {
  return (
    <div>
      <label
        htmlFor="input-group-1"
        className="block mb-2 text-sm font-medium  dartext-white"
      >
        {label}
      </label>
      <div className="relative mb-6">
        <div className="absolute inset-y-0 text-gray-400 start-0 flex items-center ps-3.5 pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          id="input-group-1"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputBox;
