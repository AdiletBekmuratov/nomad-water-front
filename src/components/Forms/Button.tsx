import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  children: ReactNode;
  buttonColor?: string;
  textColor?: string;
  loading?: boolean;
};

export const Button: FC<Props> = ({ loading, ...props }) => {
  return (
    <button
      {...props}
      className={`${props.textColor ? props.textColor : 'text-white'} ${
        props.buttonColor ? props.buttonColor : 'bg-dark-blue font-roboto'
      } py-2 rounded-lg w-full disabled:bg-gray-300 flex justify-center items-center ${
        props.className
      }`}>
      {props.children}
      {loading && (
        <span className="ml-2 animate-spin">
          <AiOutlineLoading3Quarters />
        </span>
      )}
    </button>
  );
};
