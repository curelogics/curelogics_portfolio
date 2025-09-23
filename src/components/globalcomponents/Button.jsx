import { ArrowRight } from "lucide-react";
import React from "react";

export default function Button({ text }) {
  return (
    <div className="inline-block rounded-lg bg-gradient-to-r from-[#E21E2D] to-[#2D4E93] p-[3px] cursor-pointer group">
      <button className="px-3 py-2 rounded-lg transition-all duration-500 cursor-pointer w-full">
        <span className="flex items-center gap-2 font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
          {text}
          <ArrowRight className="w-4 h-4" />
        </span>
      </button>
    </div>
  );
}
