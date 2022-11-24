import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { Button, Input } from './Forms';

type formValues = {
  phone: string;
  password: string;
  confirmPassword: string;
};

export const RegByPhone = () => {
  const validation = yup.object().shape({
    phone: yup.string().required('Это поле обязательное'),
    password: yup.string().required('Поле обязательное'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref(`password`)], 'Пароль не совпадает')
      .required('Поле обязательное')
  });

  const initialValues: formValues = { phone: '', password: '', confirmPassword: '' };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        validationSchema={validation}>
        {({ isValid }) => (
          <Form className="flex flex-col space-y-4">
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

            <Button type="submit" disabled={!isValid}>
              Отправить
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
