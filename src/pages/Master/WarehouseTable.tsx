import { useMemo, useState } from 'react';

import { useGetWarehouseIDQuery } from '@/redux/services/base.service';
import { IWarehouse, IWarehouseUpdate } from '@/types';

import { Layout } from '@/components/Layout';
import { Table } from '@/components/Table';
import { ColumnDef } from '@tanstack/table-core';

const WarehouseTable = () => {
  const { data: warehouse } = useGetWarehouseIDQuery(3);
  //   const columns = useMemo<ColumnDef<IWarehouse, any>[]>(
  //     () => [
  //       {
  //         header: 'ID продукта',
  //         accessorKey: 'id'
  //       },
  //       {
  //         header: 'Адрес склада',
  //         accessorKey: 'warehouseAddress'
  //       },
  //       {
  //         header: 'Телефон склада',
  //         accessorKey: 'phone'
  //       }
  //     ],
  //     []
  //   );
  return (
    <Layout>
      <div className={` flex flex-col md:flex-row flex-1 justify-evenly `}>
        <span>
          <strong>ID:</strong>
          {` ${warehouse?.id ? warehouse.id : 'ID'} `}
        </span>
        <span>
          <strong>Адрес: </strong>
          {` ${warehouse?.warehouseAddress ? warehouse.warehouseAddress : 'Адрес'} `}
        </span>
        <span>
          <strong>Телефон склада:</strong>
          {` ${warehouse?.phone ? warehouse.phone : '+7 777 777 77 77'} `}
        </span>

        <span>
          <strong>Дата обновления: </strong>
          {` ${warehouse?.updatedDate ? warehouse.updatedDate : 'Дата обновления'} `}
        </span>
      </div>
      {/* <Table
        id="ProductsTable"
        data={warehouse!}
        columns={columns}
        //onAddClick={() => setVisibleCreate(true)}
        title={`Склад на ${warehouse?.warehouseAddress}`}
      /> */}
    </Layout>
  );
};

export default WarehouseTable;
