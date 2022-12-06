import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: ReactNode;
};

export const Card: FC<Props> = (props) => {
  return (
    <div
      className={`relative block rounded-md border-gray-200 p-5 shadow-xl bg-white w-full  max-w-screen-2xl ${props.className}`}>
      {props.children}
    </div>
  );
};
