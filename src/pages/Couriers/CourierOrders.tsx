import { ConfirmOrder } from './ConfirmOrder';
import { AcceptedOrders } from './AcceptedOrders';

import { Layout } from '@/components/Layout';

const CourierOrders = () => {
  return (
    <Layout>
      <ConfirmOrder />
      <AcceptedOrders />
    </Layout>
  );
};

export default CourierOrders;
