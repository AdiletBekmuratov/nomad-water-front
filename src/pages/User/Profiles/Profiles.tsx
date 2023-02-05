import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import { Button, Input } from '@/components/Forms';
import { useGetALLProfilesQuery, useUpdateProfileMutation } from '@/redux/services/profile.service';
import { useState } from 'react';
import { IProfile } from '@/types';
import { AiOutlineCloseCircle, AiOutlineEdit } from 'react-icons/ai';

import { Modal } from '@/components/Layout/Modal';
import { Form, Formik } from 'formik';
import { DeleteProfile } from './DeleteProfile';
import { CreateProfile } from './CreateProfile';

const Profiles = () => {
  const { data: profile = [] } = useGetALLProfilesQuery();
  const [update, { isLoading }] = useUpdateProfileMutation();

  const [isOpenCreate, setIsOpenCreate] = useState(false); //создание нового профиля
  const [profileId, setProfileId] = useState(1);
  const [name, setName] = useState('');
  const [isOpenDelete, setIsOpenDelete] = useState(false); //удаление профиля по id

  const [visible, setVisible] = useState(false);

  const [profileData, setProfileData] = useState<IProfile>();
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
    <div className={`text-dark-blue grid md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5 lg:gap-3`}>
      {profile.length < 1 ? (
        <div className={`grid gap-2 bg-light-blue rounded-xl p-3 shadow-md`}>
          <p className={`${styleName}`}>
            <strong>Имя адреса </strong> <span>{` 'Нет данных' `}</span>
          </p>
          <p className={`${styleP}`}>
            <strong>Микрорайон / Улица: </strong> <span>{`  'Нет данных' `}</span>
          </p>
          <p className={`${styleP}`}>
            <strong>Дом: </strong> {` 'Нет данных' `}
          </p>
          <p className={`${styleP}`}>
            <strong>Квартира: </strong> {`  'Нет данных' `}
          </p>
          <p className={`${styleP}`}>
            <strong>Комментарий к адресу: </strong>
            {`  'Нет данных'`}
          </p>
          <div className={``}>
            <Button
              className={`bg-blue-300 hover:bg-blue-400 h-9`}
              onClick={() => setIsOpenCreate(true)}>
              Добавить новый адрес
            </Button>
          </div>
        </div>
      ) : (
        profile.map((item) => (
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
        ))
      )}

      <CreateProfile setVisible={setIsOpenCreate} visible={isOpenCreate} />
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
    </div>
  );
};

export default Profiles;
