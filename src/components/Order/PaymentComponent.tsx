import { FC, useState } from 'react';
import * as yup from 'yup';

import Checkbox from '../Checkbox';
import { Button } from '../Forms';
import { PaymentEdit } from './PaymentEdit';

type Props = {
  buttonName: string;
  name: string;
};

type initialValues = {
  cardNumber: string;
  validity: string;
  cvc: string;
  nameOnCard: string;
};

export const PaymentComponent: FC<Props> = (props) => {
  const initialValues: initialValues = {
    cardNumber: '',
    validity: '',
    cvc: '',
    nameOnCard: ''
  };

  const validationSchema = yup.object().shape({
    cardNumber: yup.string().required('Поле обязательное'),
    validity: yup.string().required('Поле обязательное'),
    cvc: yup.string().required('Поле обязательное').min(3, 'Должно быть 3').max(3),
    nameOnCard: yup.string().required('Поле обязательное')
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState({});
  const [isCash, setIsCash] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <Checkbox
        onChange={(e) => {
          e.target.checked ? setIsValid(true) : setIsValid(false);
          setIsOpen(e.target.checked);
          setIsCash(false);
        }}
        label="Оплатить картой"
        id="pay"
        checked={isOpen}
      />
      {isOpen && (
        <PaymentEdit
          initialValues={initialValues}
          validationSchema={validationSchema}
          buttonName={props.buttonName}
          setIsValid={setIsValid}
          setValues={setValues}
        />
      )}
      <Checkbox
        label="Наличными"
        name="cash"
        id="cash"
        checked={isCash}
        onChange={(e) => {
          e.target.checked ? setIsValid(true) : setIsValid(false);
          setIsCash(e.target.checked);
          setIsOpen(false);
        }}
      />
      <Button
        disabled={!isValid}
        buttonColor={`font-montserrat bg-dark-blue`}
        onClick={() => {
          alert(JSON.stringify(values, null, 2));
        }}>
        {props.buttonName}
      </Button>
    </div>
  );
};
