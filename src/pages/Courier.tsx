import { ICourierOrder } from '@/types/courier.types';
import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { useGetCourierOrderQuery } from '@/redux/services/courier.service';
import Loader from '@/components/Loader';
import { Layout } from '@/components/Layout';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Table } from '@/components/Table';
import { Edit } from '@/components/User/Edit';
import { Button } from '@/components/Forms';
import { ConfirmOrder } from '@/components/Courier';

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
        header: 'Номер дома',
        accessorKey: 'user.houseNumber'
      },
      {
        header: 'Квартира',
        accessorKey: 'user.flat'
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
        header: 'Статус доставки',
        accessorKey: 'statusId'
      },
      {
        header: 'Метод оплаты',
        accessorKey: 'paymentMethod.name'
      },
      {
        header: 'Общая цена заказа с доставкой',
        accessorKey: 'totalPrice'
      }
    ],
    []
  );
  if (isLoading) {
    return <Loader />;
  }
  console.log(data);
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="text-dark-blue font-montserrat">
          <strong>Профиль курьера:</strong> {user?.firstname} {user?.lastname}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-dark-blue text-xl text-center font-montserrat font-medium">
          История заказов
        </p>
        <Button onClick={() => setIsOpenEdit(true)}>Изменить данные</Button>
        <Table columns={columns} id="ProductsTable" data={data!} />
      </div>
      <div>
        <p className="text-dark-blue font-montserrat mb-2 text-xl text-center font-medium">
          Не принятые заказы:
        </p>
        <ConfirmOrder />
      </div>
      <Edit setVisible={setIsOpenEdit} visible={isOpenEdit} data={user!} />
    </Layout>
  );
};

export default Courier;
