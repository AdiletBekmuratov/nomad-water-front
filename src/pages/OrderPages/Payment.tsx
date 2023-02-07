import { Button } from '@/components/Forms';
import { FC, useState } from 'react';

type Props = {
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
};

const Payment: FC<Props> = ({ paymentMethod, setPaymentMethod }) => {
  const paymentStyle = 'font-montserrat text-dark-blue';
   // console.log(orderDto);
  // const validationSchema = yup.object().shape({
  //   cardNumber: yup.string().required('Поле обязательное'),
  //   validity: yup.string().required('Поле обязательное'),
  //   cvc: yup.string().required('Поле обязательное').min(3, 'Должно быть 3').max(3),
  //   nameOnCard: yup.string().required('Поле обязательное')
  // });
  // type initialValues = {
  //   cardNumber: string;
  //   validity: string;
  //   cvc: string;
  //   nameOnCard: string;
  // };

  // const initialVal: initialValues = {
  //   cardNumber: '',
  //   validity: '',
  //   cvc: '',
  //   nameOnCard: ''
  // };
  // const paymentStyle = 'placeholder:text-gray-300 font-montserrat';
  // const choiceAddress = profiles.find((profile) => profile.name);

  return (
    <div className={`w-full h-full max-h-48 mt-5 lg:mt-0 bg-white mx-auto rounded-2xl p-5`}>
      <div className="flex flex-col gap-3 items-center w-full ">
        <span className={`font-semibold text-sm ${paymentStyle}`}>Выберите способ оплаты</span>
        <h3 className={`font-semibold text-center opacity-75 text-xs ${paymentStyle}`}>
          (для смены нажмите кнопку)
        </h3>
        <button
          className={`p-2 border border-dashed border-dark-blue rounded-xl`}
          onClick={() => {
            if (paymentMethod === 'Наличными') {
              setPaymentMethod('Картой');
            } else {
              setPaymentMethod('Наличными');
            }
            return paymentMethod;
          }}>
          {paymentMethod}
        </button>

        {paymentMethod === 'Картой' && (
          <Button className="text-sm max-w-sm">Изменить данные карты</Button>
        )}
      </div>

      {/* {paymentMethod === 'Картой' && (
<div>
  <FormContainer
    initialValues={initialVal}
    validationSchema={validationSchema}
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
)} */}

      {/* <button
className="text-blue-light font-montserrat font-semibold text-xs"
onClick={() => {
  setIsEdited(true);
}}
value="payment">
Выберите способ оплаты
</button> */}
    </div>
  );
};

export default Payment;
