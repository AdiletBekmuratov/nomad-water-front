import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';

import { useUpdateUserMeMutation } from '@/redux/services/user.service';
import { IUser } from '@/types';
import { Form, Formik } from 'formik';
import { FC, Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface IEditModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: IUser;
}

export const Edit: FC<IEditModalProps> = ({ visible, setVisible, data }) => {
  const [update, { isLoading }] = useUpdateUserMeMutation();

  const handleEdit = async (values: IUser) => {
    toast
      .promise(update(values).unwrap(), {
        loading: 'Загрузка',
        success: 'Обновлено успешно',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {});
  };

  const handleEditSave = async (values: IUser) => {
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
        <h2 className={`text-center`}>Изменение личных данных</h2>
        <button
          onClick={() => {
            setVisible(false);
          }}>
          <AiOutlineCloseCircle className={`w-5 h-5 md:w-7 md:h-7 hover:text-blue-500`} />
        </button>
      </div>
      <Formik initialValues={data} onSubmit={handleEditSave}>
        {({values}) => (
          <Form className="flex flex-col space-y-4">
            <div className={`grid grid-cols-1 items-center`}>
              <Input inputType="formik" name="lastname" id="lastname" label="Фамилия" />
              <Input inputType="formik" name="firstname" id="firstname" label="Имя" />
              <Input inputType="formik" name="middleName" id="middleName" label="Отчество" />
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
              {/* <Input
                inputType="formik"
                name="telegramAccount"
                id="telegramAccount"
                label="Telegram"
              /> */}
              {/* <Input inputType="formik" name="email" id="email" label="email" /> */}
              {/* <Input
                inputType="formik"
                type="date"
                name="birthday"
                id="birthday"
                label="День рождения"
              /> */}
            </div>
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
