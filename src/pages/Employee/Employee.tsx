import React, { useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';

import Pending from './Pending';

import { Layout } from '@/components/Layout';
import { Edit } from '../User/Edit';

import { FaTenge, FaUserTie } from 'react-icons/fa';
import { AiOutlineEdit, AiOutlinePhone } from 'react-icons/ai';
import AllOrders from './AllOrders';
import EmployeeAllProducts from './EmployeeAllProducts';

const Employee = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [isOpenEdit, setIsOpenEdit] = React.useState(false);
  const [choice, setChoice] = useState('3');
  const buttons = [
    {
      id: 1,
      name: 'Клиенты'
    },
    {
      id: 2,
      name: 'Все заказы'
    },
    {
      id: 3,
      name: 'Подтвердить заказ'
    },
    {
      id: 4,
      name: 'Продукты'
    },
    {
      id: 5,
      name: 'Акции'
    }
  ];
  let flex: string = '';
  const onChoice = (event: React.MouseEvent<HTMLButtonElement>) => {
    setChoice(event.currentTarget.id);
  };
  const styleTitle = `text-center pt-4 text-lg border-b-2 border-dotted border-gray-700 py-2`;
  // const styleP = `text-sm md:text-base bg-white rounded-md px-3 grid grid-cols-2`;
  return (
    <Layout>
      <div
        className={`flex items-center justify-between bg-light-blue rounded-lg 
      p-1 md:p-3 font-bold text-xs md:text-base gap-2 md:gap-3 shadow-lg`}>
        <span className={`flex flex-col md:flex-row items-center gap-1`}>
          <AiOutlinePhone className={`h-4 w-4 md:h-5 md:w-5 `} />
          {` ${user?.phone} `}
        </span>
        <div className={` flex flex-col md:flex-row flex-1 justify-evenly `}>
          <span>{` ${user?.lastname ? user.lastname : 'Место для имени'} `}</span>
          <span>{` ${user?.firstname ? user.firstname : 'Место для фамилии'} `}</span>
          <span>{` ${user?.middleName ? user.middleName : 'Место для отчества'} `}</span>
        </div>

        <span className={`flex flex-col md:flex-row items-center gap-1`}>
          {/* <FaTenge className={`h-5 w-5 md:h-6 md:w-6`} /> */}
          <FaUserTie className={`h-4 w-4 md:h-5 md:w-5`} />
          {` ${user ? (user.role === 'ROLE_EMPLOYEE' ? 'Оператор' : null) : null} `}
        </span>
        <button className="" onClick={() => setIsOpenEdit(true)}>
          {/* Изменить данные */}
          <AiOutlineEdit className={`h-6 w-6 md:h-7 md:w-7 text-red-600`} />
        </button>
      </div>
      <div className={`flex justify-center py-2`}>
        <Edit setVisible={setIsOpenEdit} visible={isOpenEdit} data={user!} />
      </div>
      {/* <div className={`border-b-2 border-dotted border-gray-700 py-2`}></div> */}
      <div
        className={` bg-light-blue rounded-lg 
       font-bold text-xs md:text-base gap-2 md:gap-3 `}>
        <div className={`grid grid-cols-2 md:grid-cols-5  items-center justify-between gap-3`}>
          {buttons.map((button) => (
            <button
              key={button.id}
              className={`w-full p-3`}
              id={button.id.toString()}
              onClick={onChoice}>
              {button.name}
            </button>
          ))}
        </div>
        {choice === '3' && (
          <div>
            <h2 className={styleTitle}>Не подтвержденные заказы</h2>
            <Pending />
          </div>
        )}
        {choice === '2' && (
          <div className={``}>
            <h2 className={styleTitle}>Заказы</h2>
            <AllOrders />
          </div>
        )}
        {choice === '1' && (
          <div className={``}>
            <h2 className={styleTitle}>Клиенты</h2>
          </div>
        )}
        {choice === '4' && (
          <div className={``}>
            <h2 className={styleTitle}>Продукты</h2>
            <EmployeeAllProducts />
          </div>
        )}
        {choice === '5' && (
          <div className={``}>
            <h2 className={styleTitle}>Акции</h2>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Employee;
