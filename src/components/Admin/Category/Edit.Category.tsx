import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { useUpdateProductCategoryMutation } from '@/redux/services/base.service';
import { IProductCategoryCreate } from '@/types';
import { Form, Formik } from 'formik';
import { FC, Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

interface IEditModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: IProductCategoryCreate;
}

export const EditCategory: FC<IEditModalProps> = ({ visible, setVisible, data }) => {
  const [update, { isLoading: isLoadingUpdate }] = useUpdateProductCategoryMutation();

  const handleEdit = (values: IProductCategoryCreate) => {
    console.log(values);
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
            <Input inputType="formik" name="id" id="id" label="ID" disabled />
            <Input inputType="formik" name="name" id="name" label="Имя категорий" />

            <div className="modal-action">
              <Button type="submit" loading={isLoadingUpdate}>
                Подтвердить
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
