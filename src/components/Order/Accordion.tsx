import { DetailedHTMLProps, FC, HTMLAttributes, useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import { Input } from '../Forms';
import * as yup from 'yup';
import user from '../Order/UserData.json';
import EditCard from './EditCard';

type initialValues = {
  street: string;
  entrance: string;
  flat: number;
};
type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  setIsValid?: Function;
  setIsEdited?: Function;
  isEdited?: boolean;
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
    entrance: yup.string().required('Поле обязательное'),
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
      <EditCard>
        <h3 className={`font-semibold text-sm ${userStyle}`}>Получатель</h3>
        <h5 className={`${userStyle} text-xs mt-2`}>
          <strong className={`font-medium`}>Имя:</strong> {userData.username}
        </h5>
        <h5 className={`${userStyle} text-xs mt-2`}>
          <strong className="font-medium">Телефон</strong> {userData.phone}
        </h5>
        <button
          className="text-blue-light font-montserrat font-semibold text-xs"
          onClick={() => {
            props.setIsEdited(true);
          }}
          value="useredit">
          Изменить
        </button>
      </EditCard>
      <EditCard>
        <h3 className={`font-semibold text-sm ${userStyle}`}>Способ оплаты</h3>
        <button
          className="text-blue-light font-montserrat font-semibold text-xs"
          onClick={() => {
            props.setIsEdited(true);
          }}
          value="payment">
          Выберите способ оплаты
        </button>
      </EditCard>
    </>
  );
};
