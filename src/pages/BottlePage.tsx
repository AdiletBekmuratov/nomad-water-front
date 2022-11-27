import React from 'react';
import { dataBottle } from '@/assets/dataBottle';
import { Header } from '@/components/Catalog/Header';
import { Button } from '@/components/Forms';
import { Link, useParams } from 'react-router-dom';
import { Counter } from '@/components/Catalog/CardBottle/Counter';

import heart from '../assets/crm/orderHeart.png';
import bottleXs from '../assets/crm/bottleXs.png';
import bottleXl from '../assets/crm/bottleXl.png';
import bottle2X from '../assets/crm/bottle2X.png';
import { CardBottle } from '@/components/Catalog';

const BottlePage = () => {
  const { id } = useParams();
  const urlId = parseInt(id);
  const bottle = dataBottle.find((item) => item.id === urlId);
  const [counter, setCounter] = React.useState<number>(1);
  return (
    <div className={`w-full bg-bg-crm text-dark-blue`}>
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
      <div className={`grid sm:grid-flow-col px-7 pt-8 lg:px-48 xl:px-72 text-lg`}>
        <div>
          <div className={`flex justify-center `}>
            <img
              src={heart}
              alt="favourite"
              className={`ml-3 w-11 h-11 hidden sm:block absolute top-4 right-3 `}
            />
            <img src={bottleXs} alt="bottleXs" className={`sm:hidden`} />
            <img src={bottleXl} alt="bottleXs" className={`hidden md:block lg:hidden`} />
            <img src={bottle2X} alt="bottleXs" className={`hidden lg:block`} />
          </div>
          <div className={`mt-5 flex flex-col items-start sm:bg-white sm:p-5 sm:rounded-2xl`}>
            <h2 className={`font-semibold`}>{bottle.title}</h2>
            <p className={`text-sm opacity-60 sm:mt-4 sm:mb-2`}>{bottle.discription}</p>
            <div className={`text-sm grid grid-cols-2 justify-start gap-x-2`}>
              <span>Доставка:</span>
              <p className={`opacity-60`}>Сегодня до 16:00</p>
              <span>Объем:</span>
              <p className={`opacity-60`}>50 л</p>
            </div>
            {bottle.availability ? (
              <span className={`text-base text-green-color font-semibold `}>В наличии</span>
            ) : (
              <span className={`text-base text-red-600 font-semibold `}>Нет в наличии</span>
            )}
          </div>
        </div>

        <div
          className={`sm:bg-white  mt-2 sm:mt-0 sm:rounded-3xl sm:ml-5 sm:mb-72 sm:p-5 sm:flex sm:flex-col `}>
          <span className={`text-left text-sm font-semibold opacity-50 hidden sm:block sm:mb-4  `}>
            Заказать
          </span>
          <div className={`flex items-center justify-between`}>
            <h2 className={`text-lg font-semibold sm:`}>{bottle.price} T</h2>
            <Counter counter={counter} setCounter={setCounter} />
          </div>
          <Button className={`py-3 hidden sm:block`}>Заказать</Button>
        </div>
      </div>

      <div className={`border-b border-solid border-y border-gray-300 my-5 md:border-none`}></div>

      <div className={`px-7 text-lg lg:pt-8 lg:px-48 xl:px-72`}>
        <h2>Рекомендации</h2>
        <div className={`grid gap-x-4 gap-y-6 pt-6 grid-cols-2 sm:grid-cols-1 `}>
          {dataBottle.slice(0, 2).map((items, id) => (
            <CardBottle key={id} items={items} />
          ))}
        </div>
      </div>

      <div
        className={`bg-white px-7 py-6 sticky bottom-0 w-full flex items-center justify-between sm:hidden`}>
        <Button className={`py-3`}>Заказать</Button>
        <img src={heart} alt="favourite" className={`ml-3 w-11 h-11`} />
      </div>
    </div>
  );
};
export default BottlePage;
