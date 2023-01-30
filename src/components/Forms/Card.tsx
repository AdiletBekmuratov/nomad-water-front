import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: ReactNode;
};

export const Card: FC<Props> = (props) => {
  return (
    <div
      className={`relative block rounded-md border-gray-200 p-4 shadow-xl bg-white w-full max-w-screen-lg ${props.className}`}>
      {props.children}
    </div>
  );
};
