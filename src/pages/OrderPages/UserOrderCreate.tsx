import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/hooks';

import { toast } from 'react-hot-toast';

import { IProduct, IProfile, IUsersOrder } from '@/types';
import { useCreateProfileMutation, useGetALLProfilesQuery } from '@/redux/services/profile.service';

import { Button, Input } from '@/components/Forms';
import { Layout } from '@/components/Layout';

import { Edit } from '../User/Edit';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { Footer, OrderCard, Total } from '@/components/Order';
import { OrderAccordion } from './OrderAccordion';
import Payment from './Payment';
import { WS_URL } from '@/redux/http';
import { useAppDispatch } from '@/hooks';
import { clearItems } from '@/redux/slices/cartSlice';
export type AddressType = {
  name?: string;
  phone: string;
  firstname: string;
  street: string;
  houseNumber: string;
  flat: string;
  addressComment: string;
};
const UserOrderCreate = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { products, total } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const { data: profiles = [], refetch } = useGetALLProfilesQuery();
  const [create, { isLoading: loadProfile }] = useCreateProfileMutation();

  const [pickup, setPickup] = useState(false);
  const [useBonus, setUseBonus] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('Картой');

  const clientRef = useRef<WebSocket | null>(null);
  const [waitingToReconnect, setWaitingToReconnect] = useState<boolean | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const initProf = profiles.length > 0 ? profiles[0] : null;
  const initAddress: AddressType = {
    name: initProf ? initProf.name! : '',
    phone: user ? user.phone : '',
    firstname: user ? user.firstname : '',
    street: initProf ? initProf.street : '',
    houseNumber: initProf ? initProf.houseNumber : '',
    flat: initProf ? initProf.flat : '',
    addressComment: initProf ? initProf.addressComment! : ''
  };

  const [address, setAddress] = useState<AddressType>(initAddress);
  const [addressOrder, setAddressOrder] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleSendOrder = () => {
    let values: IProfile = {
      name: address?.name ? address.name : 'По умолчанию',
      street: address?.street ? address.street : '',
      houseNumber: address?.houseNumber ? address?.houseNumber : '',
      flat: address?.flat ? address?.flat : '',
      addressComment: address?.addressComment ? address?.addressComment : ''
    };
    const handleCreate = () => {
      toast
        .promise(
          create(values)
            .unwrap()
            .then((resp) => {
              resp;
              // setResponse(()=>resp);
            }),
          {
            loading: 'Загрузка...',
            success: 'Адрес сохранен, вы можете изменить его в личной странице.',
            error: (error) => JSON.stringify(error, null, 2)
          }
        )
        .finally(() => {
          refetch();
        });
    };
    profiles.length < 1 && handleCreate();

    const product = products.map((product) => {
      return {
        productId: product.id,
        quantity: product.quantity
      };
    });
    let inputAddress = address
      ? `Ул.${address.street}, д. ${address.houseNumber}, кв. ${address.flat}`
      : '';

    const value: IUsersOrder = {
      address:
        profiles.length > 1
          ? addressOrder.length > 1
            ? addressOrder
            : inputAddress
          : inputAddress,
      comment: address ? address.addressComment : '',

      phone: address ? address.phone : '',
      totalPrice: total,
      paymentMethod,
      //@ts-ignore
      orderProductsDto: product,
      withDeposit: useBonus
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
  //всплывашка сохранения данных юзера
  const [isEditedInfo, setIsEditedInfo] = useState(false);
  useEffect(() => {
    if (user && user.firstname.length === 0) {
      setTimeout(() => {
        setIsEditedInfo(true);
      }, 2000);
    }
  }, [user]);

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
              <OrderAccordion
                setAddress={setAddress}
                setAddressOrder={setAddressOrder}
                setIsValid={setIsValid}
                address={address}
              />
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
      {/* //всплывашка сохранения данных юзера */}
      <Edit setVisible={setIsEditedInfo} visible={isEditedInfo} user={user!} />
    </Layout>
  );
};

export default UserOrderCreate;
