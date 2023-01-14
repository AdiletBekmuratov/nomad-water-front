import { ICounter } from '@/assets/types/types';
import { FC } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

export const Counter: FC<ICounter> = ({ counter = 1, setCounter }) => {
  const onPlusClick = () => setCounter(++counter);
  const onMinusClick = () => setCounter(--counter);

  return (
    <div className={`flex items-center justify-between gap-3 w-40 lg:w-52 `}>
      <button onClick={onMinusClick}>
        <AiOutlineMinusCircle className={`w-8 h-8`} />
      </button>
      <span className={`font-medium text-lg`}>{counter}</span>{' '}
      <button onClick={onPlusClick}>
        <AiOutlinePlusCircle className={`w-8 h-8`} />
      </button>
    </div>
  );
};
