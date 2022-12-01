import React from 'react';

export const Search = ({ value, setValue }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setValue('');
    inputRef.current?.focus();
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <div
      className={`flex sm:flex-1 items-center justify-items-start mt-6 sm:mt-0 px-5 xl:mr-48
        py-3 rounded-3xl bg-white`}>
      <svg
        className={`cursor-pointer mr-3`}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.45614 11.7895C9.40165 11.7895 11.7895 9.40165 11.7895 6.45614C11.7895 3.51062 9.40165 1.1228 6.45614 1.1228C3.51062 1.1228 1.1228 3.51062 1.1228 6.45614C1.1228 9.40165 3.51062 11.7895 6.45614 11.7895Z"
          stroke="#292D32"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.7369 14.3157L11.2281 11.2281"
          stroke="#292D32"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className={`w-full relative `}>
        <input
          onChange={onChangeInput}
          className={`w-full outline-none`}
          ref={inputRef}
          value={value}
          placeholder="Поиск ..."
        />
        {value && (
          <svg
            width={18}
            height={18}
            className={`opacity-60 absolute top-0 right-0 cursor-pointer`}
            onClick={onClickClear}
            data-name="Livello 1"
            id="Livello_1"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg">
            <title />
            <path d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z" />
            <path d="M92.12,35.79a3,3,0,0,0-4.24,0L64,59.75l-23.87-24A3,3,0,0,0,35.88,40L59.76,64,35.88,88a3,3,0,0,0,4.25,4.24L64,68.25l23.88,24A3,3,0,0,0,92.13,88L68.24,64,92.13,40A3,3,0,0,0,92.12,35.79Z" />
          </svg>
        )}
      </div>
      
    </div>
  );
};
