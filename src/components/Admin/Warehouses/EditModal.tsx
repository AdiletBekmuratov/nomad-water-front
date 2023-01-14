import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { useUpdateWarehouseMutation } from '@/redux/services/base.service';
import { IWarehouse, IWarehouseUpdate } from '@/types';
import { Form, Formik } from 'formik';
import { FC, Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

interface IEditModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: IWarehouse;
}

export const EditModal: FC<IEditModalProps> = ({ visible, setVisible, data }) => {
  const [update, { isLoading: isLoadingUpdate }] = useUpdateWarehouseMutation();

  const handleEdit = (values: IWarehouseUpdate) => {
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
      <Formik initialValues={data} onSubmit={handleEdit}>
        {() => (
          <Form className="flex flex-col space-y-4">
            <Input inputType="formik" name="id" id="id" label="ID" disabled />
            <Input
              inputType="formik"
              name="phone"
              id="phone"
              label="Телефон"
              mask="+7 (999) 999 9999"
              placeholder="+7 (999) 999 9999"
            />
            <Input inputType="formik" name="warehouseAddress" id="warehouseAddress" label="Адрес" />
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
