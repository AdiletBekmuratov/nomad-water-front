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
            <Input inputType="formik" name="userId" id="userId" label="ID пользователя" disabled />
            <Input inputType="formik" name="car" id="car" label="авто" />
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
