import { Formik } from 'formik';
import * as yup from 'yup';
import { Button } from './Forms';

type formValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegByEmail = () => {
  const validation = yup.object().shape({
    email: yup.string().required('Поле обязательное'),
    password: yup.string().required('Поле обязательное'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref(`password`)], 'Пароль не совпадает')
      .required('Поле обязательное')
  });

  const initialValues: formValues = { email: '', password: '', confirmPassword: '' };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        onSubmit={(values) => {
          alert(values);
        }}
        validationSchema={validation}>
        {({ values, errors, touched, handleChange, handleBlur, isValid, dirty }) => (
          <>
            <label htmlFor="" className="block font-roboto">
              Почта
            </label>

            {touched.email && errors.email && <p className="text-red">{errors.email}</p>}
            <label htmlFor="" className="block font-roboto">
              Пароль
            </label>
            <input
              type="password"
              name={`password`}
              className="block font-roboto"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {touched.password && errors.password && <p className="text-red">{errors.password}</p>}
            <label htmlFor="" className="block font-roboto">
              Повторите пароль
            </label>
            <input
              type="password"
              name={`confirmPassword`}
              className="block font-roboto"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-red">{errors.confirmPassword}</p>
            )}
            <Button type="submit" />
          </>
        )}
      </Formik>
    </>
  );
};

export default RegByEmail;
