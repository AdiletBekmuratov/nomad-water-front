import { useGetUserROLEQuery } from '@/redux/services/user.service';
import { IEmployeeCreate } from '@/types';
import { useMemo, useState } from 'react';

import { CreateModal } from '@/components/Admin/AllUsers';
import { EditWorker } from '@/components/Admin/AllUsers/EditWorker';

import LayoutAdmin from '@/components/Admin/LayoutAdmin';
import Loader from '@/components/Landing/Loader';

import { ActionButtons, Table } from '@/components/Table';
import { ColumnDef, Row } from '@tanstack/react-table';

const AdminWorkers = () => {
  const { data: masters = [], isLoading } = useGetUserROLEQuery('ROLE_MASTER');
  const { data: keepers = [] } = useGetUserROLEQuery('ROLE_KEEPER');

  const workers = [...masters, ...keepers];

  const [rowData, setRowData] = useState<IEmployeeCreate>();
  const [visibleCreate, setVisibleCreate] = useState(false);

  const [visibleEdit, setVisibleEdit] = useState(false);

  const handleEditRowClick = (row: Row<IEmployeeCreate>) => {
    setRowData(row.original);
    setVisibleEdit(true);
  };

  const columns = useMemo<ColumnDef<IEmployeeCreate, any>[]>(
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
        header: 'ID Склада',
        accessorKey: 'warehouse.id'
      },
      {
        header: 'Адрес склада',
        accessorKey: 'warehouse.warehouseAddress'
      },
      {
        header: 'Actions',
        cell: ({ row }) => <ActionButtons handleEditClick={() => handleEditRowClick(row)} />
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
        data={workers}
        columns={columns}
        onAddClick={() => setVisibleCreate(true)}
      />

      <CreateModal visible={visibleCreate} setVisible={setVisibleCreate} />
      <EditWorker data={rowData!} setVisible={setVisibleEdit} visible={visibleEdit} />
    </LayoutAdmin>
  );
};

export default AdminWorkers;
