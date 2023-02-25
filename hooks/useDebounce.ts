import { useState, useEffect } from 'react';

export default function useDebounce<T>(value: T, intervalMs: number = 2e3): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), intervalMs);
    return () => clearTimeout(timeout);
  }, [intervalMs, value]);

  return debouncedValue;
}
