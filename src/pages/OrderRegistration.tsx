import { FC, useEffect, useState } from 'react';

// Пока что имитация запроса с сервера
import user from '@/components/Order/UserData.json';

import { Button } from '@/components/Forms';
import {
  OrderHeader,
  OrderCard,
  Footer,
  BottomMenu,
  PaymentComponent,
  OrderAcordion,
  Total
} from '@/components/Order';
import EditCard from '@/components/Order/EditCard';
import Checkbox from '@/components/Checkbox';

const userStyle = 'font-montserrat text-dark-blue';

const initialArray = [
  {
    name: 'Nomad Water негаз., 5 л',
    count: 10,
    price: 500,
    imgUrl: '../components/Order/bottle.png'
  },
  {
    name: 'Nomad Water негаз., 19 л',
    count: 2,
    price: 1500,
    imgUrl: '../components/Order/bottle.png'
  }
];

const OrderRegistration: FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [userData, setUserData] = useState({});
  const [address, setAddress] = useState({});
  const [pickup, setPickup] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [total, setTotal] = useState(0);
  const data = structuredClone(initialArray);

  const sumTotal = () => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].price * data[i].count;
    }
    return sum;
  };

  useEffect(() => {
    setUserData(user);
    setTotal(sumTotal);
  }, [data]);

  const changeCount = (operator: string, i: number) => {
    if (operator === '+') {
      data[i].count++;
      console.log(data[i].count, data[i].name);
    } else if (operator === '-') {
      data[i].count--;
      console.log(data[i].count, data[i].name);
    }
  };

  return (
    <>
      <OrderHeader />
      <div className="lg:grid lg:grid-cols-3 lg:w-5/6 lg:mx-auto lg:grid-row-3">
        <div className="lg:col-span-2 lg:order-1 lg:col-start-1 lg:row-start-1">
          {data.map((or, index: number) => (
            <OrderCard
              data={{ ...or }}
              key={or.name}
              id={index}
              changeCount={changeCount}
              count={or.count}
              total={or.count * or.price}
            />
          ))}
        </div>

        <OrderAcordion
          isEdited={isEdited}
          isOpen={isOpen}
          setAddress={setAddress}
          setIsEdited={setIsEdited}
          setIsOpen={setIsOpen}
          setIsValid={setIsValid}
        />
        <EditCard className="lg:order-4 lg:col-span-2 lg:w-full lg:row-start-3">
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

        <Total
          delivery={delivery}
          pickup={pickup}
          setDelivery={setDelivery}
          setPickup={setPickup}
          setTotal={setTotal}
          total={total}
          isValid={isValid}
          address={address}
        />
        <div className="h-44"></div>

        <Footer className={`h-20 items-center flex justify-center lg:hidden`}>
          <Button
            className="w-80 h-11 text-sm disabled:bg-opacity-70 md:w-2/3"
            buttonColor="bg-dark-blue font-montserrat"
            disabled={!isValid}
            onClick={() => alert(JSON.stringify(address, null, 2))}>
            Оформить заказ
          </Button>
        </Footer>
        {isEdited && (
          <>
            <BottomMenu
              className="h-33.125 rounded-t-3xl"
              isOpen={isOpen}
              setIsEdited={setIsEdited}>
              <div className="border-b-2 border-gray-200 w-full">
                <div className="flex justify-center">
                  <button className="pt-5 pb-5" onClick={() => setIsEdited(false)}>
                    <div className="bg-gray-300 w-14 h-1 "></div>
                  </button>
                </div>
              </div>
              <PaymentComponent buttonName="Продолжить" name={userData.username} />
            </BottomMenu>
          </>
        )}
      </div>
    </>
  );
};

export default OrderRegistration;
