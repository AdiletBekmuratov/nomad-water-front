import { ICourierOrder } from '@/types/courier.types';
import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { useGetCourierOrderQuery } from '@/redux/services/courier.service';
import Loader from '@/components/Landing/Loader';
import { Layout } from '@/components/Layout';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Table } from '@/components/Table';

import { Button } from '@/components/Forms';
// import { ConfirmOrder } from './ConfirmOrder';
// import { AcceptOrder } from './AcceptOrder';
import { Edit } from '../User/Edit';
import { AcceptOrder } from './AcceptOrder';

const Courier = () => {
  // const acceptOrders = allOrders.filter((order) => order.statusId === 2);

  return (
    <Layout>
      <AcceptOrder />
    </Layout>
  );
};

export default Courier;
