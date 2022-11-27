import { FC } from 'react';
import * as yup from 'yup';

import { FormContainer, Input } from '../Forms';

type Props = {
  buttonName: string;
  name: string;
};

type initialValues = {
  name: string;
  phone: string;
};

export const UserComponent: FC<Props> = (props) => {
  const initialValues: initialValues = { name: '', phone: '' };
  const validationSchema = yup.object().shape({
    name: yup.string().required('Поле обязательное'),
    phone: yup.string().required('Поле обязательное')
  });

  return (
    <FormContainer
      initialValues={initialValues}
      validationSchema={validationSchema}
      buttonName={props.buttonName}
      className="px-6">
      <div className="mb-5">
        <Input
          inputType="formik"
          className="font-montserrat text-dark-blue font-medium"
          name="name"
          id="name"
          label="Имя"
          value={props.name}
        />
      </div>
      <div className="mb-10">
        <Input
          inputType="formik"
          name="phone"
          id="phone"
          label="Номер телефона"
          mask={`+7 (799) 999 9999`}
          placeholder="+7 (7__) ___ ____"
          className="placeholder:text-gray-400 font-montserrat text-dark-blue font-medium"
          value={props.phone}
        />
      </div>
    </FormContainer>
  );
};
