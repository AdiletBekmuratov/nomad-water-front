import { useMemo } from 'react';

import { useGetAllProductsQuery } from '@/redux/services/base.service';
import { IProduct } from '@/types';

import { ColumnDef } from '@tanstack/table-core';
import { ActionButtons, Table } from '@/components/Table';

const MasterAllProduct = () => {
  const { data=[], isLoading } = useGetAllProductsQuery();
  const columns = useMemo<ColumnDef<IProduct, any>[]>(
    () => [
      {
        header: 'ID продукта',
        accessorKey: 'id'
      },
      // {
      //   header: 'Категория продукта',
      //   accessorKey: 'productCategory.name'
      // },
      {
        header: 'Имя',
        accessorKey: 'productName'
      },
      // {
      //   header: 'Image',
      //   accessorKey: 'imageUrl',
      //   cell: ({ getValue }) => <img src={getValue()} alt={getValue()} className={`w-16 h-auto`} />
      // },

      {
        header: 'Описание',
        accessorKey: 'description',
        cell: ({ getValue }) => <>{getValue().slice(0, 20)}...</>
      },

      // {
      //   header: 'Цена продукта',
      //   accessorKey: 'productPrice'
      // },
      // {
      //   header: 'Дата создания',
      //   accessorKey: 'createdDate'
      // },
      // {
      //   header: 'Дата обновления',
      //   accessorKey: 'updatedDate'
      // },

      {
        header: 'Добавить \n Убрать',
        cell: ({ row }) => (
          <ActionButtons
            // handleEditClick={() => handleEditRowClick(row)}
            // handleDeleteClick={() => handleDeleteRowClick(row)}
          />
        )
      }
    ],
    []
  );
  return (
    <>
      <Table id="ProductsTable" data={data} columns={columns} title="Все продукты" />
    </>
  );
};

export default MasterAllProduct;
