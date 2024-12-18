import { useState } from 'react';

interface UseFirebaseOperationOptions {
  showLoading?: boolean;
}

interface UseFirebaseOperationResult<T, Args extends unknown[]> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  execute: (...args: Args) => Promise<void>;
}

export function useFirebaseOperation<T, Args extends unknown[] = unknown[]>(
  operation: (...args: Args) => Promise<T>,
  options: UseFirebaseOperationOptions = { showLoading: false }
): UseFirebaseOperationResult<T, Args> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (...args: Args) => {
    try {
      setError(null);
      if (options.showLoading) {
        setIsLoading(true);
      }
      const result = await operation(...args);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, execute };
}
