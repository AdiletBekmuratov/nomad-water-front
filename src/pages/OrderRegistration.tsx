import { FC, useEffect, useState } from 'react';

// Пока что имитация запроса с сервера
import order from '../components/Order/Order.json';

import { Button, Input } from '@/components/Forms';
import { OrderHeader, OrderCard, Address, Accordion, Footer, BottomMenu } from '@/components/Order';

const OrderRegistration: FC = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    setData(order);
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

      {!isEdited ? (
        <>
          <div className="h-24"></div>
          <Footer className={`h-20 items-center `}>
            <Button className="w-80 h-11 text-sm disabled:bg-opacity-70 " disabled={!isValid}>
              Оформить заказ
            </Button>
          </Footer>
        </>
      ) : (
        <BottomMenu className="h-96 rounded-t-3xl flex-col content-end" isOpen={isOpen}>
          <div className="border-b-2 border-gray-300">
            <button className="bg-gray-300 w-14 h-1 mt-5 mb-5" onClick={() => setIsEdited(false)} />
            <h3 className="text-sm font-semibold font-montserrat text-center text-dark-blue">
              Изменение данных профиля
            </h3>
          </div>
          <div className="mt-2">
            <input className="border-2" />
            <input className="border-2" />
            <input className="border-2" />
          </div>
        </BottomMenu>
      )}
    </>
  );
};

export default OrderRegistration;
