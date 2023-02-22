import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useTimer(
  callback: () => void,
): [number | null, Dispatch<SetStateAction<number | null>>] {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!timeLeft) return;
    if (timeLeft === 0) {
      setTimeLeft(null);
      callback();
    }

    const interval = setInterval(() => setTimeLeft((prev) => prev! - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  return [timeLeft, setTimeLeft];
}
