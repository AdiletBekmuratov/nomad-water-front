import React from 'react';
import { Header } from '@/components/Layout/Header';
import { CardBottle } from '@/components/Catalog';
import { dataBottle } from '@/assets/dataBottle';

import { Sheet } from '@/components/Layout/Sheet';
import { Layout } from '@/components/Layout';

import avatar from '../assets/crm/avatar.png';

const Orders = () => {
  const [orderCount, setOrderCount] = React.useState(1);
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Sheet isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={`w-full bg-gray-200 text-dark-blue`}>
        <Header>
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
          <span className="mx-auto font-medium text-base leading-6">Мои заказы</span>
          <img src={avatar} alt="avatar" className={`hidden lg:block mr-4`} />
        </Header>
        <Layout className={`text-left`}>
          <div className={`grid grid-cols-1 gap-4`}>
            <h2 className={`text-sm md:text-base`}>Активные</h2>
            {orderCount > 0 &&
              dataBottle
                .slice(0, 1)
                .map((items, id) => (
                  <CardBottle key={id} items={items} cardType="order" deliveryStatus="inProcess" />
                ))}
          </div>
          <div className={`grid grid-cols-1 gap-4 mt-4`}>
            <h2 className={`text-sm md:text-base`}>Недавние</h2>
            {dataBottle.slice(0, 1).map((items, id) => (
              <CardBottle key={id} items={items} cardType="order" deliveryStatus="complete" />
            ))}
            {dataBottle.slice(0, 1).map((items, id) => (
              <CardBottle key={id} items={items} cardType="order" deliveryStatus="cancel" />
            ))}
          </div>
        </Layout>
      </div>
    </Sheet>
  );
};
export default Orders;
