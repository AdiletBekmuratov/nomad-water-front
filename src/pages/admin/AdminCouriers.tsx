import { useMemo, useState } from 'react';
import { useDeleteUserMutation, useGetUserROLEQuery } from '@/redux/services/user.service';
import { IUserFull } from '@/types';

import { EditCourier } from '@/components/Admin/Couriers/EditCourier';
import { CreateModal } from '@/components/Admin/AllUsers';

import LayoutAdmin from '@/components/Admin/LayoutAdmin';
import Loader from '@/components/Landing/Loader';

import { ColumnDef, Row } from '@tanstack/react-table';
import { ActionButtons, DeleteModal, Table } from '@/components/Table';
import { toast } from 'react-hot-toast';

const AdminCouriers = () => {
  const { data: couriers = [], isLoading } = useGetUserROLEQuery('ROLE_COURIER');

  const [rowData, setRowData] = useState<IUserFull>();
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);

  const handleEditRowClick = (row: Row<IUserFull>) => {
    setRowData(row.original);
    setVisibleEdit(true);
  };
  const handleDeleteRowClick = (row: Row<IUserFull>) => {
    setRowData(row.original);
    setVisibleDelete(true);
  };

  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
  const columns = useMemo<ColumnDef<IUserFull, any>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id'
      },
      {
        header: 'Фамилия',
        accessorKey: 'lastname'
      },
      {
        header: 'Имя',
        accessorKey: 'firstname'
      },

      {
        header: 'Отчество',
        accessorKey: 'middleName'
      },
      {
        header: 'Д.Р.',
        accessorKey: 'birthday'
      },
      {
        header: 'Телефон',
        accessorKey: 'phone'
      },
      {
        header: 'telegram',
        accessorKey: 'telegramAccount'
      },
      {
        header: 'авто',
        accessorKey: 'car'
      },
      {
        header: 'Выполненые заказы',
        accessorKey: 'successfulOrders'
      },

      {
        header: 'Изменить \n Деактивировать',
        cell: ({ row }) => (
          <ActionButtons
            handleEditClick={() => handleEditRowClick(row)}
            handleDeleteClick={() => handleDeleteRowClick(row)}
          />
        )
      }
    ],
    []
  );
  const handleDelete = async () => {
    toast
      .promise(deleteUser(rowData!.id!).unwrap(), {
        loading: 'Loading',
        success: 'Deleted Successfully',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {
        setVisibleDelete(false);
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <LayoutAdmin>
      <Table
        id="CouriersTable"
        data={couriers}
        columns={columns}
        onAddClick={() => setVisibleCreate(true)}
        title="Список курьеров"
      />
      <CreateModal visible={visibleCreate} setVisible={setVisibleCreate} />

      <EditCourier data={rowData!} setVisible={setVisibleEdit} visible={visibleEdit} />
      <DeleteModal
        loading={isLoadingDelete}
        handleDelete={handleDelete}
        setVisible={setVisibleDelete}
        visible={visibleDelete}
      />
    </LayoutAdmin>
  );
};

export default AdminCouriers;
