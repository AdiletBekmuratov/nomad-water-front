import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { useUpdateProductCategoryMutation } from '@/redux/services/base.service';
import { IProductCategoryCreate } from '@/types';
import { Form, Formik } from 'formik';
import { FC, Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineCloseCircle } from 'react-icons/ai';

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
        success: 'Обновлено',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {});
  };
  const handleEditSave = (values: IProductCategoryCreate) => {
    console.log(values);
    toast
      .promise(update(values).unwrap(), {
        loading: 'Загрузка',
        success: 'Сохранено',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {
        setVisible(false);
      });
  };

  return (
    <Modal setIsOpenModal={setVisible} isOpenModal={visible}>
      <div className="flex items-center justify-between">
        <h2 className={`text-center`}>Изменить название категории</h2>
        <button
          onClick={() => {
            setVisible(false);
          }}>
          <AiOutlineCloseCircle className={`w-5 h-5 md:w-7 md:h-7 hover:text-blue-500`} />
        </button>
      </div>
      <Formik initialValues={data} onSubmit={handleEditSave}>
        {({ values }) => (
          <Form className="flex flex-col space-y-4">
            <Input inputType="formik" name="id" id="id" label="ID" disabled />
            <Input inputType="formik" name="name" id="name" label="Имя категории" />

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
