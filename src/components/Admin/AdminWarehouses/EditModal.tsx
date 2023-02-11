import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import SuggestionExample from '@/components/SuggestionExample';
import { useUpdateWarehouseMutation } from '@/redux/services/base.service';
import { IWarehouse, IWarehouseUpdate } from '@/types';
import { Form, Formik } from 'formik';
import { FC, Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface IEditModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: IWarehouse;
}

export const EditModal: FC<IEditModalProps> = ({ visible, setVisible, data }) => {
  const [update, { isLoading: isLoadingUpdate }] = useUpdateWarehouseMutation();
  const [warehouseAddress, setWarehouseAddress] = useState({
    houseNumber: '',
    street: ''
  });

  const handleEdit = (values: IWarehouseUpdate) => {
    const value = {
      ...values,
      warehouseAddress: `${warehouseAddress.street} ${warehouseAddress.houseNumber}`
    };
    toast
      .promise(update(value).unwrap(), {
        loading: 'Loading',
        success: 'Updated Successfully',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {});
  };
  const handleEditSave = (values: IWarehouseUpdate) => {
    const value = {
      ...values,
      warehouseAddress: `${warehouseAddress.street} ${warehouseAddress.houseNumber}`
    };
    toast
      .promise(update(value).unwrap(), {
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
      <div className="flex items-center justify-between">
        <h2 className={`text-center`}>
          Изменение данных склада по адресу: {`${data?.warehouseAddress}`}
        </h2>
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
            <Input
              inputType="formik"
              name="phone"
              id="phone"
              label="Телефон"
              mask="+7 (999) 999 9999"
              placeholder="+7 (999) 999 9999"
            />
            <SuggestionExample
              setAddress={setWarehouseAddress}
              label="Адрес склада"
              id="warehouseAddress"
            />
            {/* <Input inputType="formik" name="warehouseAddress" id="warehouseAddress" label="Адрес" /> */}
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
