import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  children: ReactNode;
};

export const Button: FC<Props> = (props) => {
  return (
    <button
      {...props}
      className={`text-white bg-dark-blue py-4 rounded-lg font-roboto w-full disabled:bg-gray-300 ${props.className}`}>
      {props.children}
    </button>
  );
};
