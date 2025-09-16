import React, { useState, useEffect } from "react";

const CursorEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-red-500 to-blue-500 opacity-10 blur-[150px] transition-transform duration-200 ease-out z-10"
      style={{
        transform: `translate(${position.x - 250}px, ${position.y - 250}px)`,
      }}
    ></div>
  );
};

export default CursorEffect;
