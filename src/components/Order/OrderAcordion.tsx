import { FC, useEffect, useState, useRef } from 'react';
import { useGetALLProfilesQuery } from '@/redux/services/profile.service';

import { useAppSelector } from '@/hooks/useAppSelector';
import { IProfile } from '@/types';

import { Field, Form, Formik } from 'formik';
import { Input } from '../Forms';
import * as yup from 'yup';
import { EditProfile } from '@/pages/User/EditProfile';

type Props = {
  setAddressOrder: React.Dispatch<React.SetStateAction<string>>;
  setIsValid: Function;
  setAddress: React.Dispatch<
    React.SetStateAction<{
      phone: string;
      firstname: string;
      street: string;
      houseNumber: string;
      flat: string;
      addressComment: string;
    } | null>
  >;
};

export const OrderAcordion: FC<Props> = ({ setIsValid, setAddress, setAddressOrder }) => {
  const { data: profiles = [] } = useGetALLProfilesQuery();
  const { user } = useAppSelector((state) => state.auth);

  const initProfile = profiles.find((profile) => profile.name === 'По умолчанию');
  const [selectedProfile, setSelectedProfile] = useState<IProfile | null>(
    initProfile ? initProfile : null
    //null
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProfile = profiles.find((profile) => profile.name === event.target.value);
    let address = `Ул.${selectedProfile?.street}, д. ${selectedProfile?.houseNumber}, кв. ${selectedProfile?.flat}`;
    setSelectedProfile(selectedProfile!);
    setAddressOrder(address);
  };
  const [formValue, setFormValue] = useState({
    phone: user ? (user.role === 'ROLE_USER' || user.role === 'ROLE_MASTER' ? user.phone : '') : '',
    firstname: user
      ? user.role === 'ROLE_USER' || user.role === 'ROLE_MASTER'
        ? user.firstname
        : ''
      : '',
    street: '',
    houseNumber: '',
    flat: '',
    addressComment: ''
  });
  const initialValues = {
    phone: user
      ? user.role === 'ROLE_USER' || user.role === 'ROLE_MASTER'
        ? user.phone
        : ''
      : formValue.phone,
    firstname: user
      ? user.role === 'ROLE_USER' || user.role === 'ROLE_MASTER'
        ? user.firstname
        : ''
      : formValue.firstname,
    street: selectedProfile?.street ? selectedProfile.street : formValue.street,
    houseNumber: selectedProfile?.houseNumber ? selectedProfile.houseNumber : formValue.houseNumber,
    flat: selectedProfile?.flat ? selectedProfile.flat : formValue.flat,
    addressComment: selectedProfile?.addressComment
      ? selectedProfile.addressComment
      : formValue.addressComment
  };
  if (user!.role === 'ROLE_MASTER') {
    let address = `Ул.${selectedProfile?.street}, д. ${selectedProfile?.houseNumber}, кв. ${selectedProfile?.flat}`;
    setAddressOrder(address);
  }
  // useEffect(() => {
  //   setAddress(initialValues);
  // }, [selectedProfile]);
  const [isOpenEdit, setIsOpenEdit] = useState(false); //изменение профиля

  const validation = yup.object().shape({
    firstname: yup.string().required('Поле обязательное'),
    phone: yup.string().required('Поле обязательное')
    // street: yup.string().required('Поле обязательное'),
    // houseNumber: yup.string().required('Поле обязательное'),
    // flat: yup.string().required('Поле обязательное')
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
            {profiles.length !== 0 ? (
              <>
                <Field
                  inputType="formik"
                  as="select"
                  name="profile"
                  id="profile"
                  value={selectedProfile?.name || ''}
                  onChange={handleSelectChange}
                  className={`bg-white text-center cursor-pointer p-2 rounded-md `}>
                  {/* <option className="cursor-pointer">
                      Выбрать адрес
                    </option> */}
                  {profiles.map(({ id, name }) => (
                    <option className="cursor-pointer" key={id} value={name} id="profile">
                      {name}
                      {/* <button className="" onClick={() => setIsOpenEdit(true)}>
                     
                      <AiOutlineEdit className={`h-3 w-3 text-red-600`} />
                    </button> */}
                    </option>
                  ))}
                </Field>

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
              </>
            ) : (
              <>
                {' '}
                <Input
                  name="street"
                  id="street"
                  inputType="formik"
                  label="Микрорайон / Улица"
                  className={`${styleInput}`}
                />
                <Input
                  name="houseNumber"
                  id="houseNumber"
                  inputType="formik"
                  label="Дом"
                  className={`${styleInput}`}
                />
                <Input
                  name="flat"
                  id="flat"
                  inputType="formik"
                  label="Квартира"
                  className={`${styleInput}`}
                />
              </>
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
            {setFormValue(values)}
            {setIsValid(isValid)}
            {setAddress(values)}
          </Form>
        )}
      </Formik>
      <EditProfile visible={isOpenEdit} setVisible={setIsOpenEdit} data={selectedProfile!} />
    </div>
  );
};
