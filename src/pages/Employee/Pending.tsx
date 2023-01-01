import { ICourierOrder } from '@/types/courier.types';
import React, { useMemo } from 'react';
import { ActionButtons, Table } from '@/components/Table';
import {
  useAcceptOrdersMutation,
  useGetPendingOrdersQuery
} from '@/redux/services/employee.service';
import Loader from '@/components/Loader';
import { toast } from 'react-hot-toast';
import { ColumnDef } from '@tanstack/react-table';

const Pending = () => {
  const { data, isLoading } = useGetPendingOrdersQuery();
  const [accept] = useAcceptOrdersMutation();
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
          <ActionButtons handleEditClick={() => handleAccept(Number(row.original.id))} />
        )
      }
    ],
    []
  );
  if (isLoading) {
    return <Loader />;
  }
  console.log(data);

  return (
    <div>
      <Table data={data!} columns={columns} id="ProductsTable" />
    </div>
  );
};

export default Pending;
