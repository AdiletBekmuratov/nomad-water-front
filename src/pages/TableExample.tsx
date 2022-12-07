import Table from '@/components/Table';
import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo } from 'react';

const data = [
  {
    id: 1,
    name: 'Music'
  },
  {
    id: 2,
    name: 'Movie'
  },
  {
    id: 3,
    name: 'Books'
  }
];

const TableExample = () => {
  const columns = useMemo<ColumnDef<{ id: number; name: string }, any>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id'
      },
      {
        header: 'Name',
        accessorKey: 'name'
      }
    ],
    []
  );

  return (
    <div className="layout h-screen flex justify-center items-center">
      <Table id="example" columns={columns} data={data} />
    </div>
  );
};

export default TableExample;
