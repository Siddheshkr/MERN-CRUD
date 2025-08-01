import React from "react";

const Navbar = () => {
  return (
    <div className=" w-full flex justify-between h-10 items-center px-5 bg-gray-200">
      <div className="w-[10%] h-full  flex items-center font-bold text-lg ">
        <h1>LOGO</h1>
      </div>
      <div className="w-[60%] h-full">
        <ul
          className="w-full h-full
         flex gap-6 list-none items-center font-medium text-sm"
        >
          <li className="cursor-pointer">HOME</li>
          <li className="cursor-pointer">ABOUT</li>
          <li className="cursor-pointer">CONTACT</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
