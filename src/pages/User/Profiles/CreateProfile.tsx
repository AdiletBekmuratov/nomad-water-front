import React, { Dispatch, FC, SetStateAction } from 'react';

import { useCreateProfileMutation } from '@/redux/services/profile.service';

import { Form, Formik } from 'formik';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import { Button, Input } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IProfile } from '@/types';

interface ICreateProfileProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export const CreateProfile: FC<ICreateProfileProps> = ({ setVisible, visible }) => {

  const INITIAL_VALUES: IProfile = {
    name: '',
    street: '',
    houseNumber: '',
    flat: '',
    addressComment: ''
  };
  const [response, setResponse] = React.useState<string[]>([]);
  const [create, { isLoading }] = useCreateProfileMutation();

  const handleCreate = (values: IProfile) => {
    toast
      .promise(
        create(values)
          .unwrap()
          .then((resp) => {
            resp;
            // setResponse(()=>resp);
          }),
        {
          loading: 'Загрузка...',
          success: 'Новый адрес сохранен',
          error: (error) => JSON.stringify(error, null, 2)
        }
      )
      .finally(() => {
        setVisible(false);
      });
  };
  const validation = yup.object().shape({
    name: yup.string().required('Это поле обязательное'),
    street: yup.string().required('Это поле обязательное'),
    houseNumber: yup.string().required('Это поле обязательное'),
    flat: yup.string().required('Это поле обязательное')
  });

  return (
    <>
      {
        <Modal isOpenModal={visible} setIsOpenModal={setVisible}>
          <div className="flex items-center justify-between">
            <h2 className={`text-center pb-3 `}>Записать новый адрес</h2>
            <button
              onClick={() => {
                setVisible(false);
                setResponse([]);
              }}>
              <AiOutlineCloseCircle className={`w-5 h-5 md:w-6 md:h-6 hover:text-blue-700`} />
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
                    name="name"
                    id="name"
                    label="Название для нового адреса"
                    placeholder="Например: офис, дача, дом родителей"
                  />
                  <Input inputType="formik" id="street" name="street" label="Микрорайон / Улица" />
                  <Input
                    inputType="formik"
                    id="houseNumber"
                    name="houseNumber"
                    label="Номер дома"
                  />
                  <Input inputType="formik" id="flat" name="flat" label="Квартира" />
                  <Input
                    inputType="formik"
                    id="addressComment"
                    name="addressComment"
                    label="Комментарий к адресу"
                    placeholder="Например: блок, подъезд, этаж, домофон, лифт, и др"
                  />
                </div>

                <div className="modal-action">
                  <Button type="submit" loading={isLoading}>
                    Сохранить
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      }
    </>
  );
};
