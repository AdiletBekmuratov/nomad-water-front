import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { Form, Formik } from 'formik';
import { Input } from '../Forms';
import * as yup from 'yup';

type initialValues = {
  street: string;
  entrance: string;
  flat: number;
};
type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  setIsValid?: Function;
  setIsEdited?: Function;
  isEdited?: boolean;
};

export const Accordion: FC<Props> = (props) => {
  const initialValues: initialValues = {
    street: '',
    entrance: '',
    flat: 1
  };

  const validation = yup.object().shape({
    street: yup.string().required('Поле обязательное'),
    entrance: yup.string().required('Поле обязательное'),
    flat: yup.string().required('Поле обязательное')
  });

  return (
    <>
      <div className={`w-3/4  ${props.className}`}>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={(values) => alert(JSON.stringify(values, null, 2))}>
          {({ isValid }) => (
            <Form>
              <div>
                <Input name="street" id="street" inputType="formik" label="Улица" />
              </div>
              <div className="mt-3">
                <Input name="entrance" id="entrance" inputType="formik" label="Подъезд" />
              </div>
              <div className="mt-3">
                <Input name="flat" id="flat" inputType="formik" label="Квартира" />
              </div>
              {props.setIsValid(isValid)}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
