import { ICourierOrder } from '@/types/courier.types';
import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import {
  useCompleteOrderMutation,
  useGetCourierOrderQuery
} from '@/redux/services/courier.service';
import Loader from '@/components/Landing/Loader';
import { Layout } from '@/components/Layout';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ActionButtons, Table } from '@/components/Table';

import { Button } from '@/components/Forms';
import { ConfirmOrder } from './ConfirmOrder';

import { Edit } from '../User/Edit';
import { Modal } from '@/components/Layout/Modal';
import { toast } from 'react-hot-toast';

const Courier = () => {
  const { data, isLoading } = useGetCourierOrderQuery();
  const [complete] = useCompleteOrderMutation();
  const { user } = useAppSelector((state) => state.auth);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [rowData, setRowData] = useState();
  const handleComplete = async (id: number) => {
    await toast.promise(complete(Number(id)).unwrap(), {
      loading: 'Загрузка...',
      success: 'Подтвержден',
      error: (error) => JSON.stringify(error, null, 2)
    });
  };
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
        header: 'Статус доставки',
        //accessorKey: 'statusId'
        cell: ({ row }) => (row.original.statusId === 2 ? 'Товар в пути' : '')
      },
      {
        header: 'Подтверждение доставки',
        cell: ({ row }) => (
          <ActionButtons
            handleCompleteClick={() => {
              setRowData(row.original);
              setIsOpenModal(true);
            }}
          />
        )
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
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <div className="font-montserrat text-dark-blue">
          <p>Вы действительно хотите взять данный заказ?</p>
        </div>
        <div className="grid grid-cols-2 mt-2 gap-3">
          <Button
            buttonColor="bg-green-700 "
            onClick={() => {
              handleComplete(rowData?.id);
              setIsOpenModal(false);
            }}>
            Да
          </Button>
          <Button buttonColor="bg-gray-500" onClick={() => setIsOpenModal(false)}>
            Нет
          </Button>
        </div>
      </Modal>
    </Layout>
  );
};

export default Courier;
