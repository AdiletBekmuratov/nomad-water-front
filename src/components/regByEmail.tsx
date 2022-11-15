import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Button, Input } from './Forms';

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
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={validation}>
        {({ isValid }) => (
          <Form className="flex flex-col space-y-4">
            <Input
              inputType="formik"
              id="email"
              name="email"
              type="email"
              label="Почта"
              placeholder="Почта"
            />
            <Input
              inputType="formik"
              id="password"
              name="password"
              type="password"
              label="Пароль"
            />
            <Input
              inputType="formik"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Подтвердите пароль"
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

export default RegByEmail;
