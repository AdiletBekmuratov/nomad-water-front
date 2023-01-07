import { ICourierOrder } from '@/types/courier.types';
import React, { useMemo, useState } from 'react';
import { ActionButtons, Table } from '@/components/Table';
import {
  useConfirmOrdersMutation,
  useGetPendingOrdersQuery
} from '@/redux/services/employee.service';
import Loader from '@/components/Landing/Loader';
import { toast } from 'react-hot-toast';
import { ColumnDef } from '@tanstack/react-table';
import { Modal } from '@/components/Layout/Modal';
import { Button } from '@/components/Forms';

const Pending = () => {
  const { data = [], isLoading, refetch } = useGetPendingOrdersQuery();
  const [accept] = useConfirmOrdersMutation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [rowData, setRowData] = useState();

  setInterval(() => {
    refetch();
  }, 5000);

  const handleAccept = async (id: number) => {
    await toast.promise(accept(Number(id)).unwrap(), {
      loading: 'Загрузка...',
      success: 'Подтвержден',
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
        header: 'Номер телефона',
        accessorKey: 'phone'
      },
      {
        header: 'Полная цена с доставкой',
        accessorKey: 'totalPrice'
      },
      {
        header: 'Действия',
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
  if (data?.length === 0) {
    return (
      <div>
        <h2 className={`text-lg font-bold text-center mb-4`}>Заказы:</h2>
        <p className={`text-base font-semibold text-center mb-4 text-red-600`}>Новых заказов нет</p>
      </div>
    );
  }

  return (
    <div className="py-3">
      <Table data={data!} columns={columns} id="ProductsTable" title="Не подтвержденные заказы" />
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <div className="font-montserrat text-dark-blue">
          <p>Вы действительно хотите подтвердить данный заказ?</p>
        </div>
        <div className="grid grid-cols-2 mt-2 gap-3">
          <Button
            buttonColor="bg-green-700"
            onClick={() => {
              handleAccept(rowData?.id);
              setIsOpenModal(false);
            }}>
            Да
          </Button>
          <Button buttonColor="bg-gray-500" onClick={() => setIsOpenModal(false)}>
            Нет
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Pending;
