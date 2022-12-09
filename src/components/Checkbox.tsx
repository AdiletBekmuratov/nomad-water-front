import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label?: string;
  labelClass?: string;
};

const Checkbox: FC<Props> = (props) => {
  return (
    <div>
      <input
        type="checkbox"
        id={props.id}
        name={props.name}
        {...props}
        className={`rounded-full text-dark-blue border-2 checked:border-dark-blue bg-inherit ${props.className}`}
      />
      {props.label && (
        <label
          htmlFor={props.id}
          className={`font-montserrat font-medium text-sm ml-2.5 ${
            props.labelClass ? props.labelClass : 'text-gray-600'
          }`}>
          {props.label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
