import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: ReactNode;
};

const EditCard: FC<Props> = ({ children }) => {
  return <div className="mt-3 w-10/12 md:w-11/12 bg-white mx-auto rounded-2xl p-5">{children}</div>;
};

export default EditCard;
