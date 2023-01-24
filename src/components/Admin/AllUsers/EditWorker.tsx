import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { useGetAllWarehousesQuery } from '@/redux/services/base.service';
import { useUpdateWorkerMutation } from '@/redux/services/user.service';
import { IEmployeeCreate } from '@/types';

import { Form, Formik } from 'formik';
import { FC, Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface IEditModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: IEmployeeCreate;
}

export const EditWorker: FC<IEditModalProps> = ({ visible, setVisible, data }) => {
  const [update, { isLoading: isLoadingUpdate }] = useUpdateWorkerMutation();
  const { data: warehouses, isLoading: isLoad } = useGetAllWarehousesQuery();

  const handleEdit = (values: IEmployeeCreate) => {
    console.log(values);
    toast
      .promise(update(values).unwrap(), {
        loading: 'Загрузка',
        success: 'Обновлено успешно',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {});
  };
  const handleEditSave = (values: IEmployeeCreate) => {
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
      <div className="flex items-center justify-between">
        <h2 className={`text-center`}>Изменение данных работника</h2>
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
            <div className={`grid grid-cols-1 sm:grid-cols-3 items-center`}>
              <Input inputType="formik" name="lastname" id="lastname" label="Фамилия" />
              <Input inputType="formik" name="firstname" id="firstname" label="Имя" />
              <Input inputType="formik" name="middleName" id="middleName" label="Отчество" />
            </div>

            <div className={`flex flex-1 flex-col md:flex`}>
              <Input inputType="formik" name="street" id="street" label="Улица" />
              <div className={`grid grid-cols-3 text-center`}>
                <Input inputType="formik" name="houseNumber" id="houseNumber" label="Дом" />
                <Input inputType="formik" name="flat" id="flat" label="Квартира" />
              </div>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-3 items-center`}>
              <Input
                inputType="formik"
                name="phone"
                id="phone"
                label="Телефон"
                mask="+7 9999999999"
                placeholder="+7 (999) 999 9999"
              />
              <Input
                inputType="formik"
                name="telegramAccount"
                id="telegramAccount"
                label="Telegtam"
              />
              <Input
                inputType="formik"
                type="date"
                name="birthday"
                id="birthday"
                label="День рождения"
              />
            </div>

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
