import { ErrorMessage, Field } from 'formik';
import { FC, InputHTMLAttributes } from 'react';
import ReactInputMask from 'react-input-mask';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputType: 'formik' | 'default';
  label?: string;
  mask?: string;
  id: string;
  name: string;
  className?: string;
}

const CONSTANT_CLASSNAMES = 'py-2 px-4 bg-white text-sm rounded-md w-full border border-gray-200';

export const Input: FC<Props> = ({ inputType = 'default', ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      {props.label && (
        <label htmlFor={props.id} className="font-montserrat">
          {props.label}
        </label>
      )}
      {inputType === 'formik' ? (
        props?.mask ? (
          <Field
            name={props.name}
            render={({ field }: { field: any }) => {
              return (
                <ReactInputMask
                  {...field}
                  id={props.name}
                  mask={props.mask}
                  placeholder={props.placeholder}
                  className={`${CONSTANT_CLASSNAMES} ${props.className}`}
                />
              );
            }}
          />
        ) : (
          <Field
            {...props}
            className={`${CONSTANT_CLASSNAMES} ${props.className}`}
            component={'input'}
          />
        )
      ) : (
        <input {...props} className={`${CONSTANT_CLASSNAMES} ${props.className}`} />
      )}
      <ErrorMessage component={'div'} name={props.name!} className="text-xs text-red-500" />
    </div>
  );
};
