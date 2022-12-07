import { ErrorMessage, Field } from 'formik';
import { FC, InputHTMLAttributes, ReactNode } from 'react';
import ReactInputMask from 'react-input-mask';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputType: 'formik' | 'default';
  label?: string;
  mask?: string;
  id: string;
  name?: string;
  className?: string;
  placeholder?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const CONSTANT_CLASSNAMES = 'py-2 px-4 bg-white text-sm  w-full border border-gray-200';

export const Input: FC<Props> = ({ inputType = 'default', ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      {props.label && (
        <label htmlFor={props.id} className="font-montserrat text-dark-blue text-xs font-semibold">
          {props.label}
        </label>
      )}
      <label
        htmlFor={props.id}
        className={`${CONSTANT_CLASSNAMES} ${props.className} flex space-x-2 items-center cursor-text`}>
        {props?.leftIcon}
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
                    className="w-full outline-none"
                  />
                );
              }}
            />
          ) : (
            <Field
              {...props}
              className="w-full outline-none ring-0 border-none"
              component={'input'}
            />
          )
        ) : (
          <input {...props} className="w-full outline-none" />
        )}
        {props?.rightIcon}
      </label>
      {inputType === 'formik' && (
        <ErrorMessage component={'div'} name={props.name!} className="text-xs text-red-500" />
      )}
    </div>
  );
};
