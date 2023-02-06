import { FC, Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import { Form, Formik, useFormikContext } from 'formik';
import toast from 'react-hot-toast';

import { useUpdateUserMutation } from '@/redux/services/user.service';
import { IUserFull, IUserFullCreate } from '@/types/users.types';

import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { formatDate } from '@/hooks/dateChange';

interface IEditModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: IUserFull;
}

export const EditModalUser: FC<IEditModalProps> = ({ visible, setVisible, data }) => {
  const [update, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [currentDate, setCurrentDate] = useState(``);
  const handleEdit = (values: IUserFullCreate) => {
    const updatedValues = { ...values, birthday: formatDate(new Date(currentDate)) };
    toast
      .promise(update(updatedValues).unwrap(), {
        loading: 'Loading',
        success: 'Обновлено',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {});
  };
  const handleEditSave = (values: IUserFullCreate) => {
    const updatedValues = { ...values, birthday: formatDate(new Date(currentDate)) };
    toast
      .promise(update(updatedValues).unwrap(), {
        loading: 'Loading',
        success: 'Сохранено',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {
        setVisible(false);
        setCurrentDate('');
      });
  };

  
  const changeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(e.target.value);
    console.log(currentDate);
  };

  return (
    <Modal setIsOpenModal={setVisible} isOpenModal={visible}>
      <div className="flex items-center justify-between">
        <h2 className={`text-center`}>Изменение данных пользователя</h2>
        <button
          onClick={() => {
            setVisible(false);
          }}>
          <AiOutlineCloseCircle className={`w-5 h-5 md:w-7 md:h-7 hover:text-blue-500`} />
        </button>
      </div>
      <Formik initialValues={data} onSubmit={handleEditSave}>
        {({ values }) => (
          <Form className={`flex flex-col space-y-1 sm:space-y-4`}>
            <>
              <div className={`hidden md:block`}>
                <Input inputType="formik" name="id" id="id" label="ID" disabled />
              </div>

              <div className={`grid grid-cols-1 sm:grid-cols-3 items-center`}>
                <Input inputType="formik" name="lastname" id="lastname" label="Фамилия" />
                <Input inputType="formik" name="firstname" id="firstname" label="Имя" />
                <Input inputType="formik" name="middleName" id="middleName" label="Отчество" />
              </div>
              {data.role !== 'ROLE_USER' ? (
                <div className={`flex flex-1 flex-col md:flex`}>
                  <Input inputType="formik" name="street" id="street" label="Микрорайон / Улица" />
                  <div className={`grid grid-cols-2 text-center`}>
                    <Input inputType="formik" name="houseNumber" id="houseNumber" label="Дом" />
                    <Input inputType="formik" name="flat" id="flat" label="Квартира" />
                  </div>
                </div>
              ) : (
                <div className={`flex flex-1 flex-col md:flex`}>
                  <Input
                    inputType="formik"
                    name="street"
                    id="street"
                    label="Микрорайон / Улица"
                    value={
                      data.profiles
                        ? data.profiles?.length > 0
                          ? data.profiles[0].street
                          : ''
                        : ''
                    }
                  />
                  <div className={`grid grid-cols-2 text-center`}>
                    <Input
                      inputType="formik"
                      name="houseNumber"
                      id="houseNumber"
                      label="Дом"
                      value={
                        data.profiles
                          ? data.profiles?.length > 0
                            ? data.profiles[0].houseNumber
                            : ''
                          : ''
                      }
                    />
                    <Input
                      inputType="formik"
                      name="flat"
                      id="flat"
                      label="Квартира"
                      value={
                        data.profiles
                          ? data.profiles?.length > 0
                            ? data.profiles[0].houseNumber
                            : ''
                          : ''
                      }
                    />
                  </div>
                </div>
              )}

              <div className={`grid grid-cols-2 sm:grid-cols-3 items-center`}>
                <Input
                  inputType="formik"
                  name="phone"
                  id="phone"
                  label="Телефон"
                  mask="+79999999999"
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
                  onChange={(e) => changeDate(e)}
                  value={currentDate}
                />
              </div>
              {data.role === 'ROLE_USER' && (
                <div className="grid grid-cols-1 items-center`">
                  <Input inputType="formik" name="bonuses" id="bonuses" label="Бонусы" />
                </div>
              )}
            </>
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
