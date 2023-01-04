import { FC, Dispatch, SetStateAction } from 'react';

import { IUserFull } from '@/types';

import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import { useUpdateCourierMutation } from '@/redux/services/user.service';

interface IEditModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: IUserFull;
}

export const EditModalCourier: FC<IEditModalProps> = ({ visible, setVisible, data }) => {
  const [update, { isLoading: isLoadingUpdate }] = useUpdateCourierMutation();

  const handleEdit = (values: IUserFull) => {
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
      <h2 className={`text-center`}>Изменение данных курьера</h2>
      <Formik initialValues={data} onSubmit={handleEdit}>
        {() => (
          <Form className="flex flex-col space-y-4">
            <Input inputType="formik" name="id" id="id" label="ID" disabled />
            <div className={`grid grid-cols-1 sm:grid-cols-3 items-center`}>
              <Input inputType="formik" name="lastname" id="lastname" label="Фамилия" />
              <Input inputType="formik" name="firstname" id="firstname" label="Имя" />
              <Input inputType="formik" name="middleName" id="middleName" label="Отчество" />
            </div>

            <div className={`flex flex-1 flex-col md:flex`}>
              <Input inputType="formik" name="street" id="street" label="Улица" />
              <div className={`grid grid-cols-3 text-center`}>
                <Input inputType="formik" name="houseNumber" id="houseNumber" label="Дом" />
                <Input inputType="formik" name="flat" id="flat" label="Квартира" />
              </div>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-3 items-center`}>
              <Input
                inputType="formik"
                name="phone"
                id="phone"
                label="Телефон"
                mask="+7 9999999999"
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

            <div className="modal-action">
              <Button type="submit" loading={isLoadingUpdate}>
                Подтвердить изменения
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
