import React from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';

import Pending from './Pending';

import { Layout } from '@/components/Layout';
import { Button } from '@/components/Forms';
import { Edit } from '../User/Edit';

const Employee = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);
  const styleP = `text-sm md:text-base bg-white rounded-md px-3 grid grid-cols-2`;
  return (
    <Layout>
      <div className="">
        <h1 className="font-montserrat text-xl font-semibold text-center text-dark-blue ">
          Мои данные
        </h1>
        <div
          className={`font-montserrat text-dark-blue grid grid-cols-1 lg:grid-cols-3 mt-2 gap-5 lg:gap-3 py-3`}>
          <div className="grid gap-2 ">
            <p className={`${styleP}`}>
              <strong>Фамилия: </strong> <span>{` ${user?.lastname} `}</span>
            </p>
            <p className={`${styleP}`}>
              <strong>Имя: </strong> {` ${user?.firstname} `}
            </p>
            <p className={`${styleP}`}>
              <strong>Отчество: </strong>{' '}
              {` ${user?.middleName ? user?.middleName : 'Не заполнено'} `}
            </p>
          </div>
          <div className="grid gap-2 ">
            <p className={`${styleP}`}>
              <strong>День рождения: </strong> {` ${user?.birthday ? user?.birthday : ''}`}
            </p>
            <p className={`${styleP}`}>
              <strong>Телефон: </strong> <span>{` ${user?.phone} `}</span>
            </p>
            <p className={`${styleP}`}>
              <strong>Telegram: </strong>{' '}
              {` ${user?.telegramAccount ? user?.telegramAccount : 'Не заполнено'} `}
            </p>
            {/* <p className={`${styleP}`}>
              <strong>Почта: </strong> {` ${user?.email ? user?.email : 'Не заполнено'} `}
            </p> */}
          </div>
          <div className="grid gap-2 ">
            <p className={`${styleP}`}>
              <strong>Улица: </strong>{' '}
              <span>{` ${user?.street ? user?.street : 'Не заполнено'} `}</span>
            </p>
            <p className={`${styleP}`}>
              <strong>Дом: </strong> {` ${user?.houseNumber ? user?.houseNumber : 'Не заполнено'} `}
            </p>
            <p className={`${styleP}`}>
              <strong>Квартира: </strong> {` ${user?.flat ? user?.flat : 'Не заполнено'} `}
            </p>
          </div>
        </div>
        <div className={`flex justify-center py-2`}>
          <Button className={`w-80`} onClick={() => setIsOpenEdit(true)}>
            Изменить данные
          </Button>
          <Edit setVisible={setIsOpenEdit} visible={isOpenEdit} data={user!} />
        </div>
        <div className={`border-b-2 border-dotted border-gray-700 py-2`}></div>
        <Pending />
      </div>
    </Layout>
  );
};

export default Employee;
