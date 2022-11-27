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
  PaymentComponent
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
      {data.map((or, index: number) => (
        <OrderCard
          data={{ ...or }}
          key={or.name}
          id={index}
          changeCount={changeCount}
          count={or.count}
          total={or.count * or.count}
        />
      ))}
      <Address
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setIsEdited={setIsEdited}
        isEdited={isEdited}
      />
      {isOpen && (
        <Accordion
          className="mx-auto mt-4 md:w-5/6 "
          setIsValid={setIsValid}
          setIsEdited={setIsEdited}
          isEdited={isEdited}
          setAddress={setAddress}
        />
      )}

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
      <div className="h-6 w-3/4 mt-5 mx-auto gap-2.5 md:w-5/6">
        <div className="flex items-center w-full">
          <Checkbox
            label="Самовывоз"
            className="w-3.5 h-3.5"
            checked={pickup}
            id="deliver"
            name="deliver"
            onClick={() => {
              if (delivery) {
                setDelivery(false);
              }
              setPickup(!pickup);
            }}
            labelClass="text-dark-blue"
          />
        </div>
        <div className="flex items-center w-full mt-2">
          <Checkbox
            label="Доставка до адреса"
            className="w-3.5 h-3.5"
            checked={delivery}
            id="deliver"
            name="deliver"
            onChange={(e) => {
              e.target.checked ? setTotal(total + 300) : setTotal(total - 300);
            }}
            onClick={() => {
              if (pickup) {
                setPickup(false);
              }
              setDelivery(!delivery);
            }}
            labelClass="text-dark-blue"
          />
          <span className="text-gray-600 font-semibold text-sm font-montserrat ml-2">+300 T</span>
        </div>
        <div className="flex w-full border-t-2 border-dashed border-gray-500 mt-2">
          <h3 className="font-bold mt-4 font-montserrat text-lg text-dark-blue">
            Итого: {total} Т
          </h3>
        </div>
      </div>

      <div className="h-44"></div>

      <Footer className={`h-20 items-center flex justify-center`}>
        <Button
          className="w-80 h-11 text-sm disabled:bg-opacity-70 md:w-11/12"
          disabled={!isValid}
          onClick={() => alert(JSON.stringify(address, null, 2))}>
          Оформить заказ
        </Button>
      </Footer>
      {isEdited && (
        <>
          <BottomMenu className="h-33.125 rounded-t-3xl " isOpen={isOpen} setIsEdited={setIsEdited}>
            <div className="border-b-2 border-gray-200 w-full">
              <div className="flex justify-center">
                <button className="pt-5 pb-5" onClick={() => setIsEdited(false)}>
                  <div className="bg-gray-300 w-14 h-1 "> </div>
                </button>
              </div>
            </div>
            <PaymentComponent buttonName="Продолжить" name={userData.username} />
          </BottomMenu>
        </>
      )}
    </>
  );
};

export default OrderRegistration;
