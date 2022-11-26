import { FC, useEffect, useState } from 'react';

// Пока что имитация запроса с сервера
import order from '../components/Order/Order.json';
import user from '@/components/Order/UserData.json';

import { Button } from '@/components/Forms';
import {
  OrderHeader,
  OrderCard,
  Address,
  Accordion,
  Footer,
  BottomMenu,
  UserComponent
} from '@/components/Order';
import EditCard from '@/components/Order/EditCard';

const userStyle = 'font-montserrat text-dark-blue';

const OrderRegistration: FC = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setData(order);
    setUserData(user);
  }, []);

  return (
    <>
      <OrderHeader />
      {data.map((or) => (
        <OrderCard data={or} key={or.name} />
      ))}
      <Address
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setIsEdited={setIsEdited}
        isEdited={isEdited}
      />
      {isOpen && (
        <Accordion
          className="mx-auto mt-4"
          setIsValid={setIsValid}
          setIsEdited={setIsEdited}
          isEdited={isEdited}
        />
      )}
      <EditCard>
        <h3 className={`font-semibold text-sm ${userStyle}`}>Получатель</h3>
        <h5 className={`${userStyle} text-xs mt-2`}>
          <strong className={`font-medium`}>Имя:</strong> {userData.username}
        </h5>
        <h5 className={`${userStyle} text-xs mt-2`}>
          <strong className="font-medium">Телефон</strong> {userData.phone}
        </h5>
        <button
          className="text-blue-light font-montserrat font-semibold text-xs"
          onClick={() => {
            setIsEdited(true);
          }}
          value="userEdit">
          Изменить
        </button>
      </EditCard>
      <EditCard>
        <h3 className={`font-semibold text-sm ${userStyle}`}>Способ оплаты</h3>
        <button
          className="text-blue-light font-montserrat font-semibold text-xs"
          onClick={() => {
            setIsEdited(true);
          }}
          value="payment">
          Выберите способ оплаты
        </button>
      </EditCard>
      <div className="h-24"></div>
      <Footer className={`h-20 items-center flex justify-center`}>
        <Button className="w-80 h-11 text-sm disabled:bg-opacity-70 " disabled={!isValid}>
          Оформить заказ
        </Button>
      </Footer>
      {isEdited && (
        <BottomMenu className="h-96 rounded-t-3xl " isOpen={isOpen}>
          <div className="border-b-2 border-gray-200 w-full">
            <div className="flex justify-center">
              <button className="pt-5 pb-5" onClick={() => setIsEdited(false)}>
                <div className="bg-gray-300 w-14 h-1 "> </div>
              </button>
            </div>
            <h3 className="text-sm font-semibold font-montserrat text-center mb-1 text-dark-blue">
              Изменение данных профиля
            </h3>
          </div>
          <UserComponent buttonName="Сохранить изменения" />
        </BottomMenu>
      )}
    </>
  );
};

export default OrderRegistration;
