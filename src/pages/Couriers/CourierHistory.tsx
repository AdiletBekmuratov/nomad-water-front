import { useMemo } from 'react';

import { useGetCourierOrderQuery } from '@/redux/services/courier.service';
import { IOrder } from '@/types';

import Loader from '../../components/Landing/Loader';
import { Table } from '../../components/Table';
import { ColumnDef } from '@tanstack/react-table';

const CourierHistory = () => {
  const { data: allOrders = [], isLoading} = useGetCourierOrderQuery();
  const completeOrders = allOrders.filter((order) => order.statusId === 3);

  const columns = useMemo<ColumnDef<IOrder, any>[]>(
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
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <Table id="ProductsTable" data={completeOrders} columns={columns} title="Выполненные заказы" />
    </div>
  );
};

export default CourierHistory;
