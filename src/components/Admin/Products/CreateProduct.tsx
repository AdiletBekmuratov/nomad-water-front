import { Button, Input, TextArea } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import {
  useCreateProductMutation,
  // useGetProductImageIDMutation,
  useUploadProductImageMutation
} from '@/redux/services/base.service';
import { IProductCreate } from '@/types';
import { Form, Formik } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineCloseCircle } from 'react-icons/ai';
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

  imageFile: null
};

export const CreateProduct: FC<ICreateModalProps> = ({ setVisible, visible }) => {
  const [create, { isLoading }] = useCreateProductMutation();
  const [uploadImage, { isLoading: isLoadingImage }] = useUploadProductImageMutation();
  //   const [getImage, { isLoading: isLoadingGetImage }] = useGetProductImageIDMutation();

  const handleCreate = async (values: IProductCreate) => {
    console.log({ values });
    const formData = new FormData();
    formData.append('image', values.imageFile as unknown as Blob);
    delete values.imageFile;
    const createResponse = await create(values).unwrap();
    toast
      .promise(uploadImage({ id: createResponse.id!, formData }).unwrap(), {
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
      <div className="flex items-center justify-between">
        <h2 className={`text-center`}>Добавить новый товар или услугу</h2>
        <button
          onClick={() => {
            setVisible(false);
          }}>
          <AiOutlineCloseCircle className={`w-5 h-5 md:w-7 md:h-7 hover:text-blue-500`} />
        </button>
      </div>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleCreate}>
        {({ setFieldValue }) => (
          <Form className="flex flex-col space-y-4">
            <Input
              inputType="formik"
              name="productName"
              id="productName"
              label="Название продукта"
              placeholder="Введите название продукта"
            />
            <Input
              inputType="default"
              name="imageFile"
              id="imageFile"
              label="Image"
              placeholder="Image"
              type={'file'}
              accept="image/*"
              onChange={(e) => {
                // @ts-ignore
                setFieldValue('imageFile', e.target.files[0]);
              }}
            />
            <Input
              inputType="formik"
              name="productPrice"
              id="productPrice"
              type="number"
              label="Цена продукта"
              placeholder="Цена продукта"
            />
            <Categories />
            <TextArea name="description" id="description" placeholder="Описание" />
            <div className="modal-action">
              <Button type="submit" loading={isLoading || isLoadingImage}>
                Добавить
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
