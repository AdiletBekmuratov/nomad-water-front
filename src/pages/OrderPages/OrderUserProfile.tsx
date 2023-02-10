import { FC, useState } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { IProfile } from '@/types';

import { Field, Form, Formik } from 'formik';

import * as yup from 'yup';
import { EditProfile } from '@/pages/User/Profiles/EditProfile';
import { Input } from '@/components/Forms';
import { IAddressType, IStreetType } from './UserOrderCreate';

type Props = {
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  setAddress: React.Dispatch<React.SetStateAction<IAddressType>>;
  profiles: IProfile[];
  street: IStreetType;
  setStreet: React.Dispatch<React.SetStateAction<IStreetType>>;
};

export const OrderUserProfile: FC<Props> = ({ setIsValid, setAddress, profiles, setStreet }) => {
  const { user } = useAppSelector((state) => state.auth);

  const [selectedProfile, setSelectedProfile] = useState<IProfile>(profiles[0]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedProfile.name !== event.target.value) {
      const needProfile = profiles.find((profile) => profile.name === event.target.value);
      setSelectedProfile(needProfile!);
      setStreet({
        houseNumber: needProfile!.houseNumber!,
        street: needProfile!.street!,
        latitude: needProfile!.latitude!,
        longitude: needProfile!.longitude!
      });
    } else {
      setStreet({
        houseNumber: selectedProfile!.houseNumber!,
        street: selectedProfile!.street!,
        latitude: selectedProfile!.latitude!,
        longitude: selectedProfile!.longitude!
      });
    }
  };

  const initialValues = {
    phone: user ? user.phone : '',
    firstname: user ? user.firstname : '',
    street: selectedProfile.street ? selectedProfile.street : '',
    houseNumber: selectedProfile.houseNumber ? selectedProfile.houseNumber : '',
    flat: selectedProfile.flat ? selectedProfile.flat : '',
    addressComment: selectedProfile.addressComment ? selectedProfile.addressComment : ''
  };

  const validation = yup.object().shape({
    firstname: yup.string().required('Поле обязательное'),
    phone: yup.string().required('Поле обязательное')
  });

  // const [isOpenEdit, setIsOpenEdit] = useState(false); //изменение профиля
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
              <Field
                inputType="formik"
                as="select"
                name="profile"
                id="profile"
                value={(selectedProfile && selectedProfile.name) || ''}
                onChange={handleSelectChange}
                className={`bg-white text-center cursor-pointer p-2 rounded-md `}>
                {profiles.map(({ id, name }) => (
                  <>
                    <option className="cursor-pointer" key={id} value={name} id="profile">
                      {name}
                    </option>
                  </>
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
              {selectedProfile.flat ? (
                <Input
                  name="flat"
                  id="flat"
                  inputType="formik"
                  label="Квартира"
                  className={`${styleInput}`}
                  value={selectedProfile ? selectedProfile.flat : ''}
                />
              ) : null}

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

              {setIsValid(isValid)}
              {setAddress(values)}
            </>
          </Form>
        )}
      </Formik>
      {/* <EditProfile visible={isOpenEdit} setVisible={setIsOpenEdit} data={selectedProfile!} /> */}
    </div>
  );
};
