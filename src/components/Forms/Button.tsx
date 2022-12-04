import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  children: ReactNode;
  buttonColor?: string;
  textColor?: string;
};

export const Button: FC<Props> = (props) => {
  return (
    <button
      {...props}
      className={`${props.textColor ? props.textColor : 'text-white'} ${
        props.buttonColor ? props.buttonColor : 'bg-dark-blue font-roboto'
      } py-2 rounded-lg w-full disabled:bg-gray-300 ${props.className}`}>
      {props.children}
    </button>
  );
};
