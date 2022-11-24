import { FC, useEffect, useState } from 'react';

// Пока что имитация запроса с сервера
import order from '../components/Order/Order.json';

import { Button } from '@/components/Forms';
import { OrderHeader, OrderCard, Address, Accordion, Footer } from '@/components/Order';

const OrderRegistration: FC = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setData(order);
  }, []);

  return (
    <>
      <OrderHeader />
      {data.map((or) => (
        <OrderCard data={or} key={or.name} />
      ))}
      <Address setIsOpen={setIsOpen} isOpen={isOpen} />
      {isOpen && <Accordion className="mx-auto mt-4" setIsValid={setIsValid} />}
      <Footer>
        <Button className="w-80 h-11 text-sm disabled:bg-opacity-70" disabled={!isValid}>
          Оформить заказ
        </Button>
      </Footer>
    </>
  );
};

export default OrderRegistration;
