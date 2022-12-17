import React, { useMemo, useState } from 'react';
import { useGetAllUsersQuery, useDeleteUserMutation } from '@/redux/services/base.service';
import { IUserFull } from '@/types/users.types';

import { CreateModal, EditModal } from '@/components/Admin/Pages/Users';
import LayoutAdmin from '@/components/Admin/LayoutAdmin';
import Loader from '@/components/Loader';

import { toast } from 'react-hot-toast';
import { ColumnDef, Row } from '@tanstack/react-table';
import { ActionButtons, DeleteModal, Table } from '@/components/Table';

const AdminAllUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery();

  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();

  const [rowData, setRowData] = useState<IUserFull>();
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);

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

  const handleEditRowClick = (row: Row<IUserFull>) => {
    setRowData(row.original);
    setVisibleEdit(true);
  };

  const handleDeleteRowClick = (row: Row<IUserFull>) => {
    setRowData(row.original);
    setVisibleDelete(true);
  };

  const columns = useMemo<ColumnDef<IUserFull, any>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id'
      },
      {
        header: 'Фамилия',
        accessorKey: 'firstname'
      },
      {
        header: 'Имя',
        accessorKey: 'middleName'
      },
      {
        header: 'Отчество',
        accessorKey: 'lastname'
      },
      {
        header: 'Статус',
        accessorKey: 'role'
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
        header: 'Улица',
        accessorKey: 'street'
      },
      {
        header: 'Дом',
        accessorKey: 'houseNumber'
      },
      {
        header: 'Кв.',
        accessorKey: 'flat'
      },
      {
        header: 'Этаж',
        accessorKey: 'addressComment'
      },
      {
        header: 'telegram',
        accessorKey: 'telegramAccount'
      },
      {
        header: 'Actions',
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
  if (isLoading) {
    return <Loader />;
  }
  return (
    <LayoutAdmin>
      <Table
        id="WarehousesTable"
        data={data}
        columns={columns}
        onAddClick={() => setVisibleCreate(true)}
      />
      <CreateModal visible={visibleCreate} setVisible={setVisibleCreate} />
      <EditModal data={rowData!} setVisible={setVisibleEdit} visible={visibleEdit} />
      <DeleteModal
        loading={isLoadingDelete}
        handleDelete={handleDelete}
        setVisible={setVisibleDelete}
        visible={visibleDelete}
      />
    </LayoutAdmin>
  );
};
export default AdminAllUsers;