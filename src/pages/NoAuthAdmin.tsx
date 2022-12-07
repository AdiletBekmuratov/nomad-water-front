import React from 'react';
import { SheetAdmin } from '@/components/Admin/SheetAdmin';

import { Header } from '@/components/Layout';
import { Link } from 'react-router-dom';

import logo from '../assets/crm/logoHead.png';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { CgDanger } from 'react-icons/cg';
import { Button, Input } from '@/components/Forms';

const NoAuthAdmin = () => {
  const [isOpen, setIsOpen] = React.useState(false);

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
          {/* Drawer Mobile */}
          <div className={`flex-col flex-1`}>
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
                  <CgDanger className={`w-7 h-7`} />
                </Link>
              </>
            </Header>
            <div className={`flex flex-col layout gap-3 py-5 items-center justify-center`}>
              <h1 className={`font-semibold text-lg lg:text-2xl text-center`}>
                Нет доступа! <br /> Авторизуйтесь либо обратитесь к администратору.
              </h1>
              <div className={`grid gap-5`}>
                <Input
                  inputType="default"
                  id="login"
                  name="login"
                  label="Логин"
                  placeholder="Шпион"
                />
                <Input
                  inputType="default"
                  id="password"
                  name="password"
                  type={'password'}
                  label="Пароль"
                  placeholder="Секрет"
                />
                <Button>Войти</Button>
              </div>
            </div>
          </div>
        </div>
      </SheetAdmin>
    </>
  );
};
export default NoAuthAdmin;
