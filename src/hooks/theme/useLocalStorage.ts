import { useEffect, useState } from "react";
const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(() => {
    const storedValue =
      typeof window !== "undefined" ? window.localStorage.getItem(key) : "";
    return storedValue ? storedValue : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
