import { useState } from 'react';

interface UseFirebaseActionResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  execute: (...args: any[]) => Promise<void>;
}

export function useFirebaseAction<T>(
  action: (...args: any[]) => Promise<T>
): UseFirebaseActionResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (...args: any[]) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await action(...args);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, execute };
}
