import { useMemo } from 'react';
import { useGetUserOrderQuery } from '@/redux/services/base.service';

import Loader from '@/components/Landing/Loader';
import { Table } from '@/components/Table';
import { IOrder } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

const OrderHistory = () => {
  const { data: allOrders = [], isLoading } = useGetUserOrderQuery();
  const completeOrders = allOrders.filter((order) => order.statusId === 3);
  
  const columns = useMemo<ColumnDef<IOrder, any>[]>(
    () => [
      {
        header: 'Статус заказа',
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
      },
      {
        header: 'Имя курьера',
        accessorKey: 'courier.user.firstname'
      }
    ],
    []
  );
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <Table id="ProductsTable" data={completeOrders} columns={columns} title="История заказов" />
    </div>
  );
};

export default OrderHistory;
