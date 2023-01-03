import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import {
  useCreateWarehouseWorkerMutation,
  useGetAllWarehousesQuery
} from '@/redux/services/base.service';
import { useGetUserROLEQuery } from '@/redux/services/user.service';
import { IWorker } from '@/types';

import { Form, Formik } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';

interface ICreateModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const INITIAL_VALUES: IWorker = {
  shopkeeperPhone: '',
  userId: 1,
  warehouseId: 1
};

export const CreateEmployee: FC<ICreateModalProps> = ({ setVisible, visible }) => {
  const [create, { isLoading }] = useCreateWarehouseWorkerMutation();
  const { data: employees, isLoading: isE } = useGetUserROLEQuery('ROLE_EMPLOYEE');

  const { data: warehouses, isLoading: isLoad } = useGetAllWarehousesQuery();

  const handleCreate = (values: IWorker) => {
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
              name="shopkeeperPhone"
              id="shopkeeperPhone"
              label="Телефон магазина"
              mask="+7 (999) 999 9999"
              placeholder="+7 (999) 999 9999"
            />

            <Input inputType="formik" name="userId" id="userId" as="select" label="Работник">
              <option>Выберите работника</option>
              {employees?.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {`${emp.firstname} ${emp.middleName} ${emp.lastname}`}
                </option>
              ))}
            </Input>

            <Input
              inputType="formik"
              name="warehouseAddress"
              id="warehouseAddress"
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
              <Button type="submit" loading={isLoading || isE || isLoad}>
                Добавить
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
