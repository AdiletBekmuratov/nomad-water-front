import { FC } from 'react';

import Checkbox from '../Checkbox';
import { FormContainer, Input } from '../Forms';

type Props = {
  initialValues: Object;
  validationSchema: Object;
  buttonName: string;
  setIsValid?: Function;
  setValues?: Function;
};
const paymentStyle = 'placeholder:text-gray-300 font-montserrat';

export const PaymentEdit: FC<Props> = ({
  initialValues,
  validationSchema,
  buttonName,
  setIsValid,
  setValues
}) => {
  return (
    <div>
      <FormContainer
        initialValues={initialValues}
        validationSchema={validationSchema}
        buttonName={buttonName}
        setValues={setValues}
        setIsValid={setIsValid}
        className="px-6">
        <div className="mb-2">
          <Input
            inputType="formik"
            name="cardNumber"
            id="cardNumber"
            label="Номер банковской карты"
            mask="9999 9999 9999 9999"
            placeholder="4444 0000 0000 0000"
            className={paymentStyle}
          />
        </div>
        <div className="grid grid-cols-2 mb-2">
          <div className="mr-2">
            <Input
              inputType="formik"
              name="validity"
              id="validity"
              label="Срок действия"
              className={paymentStyle}
              placeholder="01/01"
              mask="99/99"
            />
          </div>
          <div className="ml-2">
            <Input name="cvc" id="cvc" inputType="formik" label="CVC" type="password" />
          </div>
        </div>
        <div className="mb-5">
          <Input
            inputType="formik"
            name="nameOnCard"
            id="nameOnCard"
            label="Имя и фамилия на карте"
            className={paymentStyle}
            placeholder="JOHN SMITH"
          />
        </div>
        <div className="border-b-2 mb-5">
          <Checkbox id="saveCard" name="saveCard" label="Сохранить карту" />
        </div>
      </FormContainer>
    </div>
  );
};
