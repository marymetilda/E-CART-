import React from "react";
import { Link } from "react-router-dom";

const Marquee = () => {
  return (
    <div className="bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-600 via-yellow-400 to-yellow-200 text-yellow-600 text-xl font-bold w-full border-x-2 border-yellow-600 py-2 pl-[5vw] my-4 lg:mt-0 border-y-4 flex overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        <div className="flex">
          <p>FLAT ₹100 on your first order </p>
          <Link to="/login">
            <span className="pl-8 whitespace-nowrap">Login now</span>
          </Link>
          <span className="pl-8 whitespace-nowrap">
            Shop... Smile... Repeat...
          </span>
        </div>
      </div>
      <div className="flex animate-marquee whitespace-nowrap">
        <div className="flex">
          <p>FLAT ₹100 on your first order </p>
          <Link to="/login">
            <span className="pl-8 whitespace-nowrap">Login now</span>
          </Link>
          <span className="pl-8 whitespace-nowrap">
            Shop... Smile... Repeat...
          </span>
        </div>
      </div>
      <div className="flex animate-marquee whitespace-nowrap pl-16">
        <div className="flex">
          <p>FLAT ₹100 on your first order </p>
          <Link to="/login">
            <span className="pl-8 whitespace-nowrap">Login now</span>
          </Link>
          <span className="pl-8 whitespace-nowrap">
            Shop... Smile... Repeat...
          </span>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
