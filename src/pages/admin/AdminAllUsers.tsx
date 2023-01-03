import React, { useMemo, useState } from 'react';

import { CreateModal, EditModal } from '@/pages/Couriers';
import LayoutAdmin from '@/components/Admin/LayoutAdmin';
import Loader from '@/components/Landing/Loader';

import { toast } from 'react-hot-toast';
import { ColumnDef, Row } from '@tanstack/react-table';
import { ActionButtons, DeleteModal, Table } from '@/components/Table';
import { IUserFull } from '@/types';
import { useDeleteUserMutation, useGetAllUsersQuery } from '@/redux/services/user.service';

const AdminAllUsers = () => {
  const { data: users = [], isLoading } = useGetAllUsersQuery();

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
        header: 'Имя',
        accessorKey: 'firstname'
      },
      {
        header: 'Отчество',
        accessorKey: 'middleName'
      },
      {
        header: 'Фамилия',
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
        id="AllUsersTable"
        data={users}
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
