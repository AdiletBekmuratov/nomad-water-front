import { FC, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

import { useAppDispatch } from '@/hooks';
import { useAppSelector } from '@/hooks/useAppSelector';

import { clearItems } from '@/redux/slices/cartSlice';
import { IProduct, IUsersOrder } from '@/types';

import { WS_URL } from '@/redux/http';
import Payment from './Payment';
import { OrderCard, Total } from '@/components/Order';

import { Button, Input } from '@/components/Forms';
import { Layout } from '@/components/Layout';

import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import SuggestionExample from '../SuggestionExample';

const OrderCreate: FC = () => {
  const dispatch = useAppDispatch();
  const { products, total } = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.auth.user);
  const [isValid, setIsValid] = useState(false);
  const [address, setAddress] = useState<{
    phone: string;
    firstname: string;
    street: string;
    houseNumber: string;
    flat: string;
    addressComment: string;
  } | null>(null);
  ///total state
  const [pickup, setPickup] = useState(false);
  const [useBonus, setUseBonus] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Картой');
  const [profile, setProfile] = useState({
    houseNumber: '',
    street: ''
  });

  const clientRef = useRef<WebSocket | null>(null);
  const [waitingToReconnect, setWaitingToReconnect] = useState<boolean | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleSendOrder = () => {
    const product = products.map((product) => {
      return {
        productId: product.id,
        quantity: product.quantity
      };
    });
    let addressOrder = address
      ? `Ул.${address.street}, д. ${address.houseNumber}, кв. ${address.flat}`
      : '';
    const value: IUsersOrder = {
      phone: address ? address.phone : '',
      firstname: user
        ? user.role === 'ROLE_EMPLOYEE'
          ? address
            ? address.firstname
            : ''
          : user.firstname
        : '',

      address: addressOrder,
      comment: address ? address.addressComment : '',
      totalPrice: total,
      paymentMethod,
      //@ts-ignore
      orderProductsDto: product
    };
    clientRef.current?.send(JSON.stringify(value));
    dispatch(clearItems());
  };

  useEffect(() => {
    if (waitingToReconnect) {
      return;
    }

    if (!clientRef.current) {
      const client = new WebSocket(WS_URL + '/order/create');
      clientRef.current = client;

      client.onerror = (err) => {
        console.log(err);
      };

      client.onopen = () => {
        setIsConnected(true);
        console.log('connected');
      };

      client.onclose = () => {
        if (clientRef.current) {
          console.log('connection was closed');
        } else {
          console.log('connection closed by app component unmount');
        }
        if (waitingToReconnect) {
          return;
        }
        setIsConnected(false);
        console.log('connection closed');
        setWaitingToReconnect(true);

        setTimeout(() => setWaitingToReconnect(null), 5000);
      };

      client.onmessage = (data) => {
        //console.log(data.data);
      };
    }
  }, [waitingToReconnect]);
  const initialValues = {
    phone: user ? (user.role === 'ROLE_MASTER' ? user.phone : '') : '',
    firstname: user ? (user.role === 'ROLE_MASTER' ? user.firstname : '') : '',
    street: '',
    houseNumber: '',
    flat: '',
    addressComment: ''
  };
  const validation = yup.object().shape({
    firstname: yup.string().required('Поле обязательное'),
    phone: yup.string().required('Поле обязательное'),
    // street: yup.string().required('Поле обязательное'),
    // houseNumber: yup.string().required('Поле обязательное'),
    flat: yup.string().required('Поле обязательное')
  });
  const styleInput = `font-montserrat placeholder:text-gray-400 cursor-pointer rounded-md`;

  return (
    <Layout>
      {products.length > 0 ? (
        <div className={`lg:grid lg:grid-cols-2 gap-4 text-xs md:text-base `}>
          <div className={` flex flex-col gap-4`}>
            {products.map((item: IProduct & { quantity: number }) => (
              <OrderCard data={{ ...item }} key={item.id} />
            ))}
          </div>
          <div className={`lg:grid lg:grid-cols-2 gap-4 pt-7 lg:pt-0`}>
            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={() => {}}>
                {({ isValid, values }) => (
                  <Form className="flex flex-col gap-2 pt-3">
                    <>
                      <Input
                        name="street"
                        id="street"
                        inputType="formik"
                        label="Микрорайон / Улица"
                        className={`${styleInput}`}
                      />
                      <Input
                        name="houseNumber"
                        id="houseNumber"
                        inputType="formik"
                        label="Дом"
                        className={`${styleInput}`}
                      />

                      <Input
                        name="flat"
                        id="flat"
                        inputType="formik"
                        label="Квартира"
                        className={`${styleInput}`}
                      />
                      <Input
                        name="addressComment"
                        id="addressComment"
                        inputType="formik"
                        label="Комментарий к заказу"
                        placeholder="Например: блок, подъезд, этаж, домофон, лифт, и др"
                        className={`${styleInput}`}
                      />
                      <Input
                        name="firstname"
                        id="firstname"
                        inputType="formik"
                        label="Имя получателя"
                        className={`${styleInput}`}
                      />
                      <Input
                        name="phone"
                        id="phone"
                        inputType="formik"
                        mask="+77999999999"
                        placeholder="+7 (777) 777 7777"
                        label="Номер получателя"
                        className={`${styleInput}`}
                      />
                      {setIsValid(isValid)}
                      {setAddress(values)}
                    </>
                  </Form>
                )}
              </Formik>
            </div>

            <div className={`flex flex-col gap-5 lg:order-3`}>
              <Payment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
              <Total
                pickup={pickup}
                setPickup={setPickup}
                useBonus={useBonus}
                setUseBonus={setUseBonus}
                isValid={isValid}
                buttonAction={handleSendOrder}
                initialTotal={total}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={` flex flex-col gap-5 py-10 items-center text-center text-lg font-medium`}>
          <div className="flex gap-4">
            Корзина пустая! <MdOutlineRemoveShoppingCart className="w-6 h-6" />
          </div>

          <p> Чтобы сделать заказ, добавьте хотя бы один товар из каталога.</p>
          <Link to="/catalog">
            <Button className={`w-44 hover:bg-blue-900`}>В каталог</Button>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default OrderCreate;
