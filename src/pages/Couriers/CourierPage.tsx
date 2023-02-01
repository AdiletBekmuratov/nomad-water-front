import React from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { jsPDF } from 'jspdf';

import CourierHistory from './CourierHistory';
import { Edit } from '../User/Edit';

import { Layout } from '@/components/Layout';
import { Button } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { FaRoute } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useGetCurrentCourierRouteSheetQuery } from '@/redux/services/courier.service';
import { PTsans } from './font';
import { FiDownload } from 'react-icons/fi';

const CourierPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState('');
  const [routeSheet, setRouteSheet] = React.useState([]);
  
  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date: Date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear()
    ].join('-');
  }
  
  const { data } = useGetCurrentCourierRouteSheetQuery(formatDate(new Date()));
  
  React.useEffect(() => {
    setCurrentDate(formatDate(new Date()));
  }, []);

  const handleSheet = async () => {
    console.log(data.routeSheetOrders);
    
    const doc = new jsPDF();
    
    doc.addFileToVFS('PTsans', PTsans);
    doc.addFont('PTSans.ttf', 'PTSans', 'normal');
    doc.setFont('PTSans'); // set font
    
    //Проблема с поддержкой кириллицы
    for (let i = 0; i < data.routeSheetOrders.length; i++) {
      //@ts-ignore
      doc.text([`Цена: ${data.routeSheetOrders[i]?.order.totalPrice}`], 20, 20 + i * 60);
      //@ts-ignore
      doc.text([`Причина отказа: ${data.routeSheetOrders[i]?.order.cancelReason}`], 20, i * 40);
      //@ts-ignore
      doc.text([`Отзыв: ${data.routeSheetOrders[i].order.rating}`], 20, 80 * i);
    }
    
    doc.save(`routeSheet${new Date()}.pdf`);
  };
  
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
          <Button className={`w-80 cursor-pointer`} onClick={() => setIsOpenEdit(true)}>
            Изменить данные
          </Button>
        </div>
        <div className={`flex justify-center py-2`}>
          <Button className={`w-80 cursor-pointer`} onClick={handleSheet}>
            <FaRoute />
            <p className="font-montserrat font-medium mx-2">Маршрутный лист</p>
            <FiDownload />
          </Button>
        </div>
        <div className={`border-b-2 border-dotted border-gray-700 py-2`}></div>
        <div className={`mt-4 mx-auto`}>
          <CourierHistory />
        </div>
      </div>

      <Edit setVisible={setIsOpenEdit} visible={isOpenEdit} data={user!} />
    </Layout>
  );
};

export default CourierPage;
