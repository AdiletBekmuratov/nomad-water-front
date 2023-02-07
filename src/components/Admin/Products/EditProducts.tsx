import { Button, Input, TextArea } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import {
  useGetProductCategoryQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation
} from '@/redux/services/base.service';
import { IProduct, IProductCreate } from '@/types';
import { Form, Formik } from 'formik';
import { FC, Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { Categories } from './Categories';
import * as yup from 'yup';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface IEditModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: IProduct;
}

export const EditProducts: FC<IEditModalProps> = ({ visible, setVisible, data }) => {
  const [update, { isLoading: isLoadingUpdate }] = useUpdateProductMutation();

  const [uploadImage, { isLoading: isLoadingImage }] = useUploadProductImageMutation();
  const { data: categories = [] } = useGetProductCategoryQuery();
  const handleEdit = async (values: IProductCreate) => {
    const formData = new FormData();
    formData.append('image', values.imageFile as unknown as Blob);
    delete values.imageFile;
    const createResponse = await update(values).unwrap();
    toast
      //@ts-ignore
      .promise(uploadImage({ id: createResponse.id!, formData }).unwrap(), {
        loading: 'Загрузка',
        success: 'Обновлено',
        error: 'Вы не выбрали новое изображение товара, данные обновлены со старым изображением!'
        //error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {});
  };
  const handleEditSave = async (values: IProductCreate) => {
    const formData = new FormData();
    formData.append('image', values.imageFile as unknown as Blob);
    delete values.imageFile;
    const createResponse = await update(values).unwrap();
    toast
      //@ts-ignore
      .promise(uploadImage({ id: createResponse.id!, formData }).unwrap(), {
        loading: 'Загрузка',
        success: 'Сохранено',
        error: 'Вы не выбрали новое изображение товара, данные сохранились со старым изображением!'
        // error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {
        setVisible(false);
      });
  };
  const validation = yup.object().shape({
    productName: yup.string().required('Это поле обязательное'),
    description: yup.string().required('Это поле обязательное'),
    productPrice: yup.string().required('Это поле обязательное'),
    productCategoryId: yup.string().required('Это поле обязательное')
  });
  return (
    <Modal setIsOpenModal={setVisible} isOpenModal={visible}>
      <div className="flex items-center justify-between">
        <h2 className={`text-center`}>Изменение данных продукта</h2>
        <button
          onClick={() => {
            setVisible(false);
          }}>
          <AiOutlineCloseCircle className={`w-5 h-5 md:w-7 md:h-7 hover:text-blue-500`} />
        </button>
      </div>
      <Formik initialValues={data} onSubmit={handleEditSave} validationSchema={validation}>
        {({ setFieldValue, values }) => (
          <Form className="flex flex-col space-y-4">
            <Input inputType="formik" name="id" id="id" label="ID" disabled />
            <Input inputType="formik" name="productName" id="productName" label="Имя продукта" />
            {/* <Categories /> */}
            <Input
              inputType="formik"
              as="select"
              name="productCategoryId"
              id="productCategoryId"
              label="Выберите категорию продукта"
              >
              <option>Выберите категорию</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Input>
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
            <Input inputType="formik" name="productPrice" id="productPrice" label="Цена продукта" />

            <TextArea id="description" name="description" />
            <div className={`flex gap-3 justify-between`}>
              <Button type="submit" className={`hover:bg-blue-500`}>
                Сохранить
              </Button>
              <Button
                type="button"
                onClick={() => handleEdit(values)}
                className={`hover:bg-blue-500`}>
                Применить
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
