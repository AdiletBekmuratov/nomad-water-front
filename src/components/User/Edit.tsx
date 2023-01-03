import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';

import { useUpdateUserMeMutation } from '@/redux/services/user.service';
import { IUserFull } from '@/types';
import { Form, Formik } from 'formik';
import { FC, Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

interface IEditModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: IUserFull;
}

export const Edit: FC<IEditModalProps> = ({ visible, setVisible, data }) => {
  const [update, { isLoading }] = useUpdateUserMeMutation();

  const handleEdit = async (values: IUserFull) => {
    toast
      .promise(update(values).unwrap(), {
        loading: 'Загрузка',
        success: 'Обновлено успешно',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {
        setVisible(false);
      });
  };

  return (
    <Modal setIsOpenModal={setVisible} isOpenModal={visible}>
      <Formik initialValues={data} onSubmit={handleEdit}>
        {() => (
          <Form className="flex flex-col space-y-4">
            <Input inputType="formik" name="firstname" id="firstname" label="Имя" />
            <Input inputType="formik" name="lastname" id="lastname" label="Фамилия" />
            <Input inputType="formik" name="middleName" id="middlename" label="Отчество" />
            <Input inputType="formik" name="street" id="street" label="Улица" />
            <Input inputType="formik" name="houseNumber" id="houseNumber" label="Номер дома" />
            <Input inputType="formik" name="flat" id="flat" label="Квартира" />
            <Input
              inputType="formik"
              name="phone"
              id="phone"
              label="Номер телефона"
              mask="+7 999 999 99 99"
            />
            <div className="modal-action">
              <Button type="submit" loading={isLoading}>
                Подтвердить
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
