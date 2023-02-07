import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import SuggestionExample from '@/pages/SuggestionExample';
import { useCreateWarehouseMutation } from '@/redux/services/base.service';
import { IWarehouseUpdate } from '@/types';
import { Form, Formik } from 'formik';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface ICreateModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const INITIAL_VALUES: IWarehouseUpdate = {
  phone: '',
  warehouseAddress: ''
};

export const CreateModal: FC<ICreateModalProps> = ({ setVisible, visible }) => {
  const [create, { isLoading }] = useCreateWarehouseMutation();
  const [warehouseAddress, setWarehouseAddress] = useState({
    street: '',
    houseNumber: ''
  });
  const handleCreate = (values: IWarehouseUpdate) => {
    const value = {
      ...values,
      warehouseAddress: `${warehouseAddress.street} ${warehouseAddress.houseNumber}`
    };
    console.log(value);

    toast
      .promise(create(value).unwrap(), {
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
        <h2 className={`text-center`}>Создание нового склада</h2>
        <button
          onClick={() => {
            setVisible(false);
          }}>
          <AiOutlineCloseCircle className={`w-5 h-5 md:w-7 md:h-7 hover:text-blue-500`} />
        </button>
      </div>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleCreate}>
        {() => (
          <Form className="flex flex-col space-y-4">
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
            <div className="modal-action">
              <Button type="submit" loading={isLoading}>
                Добавить склад
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
