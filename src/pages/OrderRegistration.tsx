import { FC, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { Button } from '@/components/Forms';
import { Layout } from '@/components/Layout';
import { Modal } from '@/components/Layout/Modal';
import { Footer, OrderAcordion, OrderCard, PaymentComponent, Total } from '@/components/Order';
import EditCard from '@/components/Order/EditCard';
import { IOrderQuality, IProduct, IUsersOrder } from '@/types';
import { toast } from 'react-hot-toast';
import { useCreateOrderMutation } from '@/redux/services/base.service';

const userStyle = 'font-montserrat text-dark-blue';

const OrderRegistration: FC = () => {
  const navigate = useNavigate();
  const cartItems = localStorage.getItem(`cartItems`);
  const dataProduct: IProduct[] = cartItems ? JSON.parse(cartItems) : [];
  //const productPriceArr = dataProduct.map((item) => item.productPrice);

  const [isOpen, setIsOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [address, setAddress] = useState({});
  const [pickup, setPickup] = useState(false);
  const [delivery, setDelivery] = useState(false);

  const [count, setCount] = useState(1);

  const [total, setTotal] = useState(0);
  const handleTotal = useCallback(
    (isDel: boolean = false) => {
      if (isDel) setTotal(total + 300);
      else setTotal(total);
    },
    [dataProduct]
  );
  const [response, setResponse] = React.useState<string[]>([]);
  const [create, { isLoading: isOrderLoad }] = useCreateOrderMutation();
  const handleCreate = (values: IUsersOrder) => {
    toast
      .promise(
        create(values)
          .unwrap()
          .then((resp) => {
            setResponse(resp);
          }),
        {
          loading: 'Загрузка...',
          success: 'Получено',
          error: (error) => JSON.stringify(error, null, 2)
        }
      )
      .finally(() => {
        //setVisible(false);
      });
  };
  const productIds: IOrderQuality = { productId: 1, quantity: 1 };
  const initial: IUsersOrder = {
    address: '',
    comment: '',
    isSale: false,
    paymentMethod: 1,
    phone: '',
    orderProductsDto: productIds,
    totalPrice: total
  };
  return (
    <Layout>
      {dataProduct.length > 0 ? (
        <div className={`lg:grid lg:grid-cols-3 lg:grid-row-3 gap-6`}>
          <div className={`lg:col-span-2 lg:order-1 lg:col-start-1 lg:row-start-1`}>
            {dataProduct.map((item: IProduct) => (
              <OrderCard
                // handeCounts={handeCounts}
                id={item.id!}
                data={{ ...item }}
                key={item.productName}
                count={count}
                setCount={setCount}
                setTotal={setTotal}
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
            data={dataProduct}
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
                handleCreate(initial);
                //alert(JSON.stringify(address, null, 2));
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
