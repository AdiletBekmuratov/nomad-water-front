import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/hooks';
import { Link } from 'react-router-dom';

import { toast } from 'react-hot-toast';

import { clearItems } from '@/redux/slices/cartSlice';
import { useCreateProfileMutation, useGetALLProfilesQuery } from '@/redux/services/profile.service';
import { useAppDispatch } from '@/hooks';
import { IProduct, IProfile, IUsersOrder } from '@/types';

import { OrderCard, Total } from '@/components/Order';
import { OrderAccordion } from './OrderAccordion';
import { OrderUserProfile } from './OrderUserProfile';
import { WS_URL } from '@/redux/http';

import { Button } from '@/components/Forms';
import { Layout } from '@/components/Layout';
import { Edit } from '../User';
import Payment from './Payment';

import { MdOutlineRemoveShoppingCart } from 'react-icons/md';

export type IAddressType = {
  name?: string;
  phone: string;
  firstname: string;
  flat: string;
  addressComment: string;
};
export type IStreetType = {
  houseNumber: string;
  longitude: string;
  latitude: string;
  street: string;
};
const UserOrderCreate = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { products, total } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  //список профилей
  const { data: profiles = [], refetch } = useGetALLProfilesQuery();
  //создание профиля при первом заказе
  const [create] = useCreateProfileMutation();
  //самовывоз заказа клиентом
  const [pickup, setPickup] = useState(false);
  //использование бонусов при заказе
  const [useBonus, setUseBonus] = useState(false);
  const [street, setStreet] = useState<IStreetType>({
    houseNumber: profiles[0] ? profiles[0].houseNumber! : '',
    longitude: profiles[0] ? profiles[0].longitude! : '',
    latitude: profiles[0] ? profiles[0].latitude! : '',
    street: profiles[0] ? profiles[0].street! : ''
  });
  const [paymentMethod, setPaymentMethod] = useState('Картой');

  const clientRef = useRef<WebSocket | null>(null);
  const [waitingToReconnect, setWaitingToReconnect] = useState<boolean | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  //выбор профиля при заказе если клиент не сделал выбор
  const initProf = profiles.length > 0 ? profiles[0] : null;

  const initAddress: IAddressType = {
    name: initProf ? initProf.name! : '',
    phone: user ? user.phone : '',
    firstname: user ? user.firstname : '',
    //@ts-ignore
    street: initProf ? initProf.street : '',

    houseNumber: initProf ? initProf.houseNumber : '',
    flat: initProf ? initProf.flat : '',
    addressComment: initProf ? initProf.addressComment! : ''
  };
  //адрес если профиля не было или он не был изменен
  const [address, setAddress] = useState<IAddressType>(initAddress);
  //валидность формы
  const [isValid, setIsValid] = useState(false);

  // создание заказа
  const handleSendOrder = () => {
    //если не было профилей создаем при заказе
    let values: IProfile = {
      name: address?.name ? address.name : 'По умолчанию',
      street: street ? street.street : '',
      houseNumber: street ? street.houseNumber : '',
      latitude: street ? street.latitude : '',
      longitude: street ? street.longitude : '',
      flat: address?.flat ? address?.flat : '',
      addressComment: address?.addressComment ? address?.addressComment : ''
    };

    //создание первого профиля
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
    //пересохраняем продукты для отправки
    const product = products.map((product) => {
      return {
        productId: product.id,
        quantity: product.quantity
      };
    });
    //адрес если профиля не было или он не был изменен
    let inputAddress = `${street.street}, д. ${street.houseNumber} ${
      address.flat ? ', кв.' + address.flat : ''
    }`;

    const value: IUsersOrder = {
      address: inputAddress,
      comment: address ? address.addressComment : '',
      phone: address ? address.phone : '',
      totalPrice: total,
      paymentMethod,
      //@ts-ignore
      orderProductsDto: product,
      withDeposit: useBonus,
      latitude: street.latitude,
      longitude: street.longitude
    };
    //отправка заказа по сокету
    clientRef.current?.send(JSON.stringify(value));
    //очистка корзины
    dispatch(clearItems());
  };
  //сокеты
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
  //проверка на наличие имени
  const userName = user ? (user.firstname ? user.firstname : '') : '';
  useEffect(() => {
    if (userName.length === 0) {
      setTimeout(() => {
        setIsEditedInfo(true);
      }, 2000);
    }
  }, []);

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
              {profiles.length > 0 ? (
                <OrderUserProfile
                  profiles={profiles}
                  setAddress={setAddress}
                  setIsValid={setIsValid}
                  street={street}
                  setStreet={setStreet}
                />
              ) : (
                <OrderAccordion
                  setStreet={setStreet}
                  address={address}
                  setAddress={setAddress}
                  setIsValid={setIsValid}
                />
              )}
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
