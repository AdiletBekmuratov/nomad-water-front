import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import {
  useGetAllWarehousesQuery,
  useUpdateWarehouseWorkerMutation
} from '@/redux/services/base.service';
import { IWorker } from '@/types/warehouseWorker.types';
import { Form, Formik } from 'formik';
import { FC, Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

interface IEditModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: IWorker;
}

export const EditWorker: FC<IEditModalProps> = ({ visible, setVisible, data }) => {
  const [update, { isLoading: isLoadingUpdate }] = useUpdateWarehouseWorkerMutation();
  const { data: warehouses, isLoading: isLoad } = useGetAllWarehousesQuery();
  // const { data: employees, isLoading: isE } = useGetUserROLEQuery('ROLE_EMPLOYEE');

  const handleEdit = (values: IWorker) => {
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

            <Input
              inputType="formik"
              name="warehouseId"
              id="warehouseId"
              label="Адрес Склада"
              as="select">
              <option>Выберите адрес склада</option>
              {warehouses?.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.warehouseAddress}
                </option>
              ))}
            </Input>

            <div className="modal-action">
              <Button type="submit" loading={isLoadingUpdate || isLoad}>
                Подтвердить
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
