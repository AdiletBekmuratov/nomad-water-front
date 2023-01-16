import React, { useMemo, useState } from 'react';
import LayoutAdmin from '@/components/Admin/LayoutAdmin';

import { toast } from 'react-hot-toast';
import { ColumnDef, Row } from '@tanstack/react-table';
import { ActionButtons, DeleteModal, Table } from '@/components/Table';
import { IUserFull } from '@/types';
import { useDeleteUserMutation, useGetAllUsersQuery } from '@/redux/services/user.service';
import { CreateModal, EditModalUser } from '@/components/Admin/AllUsers';
import Loader from '@/components/Landing/Loader';
import { EditModalCourier } from '@/components/Admin/AllUsers'; 
import { EditWorker } from '../../components/Admin/AllUsers/EditWorker';

const AdminAllUsers = () => {
  const { data: users = [], isLoading } = useGetAllUsersQuery();

  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();

  const [rowData, setRowData] = useState<IUserFull>();
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [role, setRole] = useState('');

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
    setRole(row.original.role);
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
      <>
        {role === 'ROLE_USER' || role === 'ROLE_EMPLOYEE' ? (
          <EditModalUser data={rowData!} setVisible={setVisibleEdit} visible={visibleEdit} />
        ) : role === 'ROLE_COURIER' ? (
          <EditModalCourier data={rowData!} setVisible={setVisibleEdit} visible={visibleEdit} />
        ) : role === 'ROLE_MASTER' || role === 'ROLE_KEEPER' ? (
          <EditWorker data={rowData!} setVisible={setVisibleEdit} visible={visibleEdit} />
        ) : (
          ''
        )}
      </>

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
