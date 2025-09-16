import React from "react";

const Heading = ({ text }) => {
  return (
    <div>
      <h2 className="text-red-500 text-sm font-bold uppercase mb-2  ">
        {text}
      </h2>
    </div>
  );
};

export default Heading;
