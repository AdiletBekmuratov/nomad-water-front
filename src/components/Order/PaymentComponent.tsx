import { FC, useState } from 'react';
import * as yup from 'yup';
import Arrow from '../../assets/back.svg';

import Checkbox from '../Checkbox';
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

  return (
    <>
      <div className="w-full h-14 flex justify-between items-center border-b-2">
        <div className="w-64">
          <Checkbox
            onChange={(e) => setIsOpen(e.target.checked)}
            label="Оплатить картой"
            id="pay"
            className="w-3.5 h-3.5 ml-6"
            checked={isOpen}
          />
        </div>
        <div className="w-3.5 h-1.5 mr-6">
          <img
            onClick={() => setIsOpen(!isOpen)}
            src={Arrow}
            alt=""
            className={isOpen ? 'rotate-90' : '-rotate-90'}
          />
        </div>
      </div>
      {isOpen && (
        <PaymentEdit
          initialValues={initialValues}
          validationSchema={validationSchema}
          buttonName={props.buttonName}
        />
      )}
      <div className="w-full h-14 flex items-center">
        <Checkbox label="Наличными" className="ml-6" />
      </div>
    </>
  );
};
