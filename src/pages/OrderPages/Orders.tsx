import React, { useState, useEffect } from 'react';

import { Layout } from '@/components/Layout';
import { useAppSelector } from '@/hooks/useAppSelector';
import Loader from '@/components/Landing/Loader';
import { useLazyGetUserOrderQuery } from '@/redux/services/base.service';
import { Table } from '@/components/Table';
import { ColumnDef } from '@tanstack/react-table';
import { IOrder } from '@/types';
import OrderHistory from '../User/OrderHistory';

const Orders = () => {
  // const { data: allOrders = [] } = useGetUserOrderQuery();
  const [fetchOrders] = useLazyGetUserOrderQuery();
  const [allOrders, setAllOrders] = useState<IOrder>();

  useEffect(() => {
    //@ts-ignore
    fetchOrders().then((res) => setAllOrders(res.data));
  }, [allOrders]);

  const columnsUser = React.useMemo<ColumnDef<IOrder, any>[]>(
    () => [
      {
        header: 'Статус заказа',
        //accessorKey: 'statusId'
        cell: ({ row }) =>
          row.original.statusId === 2 ? (
            <span className="text-blue-400 uppercase">{'в пути'}</span>
          ) : row.original.statusId === 0 ? (
            <span className="text-yellow-400 uppercase">{'В ожидании'}</span>
          ) : row.original.statusId === 1 ? (
            <span className="text-fuchsia-400 uppercase">{'подтвержден'}</span>
          ) : row.original.statusId === 3 ? (
            <span className="text-green-500 uppercase">{'доставлен'}</span>
          ) : (
            <span className="text-red-500 uppercase">{'отменен'}</span>
          )
      },
      {
        header: 'Время заказа',
        accessorKey: 'orderDateTime'
      },
      {
        header: 'Метод оплаты',
        accessorKey: 'paymentMethod.name'
      },
      {
        header: 'Общая цена заказа',
        accessorKey: 'totalPrice'
      },
      {
        header: 'Адрес',
        accessorKey: 'address'
      },
      {
        header: 'Комментарий',
        accessorKey: 'comment'
      }
    ],
    []
  );
  if (!allOrders) {
    return <Loader />;
  }
  //@ts-ignore
  const orders = allOrders.filter((order) => order.statusId !== 3);

  return (
    <Layout className={``}>
      <Table id="ProductsTable" data={orders} columns={columnsUser} title="Текущие заказы" />
      <div className={`border-b-2 border-dotted border-gray-700 py-2 my-3 `}></div>
      <OrderHistory />
    </Layout>
  );
};
export default Orders;
