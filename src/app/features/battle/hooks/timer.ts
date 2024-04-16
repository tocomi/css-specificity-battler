import { useEffect, useState } from 'react';

export const useTimer = (durationMs: number) => {
  const [timeLeft, setTimeLeft] = useState(durationMs);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            setIsRunning(false);
            return 0;
          }
          return prev - 50;
        });
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  return {
    timeLeft,
    start: () => setIsRunning(true),
    stop: () => setIsRunning(false),
    reset: () => {
      setTimeLeft(durationMs);
      setIsRunning(false);
    },
  };
};
