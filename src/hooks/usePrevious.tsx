import { useRef, useEffect } from 'react';

export const usePrevious = <T,>(value: T) => {
  const previousValueRef = useRef<T>();

  useEffect(() => {
    previousValueRef.current = value;
  }, [value]);

  return previousValueRef.current;
};
