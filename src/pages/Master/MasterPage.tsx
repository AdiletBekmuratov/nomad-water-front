import React from 'react';
import { useAppSelector } from '@/hooks';

import { Edit } from '../User/Edit';
import { Layout } from '@/components/Layout';

import { AiOutlineEdit } from 'react-icons/ai';
import { FaTenge, FaUserTie } from 'react-icons/fa';

import Pending from '../Employee/Pending';
import { OrderHistory } from '../User';

const MasterPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [visible, setVisible] = React.useState(false);
  const [isOpenEdit, setIsOpenEdit] = React.useState(false); //изменение данных юзера

  return (
    <Layout>
      <div
        className={`flex items-center justify-between bg-light-blue rounded-lg 
      p-1 md:p-3 font-bold text-xs md:text-base gap-2 md:gap-3 shadow-lg`}>
        <span className={`flex flex-col md:flex-row items-center gap-3`}>
          <FaUserTie className={`h-5 w-5 md:h-6 md:w-6 `} />
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
          {` ${user ? (user.role === 'ROLE_MASTER' ? 'Мастер' : null) : null} `}
        </span>
        <button className="" onClick={() => setIsOpenEdit(true)}>
          <AiOutlineEdit className={`h-6 w-6 md:h-7 md:w-7 text-red-600`} />
        </button>
        <Edit setVisible={setIsOpenEdit} visible={isOpenEdit} user={user!} />
      </div>
      <OrderHistory />
    </Layout>
  );
};

export default MasterPage;
