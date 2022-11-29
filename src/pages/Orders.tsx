import React from 'react';
import { Header } from '@/components/Catalog/Header';
import { CardBottle } from '@/components/Catalog';
import { dataBottle } from '@/assets/dataBottle';
import { Link } from 'react-router-dom';
import { MenuBottom } from '@/components/Catalog/MenuBottom';

import avatar from '../assets/crm/avatar.png';
import { Sheet } from '@/components/UI/Sheet';

const Orders = () => {
  const [orderCount, setOrderCount] = React.useState(1);
  const cardStyle = 'bg-white my-4 p-3 flex rounded-3xl justify-between';
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Sheet isOpen={isOpen}>
      <div className={`w-full bg-bg-crm text-dark-blue`}>
        <Header>
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
          <span className="mx-auto font-medium text-base leading-6">Мои заказы</span>
          <img src={avatar} alt="avatar" className={`hidden lg:block mr-4`} />
        </Header>
        <div className={` px-7 lg:px-48 xl:px-72 text-left`}>
          <h2 className={`mt-6 text-sm md:text-base`}>Активные</h2>
          <div className={`${cardStyle}`}>
            {orderCount > 0 &&
              dataBottle
                .slice(0, 1)
                .map((items, id) => (
                  <CardBottle key={id} items={items} isOrders deliveryStatus="inProcess" />
                ))}
            <div className={`flex items-center justify-center mr-3 sm:mr-5`}>
              <Link to="/catalog">
                <svg
                  width="18"
                  height="26"
                  viewBox="0 0 8 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 1L6.72109 7.6746C6.88158 7.86185 6.88158 8.13815 6.72109 8.3254L1 15"
                    stroke="#98A2A5"
                    strokeOpacity="0.3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <h2 className={`my-4 text-sm md:text-base`}>Недавние</h2>
          <div className={`${cardStyle}`}>
            {dataBottle.slice(0, 1).map((items, id) => (
              <CardBottle key={id} items={items} isOrders deliveryStatus="complete" />
            ))}
            <div className={`flex items-center justify-center mr-3 sm:mr-5`}>
              <Link to="/catalog">
                <svg
                  width="18"
                  height="26"
                  viewBox="0 0 8 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 1L6.72109 7.6746C6.88158 7.86185 6.88158 8.13815 6.72109 8.3254L1 15"
                    stroke="#98A2A5"
                    strokeOpacity="0.3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className={`${cardStyle}`}>
            {dataBottle.slice(0, 1).map((items, id) => (
              <CardBottle key={id} items={items} isOrders deliveryStatus="cancel" />
            ))}
            <div className={`flex items-center justify-center mr-3 sm:mr-5`}>
              <Link to="/catalog">
                <svg
                  width="18"
                  height="26"
                  viewBox="0 0 8 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 1L6.72109 7.6746C6.88158 7.86185 6.88158 8.13815 6.72109 8.3254L1 15"
                    stroke="#98A2A5"
                    strokeOpacity="0.3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <MenuBottom />
      </div>
    </Sheet>
  );
};
export default Orders;
