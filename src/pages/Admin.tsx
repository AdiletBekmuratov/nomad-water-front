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
    <Sheet isOpen={isOpen}>
      <div className={`w-full  bg-bg-crm text-dark-blue `}>
        <Header>
          <>
            <button onClick={() => setIsOpen((prev) => !prev)}>
              <svg
                className={`hidden lg:block mr-16`}
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7.5H21" stroke="#023646" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3 12.5H21" stroke="#023646" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3 17.5H21" stroke="#023646" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <Link to="/" className={`mx-auto`}>
              <img src={logo} alt="nomadLogo" />
            </Link>

            <Link to="/myAdmin">
              <img src={avatar} alt="avatar" className={`hidden lg:block mr-4`} />
            </Link>
          </>
        </Header>
        <div className={`px-7 lg:px-48 xl:px-72 text-xs `}>
          <div
            className={`bg-white py-5 px-7 flex flex-col items-center mt-6 rounded-2xl
            sm: sm:flex-row-reverse `}>
            <div className={`flex flex-col items-center sm:items-start font-semibold`}>
              <span className={`text-sm leading-4 `}>Статистика по продажам</span>
              <div className={`my-4`}>
                Заработано: <span className={`text-blue-statisticSum`}>74 838 Т</span>
              </div>
            </div>

            <img src={statisticFrame} alt="statisticFrame" />
          </div>
        </div>
        <MenuBottom />
      </div>
    </Sheet>
  );
};
export default Admin;
