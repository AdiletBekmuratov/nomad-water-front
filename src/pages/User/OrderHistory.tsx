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
      {
        header: 'Адрес',
        accessorKey: 'address'
      },
      {
        header: 'Комментарий',
        accessorKey: 'comment'
      },
      // {
      //   header: 'Имя курьера',
      //   accessorKey: 'courier.user.firstname'
      // },
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
