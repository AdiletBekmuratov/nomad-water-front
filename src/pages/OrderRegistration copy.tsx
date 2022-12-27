import { FC, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/Forms';
import { Layout } from '@/components/Layout';
import { Modal } from '@/components/Layout/Modal';
import { Footer, OrderAcordion, OrderCard, PaymentComponent, Total } from '@/components/Order';
import EditCard from '@/components/Order/EditCard';
import { IProduct } from '@/types';

const userStyle = 'font-montserrat text-dark-blue';

const OrderRegistration: FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [address, setAddress] = useState({});
  const [pickup, setPickup] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [total, setTotal] = useState(0);
  // let data = structuredClone(initialArray);

  const navigate = useNavigate();
  const cartItems = localStorage.getItem(`cartItems`);
  const dataProduct: IProduct[] = cartItems ? JSON.parse(cartItems) : [];
  const handeCounts = useCallback(
    (count: number, index: number) => {
      dataProduct[index].quantity = count;
      let t: number = 0;
      for (let i = 0; i < dataProduct.length; i++) {
        t += dataProduct[i].productPrice * dataProduct[i].quantity!;
      }
      setTotal(t);
    },
    [dataProduct]
  );

  const handleTotal = useCallback(
    (isDel: boolean = false) => {
      if (isDel) setTotal(total + 300);
      else setTotal(total - 300);
    },
    [dataProduct]
  );

  return (
    <Layout>
      {dataProduct.length > 0 ? (
        <div className={`lg:grid lg:grid-cols-3 lg:grid-row-3 gap-6`}>
          <div className={`lg:col-span-2 lg:order-1 lg:col-start-1 lg:row-start-1`}>
            {dataProduct.map((item: IProduct, index: number) => (
              <OrderCard
                // handeCounts={handeCounts}
                id={index}
                handeCounts={handeCounts}
                data={{ ...item }}
                key={item.productName}
                count={item.quantity}
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
          <EditCard className={`lg:order-4 lg:col-span-2 lg:w-full lg:row-start-3`}>
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
              className={`w-80 h-11 text-sm disabled:bg-opacity-70 md:w-2/3`}
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
      ) : (
        <div className={` flex flex-col gap-5 items-center`}>
          <h2>
            Корзина пустая <span>😕</span>
          </h2>
          <Link to="/catalog">
            <Button className={`w-44`}>В каталог</Button>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default OrderRegistration;
