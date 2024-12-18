import { useState } from 'react';

interface UseFirebaseActionResult<T, Args extends unknown[]> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  execute: (...args: Args) => Promise<void>;
}

export function useFirebaseAction<T, Args extends unknown[] = unknown[]>(
  action: (...args: Args) => Promise<T>
): UseFirebaseActionResult<T, Args> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (...args: Args) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await action(...args);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, execute };
}
