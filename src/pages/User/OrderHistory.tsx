import React, { useMemo } from 'react';
import { Table } from '../../components/Table';
import { IOrder } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { useGetUserOrderQuery } from '@/redux/services/base.service';
import Loader from '../../components/Landing/Loader';

const OrderHistory = () => {
  const { data = [], isLoading } = useGetUserOrderQuery();

  const columns = useMemo<ColumnDef<IOrder, any>[]>(
    () => [
      // {
      //   header: 'Имя курьера',
      //   accessorKey: 'courier.user.firstname'
      // },
      {
        header: 'Статус доставки',
        //accessorKey: 'statusId'
        cell: ({ row }) => (row.original.statusId === 2 ? 'Товар в пути' : '')
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
      <Table id="ProductsTable" data={data} columns={columns} />
    </div>
  );
};

export default OrderHistory;
