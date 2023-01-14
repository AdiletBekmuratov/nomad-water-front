import { FC, useEffect, useState } from 'react';

import Checkbox from '@/components/Checkbox';
import { Button, Card } from '@/components/Forms';

import checkmark from '@/assets/checkmark.svg';
import dot from '@/assets/dot.svg';

import order from '@/components/Order/Order.json';
import user from '@/components/Order/UserData.json';

import { Layout } from '@/components/Layout';
import { Modal } from '@/components/Layout/Modal';
import { Order } from '@/components/Order/Order.card';

const OrderInfo: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      <Layout>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <div className="md:col-span-2">
            <Card>
              <div>
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

            <Card className="mt-4">
              <div className="flex flex-col">
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
          </div>

          <div>
            <Card>
              <p className="font-semibold font-montserrat text-sm text-dark-blue">Способ оплаты</p>
              <p className="font-medium font-montserrat text-xs mt-2 text-dark-blue">
                VISA <span className="ml-6">•••• 4444</span>
              </p>
              <p className="text-green-400 font-semibold font-montserrat text-sm mt-2">Оплачено</p>
            </Card>

            <div className="mt-4 flex items-center">
              <Checkbox
                label="Доставка до адреса"
                name="delivery"
                id="delivery"
                onChange={(e) => setDelivery(e.target.checked)}
                checked={delivery}
                labelClass="text-dark-blue font-montserrat text-sm font-medium"
              />
              <p className="font-montserrat text-sm font-bold text-gray-500 ml-2">+300 T</p>
            </div>
            <div className="border-t-2 border-dashed mt-3">
              <h3 className="font-montserrat font-bold text-dark-blue text-lg">
                Итого: {delivery ? total + 300 : total}
              </h3>
            </div>

            <Button
              buttonColor="bg-transparent font-montserrat"
              textColor="text-red-700"
              onClick={() => setIsOpen(true)}>
              Отменить заказ
            </Button>
          </div>
        </div>
      </Layout>
      <Modal isOpenModal={isOpen} setIsOpenModal={setIsOpen}>
        <h3 className="font-montserrat font-semibold text-base text-center text-dark-blue">
          Выберите причину отмены заказа
        </h3>

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
        <div className="my-4 md:mt-4 md:mb-6">
          <Checkbox
            label="Другие причины"
            name="other"
            id="other"
            labelClass="font-medium text-dark-blue text-sm ml-2.5"
          />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <Button
            textColor="text-dark-blue font-semibold"
            buttonColor="font-montserrat bg-gray-300">
            Отмена
          </Button>
          <Button buttonColor="font-montserrat bg-dark-blue font-semibold">Продолжить</Button>
        </div>
      </Modal>
    </>
  );
};

export default OrderInfo;
