import { Button, Input, TextArea } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { useUpdateProductMutation } from '@/redux/services/base.service';
import { IProduct } from '@/types';
import { Form, Formik } from 'formik';
import { FC, Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { Categories } from './Categories';

interface IEditModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: IProduct;
}

export const EditProducts: FC<IEditModalProps> = ({ visible, setVisible, data }) => {
  const [update, { isLoading: isLoadingUpdate }] = useUpdateProductMutation();

  const handleEdit = (values: IProduct) => {
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
            <Input inputType="formik" name="productName" id="productName" label="Имя продукта" />
            <Categories />

            <Input inputType="formik" name="productPrice" id="productPrice" label="Цена продукта" />
            <Input
              inputType="formik"
              name="urgencyPrice"
              id="urgencyPrice"
              label="Цена срочности"
            />
            <TextArea id="description" name="description" />
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