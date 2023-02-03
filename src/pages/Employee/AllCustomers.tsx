import { useMemo, useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { Table } from '@/components/Table';
import { IUserFull } from '@/types';
import { useGetAllUsersQuery, useGetUserROLEQuery } from '@/redux/services/user.service';

import Loader from '@/components/Landing/Loader';
import { Link } from 'react-router-dom';

const AllCustomers = () => {
 
  const { data: users = [], isLoading } = useGetUserROLEQuery('ROLE_USER');

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
        header: 'Микрорайон  Улица',
        cell: ({ row }) => (
          row.original.profiles ? row.original.profiles[0] ? row.original.profiles[0].street : null : null
          )
      },
      {
        header: 'Дом',
        cell: ({ row }) => (
          row.original.profiles ? row.original.profiles[0] ? row.original.profiles[0].houseNumber : null : null
          )
      },
      {
        header: 'Кв.',
        cell: ({ row }) => (
          row.original.profiles ? row.original.profiles[0] ? row.original.profiles[0].flat : null : null
          )
      },
      {
        header: 'Частота заказов',
        cell: ({ row }) =>
          row.original.color === 'green' ? (
            <span className="text-green-500 uppercase">{'часто'}</span>
          ) : row.original.color === 'yellow' ? (
            <span className="text-yellow-500 uppercase">{'средне'}</span>
          ) : row.original.color === 'red' &&  <span className="text-red-500 uppercase">{'редко'}</span>
      
      },
      {
        header: 'Карточка клиента',
        cell: ({ row }) => (
          <Link
            className={`cursor-pointer text-blue-400 border-b-2`}
            to={`/employee/user/${row.original.id ? row.original.id : null}`}>
            Открыть
          </Link>
        )
      }
    ],
    []
  );
  if (isLoading) {
    return <Loader />;
  }
  return <Table id="AllUsersTable" data={users} columns={columns} />;
};
export default AllCustomers;
