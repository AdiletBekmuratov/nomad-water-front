import { Header } from '@/components/Catalog/Header';
import { Sheet } from '@/components/UI/Sheet';
import React from 'react';
import { Link } from 'react-router-dom';
import { MenuBottom } from '@/components/Catalog/MenuBottom';

import logo from '../assets/crm/logoHead.png';
import avatar from '../assets/crm/avatar.png';
import statisticFrame from '../assets/crm/statisticFrame.png';

const Admin = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Sheet isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={`w-full bg-gray-200 text-dark-blue `}>
        <Header>
          <>
            <svg
              onClick={() => setIsOpen((prev) => !prev)}
              className={`hidden lg:block mr-16 cursor-pointer`}
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7.5H21" stroke="#023646" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 12.5H21" stroke="#023646" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 17.5H21" stroke="#023646" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <Link to="/" className={`mx-auto`}>
              <img src={logo} alt="nomadLogo" />
            </Link>

            <Link to="/catalog">
              <img src={avatar} alt="avatar" className={`hidden lg:block mr-4`} />
            </Link>
          </>
        </Header>
        <div className={`px-7 lg:px-48 xl:px-72 text-xs `}>
          <div
            className={`bg-white mb-4 py-5 px-7 flex flex-col items-center mt-6 rounded-2xl
            sm: sm:flex-row-reverse sm:px-20`}>
            <div
              className={`flex flex-col items-center sm:items-start font-semibold sm:ml-24 lg:ml-7 xl:ml-52 `}>
              <span className={`text-sm xl:text-lg leading-4 `}>Статистика по продажам</span>
              <div className={`my-4 xl:text-base`}>
                Заработано: <span className={`text-blue-statisticSum`}>74 838 Т</span>
              </div>
            </div>
            <img src={statisticFrame} alt="statisticFrame" />
          </div>
          <h2 className={`text-sm font-semibold xl:text-xl xl:leading-5 xl:font-bold`}>Запросы</h2>
          <div className={`py-5 px-8 my-4 bg-white rounded-2xl`}>
            <div
              className={`flex justify-between text-sm sm:text-base xl:text-lg font-semibold mb-2`}>
              <h3>Суть запроса</h3>
              <span className={`text-red-600`}>Срочно</span>
            </div>
            <span>Описание запроса. к примеру, отсутствие товаров на складе</span>
          </div>
          <div className={`py-5 px-8 my-4 bg-white rounded-2xl`}>
            <div className={`flex text-sm font-semibold mb-2`}>
              <h3>Жалоба</h3>
            </div>
            <span>Описание запроса. к примеру, отсутствие товаров на складе</span>
          </div>
          <div className={`py-5 px-8 my-4 bg-white rounded-2xl`}>
            <div className={`flex justify-between text-sm font-semibold mb-2`}>
              <h3>Пополнение склада</h3>
              <span className={`text-green-color`}>Выполнено</span>
            </div>
            <span>Описание запроса. к примеру, отсутствие товаров на складе</span>
          </div>
          <div className={`py-5 px-8 my-4 bg-white rounded-2xl`}>
            <div className={`flex justify-between text-sm font-semibold mb-2`}>
              <h3>Ремонт служебной машины</h3>
              <span className={`text-green-color`}>Выполнено</span>
            </div>
            <span>Описание запроса. к примеру, отсутствие товаров на складе</span>
          </div>
          <div className={`py-5 px-8 my-4 bg-white rounded-2xl`}>
            <div className={`flex justify-between text-sm font-semibold mb-2`}>
              <h3>Ремонт служебной машины</h3>
              <span className={`text-green-color`}>Выполнено</span>
            </div>
            <span>Описание запроса. к примеру, отсутствие товаров на складе</span>
          </div>
        </div>
        <MenuBottom />
      </div>
    </Sheet>
  );
};
export default Admin;
