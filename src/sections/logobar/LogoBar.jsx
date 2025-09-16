"use client";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

const LogoBar = () => {
  const logos = [
    { image: "images/Group (1).png" },
    { image: "images/Group (2).png" },
    { image: "images/Group 284.png" },
    { image: "images/Group 291.png" },
    { image: "images/Group 502.png" },
    { image: "images/Group 520.png" },
    { image: "images/Group 14002.png" },
    { image: "images/Group 14006.png" },
    { image: "images/Group 14006 (1).png" },
    { image: "images/Group 14007.png" },
    { image: "images/Group 14008.png" },
    { image: "images/Group 502.png" },
    { image: "images/Group.png" },
    { image: "images/Group 14006.png" },
  ];

  const animation = { duration: 5000, easing: (t) => t };

  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    drag: false,
    slides: { perView: 10, spacing: 1 }, // Adjust the number of visible slides
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-6 overflow-hidden bg-image md:mb-16 mb-6 md:h-32 flex items-center justify-center">
      <div ref={sliderRef} className="keen-slider">
        {logos.concat(logos).map((logo, index) => (
          <div
            key={index}
            className="keen-slider__slide flex justify-center items-center"
          >
            <Image
              width={100}
              height={100}
              src={`/${logo.image}`}
              alt=""
              className="w-25 px-3 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoBar;
