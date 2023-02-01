import { useMemo, useState } from 'react';

import { useGetAllOrderQuery } from '@/redux/services/base.service';

import { ICourierOrder } from '@/types/courier.types';

import { ColumnDef } from '@tanstack/react-table';
import { ActionButtons, Table } from '@/components/Table';
import Loader from '@/components/Landing/Loader';
import { Link } from 'react-router-dom';

const AllOrders = () => {
  const { data: allOrders = [], isLoading } = useGetAllOrderQuery();

  const [rowData, setRowData] = useState<ICourierOrder>();

  const columns = useMemo<ColumnDef<ICourierOrder, any>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id'
      },
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
        header: 'Адрес доставки',
        accessorKey: 'address'
      },
      // {
      //   header: 'Комментарий к заказу',
      //   accessorKey: 'comment'
      // },
      {
        header: 'Метод оплаты',
        accessorKey: 'paymentMethod.name'
      },
      {
        header: 'Получатель',
        cell: ({ row }) => (
          <Link
            className={`cursor-pointer text-blue-400 border-b-2`}
            to={`/employee/user/${
              row.original.user ? (row.original.user.id ? row.original.user.id : 'null') : 'null'
            }`}>
            {`${
              row.original.user
                ? row.original.user.firstname
                  ? row.original.user.firstname
                  : 'не указан'
                : 'не указан'
            }`}
          </Link>
        )
        // const user = row.original.user;
      },
      {
        header: 'Полная цена с доставкой',
        accessorKey: 'totalPrice'
      },
      {
        header: 'Курьер',
        cell: ({ row }) => (
          <Link
          className={`cursor-pointer text-blue-400 border-b-2`}
            to={`/employee/user/${
              row.original.courier
                ? row.original.courier.id
                  ? row.original.courier.id
                  : 'null'
                : 'null'
            }`}>
            {`${
              row.original.courier
                ? row.original.courier.user
                  ? row.original.courier.user.firstname
                    ? row.original.courier.user.firstname
                    : 'не указан'
                  : 'не назначен'
                : 'не назначен'
            }`}
          </Link>
        )
      },
      {
        header: 'Действия'
        //   cell: ({ row }) => (
        //     <ActionButtons
        //       handleCompleteClick={() => {
        //         setRowData(row.original);
        //         setIsOpenModal(true);
        //       }}
        //     />
        //   )
      }
    ],
    []
  );
  if (!allOrders) {
    return <Loader />;
  }
  //@ts-ignore
  if (allOrders?.length === 0) {
    return (
      <div>
        <h2 className={`text-lg font-bold text-center mb-4`}>Заказы:</h2>
        <p className={`text-base font-semibold text-center mb-4 text-red-600`}>Новых заказов нет</p>
      </div>
    );
  }
  return <Table data={allOrders!} columns={columns} id="ProductsTable" />;
};

export default AllOrders;
