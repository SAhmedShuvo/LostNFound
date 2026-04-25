"use client";
import { useState } from "react";
const LostOrFoundButton = ({ lostOrFound, setLostOrFound }) => {
  
  return (
    <div className="w-full bg-[#F9F8F6] h-15 flex justify-center items-center mt-5">
      <div className="w-70 bg-gray-700 h-8 rounded-4xl px-1.5 flex justify-between items-center">
        {lostOrFound == "lost" ? (
          <>
            <button
              className="px-6 bg-amber-100 rounded-2xl transition-all duration-300 "
              onClick={() => setLostOrFound("lost")}
            >
              Lost Items
            </button>
            <button
              className="text-white px-6"
              onClick={() => setLostOrFound("found")}
            >
              Found Items
            </button>
          </>
        ) : (
          <>
            <button
              className=" text-white px-6 "
              onClick={() => setLostOrFound("lost")}
            >
              Lost Items
            </button>
            <button
              className="px-6 bg-amber-100 rounded-2xl transition-all duration-300"
              onClick={() => setLostOrFound("found")}
            >
              Found Items
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LostOrFoundButton;
