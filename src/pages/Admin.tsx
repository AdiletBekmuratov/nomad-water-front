import { SheetAdmin } from '@/components/Admin/SheetAdmin';

import { Header } from '@/components/Layout';
import React from 'react';
import { Link } from 'react-router-dom';

import avatar from '../assets/crm/avatar.png';
import logo from '../assets/crm/logoHead.png';

import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { Input } from '@/components/Forms';

const Admin = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <SheetAdmin isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className={`flex`}>
          <div className={`bg-light-blue h-screen hidden sm:block`}>
            <div className={`px-3 xl:px-7 pt-6 flex justify-between items-center`}>
              <Link to="/" className={`text-sm leading-6 font-semibold `}>
                ВОДА ВЕЛИКОЙ СТЕПИ
                <div className={`border-b border-solid border-gray-400`}></div>
              </Link>
              {/* <AiOutlineCloseCircle className="cursor-pointer" onClick={() => setIsOpen(false)} /> */}
            </div>

            <div className={`container px-5 xl:px-7 pt-10 mb-5`}>
              <div className={`grid grid-cols-1 gap-2 mb-16 xl:mb-36`}>
                <Link to="/requestsUser">Панель управления</Link>
                <Link to="/users">Пользователи</Link>
                <Link to="/couriers">Курьеры</Link>
                <Link to="/warehouses">Склады</Link>
                <Link to="/hardware">Оборудование</Link>
              </div>
            </div>
          </div>
          <div className={`bg-red h-screen flex-1`}>
            <Header>
              <>
                <AiOutlineMenuUnfold
                  className={`w-7 h-7 sm:hidden`}
                  onClick={() => setIsOpen((prev) => !prev)}
                />
                <Link to="/" className={`mx-auto`}>
                  <img src={logo} alt="nomadLogo" />
                </Link>
                <Link to="/userPage">
                  <img src={avatar} alt="avatar" className={`hidden lg:block mr-4`} />
                </Link>
              </>
            </Header>
            <div className={`flex flex-col gap-3`}>
              <span className={`text-lg font-semibold`}>Введите логин и пароль</span>
              <Input
                inputType="default"
                id="phone"
                name="phone"
                label="Номер телефона"
                mask="+7 (999) 999-99-99"
                placeholder="+7 (999) 999-99-99"
              />
              <Input
                inputType="default"
                id="password"
                name="password"
                type={'password'}
                label="Пароль"
              />
            </div>
          </div>
        </div>
      </SheetAdmin>
    </>
  );
};
export default Admin;
