import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';

import { useCreateCourierMutation } from '@/redux/services/base.service';
import { ICouriersCreate } from '@/types';

import { Form, Formik } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';
interface ICreateModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const INITIAL_VALUES: ICouriersCreate = {
  userId: 0,
  car: ''
};

export const CreateModal: FC<ICreateModalProps> = ({ setVisible, visible }) => {
  const [create, { isLoading }] = useCreateCourierMutation();
  const handleCreate = (values: ICouriersCreate) => {
    toast
      .promise(create(values).unwrap(), {
        loading: 'Загрузка...',
        success: 'Создано Успешно',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {
        setVisible(false);
      });
  };
  return (
    <Modal isOpenModal={visible} setIsOpenModal={setVisible}>
      <h2 className={`text-center`}>Добавить нового курьера</h2>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleCreate}>
        {() => (
          <Form className="flex flex-col space-y-4">
            <Input inputType="formik" name="id" id="id" label="ID курьера" disabled />
            <Input inputType="formik" name="userId" id="userId" label="ID пользователя" disabled />
            <Input inputType="formik" name="car" id="car" label="авто" />
            <div className="modal-action">
              <Button type="submit" loading={isLoading}>
                Добавить
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
