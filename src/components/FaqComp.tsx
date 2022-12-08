import { FC } from 'react';
import { Button, Input, TextArea } from './Forms';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

type formValues = {
  name: string;
  phone: string;
  question: string;
};

type Props = {
  header?: string;
};

const FaqComp: FC<Props> = (props) => {
  const validation = yup.object().shape({
    name: yup.string().required('Данное поле обязательно'),
    phone: yup.string().required('Данное поле обязательно'),
    question: yup.string()
  });

  const initialValues: formValues = { name: '', phone: '', question: '' };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}>
        {({ isValid }) => (
          <>
            <h3
              className={`mb-2 lg:text-2xl font-bold lg:font-extrabold lg:tracking-wide leading-5 lg:leading-7
              text-dark-blue`}>
              {props.header}
            </h3>
            <Form className={`flex flex-col space-y-4 text-sm lg:text-base`}>
              <Input
                id="name"
                inputType="formik"
                name="name"
                type="text"
                label="Имя"
                placeholder="Петров Андрей"
              />
              <Input
                inputType="formik"
                id="phone"
                name="phone"
                type={'tel'}
                label="Номер телефона"
                mask="+7 (999) 999-99-99"
                placeholder="+7 (999) 999-99-99"
              />
              <TextArea name={`question`} id="question" label="Ваш вопрос" />
              <Button disabled={!isValid} type="submit" className="">
                Отправить заявку
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default FaqComp;
