import { FC, Dispatch, SetStateAction } from 'react';

import { useUpdateCourierMutation } from '@/redux/services/base.service';
import { ICouriers, ICouriersUpdate } from '@/types';

import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { Form, Formik } from 'formik';
import toast from 'react-hot-toast';

interface IEditModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: ICouriers;
}

export const EditModal: FC<IEditModalProps> = ({ visible, setVisible, data }) => {
  const [update, { isLoading: isLoadingUpdate }] = useUpdateCourierMutation();

  const handleEdit = (values: ICouriersUpdate) => {
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
            
            <Input inputType="formik" name="firstname" id="firstname" label="Фамилия" />
            <Input inputType="formik" name="middleName" id="middleName" label="Имя" />
            <Input inputType="formik" name="lastname" id="lastname" label="Отчество" />

            <div className={`flex flex-1`}>
              <Input inputType="formik" name="street" id="street" label="Улица" />
              <div className={`grid grid-cols-3`}>
                <Input inputType="formik" name="houseNumber" id="houseNumber" label="Номер дома" />
                <Input inputType="formik" name="flat" id="flat" label="Квартира" />
                <Input
                  inputType="formik"
                  name="addressComment"
                  id="addressComment"
                  label="Укажите этаж"
                />
              </div>
            </div>
            <div className={`flex justify-between`}>
              <Input inputType="formik" as="select" name="role" id="role" label="Статус">
                {userRoles?.map((role) => (
                  <option key={role.id} value={role.role} id="userRole">
                    {role.name}
                  </option>
                ))}
              </Input>
              <Input
                inputType="formik"
                type="date"
                name="birthday"
                id="birthday"
                label="День рождения"
              />
              <Input
                inputType="formik"
                name="telegramAccount"
                id="telegramAccount"
                label="Telegtam"
              />
            </div>
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
