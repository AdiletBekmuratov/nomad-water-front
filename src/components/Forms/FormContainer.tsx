import { FC, ReactNode, DetailedHTMLProps, FormHTMLAttributes } from 'react';
import { Form, Formik } from 'formik';
import { Button } from './Button';

type Props = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
  children: ReactNode;
  initialValues: Object;
  validationSchema: Object;
  buttonName: string;
};

export const FormContainer: FC<Props> = (props) => {
  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}>
      {({ isValid }) => (
        <Form className={props.className}>
          {props.children}
          <Button disabled={!isValid}>{props.buttonName}</Button>
        </Form>
      )}
    </Formik>
  );
};
