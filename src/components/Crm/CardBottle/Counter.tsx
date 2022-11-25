import React from 'react';

export const Counter = ({ counter, setCounter }) => {
  const onPlusClick = () => setCounter(counter + 1);
  const onMinusClick = () => setCounter(counter - 1);

  return (
    <div className={``}>
      <button className={`bg-white p-3 rounded-full cursor-pointer `} onClick={onMinusClick}>
        -
      </button>
      <span className={`mx-1`}>{counter}</span>
      <button className={`bg-white p-3 rounded-2xl cursor-pointer`} onClick={onPlusClick}>
        +
      </button>
    </div>
  );
};
