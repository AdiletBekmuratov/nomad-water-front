import React from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';

import CourierHistory from './CourierHistory';
import { Edit } from '../User/Edit';

import { Layout } from '@/components/Layout';
import { Button } from '@/components/Forms';

import { Link } from 'react-router-dom';

const CourierPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);

  const styleP = `text-sm md:text-base bg-white rounded-md px-3 grid grid-cols-2`;
  return (
    <Layout>
      <div className="">
        <h1 className="font-montserrat text-xl font-semibold text-center text-dark-blue">
          Мои данные
        </h1>
        <div
          className={`font-montserrat text-dark-blue grid grid-cols-1 lg:grid-cols-3 mt-2 gap-5 lg:gap-3`}>
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
          </div>
          <div className="grid gap-2 ">
            <p className={`${styleP}`}>
              <strong>Микрорайон / Улица: </strong>{' '}
              <span>{` ${user ? user?.street : 'Не заполнено'} `}</span>
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
          <Button className={`w-80 cursor-pointer`} onClick={() => setIsOpenEdit(true)}>
            Изменить данные
          </Button>
        </div>
        <div className={`flex items-center py-2 flex-col`}>
          {/* <Button className={`w-80 cursor-pointer`} onClick={handleSheet}>
            <FaRoute />
            <p className="font-montserrat font-medium mx-2">Маршрутный лист за сегодня</p>
            <FiDownload />
          </Button> */}
          <Link to="/courier/routeSheet" className="underline mt-1 hover:text-blue-700">
            Получить маршрутный лист
          </Link>
        </div>
        <div className={`border-b-2 border-dotted border-gray-700 py-2`}></div>
        <div className={`mt-4 mx-auto`}>
          <CourierHistory />
        </div>
      </div>

      <Edit setVisible={setIsOpenEdit} visible={isOpenEdit} user={user!} />
    </Layout>
  );
};

export default CourierPage;
