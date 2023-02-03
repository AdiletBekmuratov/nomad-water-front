import { useDeleteUserMutation, useGetUserROLEQuery } from '@/redux/services/user.service';
import { IUserFull, IUserFull } from '@/types';
import { useMemo, useState } from 'react';

import { CreateModal } from '@/components/Admin/AllUsers';
import { EditWorker } from '@/components/Admin/AllUsers/EditWorker';

import LayoutAdmin from '@/components/Admin/LayoutAdmin';
import Loader from '@/components/Landing/Loader';

import { ActionButtons, DeleteModal, Table } from '@/components/Table';
import { ColumnDef, Row } from '@tanstack/react-table';
import { toast } from 'react-hot-toast';

const AdminWorkers = () => {
  const { data: masters = [], isLoading } = useGetUserROLEQuery('ROLE_MASTER');
  const { data: keepers = [] } = useGetUserROLEQuery('ROLE_KEEPER');
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
  const [visibleDelete, setVisibleDelete] = useState(false);

  const workers = [...masters, ...keepers];

  const [rowData, setRowData] = useState<IUserFull>();
  const [visibleCreate, setVisibleCreate] = useState(false);

  const [visibleEdit, setVisibleEdit] = useState(false);

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
        header: 'Адрес склада',
        accessorKey: 'warehouseId'
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
        id="ProductsTable"
        data={workers}
        columns={columns}
        onAddClick={() => setVisibleCreate(true)}
        title="Список работников"
      />

      <CreateModal visible={visibleCreate} setVisible={setVisibleCreate} />
      <EditWorker data={rowData!} setVisible={setVisibleEdit} visible={visibleEdit} />
      <DeleteModal
        loading={isLoadingDelete}
        handleDelete={handleDelete}
        setVisible={setVisibleDelete}
        visible={visibleDelete}
      />
    </LayoutAdmin>
  );
};

export default AdminWorkers;
