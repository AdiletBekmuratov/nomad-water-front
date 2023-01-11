import React from 'react';

import { Layout } from '@/components/Layout';
import { useAppSelector } from '@/hooks/useAppSelector';
import Loader from '@/components/Landing/Loader';
import { useGetUserOrderQuery } from '@/redux/services/base.service';
import { Table } from '@/components/Table';
import { ColumnDef } from '@tanstack/react-table';
import { IOrder } from '@/types';
import OrderHistory from '../User/OrderHistory';
import { AcceptOrder } from '../Couriers/AcceptOrder';
import { ConfirmOrder } from '../Couriers';
import { useGetCourierOrderQuery } from '@/redux/services/courier.service';

const Orders = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const { data: allOrders = [], refetch } = useGetUserOrderQuery();
  const { data: allOrdersCourier = [], isLoading: courierLoad } = useGetCourierOrderQuery();
  const acceptOrders = allOrdersCourier.filter((order) => order.statusId === 2);

  const orders = allOrders.filter((order) => order.statusId !== 3);
  const columnsUser = React.useMemo<ColumnDef<IOrder, any>[]>(
    () => [
      // {
      //   header: 'Имя курьера',
      //   accessorKey: 'courier.user.firstname'
      // },
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
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Layout className={``}>
      {user?.role === 'ROLE_USER' ? (
        <div>
          <Table id="ProductsTable" data={orders} columns={columnsUser} title="Текущие заказы" />
          <div className={`border-b-2 border-dotted border-gray-700 py-2 my-3 `}></div>
          <OrderHistory />
        </div>
      ) : user?.role === 'ROLE_COURIER' ? (
        <div className="">
          <div className="mt-2">
            <AcceptOrder data={acceptOrders} />
          </div>
          <div className={`border-t-2 border-dotted border-gray-700 py-2`}></div>
          <div>
            <ConfirmOrder />
          </div>
        </div>
      ) : (
        <div className=" text-center">
          <h1>У вас нет доступа к заказам, обратитесь к администратору</h1>
        </div>
      )}
    </Layout>
  );
};
export default Orders;
