import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { useAppDispatch } from '@/hooks';

import { useUpdateUserMeMutation } from '@/redux/services/user.service';
import { getMe } from '@/redux/slices/auth';
import { IUser, IUserFull } from '@/types';
import { Form, Formik } from 'formik';
import { FC, Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import * as yup from 'yup';
interface IEditModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  user: IUserFull;
}

export const Edit: FC<IEditModalProps> = ({ visible, setVisible, user }) => {
  const [update, { isLoading }] = useUpdateUserMeMutation();
  const dispatch = useAppDispatch();
  const handleEdit = async (values: IUser) => {
    toast
      .promise(update(values).unwrap(), {
        loading: 'Загрузка',
        success: 'Обновлено успешно',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .then(() => dispatch(getMe()))
      .finally(() => {});
  };

  const handleEditSave = async (values: IUser) => {
    toast
      .promise(update(values).unwrap(), {
        loading: 'Загрузка',
        success: 'Сохранено',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .then(() => dispatch(getMe()))
      .finally(() => {
        setVisible(false);
      });
  };
  const validation = yup.object().shape({
    firstname: yup.string().required('Это поле обязательное')
  });
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

      <Formik initialValues={user} onSubmit={handleEditSave} validationSchema={validation}>
        {({ values, isValid }) => (
          <Form className="flex flex-col space-y-4">
            <div className={`grid grid-cols-1 items-center`}>
              <Input inputType="formik" name="lastname" id="lastname" label="Фамилия" />
              <Input inputType="formik" name="firstname" id="firstname" label="Имя" />
              <Input inputType="formik" name="middleName" id="middleName" label="Отчество" />
            </div>
            {user && user.firstname.length === 0 ? (
              <p className={`text-center text-xs`}>Необходимо заполнить хотя бы имя.</p>
            ) : null}
            {/* <div>
              <h2>Также рекомендуем добавить дату рождения, чтобы получать больше бонусов</h2>
            </div> */}
            <div className={`flex gap-3 justify-between`}>
              <Button type="submit" disabled={!isValid} className={`hover:bg-blue-500`}>
                Сохранить
              </Button>
              <Button
                type="button"
                disabled={!isValid}
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
