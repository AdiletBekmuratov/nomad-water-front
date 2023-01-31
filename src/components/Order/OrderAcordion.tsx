import { FC, useEffect, useState, useRef } from 'react';
import { useGetALLProfilesQuery } from '@/redux/services/profile.service';

import { useAppSelector } from '@/hooks/useAppSelector';
import { IProfile, IUsersOrder } from '@/types';

import { Field, Form, Formik } from 'formik';
import { Input } from '../Forms';
import * as yup from 'yup';

type Props = {
  setIsOpen: Function;
  isOpen: boolean;
  setIsEdited: Function;
  setIsValid: Function;
  isEdited: boolean;
  setAddress: Function;
  initial?: IUsersOrder;
};

export const OrderAcordion: FC<Props> = ({
  setIsOpen,
  isOpen,
  setIsEdited,
  setIsValid,

  setAddress
}) => {
  const { data: profiles = [] } = useGetALLProfilesQuery();
  const { user } = useAppSelector((state) => state.auth);
  const [selectedProfile, setSelectedProfile] = useState<IProfile | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProfile = profiles.find((profile) => profile.name === event.target.value);
    setSelectedProfile(selectedProfile!);
  };

  const initialValues = {
    phone: user?.phone ? user?.phone : '',
    firstname: user?.firstname ? user?.firstname : '',
    street: selectedProfile?.street ?  selectedProfile.street : '',
    houseNumber: selectedProfile?.houseNumber ?  selectedProfile.houseNumber : '',
    flat: selectedProfile?.flat ?  selectedProfile.flat : '',
    addressComment: selectedProfile?.addressComment ?  selectedProfile.addressComment : '',
  };
  const validation = yup.object().shape({
    firstname: yup.string().required('Поле обязательное'),
    phone: yup.string().required('Поле обязательное'),
    street: yup.string().required('Поле обязательное'),
    houseNumber: yup.string().required('Поле обязательное'),
    flat: yup.string().required('Поле обязательное')
  });

  const styleInput = `font-montserrat placeholder:text-gray-400 rounded-md`;

  return (
    <div className="lg:order-2 col-span-2 lg:row-start-2">
      <div
        className="bg-white flex 
    justify-evenly items-center  gap-2 rounded-lg lg:w-full">
        {profiles.length === 0 ? (
          <div>
            <h5 className="text-dark-blue font-montserrat font-semibold py-3 px-2">
              Куда доставить?
            </h5>
          </div>
        ) : (
          <div
            className="bg-white flex 
        justify-evenly items-center  gap-2 rounded-2xl lg:w-full">
            <h5 className="text-dark-blue font-montserrat font-semibold py-3 px-2">
              Куда доставить?
            </h5>
            {/* 
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                //@ts-ignore
                isOpen === true && setIsEdited(false);
              }}>
              {!isOpen ? (
                <AiOutlineArrowDown className="cursor-pointer w-5 h-5" />
              ) : (
                <AiOutlineArrowUp className="cursor-pointer w-5 h-5" />
              )}
            </button> */}
          </div>
        )}
      </div>
      {isOpen && (
        <Formik initialValues={initialValues} validationSchema={validation} onSubmit={() => {}}>
          {({ isValid, values }) => (
            <Form className="flex flex-col gap-2 pt-3">
              {profiles.length !== 0 && (
                <Field
                  inputType="formik"
                  as="select"
                  name="profile"
                  id="profile"
                  value={selectedProfile?.name || ''}
                  onChange={handleSelectChange}
                  className={`bg-white text-center cursor-pointer p-2 rounded-md `}>
                  {profiles.map(({ id, name }) => (
                    <option className="cursor-pointer" key={id} value={name} id="profile">
                      {name}
                    </option>
                  ))}
                </Field>
              )}
              <Input
                name="street"
                id="street"
                inputType="formik"
                label="Микрорайон / Улица"
                className={`${styleInput}`}
                value={selectedProfile?.street}
              />

              <Input
                name="houseNumber"
                id="houseNumber"
                inputType="formik"
                label="Дом"
                className={`${styleInput}`}
                value={selectedProfile?.houseNumber}
              />

              <Input
                name="flat"
                id="flat"
                inputType="formik"
                label="Квартира"
                className={`${styleInput}`}
                value={selectedProfile?.flat}
              />

              <Input
                name="addressComment"
                id="addressComment"
                inputType="formik"
                label="Комментарий к заказу"
                placeholder="Например: блок, подъезд, этаж, домофон, лифт, и др"
                className={`${styleInput}`}
                value={selectedProfile?.addressComment}
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
                mask="+7 (799) 999 9999"
                placeholder="+7 (777) 777 7777"
                label="Номер телефона"
                className={`${styleInput}`}
              />

              {setIsValid(isValid)}
              {setAddress(values)}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};
