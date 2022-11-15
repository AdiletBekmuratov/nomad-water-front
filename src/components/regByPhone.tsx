import { Formik } from 'formik';
import * as yup from 'yup';
import Button from './button';
import InputMask from 'react-input-mask';

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
        onSubmit={(values) => alert(values)}
        validationSchema={validation}>
        {({ values, errors, touched, handleChange, handleBlur, isValid, dirty }) => (
          <>
            <label htmlFor="phone" className="font-roboto">
              Номер телефона
            </label>
            <InputMask
              mask="+7-(999)-999-9999"
              value={values.phone}
              onBlur={handleBlur}
              onChange={handleChange}
              className="block"
              name="phone"
              id="phone"
              type="tel"
              placeholder="+7-(999)-999-9999"
            />
            {touched.phone && errors.phone && <p className="text-red">{errors.phone}</p>}
            <label htmlFor="password" className="font-roboto">
              Пароль
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="block"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
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
            <Button isDisabled={!isValid && !dirty} data={values} />
          </>
        )}
      </Formik>
    </>
  );
};
