import React, { Dispatch, FC, SetStateAction } from 'react';
import { Form, Formik } from 'formik';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
import { IEmployeeCreateLink } from '@/types/employee.types';
import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { useGetAllWarehousesQuery } from '@/redux/services/base.service';
import { useCreateEmployeeLinkMutation } from '@/redux/services/user.service';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';

interface ICreateModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export const CreateModal: FC<ICreateModalProps> = ({ setVisible, visible }) => {
  const employRole = [
    { id: 1, role: 'ROLE_EMPLOYEE', name: 'Оператор' },
    { id: 2, role: 'ROLE_COURIER', name: 'Курьер' },
    { id: 3, role: 'ROLE_MASTER', name: 'Производственный администратор ' },
    { id: 4, role: 'ROLE_KEEPER', name: 'Продавец магазина' }
  ];
  let location = useLocation();
  let pathname = location.pathname;
  let localPathname = pathname.substring(7, pathname.length);
  let initRole = ''
  const getInitialRole = (localPathname:string) => {
    if (localPathname === 'allUsers') {
      return initRole = employRole[0].role;
    }else if (localPathname === 'couriers'){
        return initRole = employRole[1].role;
    }else return initRole = employRole[2].role;
  };
  const INITIAL_VALUES: IEmployeeCreateLink = {
    quantity: 1,
    role: getInitialRole(localPathname),
    warehouseId: 0
  };
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
          <div className="flex items-center justify-between">
            <h2 className={`text-center text-sm md:text-lg font-semibold`}>
              Отправьте эти ссылки доступа сотрудникам для заполнения анкеты:
            </h2>
            <button
              onClick={() => {
                setVisible(false);
                setResponse([]);
              }}>
              <AiOutlineCloseCircle className={`w-5 h-5 md:w-7 md:h-7 hover:text-blue-700`} />
            </button>
          </div>

          {response.map((str) => (
            <ul key={str} className={`grid grid-cols-1  text-xs md:text-sm`}>
              <div className={`flex`}>
                <li className={`py-2 text-center cursor-text`}>
                  <p>{str}</p>
                </li>
                <Button
                  className={`w-56 h-10 my-2 cursor-copy hover:bg-blue-400`}
                  id="copy"
                  onClick={() => {
                    navigator.clipboard.writeText(str);
                  }}>
                  Copy
                </Button>
              </div>
            </ul>
          ))}
          {/* <Button
            onClick={() => {
              setVisible(false);
              setResponse([]);
            }}>
            Закрыть
          </Button> */}
        </Modal>
      ) : (
        <Modal isOpenModal={visible} setIsOpenModal={setVisible}>
          <div className="flex items-center justify-between">
            <h2 className={`text-center pb-3 `}>
              Получение ссылок для регистрации новых сотрудников
            </h2>
            <button
              onClick={() => {
                setVisible(false);
                setResponse([]);
              }}>
              <AiOutlineCloseCircle className={`w-5 h-5 md:w-7 md:h-7 hover:text-blue-700`} />
            </button>
          </div>

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
                  {(props.values.role === 'ROLE_MASTER' || props.values.role === 'ROLE_KEEPER') && (
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
                    {props.values.quantity === 1 ? ` ссылку` : ` ссылки `} для{' '}
                    {props.values.quantity === 1
                      ? `${props.values.quantity} сотрудника`
                      : `${props.values.quantity} сотрудников`}
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
