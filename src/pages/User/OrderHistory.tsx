import { useMemo } from 'react';
import { useGetUserOrderQuery } from '@/redux/services/base.service';

import Loader from '@/components/Landing/Loader';
import { Table } from '@/components/Table';
import { IOrder } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { Button } from '@/components/Forms';
import { BsFillCartFill } from 'react-icons/bs';
import { useAppSelector } from '@/hooks';
import { ICourierOrder } from '@/types/courier.types';

export const OrderHistory = () => {
  const { data: allOrders = [], isLoading } = useGetUserOrderQuery();
  const completeOrders = allOrders.filter((order) => order.statusId === 3);
  const { products = [] } = useAppSelector((state) => state.cart);
  const columns = useMemo<ColumnDef<ICourierOrder, any>[]>(
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
        header: 'Курьер',
        cell: ({ row }) => (
          
            
              row.original.courier
                ? row.original.courier.user
                  ? row.original.courier.user.firstname
                    ? row.original.courier.user.firstname
                    : 'не указан'
                  : 'не назначен'
                : 'не назначен'
        )}
    ],
    []
  );
  if (isLoading) {
    return <Loader />;
  }
  //@ts-ignore
  if (completeOrders?.length === 0) {
    return (
      <div className="flex items-center flex-col gap-3">
        <h2 className={`text-xl font-semibold `}>Завершенные заказы</h2>
        <h2 className={`text-lg font-semibold text-red-600`}> Завершенных заказов нет!</h2>
        <span>Чтобы оформить заказ перейдите в каталог:</span>
        <Link to="/catalog">
          <Button className={`w-32 hover:bg-blue-900`}>В каталог</Button>
        </Link>
        {products.length > 0 && (
            <>
              <span>Либо продолжите офромление в корзине:</span>
              <Link to="/order">
                <BsFillCartFill className="h-10 w-10 cursor-pointer" />
              </Link>
            </>
          )}
      </div>
    );
  }
  return (
    <div>
      <Table id="ProductsTable" data={completeOrders} columns={columns} title="История заказов" />
    </div>
  );
};


