import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  children: ReactNode;
};

const buttonStyle =
  'text-white bg-dark-blue py-4 rounded-lg font-roboto w-full disabled:bg-gray-300';

export const Button: FC<Props> = (props) => {
  return (
    <button {...props} className={`${buttonStyle} ${props.className}`}>
      {props.children}
    </button>
  );
};
