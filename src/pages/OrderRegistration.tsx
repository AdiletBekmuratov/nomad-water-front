import { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Пока что имитация запроса с сервера
import user from '@/components/Order/UserData.json';

import { Button } from '@/components/Forms';
import { Layout } from '@/components/Layout';
import { Modal } from '@/components/Layout/Modal';
import { Footer, OrderAcordion, OrderCard, PaymentComponent, Total } from '@/components/Order';
import EditCard from '@/components/Order/EditCard';

const userStyle = 'font-montserrat text-dark-blue';

let initialArray = [
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
  const [address, setAddress] = useState({});
  const [pickup, setPickup] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [total, setTotal] = useState(0);
  let data = structuredClone(initialArray);

  const navigate = useNavigate();

  const handeCounts = useCallback(
    (count: number, index: number) => {
      data[index].count = count;
      let t: number = 0;
      for (let i = 0; i < data.length; i++) {
        t += data[i].price * data[i].count;
      }
      setTotal(t);
    },
    [data]
  );

  const handleTotal = useCallback(
    (isDel: boolean = false) => {
      if (isDel) setTotal(total + 300);
      else setTotal(total - 300);
    },
    [data]
  );

  return (
    <Layout>
      <div className="lg:grid lg:grid-cols-3 lg:grid-row-3 gap-6">
        <div className="lg:col-span-2 lg:order-1 lg:col-start-1 lg:row-start-1">
          {data.map((or, index: number) => (
            <OrderCard
              handeCounts={handeCounts}
              id={index}
              data={{ ...or }}
              key={or.name}
              count={or.count}
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
          handleTotal={handleTotal}
        />

        <Footer className={`items-center flex justify-center lg:hidden`}>
          <Button
            className="w-80 h-11 text-sm disabled:bg-opacity-70 md:w-2/3"
            buttonColor="bg-dark-blue font-montserrat"
            disabled={!isValid}
            onClick={() => {
              alert(JSON.stringify(address, null, 2));
              navigate('/orderinfo');
            }}>
            Оформить заказ
          </Button>
        </Footer>
        {isEdited && (
          <>
            <Modal isOpenModal={isOpen} setIsOpenModal={setIsEdited}>
              <PaymentComponent buttonName="Продолжить" name={user.username} />
            </Modal>
          </>
        )}
      </div>
    </Layout>
  );
};

export default OrderRegistration;
