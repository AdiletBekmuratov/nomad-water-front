import { FC, useEffect, useState } from 'react';

import Checkbox from '@/components/Checkbox';
import { Card } from '@/components/Forms';
import { OrderHeader } from '@/components/Order';


import checkmark from '../assets/checkmark.svg';
import dot from '../assets/dot.svg';

import user from '../components/Order/UserData.json';
import order from '../components/Order/Order.json';

import { Order } from '@/components/Order/Order.card';
import { Modal } from '@/components/Layout/Modal';

const OrderInfo: FC = () => {
  const [delivery, setDelivery] = useState(false);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < order.length; i++) {
      sum += order[i].count * order[i].price;
    }
    setTotal(sum);
  }, [order]);

  return (
    <>
      <OrderHeader>Статус заказа #283</OrderHeader>
      <div className="container mt-6 lg:grid lg:grid-cols-3 lg:w-9/12 lg:mx-auto lg:row-span-2 lg:row-start-1 lg:order-1 lg:col-start-1">
        <Card className="w-11/12 mx-auto lg:col-span-2 lg:w-3/4 ">
          <div className="mx-6 my-5 mb-3">
            <div className="w-full flex">
              <img src={checkmark} alt="checkmark" />
              <p className="font-montserrat font-medium text-sm ml-4 text-dark-blue">
                Оформление заказа
              </p>
            </div>

            <div className="w-full flex mb-1">
              <img src={checkmark} alt="checkmark" />
              <p className="font-montserrat font-medium text-sm ml-4 text-dark-blue">
                Подтверждение на складе
              </p>
            </div>

            <div className="w-full flex mb-1">
              <img src={dot} alt="checkmark" />
              <p className="font-montserrat font-medium text-sm ml-5 text-dark-blue">
                Доставляется по адресу
              </p>
            </div>

            <div className="w-full flex">
              <img src={dot} alt="checkmark" className="opacity-30" />
              <p className="font-montserrat font-medium text-sm ml-5 text-dark-blue opacity-30">
                Завершено
              </p>
            </div>
          </div>
        </Card>

        <Card className="w-11/12 mx-auto mt-4 lg:col-span-2 lg:w-3/4">
          <div className="flex m-3 flex-col md:m-1">
            <h2 className="font-semibold font-montserrat text-dark-blue text-lg">
              Ожидаемая доставка:
            </h2>
            <h2 className="font-semibold font-montserrat text-dark-blue text-lg">
              завтра до 16:00
            </h2>
            <h5 className="font-montserrat text-dark-blue text-sm">{user.street}</h5>
            <h5 className="font-montserrat text-dark-blue text-sm">
              {user.username}, {user.phone}
            </h5>

            {order.map((ord) => (
              <Order order={ord} key={ord.name} />
            ))}
          </div>
        </Card>

        <div className=" lg:row-start-1 lg:order-2 lg:col-start-3 lg:row-span-1">
          <Card className="w-11/12 mx-auto mt-4 flex items-center justify-between m-5">
            <div className="">
              <h3 className="font-semibold font-montserrat text-sm text-dark-blue">
                Способ оплаты
              </h3>
              <h3 className="font-medium font-montserrat text-xs mt-2 text-dark-blue">
                VISA <span className="ml-6">•••• 4444</span>
              </h3>
            </div>
            <div className="">
              <h3 className="text-green-400 font-semibold font-montserrat text-sm">Оплачено</h3>
            </div>
          </Card>

          <div>
            <div className="w-11/12 mx-auto mt-4 flex">
              <Checkbox
                className="mx-5 flex items-center"
                label="Доставка до адреса"
                name="delivery"
                id="delivery"
                onChange={(e) => setDelivery(e.target.checked)}
                checked={delivery}
                labelClass="text-dark-blue font-montserrat text-sm font-medium"
              />
              <p className="font-montserrat text-sm font-bold text-gray-500 ml-2">+300 T</p>
            </div>
            <div className="border-t-2 border-dashed mt-3 w-11/12 mx-auto h-12 flex items-center ">
              <h3 className="mx-5 font-montserrat font-bold text-dark-blue text-lg">
                Итого: {delivery ? total + 300 : total}
              </h3>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 lg:mt-1 lg:row-start-3">
          <Modal
            title="Выберите причину отмены заказа"
            className="flex justify-start flex-col"
            buttonCloseTest="Отмена"
            buttonOpenText="Отменить заказ"
            titleClass="font-semibold text-base text-dark-blue mx-5 mt-5 mb-4"
            contentClass="w-11/12"
            isTwoButton={true}
            secondButtonText="Продолжить"
            openButtonStyle="bg-transparent text-red-700 font-semibold font-montserrat">
            <div className="my-4">
              <Checkbox
                label="Не доставлен товар"
                name="come"
                id="come"
                labelClass="font-medium text-dark-blue text-sm ml-2.5"
              />
            </div>
            <div className="my-4">
              <Checkbox
                label="Товар не соответствует описанию"
                name="desc"
                id="desc"
                labelClass="font-medium text-dark-blue text-sm ml-2.5"
              />
            </div>
            <div className="my-4 lg:mt-4 lg:mb-6">
              <Checkbox
                label="Другие причины"
                name="other"
                id="other"
                labelClass="font-medium text-dark-blue text-sm ml-2.5"
              />
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default OrderInfo;
