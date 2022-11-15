import { Form, Formik } from 'formik';
import * as yup from 'yup';
import InputMask from 'react-input-mask';

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
        {({ values, errors, touched, handleChange, handleBlur, isValid }) => (
          <Form className="flex flex-col space-y-4">
            <Input inputType="formik" id="phone" name="phone" type={'tel'} label="Phone" />

            <Input
              inputType="formik"
              id="password"
              name="password"
              type={'password'}
              label="Password"
            />
            {touched.password && errors.password && <p className="text-red">{errors.password}</p>}
            <label htmlFor="password" className="font-roboto">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="confirmPassword"
              className="block"
              value={values.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-red">{errors.confirmPassword}</p>
            )}
            <Button type="submit" disabled={!isValid}>
              Отправить
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
