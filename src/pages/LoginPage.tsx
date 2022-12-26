import { Button, Input } from '@/components/Forms';
// import { Modal } from '@/components/Layout/Modal';
// import { useAppSelector } from '@/hooks/useAppSelector';
import { ILoginForm, IUserFull } from '@/types';
import { Form, Formik } from 'formik';
// import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { login } from '@/redux/slices/auth';

import * as Yup from 'yup';
import {
  useCreateUserAccountMutation,
  useGetUserCodeMutation
} from '@/redux/services/base.service';
import { useEffect, useState } from 'react';
import { Modal } from '@/components/Layout/Modal';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@/components/Checkbox';
import { useAppSelector } from '@/hooks/useAppSelector';

const SignInSchema = Yup.object().shape({
  phone: Yup.string().required('Обязательное поле для заполнения')
});

const INIT: IUserFull = {
  addressComment: '',
  birthday: '',
  bonuses: 1,
  firstname: '',
  flat: '',
  lastname: '',
  middleName: '',
  phone: '',
  role: 'ROLE_USER',
  street: '',
  houseNumber: ''
};

const initial: ILoginForm = {
  password: '',
  phone: ''
};

const LoginPage = () => {
  const [createAccount, { isLoading }] = useCreateUserAccountMutation();
  const navigate = useNavigate();
  const [genCode, { isLoading: codeLoading }] = useGetUserCodeMutation();

  const { user } = useAppSelector((state) => state.auth);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [phoneNumb, setPhoneNumb] = useState('');
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login/user');
    } else {
      navigate('/');
    }
  }, [user]);

  const dispatch = useAppDispatch();
  const generateCode = async (values) => {
    console.log(values);
    toast.promise(genCode(values).unwrap(), {
      loading: 'Загрузка...',
      success: 'Код успешно отправлен',
      error: (error) => JSON.stringify(error.data, null, 2)
    });
  };

  const handleCreate = async (values: IUserFull) => {
    console.log(values);
    setPhoneNumb(values.phone);
    toast
      .promise(createAccount(values).unwrap(), {
        loading: 'Загрузка...',
        success: 'Аккаунт создан успешно',
        error: (error) => JSON.stringify(error.data, null, 2)
      })
      .finally(() => {
        setIsOpenModal(true);
      });
  };

  const handleSubmit = async (values: ILoginForm) => {
    console.log(values);
    toast
      .promise(dispatch(login({ phone: phoneNumb, password: values.password })).unwrap(), {
        success: 'Вход выполнен успешно!',
        loading: 'Загрузка',
        error: (err) => err.toString()
      })
      .then(() => {
        navigate('/');
      });
  };

  const validation = Yup.object().shape({
    password: Yup.string().required()
  });

  return (
    <section className="relative flex min-h-screen">
      <div
        className={`flex min-w-0 flex-auto flex-col items-center bg-white sm:flex-row sm:justify-center md:items-start md:justify-start`}>
        <div
          className={`relative hidden h-full flex-auto items-center justify-center overflow-hidden bg-dark-blue bg-cover bg-no-repeat p-10 text-white sm:w-1/2 md:flex xl:w-3/5`}
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1562016600-ece13e8ba570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=738&q=80)'
          }}>
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900 to-blue-400 opacity-70" />
        </div>
        <div
          className={`flex h-full w-full items-center justify-center rounded-none bg-white p-5 sm:w-auto sm:rounded-lg md:p-10 lg:p-14 xl:w-2/5`}>
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">Добро пожаловать!</h2>
            </div>
            <Checkbox
              label="Зарегистрировать по номеру телефона"
              onChange={() => setIsPhone(!isPhone)}
            />
            {!isPhone ? (
              <Formik initialValues={INIT} onSubmit={handleCreate} validationSchema={SignInSchema}>
                {() => (
                  <Form className="mt-8 space-y-6 grid grid-cols-3 gap-1">
                    <div>
                      <Input
                        inputType="formik"
                        id="firstname"
                        name="firstname"
                        label="Имя"
                        width="w-full"
                      />
                    </div>
                    <div>
                      <Input
                        inputType="formik"
                        id="lastname"
                        name="lastname"
                        label="Фамилия"
                        width="w-full"
                      />
                    </div>
                    <div>
                      <Input
                        inputType="formik"
                        id="middleName"
                        name="middleName"
                        label="Отчество"
                        width="w-full"
                      />
                    </div>
                    <div className="col-span-3"></div>
                    <div>
                      <Input
                        inputType="formik"
                        id="street"
                        name="street"
                        label="Улица"
                        width="w-full"
                      />
                    </div>
                    <div>
                      <Input
                        inputType="formik"
                        id="houseNumber"
                        name="houseNumber"
                        label="Номер дома"
                        width="w-full"
                      />
                    </div>
                    <div>
                      <Input
                        inputType="formik"
                        id="flat"
                        name="flat"
                        label="Квартира"
                        width="w-full"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        inputType="formik"
                        id="birthday"
                        name="birthday"
                        label="Дата рождения"
                        width="w-full"
                        type="date"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        inputType="formik"
                        id="phone"
                        name="phone"
                        label="Номер телефона"
                        width="w-full"
                        mask="+7 (999) 999 99 99"
                      />
                    </div>
                    <Button type="submit" loading={isLoading} className="col-span-3">
                      Создать аккаунт
                    </Button>
                  </Form>
                )}
              </Formik>
            ) : (
              <>
                <Formik initialValues={{ phone: '' }} onSubmit={generateCode}>
                  <Form>
                    <Input
                      inputType="formik"
                      name="phone"
                      id="phone"
                      mask="+7 (999) 999 99 99"
                      className="mb-2"
                      placeholder="+7 (999) 999 99 99"
                    />
                    <Button type="submit" loading={codeLoading}>
                      Отправить код
                    </Button>
                  </Form>
                </Formik>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <p className="text-center font-montserrat text-dark-blue font-medium">
          Введите код подтверждения
        </p>
        <p className="text-center font-montserrat text-gray-700 text-sm">
          Код придет вам в течении одной минуты
        </p>
        <Formik initialValues={initial} validationSchema={validation} onSubmit={handleSubmit}>
          <Form>
            <div className="mb-3">
              <Input
                inputType="formik"
                name="password"
                id="password"
                type="password"
                label="Код подтверждения"
              />
            </div>
            <Button>Отправить</Button>
          </Form>
        </Formik>
      </Modal>
    </section>
  );
};

export default LoginPage;
