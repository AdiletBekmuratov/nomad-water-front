import { SheetAdmin } from '@/components/Admin/SheetAdmin';
import Table from '@/components/Table';
import { Header } from '@/components/Layout';
import React from 'react';
import { Link } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { dataUsers } from '@/assets/dataUsers';

import avatar from '../assets/crm/avatar.png';
import logo from '../assets/crm/logoHead.png';
import { AiOutlineMenuUnfold } from 'react-icons/ai';

const Admin = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const columns = React.useMemo<ColumnDef<{ id: number; name: string }, any>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id'
      },
      {
        header: 'firstName',
        accessorKey: 'firstName'
      },
      {
        header: 'name',
        accessorKey: 'name'
      },
      {
        header: 'middleName',
        accessorKey: 'middleName'
      },
      {
        header: 'role',
        accessorKey: 'role'
      },
      {
        header: 'car',
        accessorKey: 'car'
      },
      {
        header: 'phone',
        accessorKey: 'phone'
      },
      {
        header: 'storage',
        accessorKey: 'storage'
      }
    ],
    []
  );

  return (
    <>
      <SheetAdmin isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className={`flex`}>
          {/* Drawer Mobile */}
          <div
            className={`bg-light-blue h-screen hidden sm:flex flex-col gap-5
          px-3 xl:px-7 py-6 justify-items-start items-center`}>
            <Link to="/" className={`text-sm leading-6 font-semibold `}>
              ВОДА ВЕЛИКОЙ СТЕПИ
              <div className={`border-b border-solid border-gray-400`}></div>
            </Link>
            <div className="grid grid-cols-1 gap-3">
              <Link to="/requestsUser">Панель управления</Link>
              <Link to="/users">Пользователи</Link>
              <Link to="/couriers">Курьеры</Link>
              <Link to="/warehouses">Склады</Link>
              <Link to="/hardware">Оборудование</Link>
            </div>
          </div>
          <div className={`flex-col`}>
            <Header>
              <>
                <AiOutlineMenuUnfold
                  className={`w-7 h-7 sm:hidden`}
                  onClick={() => setIsOpen((prev) => !prev)}
                />
                <Link to="/" className={`mx-auto`}>
                  <img src={logo} alt="nomadLogo" />
                </Link>
                <Link to="/admin/*">
                  <img src={avatar} alt="avatar" className={`hidden md:block mr-4`} />
                </Link>
              </>
            </Header>
            <div className={`flex gap-3 px-7 py-5 xl:px-16`}>
              <Table id="user" data={dataUsers} columns={columns} />
            </div>
          </div>
        </div>
      </SheetAdmin>
    </>
  );
};
export default Admin;
