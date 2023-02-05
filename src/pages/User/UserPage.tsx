import { useAppSelector } from '@/hooks/useAppSelector';
import { useGetALLProfilesQuery, useUpdateProfileMutation } from '@/redux/services/profile.service';

import { Layout } from '@/components/Layout';


import { FaTenge, FaUserTie } from 'react-icons/fa';



import Profiles from './Profiles/Profiles';
import { useState } from 'react';
import { Edit } from './Edit';
import { AiOutlineEdit } from 'react-icons/ai';

const UserPage = () => {

  const { user } = useAppSelector((state) => state.auth);
  const [isOpenEdit, setIsOpenEdit] = useState(false); //изменение данных юзера

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
          <FaTenge className={`h-5 w-5 md:h-6 md:w-6`} />
          {` ${user?.bonuses ? user.bonuses : ' 0 '} `}
        </span>
        <button className="" onClick={() => setIsOpenEdit(true)}>
          {/* Изменить данные */}
          <AiOutlineEdit className={`h-6 w-6 md:h-7 md:w-7 text-red-600`} />
        </button>
      </div>

      <Profiles />
      <Edit setVisible={setIsOpenEdit} visible={isOpenEdit} data={user!} />
    
    </Layout>
  );
};

export default UserPage;
