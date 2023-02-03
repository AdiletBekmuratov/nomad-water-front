import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';

import { IOrdersUser,  IUsersOrder } from '@/types';

import { Form, Formik } from 'formik';
import {  Input } from '../Forms';
import * as yup from 'yup';


type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  setIsValid: Function;
  setIsEdited?: Function;
  isEdited?: boolean;
  setAddress: Function;
  initial?: IUsersOrder;
};

export const Accordion: FC<Props> = (props) => {
  const { user } = useAppSelector((state) => state.auth);


  const initialValues: IOrdersUser = {
    phone: user?.phone ? user?.phone : '',
    firstname: user?.firstname ? user?.firstname : '', 
    street: user?.street ? user?.street : '',
    houseNumber: user?.houseNumber ? user?.houseNumber : '',
    flat: user?.flat ? user?.flat : '',
    addressComment: ''
  };

  const validation = yup.object().shape({
    firstname: yup.string().required('Поле обязательное'),
    phone: yup.string().required('Поле обязательное'),
    street: yup.string().required('Поле обязательное'),
    houseNumber: yup.string().required('Поле обязательное'),
    flat: yup.string().required('Поле обязательное')
  });
  // const handleCreate = ( street:string,houseNumber:string,flat:string,addressComment:string) => {
  //   let values:IProfile ={
  //     name:'По умолчанию',
  //     street:street,
  //     houseNumber:houseNumber,
  //     flat:flat,
  //     addressComment:addressComment
  //   }
  //   toast
  //     .promise(
  //       create(values)
  //         .unwrap()
  //         .then((resp) => {
  //           console.log(resp);
  //           // setResponse(()=>resp);
  //         }),
  //       {
  //         loading: 'Загрузка...',
  //         success: 'Адрес сохранен, вы можете изменить его в личной странице.',
  //         error: (error) => JSON.stringify(error, null, 2)
  //       }
  //     )
  //     .finally(() => {});
  // };
  const styleInput = `font-montserrat placeholder:text-gray-400 rounded-md`;
  return (
    <>
      <div className={`${props.className}`}>
        <Formik initialValues={initialValues} validationSchema={validation} onSubmit={() => {}}>
          {({ isValid, values }) => (
            <Form className="flex flex-col gap-2">
              <div>
                <Input
                  name="street"
                  id="street"
                  inputType="formik"
                  label="Микрорайон / Улица"
                  className={`${styleInput}`}
                />
              </div>
              <div className="">
                <Input
                  name="houseNumber"
                  id="houseNumber"
                  inputType="formik"
                  label="Дом"
                  className={`${styleInput}`}
                />
              </div>
              <div className="">
                <Input
                  name="flat"
                  id="flat"
                  inputType="formik"
                  label="Квартира"
                  className={`${styleInput}`}
                />
              </div>
              <div className="">
                <Input
                  name="addressComment"
                  id="addressComment"
                  inputType="formik"
                  label="Комментарий к заказу"
                  placeholder="Например: блок, подъезд, этаж, домофон, лифт, и др"
                  className={`${styleInput}`}
                />
              </div>
              <div className="">
                <Input
                  name="firstname"
                  id="firstname"
                  inputType="formik"
                  label="Имя получателя"
                  className={`${styleInput}`}
                />
              </div>
              <div className="">
                <Input
                  name="phone"
                  id="phone"
                  inputType="formik"
                  mask="+7 (799) 999 9999"
                  placeholder="+7 (777) 777 7777"
                  label="Номер телефона"
                  className={`${styleInput}`}
                />
              </div>

              {props.setIsValid(isValid)}
              {props.setAddress(values)}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
