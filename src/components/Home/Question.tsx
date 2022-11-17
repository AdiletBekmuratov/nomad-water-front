import { Button, Input } from '@/components/Forms';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { motion } from 'framer-motion';
type formValues = {
  name: string;
  phone: string;
  question: string;
};

export const Question = () => {
  const validation = yup.object().shape({
    name: yup.string().required('Это поле обязательное'),
    phone: yup.string().required('Поле обязательное')
  });

  const initialValues: formValues = { name: '', phone: '', question: '' };

  return (
    <motion.section className={`  w-full h-screen snap-start`}>
      <div className={` text-dark-blue mx-auto mt-10 flex flex-col items-center`}>
        <span className={`text-2xl leading-7 font-extrabold tracking-wide`}>
          Появился вопрос? Мы всегда готовы вам помочь!
        </span>
        <Formik
          initialValues={initialValues}
          validateOnBlur
          onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
          validationSchema={validation}>
          {({ handleChange, handleBlur, isValid }) => (
            <Form className="flex flex-col space-y-4 text-dark-blue">
              <Input
                inputType="formik"
                id="name"
                name="name"
                type={'text'}
                label="Имя"
                minLength={5}
              />
              <Input
                inputType="formik"
                id="phone"
                name="phone"
                type={'tel'}
                label="Номер телефона"
              />
              <Field
                inputType="formik"
                id="text"
                type={'text'}
                name="question"
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <Button type="submit" disabled={!isValid}>
                Отправить
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </motion.section>
  );
};
