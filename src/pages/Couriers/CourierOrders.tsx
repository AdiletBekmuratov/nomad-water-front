import { ConfirmOrder } from './ConfirmOrder';
import { AcceptedOrders } from './AcceptedOrders';

import { Layout } from '@/components/Layout';
import { useState } from 'react';

const CourierOrders = () => {
  const [click, setClick] = useState(false);

  return (
    <Layout>
      <ConfirmOrder setClick={setClick} />
      <AcceptedOrders click={click} setClick={setClick} />
    </Layout>
  );
};

export default CourierOrders;
