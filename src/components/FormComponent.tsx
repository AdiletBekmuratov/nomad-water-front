import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const FormComponent: FC<Props> = (props) => {
  return <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">{props.children}</div>;
};

export default FormComponent;
