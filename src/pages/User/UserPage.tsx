import React from 'react';
import * as yup from 'yup';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useGetALLProfilesQuery, useUpdateProfileMutation } from '@/redux/services/profile.service';
import { Edit } from '@/pages/User/Edit';
import { CreateProfile } from './CreateProfile';
import { DeleteProfile } from './DeleteProfile';
import OrderHistory from '@/pages/User/OrderHistory';

import { Layout } from '@/components/Layout';
import { Button, Input } from '@/components/Forms';

import { FaTenge, FaUserTie } from 'react-icons/fa';
import { AiOutlineCloseCircle, AiOutlineEdit } from 'react-icons/ai';
import { IProfile } from '@/types';
import { Modal } from '@/components/Layout/Modal';
import { Form, Formik } from 'formik';
import { toast } from 'react-hot-toast';

const UserPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: profile = [] } = useGetALLProfilesQuery();
  const [update, { isLoading }] = useUpdateProfileMutation();
  const [visible, setVisible] = React.useState(false);

  const [profileData, setProfileData] = React.useState<IProfile>();
  const [isOpenEdit, setIsOpenEdit] = React.useState(false); //изменение данных юзера
  const [isOpenCreate, setIsOpenCreate] = React.useState(false); //создание нового профиля
  const [profileId, setProfileId] = React.useState(1);
  const [name, setName] = React.useState('');
  const [isOpenDelete, setIsOpenDelete] = React.useState(false); //удаление профиля по id
  
  const styleP = `text-sm md:text-base grid grid-cols-2`;
  const styleName = `text-sm md:text-base grid grid-cols-2 py-1 border-b-2 border-gray-400 border-dashed`;

  const handleEdit = async (values: IProfile) => {
    toast
      .promise(update(values).unwrap(), {
        loading: 'Загрузка',
        success: 'Обновлено успешно',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {});
  };

  const handleEditSave = async (values: IProfile) => {
    toast
      .promise(update(values).unwrap(), {
        loading: 'Загрузка',
        success: 'Сохранено',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {
        setVisible(false);
      });
  };

  const validation = yup.object().shape({
    name: yup.string().required('Это поле обязательное'),
    street: yup.string().required('Это поле обязательное'),
    houseNumber: yup.string().required('Это поле обязательное'),
    flat: yup.string().required('Это поле обязательное'),
    addressComment: yup.string().required('Это поле обязательное')
  });

  return (
    <Layout>
      <div
        className={`flex items-center justify-between bg-light-blue rounded-lg 
      p-1 md:p-3 font-bold text-xs md:text-base gap-2 md:gap-3 shadow-lg`}>
        <span className={`flex flex-col md:flex-row items-center gap-3`}>
          <FaUserTie className={`h-5 w-5 md:h-6 md:w-6 `} />
          {` ${user?.phone} `}
        </span>
        <div className={` flex flex-col md:flex-row flex-1 justify-evenly `}>
          <span>{` ${user?.lastname ? user.lastname : 'Место для имени'} `}</span>
          <span>{` ${user?.firstname ? user.firstname : 'Место для фамилии'} `}</span>
          <span>{` ${user?.middleName ? user.middleName : 'Место для отчества'} `}</span>
        </div>

        <span className={`flex flex-col md:flex-row items-center gap-1`}>
          <FaTenge className={`h-5 w-5 md:h-6 md:w-6`} />
          {` 50000 `}
        </span>
        <button className="" onClick={() => setIsOpenEdit(true)}>
          {/* Изменить данные */}
          <AiOutlineEdit className={`h-6 w-6 md:h-7 md:w-7 text-red-600`} />
        </button>
      </div>

      <div className={`text-dark-blue grid md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5 lg:gap-3`}>
        {profile.map((item, index) => (
          <div className={`grid gap-2 bg-light-blue rounded-xl p-3 shadow-md`} key={item.id}>
            {item.name === 'По умолчанию' ? (
              <p
                className={`text-sm md:text-base text-center border-b-2 border-gray-400 border-dashed`}>
                <strong>Основной профиль </strong>
              </p>
            ) : (
              <p className={`${styleName}`}>
                <strong>Имя адреса </strong>{' '}
                <span>{` ${item?.name ? item.name : 'Нет данных'} `}</span>
              </p>
            )}
            <p className={`${styleP}`}>
              <strong>Микрорайон / Улица: </strong>{' '}
              <span>{` ${item?.street ? item.street : 'Нет данных'} `}</span>
            </p>
            <p className={`${styleP}`}>
              <strong>Дом: </strong> {` ${item?.houseNumber ? item.houseNumber : 'Нет данных'} `}
            </p>
            <p className={`${styleP}`}>
              <strong>Квартира: </strong> {` ${item?.flat ? item.flat : 'Нет данных'} `}
            </p>
            <p className={`${styleP}`}>
              <strong>Комментарий к адресу: </strong>
              {` ${item?.addressComment ? item.addressComment : 'Нет данных'} `}
            </p>
            <div
              className={`flex items-center justify-between gap-2 border-t-2 py-2 border-gray-400 border-dashed
              border-b-2 `}>
              <Button
                className={`bg-blue-300 hover:bg-blue-400`}
                onClick={() => {
                  setProfileData(item);

                  setVisible(true);
                }}>
                Изменить поля
              </Button>
              <Button
                className={`bg-blue-300 hover:bg-blue-400`}
                value={item.id!}
                onClick={(e: any) => {
                  setIsOpenDelete(true);
                  setProfileId(e.target.value);
                  setName(item.name);
                }}>
                Удалить адрес
              </Button>
              <DeleteProfile
                setVisible={setIsOpenDelete}
                visible={isOpenDelete}
                id={profileId}
                name={name}
              />
            </div>
            {item.name === 'По умолчанию' && (
              <div className={``}>
                <Button
                  className={`bg-blue-300 hover:bg-blue-400 h-9`}
                  onClick={() => setIsOpenCreate(true)}>
                  Добавить новый адрес
                </Button>
              </div>
            )}
          </div>
        ))}

        <Edit setVisible={setIsOpenEdit} visible={isOpenEdit} data={user!} />
        <CreateProfile setVisible={setIsOpenCreate} visible={isOpenCreate} />
      </div>
      <div className={`border-b-2 border-dotted border-gray-700 py-2`}></div>
      <div className={`mt-4 mx-auto`}>
        <OrderHistory />
      </div>

      <Modal setIsOpenModal={setVisible} isOpenModal={visible}>
        <div className="flex items-center justify-between">
          <h2 className={`text-center`}>Изменение полей адреса</h2>
          <button
            onClick={() => {
              setVisible(false);
            }}>
            <AiOutlineCloseCircle className={`w-5 h-5 md:w-7 md:h-7 hover:text-blue-500`} />
          </button>
        </div>
        <Formik
          initialValues={profileData!}
          onSubmit={handleEditSave}
          validationSchema={validation}>
          {({ values }) => (
            <Form className="flex flex-col space-y-4">
              <div className={`grid grid-cols-1 items-center`}>
                <Input
                  inputType="formik"
                  name="name"
                  id="name"
                  label="Название для нового адреса"
                  placeholder="Например: офис, дача, дом родителей"
                />
                <Input inputType="formik" id="street" name="street" label="Микрорайон / Улица" />
                <Input inputType="formik" id="houseNumber" name="houseNumber" label="Номер дома" />
                <Input inputType="formik" id="flat" name="flat" label="Квартира" />
                <Input
                  inputType="formik"
                  id="addressComment"
                  name="addressComment"
                  label="Комментарий к адресу"
                  placeholder="Например: блок, подъезд, этаж, домофон, лифт, и др"
                />
              </div>
              <div className={`flex gap-3 justify-between`}>
                <Button type="submit" className={`hover:bg-blue-500`}>
                  Сохранить
                </Button>
                <Button
                  type="button"
                  onClick={() => handleEdit(values)}
                  className={`hover:bg-blue-500`}>
                  Применить
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </Layout>
  );
};

export default UserPage;
