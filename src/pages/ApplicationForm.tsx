import FormComponent from '@/components/FormComponent';
import { Button, Input, TextArea } from '@/components/Forms';
import * as yup from 'yup';

import { Form, Formik } from 'formik';

type initialValues = {
  street: string;
  house: string;
  flat: string;
  phone: string;
  date: string;
  comment: string;
};

const ApplicationForm = () => {
  const initialValues: initialValues = {
    street: '',
    house: '',
    flat: '',
    phone: '',
    date: '',
    comment: ''
  };

  const validation = yup.object().shape({
    street: yup.string().required('Поле обязательное'),
    house: yup.string().required('Поле обязательно'),
    flat: yup.string().required('Поле обязательное'),
    phone: yup.string().required('Поле обязательное'),
    date: yup.date().required('Поле обязательное')
  });

  return (
    <FormComponent>
      <div className="border border-primary border-1 bg-white rounded-2xl px-9 py-4 box-border">
        <h2 className="text-primary text-2xl font-montserrat">Отправка заявки</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={(values) => alert(JSON.stringify(values, null, 2))}>
          {({ isValid }) => (
            <Form className="mt-2 md:grid md:grid-cols-3 gap-5">
              <div className="col-span-1">
                <Input
                  inputType="formik"
                  name="street"
                  id="street"
                  type="text"
                  placeholder="Улица/Микрорайон"
                  className="font-montserrat md:w-full md:h-11 mr-6 rounded-2xl"
                />
              </div>

              <div className="col-span-1">
                <Input
                  inputType="formik"
                  name="house"
                  id="house"
                  type="text"
                  placeholder="Дом"
                  className="font-montserrat md:w-full md:h-11 mr-6 rounded-2xl"
                />
              </div>
              <div className="col-span-1">
                <Input
                  inputType="formik"
                  name="flat"
                  id="flat"
                  type="text"
                  placeholder="Квартира"
                  className="font-montserrat md:w-full md:h-11 rounded-2xl"
                />
              </div>
              <div className="col-span-3">
                <Input
                  inputType="formik"
                  name="phone"
                  id="phone"
                  type="text"
                  placeholder="Номер телефона"
                  mask="+7 (999)-999-9999"
                  className="font-montserrat md:w-full block md:h-11 rounded-2xl"
                />
              </div>
              <div className="col-span-3">
                <Input
                  inputType="formik"
                  name="date"
                  id="date"
                  type="date"
                  placeholder="Дата доставки"
                  className="font-montserrat md:w-full block md:h-11 rounded-2xl"
                />
              </div>
              <div className="col-span-3">
                <TextArea
                  name="comment"
                  id="comment"
                  placeholder="Комментарий"
                  className="h-28 rounded-2xl border-none"
                />
              </div>
              <div className="col-span-1">
                <Button
                  className="font-montserrat font-bold text-2xl rounded-2xl bg-primary"
                  disabled={!isValid}>
                  Заказать
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </FormComponent>
  );
};

export default ApplicationForm;
