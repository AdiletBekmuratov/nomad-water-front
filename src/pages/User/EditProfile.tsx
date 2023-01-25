import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { useGetProfileIDQuery, useUpdateProfileMutation } from '@/redux/services/profile.service';

import { IProfile } from '@/types';
import { Form, Formik } from 'formik';
import { FC, Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import * as yup from 'yup';

interface IEditModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: IProfile;
}

export const EditProfile: FC<IEditModalProps> = ({ visible, setVisible, data }) => {
  const [update, { isLoading }] = useUpdateProfileMutation();
  //const { data: profile} = useGetProfileIDQuery(id!); 
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
      <Formik initialValues={data} onSubmit={handleEditSave} validationSchema={validation}>
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
  );
};
