import { useCallback, useEffect, useState } from 'react';

interface UseStorageInternalParams {
  key: string;
  defValue?: string | number | (() => any);
  storage?: Storage;
}

const useStorageInternal = ({
  key,
  defValue,
  storage = window.localStorage,
}: UseStorageInternalParams) => {
  const [value, setValue] = useState(() => {
    const jsonValue = storage.getItem(key);

    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }

    return defValue instanceof Function ? defValue() : defValue;
  });

  useEffect(() => {
    if (value === undefined) {
      storage.removeItem(key);
      return;
    }

    storage.setItem(key, JSON.stringify(value));
  }, [key, storage, value]);

  const removeValue = useCallback(() => setValue(undefined), []);

  return { value, setValue, removeValue };
};

export const useLocalStorage = ({ key, defValue }: UseStorageInternalParams) =>
  useStorageInternal({ key, defValue });

export const useSessionStorage = ({ key, defValue }: UseStorageInternalParams) =>
  useStorageInternal({ key, defValue, storage: window.sessionStorage });
