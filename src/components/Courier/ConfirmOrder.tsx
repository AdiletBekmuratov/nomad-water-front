import { ICourierOrder } from '@/types/courier.types';
import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { ActionButtons, Table } from '../Table';
import {
  useGetAllConfirmedOrdersQuery,
  useConfirmOrderMutation
} from '@/redux/services/courier.service';
import Loader from '../Loader';
import { toast } from 'react-hot-toast';

export const ConfirmOrder = () => {
  const { data, isLoading } = useGetAllConfirmedOrdersQuery();
  const [confirm] = useConfirmOrderMutation();
  const handleConfirm = async (id: number) => {
    console.log(id);
    await toast.promise(confirm(Number(id)).unwrap(), {
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
        header: 'Метод оплаты',
        accessorKey: 'paymentMethod.name'
      },
      {
        header: 'Полная цена с доставкой',
        accessorKey: 'totalPrice'
      },
      {
        header: 'Действия',
        cell: ({ row }) => (
          <ActionButtons handleEditClick={() => handleConfirm(Number(row.original.id))} />
        )
      }
    ],
    []
  );
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <Table id="ProductsTable" columns={columns} data={data!} />
    </div>
  );
};
