import React from 'react';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';

import { Link } from 'react-router-dom';
import {
  useCreateCourierMutation,
  useCreateEmployeeMutation,
  useCreateWorkerMutation
} from '@/redux/services/user.service';
import { IUserFull } from '@/types';

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
  const [visible, setVisible] = React.useState(false);
  const [createEMPLOYEE] = useCreateEmployeeMutation();
  const [createCourier, { isLoading }] = useCreateCourierMutation();
  const [createWorker, { isLoading: isL }] = useCreateWorkerMutation();
  const handleCreate = (values: IUserFull) => {
    if (role === 'ROLE_COURIER') {
      toast
        .promise(createCourier(values).unwrap(), {
          loading: 'Загрузка...',
          success: 'Получено',
          error: (error) => JSON.stringify(error, null, 2)
        })
        .finally(() => {
          //setVisibleCreate(false);
        });
    } else if (role === 'ROLE_EMPLOYEE') {
      toast
        .promise(createEMPLOYEE(values).unwrap(), {
          loading: 'Загрузка...',
          success: 'Получено',
          error: (error) => JSON.stringify(error, null, 2)
        })
        .finally(() => {});
    } else {
      toast
        .promise(createWorker(values).unwrap(), {
          loading: 'Загрузка...',
          success: 'Получено',
          error: (error) => JSON.stringify(error, null, 2)
        })
        .finally(() => {});
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
                <Input inputType="formik" name="street" id="street" label="Улица" />
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
                      type="text"
                      name="shopkeeperPhone"
                      id="shopkeeperPhone"
                      label="Номер владельца склада"
                    />
                  </>
                )}
              </div>
            </>

            <div className="modal-action">
              <Button type="submit" loading={isLoading || isL} onClick={() => setVisible(true)}>
                Зарегистрироваться
              </Button>
              <Modal isOpenModal={visible} setIsOpenModal={setVisible}>
                <div className={`flex flex-col gap-3 text-center px-10`}>
                  <h2 className={`text-lg font-semibold`}>Ваши данные сохранены!</h2>
                  <span>В течении минуты на {props.values.phone} придет смс код.</span>{' '}
                  <p>Используйте его вместо пароля для входа в систему</p>
                  <Link to="/login/user">
                    <Button>Войти</Button>
                  </Link>
                </div>
              </Modal>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default RegisterLinkEmployee;
