import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Checkbox: FC<Props> = (props) => {
  return (
    <input
      type="checkbox"
      className={`rounded-full text-dark-blue border-2 border-dark-blue bg-inherit ${props.className}`}
    />
  );
};

export default Checkbox;
