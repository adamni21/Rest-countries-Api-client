import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useSessiosStorage = <T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const sessionStorage = window.sessionStorage;
  const [value, setValue] = useState<T>(() => {
    const valueFromStorage = sessionStorage.getItem(key);
    if (!valueFromStorage) return defaultValue;
    else return JSON.parse(valueFromStorage);
  });

  useEffect(
    () => window.sessionStorage.setItem(key, JSON.stringify(value)),
    [value, key]
  );

  return [value, setValue];
};

export default useSessiosStorage;
