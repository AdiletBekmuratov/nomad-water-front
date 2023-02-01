import { useMemo, useState } from 'react';

import Loader from '@/components/Landing/Loader';
import { ActionButtons, DeleteModal, Table } from '@/components/Table';

import { useGetAllProductsQuery, useDeleteProductMutation } from '@/redux/services/base.service';
import { IProduct } from '@/types/products.type';
import { ColumnDef, Row } from '@tanstack/react-table';

import LayoutAdmin from '@/components/Admin/LayoutAdmin';

import { EditProducts } from '@/components/Admin/Products';

const EmployeeAllProducts = () => {
  const { data: allProducts = [], isLoading } = useGetAllProductsQuery();
  const products = allProducts.filter((prod) => prod.inStock === true);

  const [rowData, setRowData] = useState<IProduct>();

  const [visibleEdit, setVisibleEdit] = useState(false);

  const handleEditRowClick = (row: Row<IProduct>) => {
    setRowData(row.original);
    setVisibleEdit(true);
  };

  const columns = useMemo<ColumnDef<IProduct, any>[]>(
    () => [
      // {
      //   header: 'ID продукта',
      //   accessorKey: 'id'
      // },
      {
        header: 'Категория продукта',
        accessorKey: 'productCategory.name'
      },
      {
        header: 'Имя',
        accessorKey: 'productName'
      },
      {
        header: 'Image',
        accessorKey: 'imageUrl',
        cell: ({ getValue }) => <img src={getValue()} alt={getValue()} className={`w-16 h-auto`} />
      },

      {
        header: 'Описание',
        accessorKey: 'description',
        cell: ({ getValue }) => <>{getValue().slice(0, 20)}...</>
      },

      {
        header: 'Цена продукта',
        accessorKey: 'productPrice'
      },
      // {
      //   header: 'Дата создания',
      //   accessorKey: 'createdDate'
      // },
      {
        header: 'Дата обновления',
        accessorKey: 'updatedDate'
      },

      {
        header: 'Изменить поля продукта',
        cell: ({ row }) =><ActionButtons handleEditClick={() => handleEditRowClick(row)} />
      }
    ],
    []
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Table id="ProductsTable" data={products} columns={columns} />

      <EditProducts data={rowData!} setVisible={setVisibleEdit} visible={visibleEdit} />
    </>
  );
};

export default EmployeeAllProducts;
