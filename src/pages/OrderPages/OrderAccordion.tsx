import { FC, useState } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';

import { Field, Form, Formik } from 'formik';

import * as yup from 'yup';

import { Input } from '@/components/Forms';
import { IAddressType, IStreetType } from './UserOrderCreate';
import SuggestionExample from '@/components/SuggestionExample';
import Checkbox from '@/components/Checkbox';

type Props = {
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  setAddress: React.Dispatch<React.SetStateAction<IAddressType>>;
  address: IAddressType;
  setStreet: React.Dispatch<React.SetStateAction<IStreetType>>;
};

export const OrderAccordion: FC<Props> = ({
  setIsValid,
  setAddress,
  address,
  setStreet,
  
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const initialValues = {
    phone: user ? user.phone : '',
    firstname: user ? user.firstname : '',
    flat: address?.flat ? address.flat : '',
    addressComment: address?.addressComment ? address.addressComment : ''
  };
  const [pickup, setPickup] = useState(false);

  const validation = yup.object().shape({
    firstname: yup.string().required('Поле обязательное'),
    phone: yup.string().required('Поле обязательное')
    // street: yup.string().required('Поле обязательное'),
    // houseNumber: yup.string().required('Поле обязательное'),
    //flat: yup.string().required('Поле обязательное')
  });

  const styleInput = `font-montserrat placeholder:text-gray-400 cursor-pointer rounded-md`;

  return (
    <div className={`lg:order-2 col-span-2 lg:row-start-2`}>
      <div
        className="bg-white flex 
    justify-evenly items-center  gap-2 rounded-lg lg:w-full">
        <div
          className="bg-white flex 
        justify-evenly items-center  gap-2 rounded-2xl lg:w-full">
          <h5 className="text-dark-blue font-montserrat font-semibold py-3 px-2">
            Куда доставить?
          </h5>
        </div>
      </div>
      <Formik initialValues={initialValues} validationSchema={validation} onSubmit={() => {}}>
        {({ isValid, values }) => (
          <Form className="flex flex-col gap-2 pt-3">
            <>
              <SuggestionExample setAddress={setStreet} label="Адрес проживания" id="address" />
              <div className="flex items-center w-full">
                <Checkbox
                  label="Частный дом"
                  className="w-3.5 h-3.5 cursor-pointer"
                  checked={pickup}
                  id="deliver"
                  name="deliver"
                  // onChange={() => handleTotal(false)}
                  onClick={() => {
                    setPickup(!pickup);
                  }}
                  labelClass="text-dark-blue"
                />
              </div>
              {!pickup && (
                <Input
                  name="flat"
                  id="flat"
                  inputType="formik"
                  label="Квартира"
                  className={`${styleInput}`}
                />
              )}

              <Input
                name="addressComment"
                id="addressComment"
                inputType="formik"
                label="Комментарий к заказу"
                placeholder="Например: блок, подъезд, этаж, домофон, лифт, и др"
                className={`${styleInput}`}
              />
              <Input
                name="firstname"
                id="firstname"
                inputType="formik"
                label="Имя получателя"
                className={`${styleInput}`}
              />

              <Input
                name="phone"
                id="phone"
                inputType="formik"
                mask="+77999999999"
                placeholder="+7 (777) 777 7777"
                label="Номер получателя"
                className={`${styleInput}`}
              />

              {setIsValid(isValid)}
              {setAddress(values)}
            </>
          </Form>
        )}
      </Formik>
    </div>
  );
};
