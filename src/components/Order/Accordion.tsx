import { DetailedHTMLProps, FC, HTMLAttributes, useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import { Button, Input } from '../Forms';
import * as yup from 'yup';
import user from '../Order/UserData.json';
import { Link } from 'react-router-dom';

type initialValues = {
  street: string;
  entrance: string;
  flat: number;
};
type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  setIsValid?: Function;
};

export const Accordion: FC<Props> = (props) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(user);
  }, []);

  const initialValues: initialValues = {
    street: '',
    entrance: '',
    flat: 1
  };

  const validation = yup.object().shape({
    street: yup.string().required('Поле обязательное'),
    entrance: yup.string(),
    flat: yup.string().required('Поле обязательное')
  });

  const userStyle = 'font-montserrat text-dark-blue';

  return (
    <>
      <div className={`w-3/4  ${props.className}`}>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={(values) => alert(JSON.stringify(values, null, 2))}>
          {({ isValid }) => (
            <Form>
              <div>
                <Input name="street" id="street" inputType="formik" label="Улица" />
              </div>
              <div className="mt-3">
                <Input name="entrance" id="entrance" inputType="formik" label="Подъезд" />
              </div>
              <div className="mt-3">
                <Input name="flat" id="flat" inputType="formik" label="Квартира" />
              </div>
              {props.setIsValid(isValid)}
            </Form>
          )}
        </Formik>
      </div>
      <div className="mt-3 w-10/12 bg-white mx-auto rounded-2xl p-5">
        <h3 className={`font-semibold text-sm ${userStyle}`}>Получатель</h3>
        <h5 className={`${userStyle} text-xs mt-2`}>
          <strong className={`font-medium`}>Имя:</strong> {userData.username}
        </h5>
        <h5 className={`${userStyle} text-xs mt-2`}>
          <strong className="font-medium">Телефон</strong> {userData.phone}
        </h5>
        <Link
          className="text-light-blue font-montserrat font-semibold text-xs"
          to={`/order/${userData.id}`}>
          Изменить
        </Link>
      </div>
    </>
  );
};
