import { ICourierOrder } from '@/types/courier.types';
import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { useGetCourierOrderQuery } from '@/redux/services/courier.service';
import Loader from '@/components/Landing/Loader';
import { Layout } from '@/components/Layout';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Table } from '@/components/Table';

import { Button } from '@/components/Forms';
import { ConfirmOrder } from './ConfirmOrder';

import { Edit } from '../User/Edit';

const Courier = () => {
  const { data, isLoading } = useGetCourierOrderQuery();
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
        header: 'Общая цена заказа с доставкой',
        accessorKey: 'totalPrice'
      },
      {
        header: 'Статус доставки',
        //accessorKey: 'statusId'
        cell: ({ row }) => (row.original.statusId === 2 ? 'Товар в пути' : '')
      }
    ],
    []
  );
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className={`h-screen`}>
        <div className="flex flex-col items-start ">
          <div className="text-dark-blue font-montserrat">
            <strong>Профиль курьера:</strong>
            <p>
              {user?.firstname} {user?.lastname}
            </p>
          </div>
          <Button className={`w-48 bg-medium-blue`} onClick={() => setIsOpenEdit(true)}>
            Изменить данные
          </Button>
        </div>
        <div className={`border-b-2 border-dotted border-gray-700 py-2`}></div>
        <div className="mt-2">
          {/* <p className="text-dark-blue text-xl text-center font-montserrat font-medium">Заказы</p> */}
          <Table columns={columns} id="ProductsTable" data={data!} title="Принятые заказы" />
        </div>
        <div className={`border-t-2 border-dotted border-gray-700 py-2`}></div>
        <div>
          <ConfirmOrder />
        </div>
        <Edit setVisible={setIsOpenEdit} visible={isOpenEdit} data={user!} />
      </div>
    </Layout>
  );
};

export default Courier;
