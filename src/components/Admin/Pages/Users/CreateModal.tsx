import React, { Dispatch, FC, SetStateAction } from 'react';
import { Form, Formik } from 'formik';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
import { IEmployeeCreateLink } from '@/types/employee.types';
import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import {
  useCreateEmployeeLinkMutation,
  useGetAllWarehousesQuery
} from '@/redux/services/base.service';

const INITIAL_VALUES: IEmployeeCreateLink = {
  quantity: 1,
  role: 'ROLE_KEEPER',
  warehouseId: 0
};
const employRole = [
  { id: 1, role: 'ROLE_KEEPER', name: 'keeper' },
  { id: 2, role: 'ROLE_COURIER', name: 'courier' },
  { id: 3, role: 'ROLE_MASTER', name: 'master' },
  { id: 4, role: 'ROLE_EMPLOYEE', name: 'employee' },
  { id: 5, role: 'ROLE_ADMIN', name: 'admin' }
];
interface ICreateModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export const CreateModal: FC<ICreateModalProps> = ({ setVisible, visible }) => {
  const { data: warehouse } = useGetAllWarehousesQuery();
  const [response, setResponse] = React.useState<string[]>([]);
  const [create, { isLoading }] = useCreateEmployeeLinkMutation();
  const handleCreate = (values: IEmployeeCreateLink) => {
    toast
      .promise(
        create(values)
          .unwrap()
          .then((resp) => {
            setResponse(resp);
          }),
        {
          loading: 'Загрузка...',
          success: 'Получено',
          error: (error) => JSON.stringify(error, null, 2)
        }
      )
      .finally(() => {
        //setVisible(false);
      });
  };
  const validation = yup.object().shape({
    role: yup.string().required('Это поле обязательное')
  });

  return (
    <>
      {response.length > 0 ? (
        <Modal isOpenModal={visible} setIsOpenModal={setVisible}>
          <h2 className={`text-center text-lg font-semibold`}>
            Отправьте эти ссылки доступа сотрудникам для заполнения анкеты:
          </h2>
          {response.map((str) => (
            <ul key={str}>
              <div className={`flex`}>
                <li className={`py-2 text-center cursor-text`} id="link">
                  <p>{str}</p>
                </li>
                {/* <Button className={`w-56 my-2`} id="copy" onClick={(str) => copyText(str)}>
                  Copy
                </Button> */}
              </div>
            </ul>
          ))}
          <Button onClick={() => setVisible(false)}>Закрыть</Button>
        </Modal>
      ) : (
        <Modal isOpenModal={visible} setIsOpenModal={setVisible}>
          <h2 className={`text-center pb-3`}>Получение ссылок для работников</h2>

          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={handleCreate}
            validationSchema={validation}>
            {(props) => (
              <Form className={`flex flex-col gap-3 sm:space-y-4`}>
                <div className={`grid grid-cols-1 items-center`}>
                  <Input
                    inputType="formik"
                    name="quantity"
                    id="quantity"
                    label="Сколько работников надо зарегистрировать?"
                  />
                  <Input
                    inputType="formik"
                    as="select"
                    name="role"
                    id="role"
                    label="Выберите роль"
                    // onChange={}
                  >
                    {employRole?.map((role) => (
                      <option key={role.id} value={role.role}>
                        {role.name}
                      </option>
                    ))}
                  </Input>
                  {props.values.role !== 'ROLE_ADMIN' && (
                    <Input
                      inputType="formik"
                      name="warehouseId"
                      id="warehouseId"
                      label="Id склада"
                      as="select">
                      <option>Выберите ID склада</option>
                      {warehouse?.map((w) => (
                        <option value={w.id} key={w.id}>
                          ID: {w.id}, Адрес: {w.warehouseAddress}
                        </option>
                      ))}
                    </Input>
                    // <Input inputType="formik" name="warehouseId" id="warehouseId" label="ID склада" />
                  )}
                </div>

                <div className="modal-action">
                  <Button type="submit" loading={isLoading}>
                    Получить
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  );
};
