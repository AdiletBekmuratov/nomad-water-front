import LayoutAdmin from '@/components/Admin/LayoutAdmin';
import Loader from '@/components/Loader';
import { ActionButtons, DeleteModal, Table } from '@/components/Table';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

import { ColumnDef, Row } from '@tanstack/react-table';
import { useDeleteWorkerMutation, useGetAllWorkerQuery } from '@/redux/services/base.service';
import { CreateEmployee } from '@/components/Admin/Pages/Employee';
import { IWorker } from '@/types/warehouseWorker.types';
import { EditWorker } from '@/components/Admin/Pages/Employee/EditEmployee';

const AdminEmployee = () => {
  const { data, isLoading } = useGetAllWorkerQuery();
  const [deleteWorkder, { isLoading: isLoadingDelete }] = useDeleteWorkerMutation();

  const [rowData, setRowData] = useState<IWorker>();
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  console.log(data);
  const handleDelete = async () => {
    toast
      .promise(deleteWorkder(rowData!.id!).unwrap(), {
        loading: 'Loading',
        success: 'Deleted Successfully',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {
        setVisibleDelete(false);
      });
  };
  const handleEditRowClick = (row: Row<IWorker>) => {
    setRowData(row.original);
    setVisibleEdit(true);
  };

  const handleDeleteRowClick = (row: Row<IWorker>) => {
    setRowData(row.original);
    setVisibleDelete(true);
  };

  const columns = useMemo<ColumnDef<IWorker, any>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id'
      },
      {
        header: 'Телефон магазина',
        accessorKey: 'shopkeeperPhone'
      },
      {
        header: 'ID работника',
        accessorKey: 'user.id'
      },
      {
        header: 'Роль работника',
        accessorKey: 'user.role'
      },
      {
        header: 'Фамилия работника',
        accessorKey: 'user.firstname'
      },
      {
        header: 'Фамилия работника',
        accessorKey: 'user.middleName'
      },
      {
        header: 'Отчество работника',
        accessorKey: 'user.lastname'
      },
      {
        header: 'ID Склада',
        accessorKey: 'warehouse.id'
      },
      {
        header: 'Адрес склада',
        accessorKey: 'warehouse.warehouseAddress'
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
        id="ProductsTable"
        data={data}
        columns={columns}
        onAddClick={() => setVisibleCreate(true)}
      />

      <CreateEmployee visible={visibleCreate} setVisible={setVisibleCreate} />
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

export default AdminEmployee;
