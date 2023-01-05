import React from 'react';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
import { IEmployeeCreate } from '@/types/employee.types';
import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';

import { Link } from 'react-router-dom';
import { useCreateEmployeeMutation, useCreateWorkerMutation } from '@/redux/services/user.service';

const params = new URLSearchParams(location.search);
const token = params.get('token');
const role = params.get('role');
const warehouseId = params.get('warehouseId');
const INITIAL_VALUES: IEmployeeCreate = {
  token: token,
  role: role,
  warehouseId: warehouseId,
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

const RegisterForLink: FC = () => {
  const [visible, setVisible] = React.useState(false);
  // const [createEMPLOYEE, { isLoading }] = useCreateUserAccountMutation();
  const [createCourier, { isLoading }] = useCreateEmployeeMutation();
  const [createWorker, { isLoading: isL }] = useCreateWorkerMutation();
  const handleCreate = (values: IEmployeeCreate) => {
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
      // } else if (role === 'ROLE_EMPLOYEE') {
      //   toast
      //     .promise(createEMPLOYEE(values).unwrap(), {
      //       loading: 'Загрузка...',
      //       success: 'Получено',
      //       error: (error) => JSON.stringify(error, null, 2)
      //     })
      //     .finally(() => {
      //       // setVisibleCreate(false);
      //     });
    } else {
      toast
        .promise(createWorker(values).unwrap(), {
          loading: 'Загрузка...',
          success: 'Получено',
          error: (error) => JSON.stringify(error, null, 2)
        })
        .finally(() => {
          // setVisibleCreate(false);
        });
    }
  };
  const validation = yup.object().shape({
    phone: yup.string().required('Это поле обязательное'),
    firstname: yup.string().required('Это поле обязательное'),
    lastname: yup.string().required('Это поле обязательное')
    // street: yup.string().required('Это поле обязательное'),
    // houseNumber: yup.string().required('Это поле обязательное'),
    // flat: yup.string().required('Это поле обязательное'),
    // addressComment: yup.string().required('Это поле обязательное'),
    // birthday: yup.string().required('Это поле обязательное'),
  });

  return (
    <div className={`py-5 md:py-10 h-screen bg-light-blue md:px-20`}>
      <h2 className={`text-center font-semibold pb-3 md:pb-10`}>Заполните поля</h2>

      <Formik initialValues={INITIAL_VALUES} onSubmit={handleCreate} validationSchema={validation}>
        {(props) => (
          <Form className={`flex flex-col gap-3 sm:space-y-4 layout `}>
            <>
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 items-center`}>
                <span>Role: {role}</span>
                <span>Номер склада: {warehouseId}</span>
                {/* <Input inputType="formik" name="role" id="role" label="role" disabled />
                  <Input
                    inputType="formik"
                    name="warehouseId"
                    id="warehouseId"
                    label="ID склада"
                    disabled
                  /> */}
              </div>
              <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 items-center`}>
                <Input inputType="formik" name="firstname" id="firstname" label="Имя" />
                <Input inputType="formik" name="middleName" id="middleName" label="Отчество" />
                <Input inputType="formik" name="lastname" id="lastname" label="Фамилия" />
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
                  name="phone"
                  id="phone"
                  label="Телефон"
                  mask="+79999999999"
                  placeholder="+7 (999) 999 9999"
                />
                <Input
                  inputType="formik"
                  name="telegramAccount"
                  id="telegramAccount"
                  label="Telegtam"
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
export default RegisterForLink;
