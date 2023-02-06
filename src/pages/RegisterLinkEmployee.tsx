import React from 'react';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';

import { Link, useNavigate } from 'react-router-dom';
import {
  useCreateCourierMutation,
  useCreateEmployeeMutation,
  useCreateWorkerMutation
} from '@/redux/services/user.service';
import { ILoginForm, IUserFull } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getMe, login } from '@/redux/slices/auth';

const params = new URLSearchParams(location.search);
const token = params.get('token');
const role = params.get('role');
const warehouseId = params.get('warehouseId');
//@ts-ignore
const INITIAL_VALUES: IUserFull = {
  token: String(token),
  role: String(role),
  warehouseId: Number(warehouseId),
  phone: '',

  firstname: '',
  middleName: '',
  lastname: '',

  birthday: '',
  street: '',
  houseNumber: '',
  flat: '',
  addressComment: '',
  bonuses: 0,
  telegramAccount: '',
  car: '',
  courierDeliveringStatus: 0,
  successfulOrders: 0,

  shopkeeperPhone: ''
};

const RegisterLinkEmployee: FC = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const { user } = useAppSelector((state) => state.auth);

  // React.useEffect(() => {
  //   if (!user) {
  //     navigate('/login/user');
  //   } else {
  //     navigate('/catalog');
  //   }
  // }, [user]);

  const [phone, setPhone] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [createEMPLOYEE] = useCreateEmployeeMutation();
  const [createCourier, { isLoading }] = useCreateCourierMutation();
  const [createWorker, { isLoading: isL }] = useCreateWorkerMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values: ILoginForm) => {
    console.log(values);
    toast
      .promise(dispatch(login(values)).unwrap(), {
        loading: 'Загрузка...',
        success: 'Добро пожаловать в Nomad Water',
        error: (error) => JSON.stringify(error, null, 2)
      }).then(() => dispatch(getMe()))
      .finally(() => {
        navigate('/catalog');
      });
  };

  const handleCreate = (values: IUserFull) => {
    setPhone(values.phone);

    if (role === 'ROLE_COURIER') {
      toast
        .promise(createCourier(values).unwrap(), {
          loading: 'Загрузка...',
          success: 'Получено',
          error: (error) => JSON.stringify(error, null, 2)
        })
        .finally(() => {
          setIsOpenModal(true);
        });
    } else if (role === 'ROLE_EMPLOYEE') {
      toast
        .promise(createEMPLOYEE(values).unwrap(), {
          loading: 'Загрузка...',
          success: 'Получено',
          error: (error) => JSON.stringify(error, null, 2)
        })
        .finally(() => {
          setIsOpenModal(true);
        });
    } else {
      toast
        .promise(createWorker(values).unwrap(), {
          loading: 'Загрузка...',
          success: 'Получено',
          error: (error) => JSON.stringify(error, null, 2)
        })
        .finally(() => {
          setIsOpenModal(true);
        });
    }
  };
  const validation = yup.object().shape({
    phone: yup.string().required('Это поле обязательное'),
    firstname: yup.string().required('Это поле обязательное'),
    lastname: yup.string().required('Это поле обязательное')
  });

  return (
    <div className={`py-5 md:py-10  bg-light-blue md:px-20 h-screen`}>
      <h2 className={`text-center font-semibold pb-3 md:pb-10`}>Заполните поля</h2>

      <Formik initialValues={INITIAL_VALUES} onSubmit={handleCreate} validationSchema={validation}>
        {(props) => (
          <Form className={`flex flex-col gap-3 sm:space-y-4 layout `}>
            <>
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 items-center`}>
                <span>
                  Вы:{' '}
                  {role === 'ROLE_COURIER'
                    ? 'Курьер'
                    : role === 'ROLE_MASTER'
                    ? 'Мастер'
                    : role === 'ROLE_KEEPER'
                    ? 'Работник'
                    : role === 'ROLE_EMPLOYEE' && 'Диспечер'}
                </span>
                {role === 'ROLE_MASTER' ||
                  (role === 'ROLE_KEEPER' && <span>Номер склада: {warehouseId}</span>)}
              </div>
              <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 items-center`}>
                <Input inputType="formik" name="firstname" id="firstname" label="Имя" />
                <Input inputType="formik" name="lastname" id="lastname" label="Фамилия" />
                <Input
                  inputType="formik"
                  name="phone"
                  id="phone"
                  label="Телефон"
                  mask="+79999999999"
                  placeholder="+7 (999) 999 9999"
                />
              </div>

              <div className={`grid grid-cols-1 md:grid-col-2 gap-2`}>
                <Input inputType="formik" name="street" id="street" label="Микрорайон / Улица" />
                <div className={`grid grid-cols-3 gap-3 text-center`}>
                  <Input inputType="formik" name="houseNumber" id="houseNumber" label="Дом" />
                  <Input inputType="formik" name="flat" id="flat" label="Квартира" />
                </div>
              </div>
              <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 items-center`}>
                <Input
                  inputType="formik"
                  name="telegramAccount"
                  id="telegramAccount"
                  label="Telegram"
                />
                <Input
                  inputType="formik"
                  type="date"
                  name="birthday"
                  id="birthday"
                  label="День рождения"
                />
              </div>
              <div className="grid grid-cols-1 items-center`">
                <>
                  {props.values.role === 'ROLE_COURIER' && (
                    <div className={`grid grid-cols-1 items-center`}>
                      <Input inputType="formik" name="car" id="car" label="car" />
                    </div>
                  )}
                </>

                {(role === 'ROLE_MASTER' || role === 'ROLE_KEEPER') && (
                  <>
                    <Input
                      inputType="formik"
                      name="shopkeeperPhone"
                      id="shopkeeperPhone"
                      label="Номер владельца склада"
                      mask="+79999999999"
                    />
                  </>
                )}
              </div>
            </>

            <div className="modal-action">
              <Button type="submit" loading={isLoading || isL} onClick={() => setVisible(true)}>
                Зарегистрироваться
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <div className="flex justify-center">
          <h2 className="font-montserrat text-lg">Введите код подтверждения</h2>
        </div>
        <div>
          <p className="font-montserrat text-sm">Код придет к вам в течении пары минут</p>
          <Formik
            initialValues={{ password: '' }}
            onSubmit={(values) => handleLogin({ phone: phone, password: values.password })}>
            {() => (
              <Form>
                <Input
                  id="password"
                  name="password"
                  label="Код подтверждения"
                  inputType="formik"
                  type="password"
                />
                <Button className="mt-3" type="submit">
                  Отправить
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};
export default RegisterLinkEmployee;
