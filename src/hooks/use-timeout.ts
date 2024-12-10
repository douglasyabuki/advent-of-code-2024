import { useEffect, useRef } from "react";

export const useTimeout = (callback: VoidFunction, delay: number | null) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = setTimeout(() => {
      callbackRef.current();
    }, delay);

    return () => clearTimeout(id);
  }, [delay]);
};
