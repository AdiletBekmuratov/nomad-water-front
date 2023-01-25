import React from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useGetALLProfilesQuery } from '@/redux/services/profile.service';
import { Edit } from '@/pages/User/Edit';
import { CreateProfile } from './CreateProfile';
import { EditProfile } from './EditProfile';
import OrderHistory from '@/pages/User/OrderHistory';

import { Layout } from '@/components/Layout';
import { FaTenge, FaUserTie } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { Button } from '@/components/Forms';

const UserPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: profile = [] } = useGetALLProfilesQuery();
  console.log(profile);
  const [isOpenEdit, setIsOpenEdit] = React.useState(false); //изменение данных юзера
  const [isOpenCreate, setIsOpenCreate] = React.useState(false); //создание нового профиля
  const [isOpenEditProfile, setIsOpenEditProfile] = React.useState(false); //изменение профиля по id
  const [isOpenDelete, setIsOpenDelete] = React.useState(false); //удаление профиля по id
  const styleP = `text-sm md:text-base grid grid-cols-2`;
  const styleName = `text-sm md:text-base grid grid-cols-2 py-1 border-b-2 border-gray-400 border-dashed`;
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
          {` 50000 `}
        </span>
        <button className="" onClick={() => setIsOpenEdit(true)}>
          {/* Изменить данные */}
          <AiOutlineEdit className={`h-6 w-6 md:h-7 md:w-7 text-red-600`} />
        </button>
      </div>

      <div className={`text-dark-blue grid md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5 lg:gap-3`}>
        <div>
          <Button
            className={`bg-blue-300 hover:bg-blue-400 h-9`}
            onClick={() => setIsOpenCreate(true)}>
            Добавить новый адрес
          </Button>
        </div>

        {profile.map((item) => (
          <>
            <div className={`grid gap-2 bg-light-blue rounded-xl p-3 shadow-md`} key={item.id}>
              {/* <p className={`${styleP}`}>
            <strong>День рождения: </strong> {` ${user?.birthday ? user?.birthday : ''}`}
          </p> */}
              <p className={`${styleName}`}>
                <strong>Имя адреса </strong>{' '}
                <span>{` ${item?.name ? item.name : 'Нет данных'} `}</span>
              </p>
              <p className={`${styleP}`}>
                <strong>Микрорайон / Улица: </strong>{' '}
                <span>{` ${item?.street ? item.street : 'Нет данных'} `}</span>
              </p>
              <p className={`${styleP}`}>
                <strong>Дом: </strong> {` ${item?.houseNumber ? item.houseNumber : 'Нет данных'} `}
              </p>
              <p className={`${styleP}`}>
                <strong>Квартира: </strong> {` ${item?.flat ? item.flat : 'Нет данных'} `}
              </p>
              <p className={`${styleP}`}>
                <strong>Комментарий к адресу: </strong>
                {` ${item?.addressComment ? item.addressComment : 'Нет данных'} `}
              </p>
              <div
                className={`flex items-center justify-between gap-2 border-t-2 py-2 border-gray-400 border-dashed`}>
                <Button
                  className={`bg-blue-300 hover:bg-blue-400`}
                  onClick={() => setIsOpenEditProfile(true)}>
                  Изменить поля
                </Button>
                <Button
                  className={`bg-blue-300 hover:bg-blue-400`}
                  onClick={() => setIsOpenDelete(true)}>
                  Удалить адрес
                </Button>
              </div>
            </div>
            <EditProfile
              setVisible={setIsOpenEditProfile}
              visible={isOpenEditProfile}
              data={profile[0]}
            />
          </>
        ))}
        <Edit setVisible={setIsOpenEdit} visible={isOpenEdit} data={user!} />
        <CreateProfile setVisible={setIsOpenCreate} visible={isOpenCreate} />
      </div>
      <div className={`border-b-2 border-dotted border-gray-700 py-2`}></div>
      <div className={`mt-4 mx-auto`}>
        <OrderHistory />
      </div>
    </Layout>
  );
};

export default UserPage;
