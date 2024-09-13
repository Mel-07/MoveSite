import { useEffect, useState } from "react";

type FetchError = Error | null;
export type Results<T> = [boolean, Error | null, T[] | []];

const useFetch = <T,>(apis: Array<string>):Results<T> => {
  const [results, setResult] = useState<T[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [error, setError] = useState<FetchError>(null);
  useEffect(() => {
    const fetcher = async () => {
      // Validate input
      if (!Array.isArray(apis)) {
        setError(new Error("Argument not type of array"));
        setLoader(false);
        return;
      }

      if (apis.length === 0) {
        setError(new Error("Array is Empty"));
        setLoader(false);
        return;
      }

      if (apis.some((api) => typeof api !== "string")) {
        setError(new Error("One or more array elements are not strings"));
        setLoader(false);
        return;
      }

      try {
        // Fetch from a single API endpoint
        if (apis.length === 1) {
          const response = await fetch(apis[0]);
          if (!response.ok) {
            throw new Error("Not Found");
          }
          const data: T = await response.json();
          setResult([data]);

          // Fetch from multiple API endpoints
        } else {
          const responses = await Promise.all(apis.map((api) => fetch(api)));
          const errors = responses.filter((res) => !res.ok);
          if (errors.length > 0) {
            throw new Error("One or more requests failed");
          }
          const datas: T[] = await Promise.all(responses.map((res) => res.json()));
          setResult(datas);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoader(false);
      }
    };

    fetcher();
  }, [apis]);

  return [loader, error, results] ;
};

export { useFetch};

