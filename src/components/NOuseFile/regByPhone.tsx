import { Form, Formik } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';

import { Button, Input } from '../Forms';

type formValues = {
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export const RegByPhone: FC = ({ setIsAuth, setUser }) => {
  const validation = yup.object().shape({
    name: yup.string().required('Это поле обязательное'),
    phone: yup.string().required('Это поле обязательное'),
    password: yup.string().required('Поле обязательное'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref(`password`)], 'Пароль не совпадает')
      .required('Поле обязательное')
  });

  const initialValues: formValues = { name: '', phone: '', password: '', confirmPassword: '' };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        onSubmit={(values) => setUser(values)}
        validationSchema={validation}>
        {({ isValid }) => (
          <Form className="flex flex-col space-y-4 w-full ">
            <Input
              inputType="formik"
              id="name"
              name="name"
              label="Ваше имя"
              placeholder="Введите имя"
            />

            <Input
              inputType="formik"
              id="phone"
              name="phone"
              label="Номер телефона"
              mask="+7 (999) 999-99-99"
              placeholder="+7 (999) 999-99-99"
            />

            <Input
              inputType="formik"
              id="password"
              name="password"
              type={'password'}
              label="Пароль"
            />
            <Input
              inputType="formik"
              id="confirmPassword"
              name="confirmPassword"
              type={`password`}
              label={`Подтвердите пароль`}
            />

            <Button type="submit" disabled={!isValid} onClick={() => setIsAuth(isValid)}>
              Зарегистрироваться
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
