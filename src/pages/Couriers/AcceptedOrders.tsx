import { ICourierOrder } from '@/types/courier.types';
import { ColumnDef } from '@tanstack/react-table';
import React, { FC, useMemo, useState, useEffect, useRef } from 'react';
import { ActionButtons, Table } from '../../components/Table';
import {
  useCompleteOrderMutation,
  useGetCourierOrderQuery
} from '@/redux/services/courier.service';
import Loader from '../../components/Landing/Loader';
import { toast } from 'react-hot-toast';
import { Modal } from '../../components/Layout/Modal';
import { Button } from '../../components/Forms';
import { ConfirmOrder } from './ConfirmOrder';
import { Layout } from '@/components/Layout';

export const AcceptedOrders: FC = () => {
  const [complete] = useCompleteOrderMutation();
  const { data: allOrdersCourier = [], isLoading: courierLoad } = useGetCourierOrderQuery();
  const data = allOrdersCourier.filter((order) => order.statusId === 2);
  const [rowData, setRowData] = useState();

  const [isOpenModal, setIsOpenModal] = useState(false);
  // setTimeout(() => {
  //   refetch();
  // }, 10000);

  const handleComplete = async (id: number) => {
    toast.promise(complete(Number(id)).unwrap(), {
      loading: 'Загрузка...',
      success: 'Доставлен',
      error: (error) => JSON.stringify(error, null, 2)
    });
  };

  const columns = useMemo<ColumnDef<ICourierOrder, any>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id'
      },
      {
        header: 'Адрес доставки',
        accessorKey: 'address'
      },
      {
        header: 'Комментарий',
        accessorKey: 'comment'
      },
      {
        header: 'Метод оплаты',
        accessorKey: 'paymentMethod.name'
      },
      {
        header: 'Полная цена с доставкой',
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
      },
      {
        header: 'Товар доставлен',
        cell: ({ row }) => (
          <ActionButtons
            handleConfirmClick={() => {
              //@ts-ignore
              setRowData(row.original);
              setIsOpenModal(true);
            }}
          />
        )
      }
    ],
    []
  );

  return (
    <Layout>
      <Table id="ProductsTable" columns={columns} data={data!} title="Принятые заказы" />
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <div className="font-montserrat text-dark-blue">
          <p>Вы действительно хотите подтвердить доставку заказа?</p>
        </div>
        <div className="grid grid-cols-2 mt-2 gap-3">
          <Button
            buttonColor="bg-green-700 "
            onClick={() => {
              //@ts-ignore
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
