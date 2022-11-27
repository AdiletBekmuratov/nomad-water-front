import { Header } from '@/components/Catalog/Header';
import { Button } from '@/components/Forms';
import { Link } from 'react-router-dom';
import React from 'react';
import heart from '../assets/crm/orderHeart.png';

const BottlePage = () => {
  return (
    <div className={`w-full bg-bg-crm `}>
      <Header>
        <>
          <Link to="/catalog" className={`flex items-center`}>
            <svg
              width="7"
              height="14"
              viewBox="0 0 7 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 1.16668L1.27891 6.67461C1.11841 6.86186 1.11841 7.13816 1.27891 7.32541L6 12.8333"
                stroke="#98A2A5"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="ml-7 font-medium text-base leading-6">К каталогу</span>
          </Link>
        </>
      </Header>
      <div className={`px-7 lg:px-48 xl:px-72 text-xs`}></div>
      <div className={`bg-white px-7 py-6 pb-8 flex items-center justify-between lg:hidden`}>
        <Button className={`py-3`}>Заказать</Button>
        <img src={heart} alt="favourite" className={`ml-3 w-11 h-11`} />
      </div>
    </div>
  );
};
export default BottlePage;
