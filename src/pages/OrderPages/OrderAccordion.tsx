import { FC, useState } from 'react';
import { useGetALLProfilesQuery } from '@/redux/services/profile.service';

import { useAppSelector } from '@/hooks/useAppSelector';
import { IProfile } from '@/types';

import { Field, Form, Formik } from 'formik';

import * as yup from 'yup';
import { EditProfile } from '@/pages/User/Profiles/EditProfile';
import { Input } from '@/components/Forms';
import { AddressType } from './UserOrderCreate';

type Props = {
  setAddressOrder: React.Dispatch<React.SetStateAction<string>>;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  setAddress: React.Dispatch<React.SetStateAction<AddressType>>;
  address:AddressType;
};

export const OrderAccordion: FC<Props> = ({ setIsValid, setAddress, setAddressOrder,address }) => {
  const { data: profiles = [] } = useGetALLProfilesQuery();
  const { user } = useAppSelector((state) => state.auth);

  const [selectedProfile, setSelectedProfile] = useState<IProfile | null>(
    profiles.length > 0 ? profiles[0] : null
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const needProfile = profiles.find((profile) => profile.name === event.target.value);
    let address = needProfile
      ? `Ул.${needProfile.street}, д. ${needProfile.houseNumber}, кв. ${needProfile.flat}`
      : '';
    setSelectedProfile(needProfile ? needProfile : null);
    setAddressOrder(address);
  };
  // const [formValue, setFormValue] = useState({
  //   phone: user ? (user.role === 'ROLE_USER' || user.role === 'ROLE_MASTER' ? user.phone : '') : '',
  //   firstname: user
  //     ? user.role === 'ROLE_USER' || user.role === 'ROLE_MASTER'
  //       ? user.firstname
  //       : ''
  //     : '',
  //   street: '',
  //   houseNumber: '',
  //   flat: '',
  //   addressComment: ''
  // });
  const initialValues = {
    phone: user ? user.phone : '',
    firstname: user ? user.firstname : '',
    street: address?.street ? address.street : '',
    houseNumber: address?.houseNumber ? address.houseNumber : '',
    flat: address?.flat ? address.flat : '',
    addressComment: address?.addressComment ? address.addressComment : ''
  };

  // useEffect(() => {
  //   setAddress(initialValues);
  // }, [selectedProfile]);
  const [isOpenEdit, setIsOpenEdit] = useState(false); //изменение профиля

  const validation = yup.object().shape({
    firstname: yup.string().required('Поле обязательное'),
    phone: yup.string().required('Поле обязательное'),
    street: yup.string().required('Поле обязательное'),
    houseNumber: yup.string().required('Поле обязательное'),
    flat: yup.string().required('Поле обязательное')
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
              {profiles.length > 0 ? (
                <>
                  <Field
                    inputType="formik"
                    as="select"
                    name="profile"
                    id="profile"
                    value={(selectedProfile && selectedProfile.name) || ''}
                    onChange={handleSelectChange}
                    className={`bg-white text-center cursor-pointer p-2 rounded-md `}>
                    {/* <option className="cursor-pointer">
                      Выбрать адрес
                    </option> */}
                    {profiles.map(({ id, name }) => (
                      <option className="cursor-pointer" key={id} value={name} id="profile">
                        {name}
                      </option>
                    ))}
                  </Field>

                  <Input
                    name="street"
                    id="street"
                    inputType="formik"
                    label="Микрорайон / Улица"
                    className={`${styleInput}`}
                    value={selectedProfile ? selectedProfile.street : ''}
                  />

                  <Input
                    name="houseNumber"
                    id="houseNumber"
                    inputType="formik"
                    label="Дом"
                    className={`${styleInput}`}
                    value={selectedProfile ? selectedProfile.houseNumber : ''}
                  />

                  <Input
                    name="flat"
                    id="flat"
                    inputType="formik"
                    label="Квартира"
                    className={`${styleInput}`}
                    value={selectedProfile ? selectedProfile.flat : ''}
                  />
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
                    value={user?.firstname}
                  />

                  <Input
                    name="phone"
                    id="phone"
                    inputType="formik"
                    mask="+77999999999"
                    placeholder="+7 (777) 777 7777"
                    label="Номер получателя"
                    className={`${styleInput}`}
                    value={user?.phone}
                  />
                </>
              ) : (
                <>
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
                </>
              )}
              {setIsValid(isValid)}
              {setAddress(values)}
            </>
          </Form>
        )}
      </Formik>
      <EditProfile visible={isOpenEdit} setVisible={setIsOpenEdit} data={selectedProfile!} />
    </div>
  );
};
