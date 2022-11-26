import { CardBottle } from '@/components/Crm';
import { Header } from '@/components/Crm/Header';
import { Button } from '@/components/Forms';
import React from 'react';
import { Link } from 'react-router-dom';

const BottlePage = () => {
  return (
    <div className={`w-full bg-bg-crm`}>
      <Header>
        <>
          <Link to="/" className={`flex items-center`}>
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

      <Button>Заказать</Button>
    </div>
  );
};
export default BottlePage;
