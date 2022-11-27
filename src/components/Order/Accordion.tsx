import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { Form, Formik } from 'formik';
import { Input } from '../Forms';
import * as yup from 'yup';

type initialValues = {
  street: string;
  entrance: string;
  flat: number;
  name: string;
  phone: string;
};
type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  setIsValid?: Function;
  setIsEdited?: Function;
  isEdited?: boolean;
  setAddress?: Function;
};

export const Accordion: FC<Props> = (props) => {
  const initialValues: initialValues = {
    street: '',
    entrance: '',
    flat: 1,
    name: '',
    phone: ''
  };

  const validation = yup.object().shape({
    street: yup.string().required('Поле обязательное'),
    entrance: yup.string().required('Поле обязательное'),
    flat: yup.string().required('Поле обязательное'),
    name: yup.string().required('Поле обязательное'),
    phone: yup.string().required('Поле обязательное')
  });

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
                  className="font-montserrat placeholder:text-gray-400"
                />
              </div>
              <div className="mt-3">
                <Input
                  name="entrance"
                  id="entrance"
                  inputType="formik"
                  label="Подъезд"
                  className="font-montserrat placeholder:text-gray-400"
                />
              </div>
              <div className="mt-3">
                <Input
                  name="flat"
                  id="flat"
                  inputType="formik"
                  label="Квартира"
                  className="font-montserrat placeholder:text-gray-400"
                />
              </div>
              <div className="mt-3">
                <Input
                  name="name"
                  id="name"
                  inputType="formik"
                  label="Имя получателя"
                  className="font-montserrat placeholder:text-gray-400"
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
                  className="font-montserrat placeholder:text-gray-400"
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
