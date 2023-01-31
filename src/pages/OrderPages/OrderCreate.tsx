import { FC, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/hooks';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useCreateProfileMutation, useGetALLProfilesQuery } from '@/redux/services/profile.service';
import { clearItems } from '@/redux/slices/cartSlice';
import { IProduct, IProfile, IUsersOrder } from '@/types';

import { WS_URL } from '@/redux/http';

import {
  Footer,
  OrderAcordion as OrderAcсordion,
  OrderCard,
  PaymentComponent,
  Total
} from '@/components/Order';
import EditCard from '@/components/Order/EditCard';

import { Button } from '@/components/Forms';
import { Layout } from '@/components/Layout';
import { Modal } from '@/components/Layout/Modal';

import { MdOutlineRemoveShoppingCart } from 'react-icons/md';

import { toast } from 'react-hot-toast';

const userStyle = 'font-montserrat text-dark-blue';

const initial: IUsersOrder = {
  address: '',
  comment: '',
  isSale: false,
  paymentMethod: 'Наличными',
  phone: '',
  orderProductsDto: [],
  totalPrice: 0
};

const OrderCreate: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  // let profiles = user ? (user.profiles ? user.profiles : []) : [];
  const { data: profiles = [], refetch } = useGetALLProfilesQuery();
  const { products, total } = useAppSelector((state) => state.cart);
  const [create, { isLoading }] = useCreateProfileMutation();

  const [isOpen, setIsOpen] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [address, setAddress] = useState([]);
  ///total state
  const [pickup, setPickup] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [useBonus, setUseBonus] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('Картой');

  //@ts-ignore
  const addressOrder = `${address?.street} ${address?.houseNumber}, квартира: ${address?.flat}`;

  const clientRef = useRef<WebSocket | null>(null);
  const [waitingToReconnect, setWaitingToReconnect] = useState<boolean | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // const handleCreate = () => {
  //   let values: IProfile = {
  //     name: 'По умолчанию',
  //     //@ts-ignore
  //     street: address?.street ? address.street : '',
  //     //@ts-ignore
  //     houseNumber: address?.houseNumber ? address?.houseNumber : '',
  //     //@ts-ignore
  //     flat: address?.flat ? address?.flat : '',
  //     //@ts-ignore
  //     addressComment: address?.addressComment ? address?.addressComment : ''
  //   };
  //   toast
  //     .promise(
  //       create(values)
  //         .unwrap()
  //         .then((resp) => {
  //           console.log(resp);
  //           // setResponse(()=>resp);
  //         }),
  //       {
  //         loading: 'Загрузка...',
  //         success: 'Адрес сохранен, вы можете изменить его в личной странице.',
  //         error: (error) => JSON.stringify(error, null, 2)
  //       }
  //     )
  //     .finally(() => {
  //       refetch();
  //     });
  // };

  const handleSendOrder = () => {
    let values: IProfile = {
      name: 'По умолчанию',
      //@ts-ignore
      street: address?.street ? address.street : '',
      //@ts-ignore
      houseNumber: address?.houseNumber ? address?.houseNumber : '',
      //@ts-ignore
      flat: address?.flat ? address?.flat : '',
      //@ts-ignore
      addressComment: address?.addressComment ? address?.addressComment : ''
    };
    const handleCreate = () => {
    toast
      .promise(
        create(values)
          .unwrap()
          .then((resp) => {
            console.log(resp);
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
    }
    profiles.length < 1 && handleCreate();

    const product = products.map((product) => {
      return {
        productId: product.id,
        quantity: product.quantity
      };
    });
    //@ts-ignore
    const value: IUsersOrder = {
      address: addressOrder,
      //@ts-ignore
      comment: address.addressComment,
      //@ts-ignore
      phone: address.phone,
      totalPrice: total,
      paymentMethod,
      //@ts-ignore
      orderProductsDto:
        //@ts-ignore
        product
    };

    clientRef.current?.send(JSON.stringify(value));

    dispatch(clearItems());
    // console.log(value);
  };

  useEffect(() => {
    if (waitingToReconnect) {
      return;
    }

    if (!clientRef.current) {
      const client = new WebSocket(WS_URL + '/order/create');
      clientRef.current = client;

      client.onerror = (err) => {
        console.error(err);
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
        console.log(data.data);
      };
    }
  }, [waitingToReconnect]);

  // console.log(orderDto);
  // const validationSchema = yup.object().shape({
  //   cardNumber: yup.string().required('Поле обязательное'),
  //   validity: yup.string().required('Поле обязательное'),
  //   cvc: yup.string().required('Поле обязательное').min(3, 'Должно быть 3').max(3),
  //   nameOnCard: yup.string().required('Поле обязательное')
  // });
  // type initialValues = {
  //   cardNumber: string;
  //   validity: string;
  //   cvc: string;
  //   nameOnCard: string;
  // };

  // const initialVal: initialValues = {
  //   cardNumber: '',
  //   validity: '',
  //   cvc: '',
  //   nameOnCard: ''
  // };
  // const paymentStyle = 'placeholder:text-gray-300 font-montserrat';
  // const choiceAddress = profiles.find((profile) => profile.name);
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
              <OrderAcсordion
               // isEdited={isEdited}
                //isOpen={isOpen}
                setAddress={setAddress}
                //setIsEdited={setIsEdited}
               //setIsOpen={setIsOpen}
                setIsValid={setIsValid}
                //initial={initial}
              />
            </div>

            {/* {profiles.length > 0 && (
                <div
                  className={`lg:col-span-2 lg:order-1 order-1 lg:col-start-3 lg:row-start-1 row-start-1 
            grid bg-white p-3 rounded-lg h-full `}>
                  <span>
                    <strong>Адрес заказа: </strong>
                    <p className="border-b-2">Основной адрес</p>
                    <p>
                      Улица:
                      {`${profiles.find((profile) => profile.name === 'По умолчанию')?.street}`}
                    </p>
                    <p>
                      Дом:
                      {`${
                        profiles.find((profile) => profile.name === 'По умолчанию')?.houseNumber
                      }`}
                    </p>
                    <p>
                      Кв:
                      {`${profiles.find((profile) => profile.name === 'По умолчанию')?.flat}`}
                    </p>
                  </span>
                  <div>
                    
                  </div>
                </div>
              )} */}

            <div className={`flex flex-col gap-5 `}>
              <EditCard className={`lg:order-3  w-full `}>
                <div className="flex flex-col gap-3 items-center">
                  <span className={`font-semibold text-sm ${userStyle}`}>
                    Выберите способ оплаты
                  </span>
                  <h3 className={`font-semibold text-center opacity-75 text-xs ${userStyle}`}>
                    (для смены нажмите кнопку)
                  </h3>
                  <button
                    className={`p-2 border border-dashed border-dark-blue rounded-xl`}
                    onClick={() => {
                      if (paymentMethod === 'Наличными') {
                        setPaymentMethod('Картой');
                      } else {
                        setPaymentMethod('Наличными');
                      }
                      return paymentMethod;
                    }}>
                    {paymentMethod}
                  </button>

                  {paymentMethod === 'Картой' && (
                    <Button className="text-sm max-w-sm">Изменить данные карты</Button>
                  )}
                </div>

                {/* {paymentMethod === 'Картой' && (
              <div>
                <FormContainer
                  initialValues={initialVal}
                  validationSchema={validationSchema}
                  setIsValid={setIsValid}
                  className="px-6">
                  <div className="mb-2">
                    <Input
                      inputType="formik"
                      name="cardNumber"
                      id="cardNumber"
                      label="Номер банковской карты"
                      mask="9999 9999 9999 9999"
                      placeholder="4444 0000 0000 0000"
                      className={paymentStyle}
                    />
                  </div>
                  <div className="grid grid-cols-2 mb-2">
                    <div className="mr-2">
                      <Input
                        inputType="formik"
                        name="validity"
                        id="validity"
                        label="Срок действия"
                        className={paymentStyle}
                        placeholder="01/01"
                        mask="99/99"
                      />
                    </div>
                    <div className="ml-2">
                      <Input name="cvc" id="cvc" inputType="formik" label="CVC" type="password" />
                    </div>
                  </div>
                  <div className="mb-5">
                    <Input
                      inputType="formik"
                      name="nameOnCard"
                      id="nameOnCard"
                      label="Имя и фамилия на карте"
                      className={paymentStyle}
                      placeholder="JOHN SMITH"
                    />
                  </div>
                  <div className="border-b-2 mb-5">
                    <Checkbox id="saveCard" name="saveCard" label="Сохранить карту" />
                  </div>
                </FormContainer>
              </div>
            )} */}

                {/* <button
              className="text-blue-light font-montserrat font-semibold text-xs"
              onClick={() => {
                setIsEdited(true);
              }}
              value="payment">
              Выберите способ оплаты
            </button> */}
              </EditCard>
              <Total
                delivery={delivery}
                setDelivery={setDelivery}
                pickup={pickup}
                setPickup={setPickup}
                useBonus={useBonus}
                setUseBonus={setUseBonus}
                isValid={isValid}
                buttonAction={handleSendOrder}
                initial={initial}
                initialTotal={total}
              />
            </div>
          </div>

          <div className={`h-28 lg:hidden`}></div>
          <Footer className={`items-center flex justify-center lg:hidden`}>
            <Button
              className={`w-80 h-11 text-sm disabled:bg-opacity-70 md:w-2/3`}
              buttonColor="bg-dark-blue font-montserrat"
              //disabled={!isValid}
              onClick={() => {
                handleSendOrder();
                //alert(JSON.stringify(address, null, 2));
                navigate('/myOrders');
              }}>
              Оформить заказ
            </Button>
          </Footer>
          {isEdited && (
            <>
              <Modal isOpenModal={isOpen} setIsOpenModal={setIsEdited}>
                <PaymentComponent buttonName="Продолжить" name={user?.username ?? ''} />
              </Modal>
            </>
          )}
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
