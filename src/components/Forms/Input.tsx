import { ErrorMessage, Field } from 'formik';
import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import ReactInputMask from 'react-input-mask';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  inputType: 'formik' | 'default';
  label?: string;
  mask?: string;
};

const CONSTANT_CLASSNAMES = 'py-2 px-4 bg-white text-sm rounded-md';

export const Input: FC<Props> = (props) => {
  return (
    <div className="flex flex-col space-y-1">
      {props.label && (
        <label htmlFor={props.id} className="font-roboto">
          {props.label}
        </label>
      )}
      {props.inputType === 'formik' ? (
        <Field
          {...props}
          className={`${CONSTANT_CLASSNAMES} ${props.className}`}
          component={props.mask ? ReactInputMask : 'input'}
        />
      ) : (
        <input {...props} className={`${CONSTANT_CLASSNAMES} ${props.className}`} />
      )}
      <ErrorMessage component={'div'} name={props.name!} className="text-xs text-red-500" />
    </div>
  );
};
