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
    <div className={`flex flex-col  md:flex-row pt-4 gap-6 md:gap:0`}>
      <div
        className={`flex sm:flex-1 items-center justify-items-start mt-6 sm:mt-0 px-5 xl:mr-48 py-3 rounded-3xl bg-white`}>
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
            className={`w-full border-none`}
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
      <div className={`flex gap-4 `}>
        <div
          className={`flex items-center justify-center py-2 px-4 rounded-2xl bg-white cursor-pointer`}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.33 6H14.67C17.99 6 19.34 8.35 17.69 11.22L16.95 12.5C16.77 12.81 16.44 13 16.08 13H7.92C7.56 13 7.23 12.81 7.05 12.5L6.31 11.22C4.66 8.35 6.01 6 9.33 6Z"
              fill="#023646"
            />
            <path
              d="M8.79 14H15.22C15.61 14 15.85 14.42 15.65 14.75L15.01 15.85C13.36 18.72 10.64 18.72 8.99 15.85L8.35 14.75C8.16 14.42 8.4 14 8.79 14Z"
              fill="#023646"
            />
          </svg>
          <span>Вода</span>
        </div>
        <div
          className={`flex items-center justify-center px-4 rounded-2xl bg-white opacity-50 cursor-pointer`}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.33 6H14.67C17.99 6 19.34 8.35 17.69 11.22L16.95 12.5C16.77 12.81 16.44 13 16.08 13H7.92C7.56 13 7.23 12.81 7.05 12.5L6.31 11.22C4.66 8.35 6.01 6 9.33 6Z"
              fill="#023646"
            />
            <path
              d="M8.79 14H15.22C15.61 14 15.85 14.42 15.65 14.75L15.01 15.85C13.36 18.72 10.64 18.72 8.99 15.85L8.35 14.75C8.16 14.42 8.4 14 8.79 14Z"
              fill="#023646"
            />
          </svg>
          <span>Оборудование</span>
        </div>
        <div
          className={`flex items-center justify-center px-4 rounded-2xl bg-white opacity-50 cursor-pointer`}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.33 6H14.67C17.99 6 19.34 8.35 17.69 11.22L16.95 12.5C16.77 12.81 16.44 13 16.08 13H7.92C7.56 13 7.23 12.81 7.05 12.5L6.31 11.22C4.66 8.35 6.01 6 9.33 6Z"
              fill="#023646"
            />
            <path
              d="M8.79 14H15.22C15.61 14 15.85 14.42 15.65 14.75L15.01 15.85C13.36 18.72 10.64 18.72 8.99 15.85L8.35 14.75C8.16 14.42 8.4 14 8.79 14Z"
              fill="#023646"
            />
          </svg>
          <span>Услуги</span>
        </div>
      </div>
    </div>
  );
};
