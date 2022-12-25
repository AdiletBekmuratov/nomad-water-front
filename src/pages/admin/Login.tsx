import { Button, Input } from '@/components/Forms';
// import { Modal } from '@/components/Layout/Modal';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { login } from '@/redux/slices/auth';
import { ILoginForm } from '@/types';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
  phone: Yup.string().required('Обязательное поле для заполнения'),
  password: Yup.string().required('Обязательное поле для заполнения')
});

const initialValues: ILoginForm | string = {
  phone: '',
  password: ''
};

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
    }
  }, [user]);

  const handleSubmit = async (values: ILoginForm) => {
    toast
      .promise(dispatch(login(values)).unwrap(), {
        success: 'Вход выполнен успешно!',
        loading: 'Загрузка',
        error: (err) => err.toString()
      })
      .then(() => {
        navigate('/admin/AdminUserME');
      });
  };

  // };
  // const handleSubmit = async (values: string) => {
  //   toast.promise(dispatch(getPassword(values)).unwrap(), {
  //     success: 'Код вышлен, ждите пароль',
  //     loading: 'Загрузка',
  //     error: (err) => err.toString()
  //   });
  // };

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
              <p className="mt-2 text-sm text-gray-500">
                Пожалуйста, введите номер телефона и в течении минуты вы получите код авторизации.
              </p>
            </div>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={SignInSchema}>
              {() => (
                <Form className="mt-8 space-y-6">
                  <Input inputType="formik" id="phone" name="phone" label="phone" width="w-full" />
                  <Input
                    inputType="formik"
                    id="password"
                    name="password"
                    label="Пароль"
                    width="w-full"
                    type="password"
                  />
                  <Button type="submit">Войти</Button>
                  {/* {props.values.password === '' && <Button>Получить код</Button>} */}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
