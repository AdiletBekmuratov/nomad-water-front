import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { useCreateProductCategoryMutation } from '@/redux/services/base.service';
import { IProductCategoryCreate } from '@/types';
import { Form, Formik } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';

interface ICreateModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const INITIAL_VALUES: IProductCategoryCreate = {
  name: ''
};

export const CreateCategory: FC<ICreateModalProps> = ({ setVisible, visible }) => {
  const [create, { isLoading }] = useCreateProductCategoryMutation();
  const handleCreate = (values: IProductCategoryCreate) => {
    console.log(values);
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
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleCreate}>
        {() => (
          <Form className="flex flex-col space-y-4">
            <Input
              inputType="formik"
              name="name"
              id="name"
              label="Название категории"
              placeholder="Название категории"
            />

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
