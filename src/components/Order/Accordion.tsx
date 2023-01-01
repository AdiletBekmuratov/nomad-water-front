import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { Form, Formik } from 'formik';
import { Input } from '../Forms';
import * as yup from 'yup';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IOrdersUser, IUserFull } from '@/types';
import React from 'react';

// type initialValues = {
//   street: string;
//   entrance: string;
//   flat: number;
//   name: string;
//   phone: string;
// };
type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  setIsValid: Function;
  setIsEdited?: Function;
  isEdited?: boolean;
  setAddress: Function;
};

export const Accordion: FC<Props> = (props) => {
  const { user } = useAppSelector((state) => state.auth);

  const initialValues: IOrdersUser = {
    phone: user?.phone ? user?.phone : '',
    firstname: user?.firstname ? user?.firstname : '',
    street: user?.street ? user?.street : '',
    houseNumber: user?.houseNumber ? user?.houseNumber : '',
    flat: user?.flat ? user?.flat : '',
    addressComment: ''
  };

  const validation = yup.object().shape({
    firstname: yup.string().required('Поле обязательное'),
    phone: yup.string().required('Поле обязательное'),
    street: yup.string().required('Поле обязательное'),
    addressComment: yup.string().required('Поле обязательное'),
    houseNumber: yup.string().required('Поле обязательное'),
    flat: yup.string().required('Поле обязательное')
  });
  const styleInput = `font-montserrat placeholder:text-gray-400`;
  return (
    <>
      <div className={`w-3/4  ${props.className}`}>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={(values) => alert(JSON.stringify(values, null, 2))}>
          {({ isValid, values }) => (
            <Form>
              <div>
                <Input
                  name="street"
                  id="street"
                  inputType="formik"
                  label="Улица"
                  className={`${styleInput}`}
                />
              </div>
              <div className="mt-3">
                <Input
                  name="houseNumber"
                  id="houseNumber"
                  inputType="formik"
                  label="Дом"
                  className={`${styleInput}`}
                />
              </div>
              <div className="mt-3">
                <Input
                  name="flat"
                  id="flat"
                  inputType="formik"
                  label="Квартира"
                  className={`${styleInput}`}
                />
              </div>
              <div className="mt-3">
                <Input
                  name="addressComment"
                  id="addressComment"
                  inputType="formik"
                  label="Комментарий к заказу"
                  className={`${styleInput}`}
                />
              </div>
              <div className="mt-3">
                <Input
                  name="firstname"
                  id="firstname"
                  inputType="formik"
                  label="Имя получателя"
                  className={`${styleInput}`}
                />
              </div>
              <div className="mt-3">
                <Input
                  name="phone"
                  id="phone"
                  inputType="formik"
                  mask="+7 (799) 999 9999"
                  placeholder="+7 (777) 777 7777"
                  label="Номер телефона"
                  className={`${styleInput}`}
                />
              </div>
              {props.setIsValid(isValid)}
              {props.setAddress(values)}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
