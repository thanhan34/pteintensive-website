import { useState } from 'react';

interface UseFirebaseOperationResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  execute: (...args: any[]) => Promise<void>;
}

export function useFirebaseOperation<T>(
  operation: (...args: any[]) => Promise<T>,
  options = { showLoading: false }
): UseFirebaseOperationResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (...args: any[]) => {
    try {
      setError(null);
      if (options.showLoading) {
        setIsLoading(true);
      }
      const result = await operation(...args);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, execute };
}
