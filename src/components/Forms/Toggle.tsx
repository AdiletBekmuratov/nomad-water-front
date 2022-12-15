import { Field } from 'formik';
import { FC, InputHTMLAttributes } from 'react';

interface IToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  name?: string;
  inputType: 'formik' | 'default';
}

export const Toggle: FC<IToggleProps> = ({ id, inputType, label, name, ...props }) => {
  return (
    <div className="flex space-x-2">
      <label htmlFor={id} className="relative h-6 w-12 cursor-pointer">
        {inputType === 'default' ? (
          <input {...props} type="checkbox" id={id} className="peer sr-only" name={name} />
        ) : (
          <Field {...props} type="checkbox" id={id} className="peer sr-only" name={name} />
        )}

        <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-medium-blue"></span>

        <span className="absolute inset-0 m-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-6"></span>
      </label>
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
