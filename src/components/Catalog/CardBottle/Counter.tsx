import { ICounter } from '@/types/types';
import { FC } from 'react';

export const Counter: FC<ICounter> = ({ counter, setCounter }) => {
  const onPlusClick = () => setCounter(++counter);
  const onMinusClick = () => setCounter(--counter);

  return (
    <div className={`flex items-center justify-between gap-4 sm:gap-2 lg:ml-12 xl:ml-24 `}>
      <button onClick={onMinusClick}>
        <svg
          className={`border rounded-full`}
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="20" fill="white" />
          <path d="M17.0431 20.874V19.048H22.9611V20.874H17.0431Z" fill="#023646" />
        </svg>
      </button>
      <span className={`font-medium text-lg`}>{counter}</span>
      <button onClick={onPlusClick}>
        <svg
          className={`border rounded-full`}
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="20" fill="white" />
          <path
            d="M19.0757 25.118V15.482H20.9237V25.118H19.0757ZM15.0717 21.18V19.442H24.9277V21.18H15.0717Z"
            fill="#023646"
          />
        </svg>
      </button>
    </div>
  );
};
