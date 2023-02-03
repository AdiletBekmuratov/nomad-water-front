import { FC, Dispatch, SetStateAction } from 'react';

import { IUserFull } from '@/types';

import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import { useUpdateCourierMutation } from '@/redux/services/user.service';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface IEditModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: IUserFull;
}

export const EditCourier: FC<IEditModalProps> = ({ visible, setVisible, data }) => {
  const [update, { isLoading: isLoadingUpdate }] = useUpdateCourierMutation();

  const handleEdit = (values: IUserFull) => {
    toast
      .promise(update(values).unwrap(), {
        loading: 'Loading',
        success: 'Updated Successfully',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {});
  };
  const handleEditSave = (values: IUserFull) => {
    toast
      .promise(update(values).unwrap(), {
        loading: 'Loading',
        success: 'Updated Successfully',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {
        setVisible(false);
      });
  };

  return (
    <Modal setIsOpenModal={setVisible} isOpenModal={visible}>
      <div className="flex items-center justify-between">
        <h2 className={`text-center`}>Изменение данных курьера</h2>
        <button
          onClick={() => {
            setVisible(false);
          }}>
          <AiOutlineCloseCircle className={`w-5 h-5 md:w-7 md:h-7 hover:text-blue-500`} />
        </button>
      </div>
      <Formik initialValues={data} onSubmit={handleEditSave}>
        {({ values }) => (
          <Form className="flex flex-col space-y-4">
            <div className={`hidden md:block`}>
              <Input inputType="formik" name="id" id="id" label="ID" disabled />
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-3 items-center`}>
              <Input inputType="formik" name="lastname" id="lastname" label="Фамилия" />
              <Input inputType="formik" name="firstname" id="firstname" label="Имя" />
              <Input inputType="formik" name="middleName" id="middleName" label="Отчество" />
            </div>

            <div className={`grid grid-cols-3 text-center`}>
                <Input inputType="formik" name="street" id="street" label="Микрорайон / Улица" />
                <Input inputType="formik" name="houseNumber" id="houseNumber" label="Дом" />
                <Input inputType="formik" name="flat" id="flat" label="Квартира" />
              </div>
            <div className={`grid grid-cols-2 sm:grid-cols-3 items-center`}>
              <Input
                inputType="formik"
                name="phone"
                id="phone"
                label="Телефон"
                mask="+79999999999"
                placeholder="+7 (999) 999 9999"
              />
              <Input
                inputType="formik"
                name="telegramAccount"
                id="telegramAccount"
                label="Telegtam"
              />
              <Input
                inputType="formik"
                type="date"
                name="birthday"
                id="birthday"
                label="День рождения"
              />
            </div>

            <Input inputType="formik" name="car" id="car" label="car" />

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
