import React from 'react';

import { dataBottle } from '@/assets/dataBottle';
import { Layout } from '@/components/Layout';
import { CardBottle } from '@/components/Catalog/CardBottle/CardBottle';

const Orders = () => {
  const [orderCount, setOrderCount] = React.useState(1);
  return (
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
  );
};
export default Orders;
