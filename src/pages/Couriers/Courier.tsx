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



const Courier = () => {
  const { data: allOrders = [], isLoading, refetch } = useGetCourierOrderQuery();
 // const acceptOrders = allOrders.filter((order) => order.statusId === 2);
  const completeOrders = allOrders.filter((order) => order.statusId === 3);
  setTimeout(() => {
    refetch();
  }, 10000);

  const { user } = useAppSelector((state) => state.auth);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const columns = useMemo<ColumnDef<ICourierOrder, any>[]>(
    () => [
      {
        header: 'Адрес доставки',
        accessorKey: 'address'
      },

      {
        header: 'Комментарий',
        accessorKey: 'comment'
      },
      {
        header: 'Имя клиента',
        accessorKey: 'user.firstname'
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
        header: 'Сумма',
        accessorKey: 'totalPrice'
      },
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
      }
    ],
    []
  );
  if (isLoading) {
    return <Loader />;
  }
  const styleP = `text-sm md:text-base bg-white rounded-md px-3 grid grid-cols-2`;
  return (
    <Layout>
      <div className={``}>
        <div className="flex flex-col  ">
          <h1 className="font-montserrat text-xl font-semibold text-center text-dark-blue ">
            Мои данные
          </h1>
          <div
            className={`font-montserrat text-dark-blue grid grid-cols-1 lg:grid-cols-3 mt-2 gap-5 lg:gap-3 py-3`}>
            <div className="grid gap-2 ">
              <p className={`${styleP}`}>
                <strong>Фамилия: </strong> <span>{` ${user?.lastname} `}</span>
              </p>
              <p className={`${styleP}`}>
                <strong>Имя: </strong> {` ${user?.firstname} `}
              </p>
              <p className={`${styleP}`}>
                <strong>Отчество: </strong>{' '}
                {` ${user?.middleName ? user?.middleName : 'Не заполнено'} `}
              </p>
            </div>
            <div className="grid gap-2 ">
              <p className={`${styleP}`}>
                <strong>День рождения: </strong> {` ${user?.birthday ? user?.birthday : ''}`}
              </p>
              <p className={`${styleP}`}>
                <strong>Телефон: </strong> <span>{` ${user?.phone} `}</span>
              </p>
              <p className={`${styleP}`}>
                <strong>Telegram: </strong>{' '}
                {` ${user?.telegramAccount ? user?.telegramAccount : 'Не заполнено'} `}
              </p>
              {/* <p className={`${styleP}`}>
              <strong>Почта: </strong> {` ${user?.email ? user?.email : 'Не заполнено'} `}
            </p> */}
            </div>
            <div className="grid gap-2 ">
              <p className={`${styleP}`}>
                <strong>Улица: </strong>{' '}
                <span>{` ${user?.street ? user?.street : 'Не заполнено'} `}</span>
              </p>
              <p className={`${styleP}`}>
                <strong>Дом: </strong>{' '}
                {` ${user?.houseNumber ? user?.houseNumber : 'Не заполнено'} `}
              </p>
              <p className={`${styleP}`}>
                <strong>Квартира: </strong> {` ${user?.flat ? user?.flat : 'Не заполнено'} `}
              </p>
            </div>
          </div>
          <div className={`flex justify-center py-2`}>
            <Button className={`w-80`} onClick={() => setIsOpenEdit(true)}>
              Изменить данные
            </Button>
            <Edit setVisible={setIsOpenEdit} visible={isOpenEdit} data={user!} />
          </div>
        </div>
        <div className={`border-b-2 border-dotted border-gray-700 py-2`}></div>
        {/* <div className="mt-2">
          <AcceptOrder data={acceptOrders} />
        </div>
        <div className={`border-t-2 border-dotted border-gray-700 py-2`}></div>
        <div>
          <ConfirmOrder />
        </div>
        <div className={`border-b-2 border-dotted border-gray-700 py-2`}></div> */}
        <div className="mt-2">
          <Table
            columns={columns}
            id="ProductsTable"
            data={completeOrders!}
            title="Выполненные заказы"
          />
        </div>
        <Edit setVisible={setIsOpenEdit} visible={isOpenEdit} data={user!} />
      </div>
    </Layout>
  );
};

export default Courier;
