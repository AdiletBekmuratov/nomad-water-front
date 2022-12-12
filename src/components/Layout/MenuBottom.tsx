import React from 'react';
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const MenuBottom = () => {
  return (
    <div
      className={`bg-white px-20 pt-5 pb-8 fixed w-full bottom-0 flex items-center justify-between md:hidden`}>
      <Link to="/catalog" className={`cursor-pointer`}>
        <AiOutlineHome className={`w-6 h-6 text-dark-blue`} />
      </Link>
      <Link to="/myOrders" className={`cursor-pointer `}>
        <AiOutlineShoppingCart className={`w-6 h-6 text-dark-blue`} />
      </Link>
      <Link to="/catalog" className={`cursor-pointer `}>
        <AiOutlineUser className={`w-6 h-6 text-dark-blue`} />
      </Link>
    </div>
  );
};
