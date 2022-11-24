import { FC, DetailedHTMLProps, TextareaHTMLAttributes } from 'react';
import { ErrorMessage, Field } from 'formik';

type Props = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
  label?: string;
};

const CONSTANT_CLASSNAMES = 'py-2 px-4 bg-white text-sm rounded-md w-full';

export const TextArea: FC<Props> = (props) => {
  return (
    <div className="flex flex-col space-y-1">
      {props.label && (
        <label htmlFor={props.id} className={`font-montserrat`}>
          {props.label}
        </label>
      )}
      <Field
        className={`${CONSTANT_CLASSNAMES} border border-gray-200 ${props.className}`}
        component="textarea"
        placeholder={props.placeholder}
        {...props}
      />
      <ErrorMessage component={'div'} name={props.name!} className="text-xs text-red-500" />
    </div>
  );
};
