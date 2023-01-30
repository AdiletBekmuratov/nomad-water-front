import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: ReactNode;
};

const EditCard: FC<Props> = (props) => {
  return (
    <div className={`w-full lg:h-48 mt-5 lg:mt-0 bg-white mx-auto rounded-2xl p-5 ${props.className}`}>
      {props.children}
    </div>
  );
};

export default EditCard;
