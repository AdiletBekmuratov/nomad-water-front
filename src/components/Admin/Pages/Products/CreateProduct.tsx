import { Button, Input, TextArea } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { useCreateProductMutation } from '@/redux/services/base.service';
import { IProduct, IProductCreate } from '@/types';
import { Form, Formik } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';
import { Categories } from './Categories';

interface ICreateModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const INITIAL_VALUES: IProductCreate = {
  description: '',
  productCategoryId: 1,
  productName: '',
  productPrice: 0,
  urgencyPrice: 0
};

export const CreateProduct: FC<ICreateModalProps> = ({ setVisible, visible }) => {
  const [create, { isLoading }] = useCreateProductMutation();
  const handleCreate = (values: IProduct) => {
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
              name="productName"
              id="productName"
              label="Название продукта"
              placeholder="Название продукта"
            />
            <Input
              inputType="formik"
              name="productPrice"
              id="productPrice"
              type="number"
              label="Цена продукта"
              placeholder="Цена продукта"
            />
            <Input
              inputType="formik"
              name="urgencyPrice"
              id="urgencyPrice"
              type="number"
              label="Цена срочности"
              placeholder="Цена срочности"
            />

            <Categories />
            <TextArea name="description" id="description" placeholder="Описание" />
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
