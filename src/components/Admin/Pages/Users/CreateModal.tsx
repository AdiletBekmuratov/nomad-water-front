import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { useCreateUserMutation } from '@/redux/services/base.service';
import { IUserFullCreate } from '@/types/users.types';

import { Form, Formik } from 'formik';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
interface ICreateModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const INITIAL_VALUES: IUserFullCreate = {
  phone: '',
  firstname: '',
  middleName: '',
  lastname: '',
  role: '',
  birthday: '',
  street: '',
  houseNumber: '',
  flat: '',
  addressComment: '',
  bonuses: 0,
  telegramAccount: '',
  car: '',
  courierDeliveringStatus: 0,
  successfulOrders: 0,
  warehouseId: 0,
  shopkeeperPhone: ''
};
const userRoles = [
  { id: 1, role: 'ROLE_USER', name: 'user' },
  { id: 2, role: 'ROLE_KEEPER', name: 'keeper' },
  { id: 3, role: 'ROLE_COURIER', name: 'courier' },
  { id: 4, role: 'ROLE_MASTER', name: 'master' },
  { id: 5, role: 'ROLE_EMPLOYEE', name: 'employee' },
  { id: 6, role: 'ROLE_ADMIN', name: 'admin' }
];

export const CreateModal: FC<ICreateModalProps> = ({ setVisible, visible }) => {
  const [create, { isLoading }] = useCreateUserMutation();
  const handleCreate = (values: IUserFullCreate) => {
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
  const [choiceRole, setChoiceRole] = useState('ROLE_USER');
  console.log(choiceRole);

  const validation = yup.object().shape({
    middleName: yup.string().required('Это поле обязательное'),
    phone: yup.string().required('Это поле обязательное')
  });
  return (
    <Modal isOpenModal={visible} setIsOpenModal={setVisible}>
      <h2 className={`text-center pb-3`}>Добавить нового пользователя</h2>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleCreate} validationSchema={validation}>
        {() => (
          <Form className="flex flex-col space-y-4">
            <>
              <Input inputType="formik" name="id" id="id" label="ID" disabled />

              <div className={`grid grid-cols-3 items-center`}>
                <Input inputType="formik" name="firstname" id="firstname" label="Фамилия" />
                <Input inputType="formik" name="middleName" id="middleName" label="Имя" />
                <Input inputType="formik" name="lastname" id="lastname" label="Отчество" />
              </div>

              <div className={`flex flex-1 flex-col md:flex`}>
                <Input inputType="formik" name="street" id="street" label="Улица" />
                <div className={`grid grid-cols-3 text-center`}>
                  <Input inputType="formik" name="houseNumber" id="houseNumber" label="Дом" />
                  <Input inputType="formik" name="flat" id="flat" label="Квартира" />
                  <Input
                    inputType="formik"
                    name="addressComment"
                    id="addressComment"
                    label="Этаж"
                  />
                </div>
              </div>
              <div className={`grid grid-cols-3 items-center`}>
                <Input
                  inputType="formik"
                  name="phone"
                  id="phone"
                  label="Телефон"
                  mask="+7 (999) 999 9999"
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
              <div className="grid grid-cols-1 items-center`">
                <>
                  <Input
                    inputType="formik"
                    as="select"
                    name="role"
                    id="role"
                    label="Выберите роль"
                    onChange={(value) => setChoiceRole(value.target.value)}>
                    {userRoles?.map((role) => (
                      <option key={role.id} value={role.role} id="userRole">
                        {role.name}
                      </option>
                    ))}
                  </Input>
                  {choiceRole === 'ROLE_USER' ? (
                    <Input inputType="formik" name="bonuses" id="bonuses" label="Бонусы" />
                  ) : choiceRole === 'ROLE_COURIER' ? (
                    <div className={`grid grid-cols-3 items-center`}>
                      <Input inputType="formik" name="car" id="car" label="car" />
                      <Input
                        inputType="formik"
                        name="courierDeliveringStatus"
                        id="courierDeliveringStatus"
                        label="DeliStat"
                      />
                      <Input
                        inputType="formik"
                        name="successfulOrders"
                        id="successfulOrders"
                        label="successfulOrders"
                      />
                    </div>
                  ) : choiceRole === 'ROLE_MASTER' ? (
                    <Input
                      inputType="formik"
                      name="warehouseId"
                      id="warehouseId"
                      label="Id склада"
                    />
                  ) : (
                    choiceRole === 'ROLE_EMPLOYEE' && (
                      <Input
                        inputType="formik"
                        name="warehouseId"
                        id="warehouseId"
                        label="Id склада"
                      />
                    )
                  )}
                  {/* {(() => {
                    switch (choiceRole) {
                      case 'ROLE_COURIER':
                        <div>
                          <Input inputType="formik" name="car" id="car" label="car" />
                          <Input
                            inputType="formik"
                            name="courierDeliveringStatus"
                            id="courierDeliveringStatus"
                            label="DeliStat"
                          />
                          <Input
                            inputType="formik"
                            name="successfulOrders"
                            id="successfulOrders"
                            label="successfulOrders"
                          />
                        </div>;
                        break;

                      case 'ROLE_MASTER':
                        <div>
                          <Input
                            inputType="formik"
                            name="warehouseId"
                            id="warehouseId"
                            label="Id склада"
                          />
                        </div>;
                        break;

                      case 'ROLE_EMPLOYEE':
                        <div>
                          <Input
                            inputType="formik"
                            name="warehouseId"
                            id="warehouseId"
                            label="Id склада"
                          />
                        </div>;
                        break;
                      default:
                        <div>
                          <Input inputType="formik" name="bonuses" id="bonuses" label="Бонусы" />
                        </div>;
                        break;
                    }
                  })()} */}
                </>
              </div>
            </>
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
