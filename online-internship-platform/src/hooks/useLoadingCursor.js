import { useCallback } from 'react';

const useLoadingCursor = () => {
  const startLoading = useCallback(() => {
    window.dispatchEvent(new CustomEvent('loading-start'));
  }, []);

  const stopLoading = useCallback(() => {
    window.dispatchEvent(new CustomEvent('loading-end'));
  }, []);

  const withLoading = useCallback(async (asyncFunction) => {
    startLoading();
    try {
      const result = await asyncFunction();
      return result;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  return {
    startLoading,
    stopLoading,
    withLoading
  };
};

export default useLoadingCursor; 