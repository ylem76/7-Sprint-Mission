import { useState, useCallback } from 'react';

// useAsync훅은 비동기 처리 함수를 인자로 받아서
// pending상태, 에러, try catch로 예외처리를 한 함수를 리턴한다.
// 받아서 쓸 때에는
// const [isLoading, isError, asyncFunction] = useAsync(asyncFunction)
// 위와 같이 받아서 씀
function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = useCallback(
    async (...args) => {
      try {
        setError(null);
        setPending(true);
        const result = await asyncFunction(...args);
        return result;
      } catch (error) {
        setError(error);
        return;
      } finally {
        setPending(false);
      }
    },
    [asyncFunction]
  );

  return [pending, error, wrappedFunction];
}

export default useAsync;
