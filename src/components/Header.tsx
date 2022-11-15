import React from 'react';
import logo from '../assets/logoHead.png';

export const Header = () => {
  return (
    <div className="container flex items-center justify-between">
      <div className="font-semibold leading-4 text-[#023646]">
        <span className=" opacity-50">KZ </span>
        <span className=""> | RU </span>
      </div>
      <div className=" my-0 mx-auto">
        <img src={logo} alt="logo" width={150} height={35} />
      </div>
      <div className="relative w-[30px] h-[30]">
        <span className="absolute w-[100%] h-[2px] content='' rotate-90"></span>
        <span className="w-[66%] h-[2px] content='' rotate-90"></span>
        <span className="w-[33%] h-[2px] content='' rotate-90"></span>
      </div>
    </div>
  );
};
