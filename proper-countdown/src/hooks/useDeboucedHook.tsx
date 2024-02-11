import { useEffect, useState } from "react";

const useDeboucedHook = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  useEffect(() => {
    let timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
};

export default useDeboucedHook;
