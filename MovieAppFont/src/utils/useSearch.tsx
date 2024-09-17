import { useCallback, useEffect, useState } from "react";
const key = import.meta.env.VITE_MOVIE_KEY;

function useSearch<T,>() {
  const [text, setText] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

   const search = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=${key}&query=${text}&language=en-US`
          );

          if (!res.ok) {
            throw new Error("Failed to fetch results");
          }

          const data = await res.json();
          setSearchResult(data);
        } catch (error) {
          setError(error as Error);
        } finally {
          setIsLoading(false);
        }
      },[text])
      useEffect(() => {
    const reset = ()=>{
         setSearchResult(null)
         setIsLoading(true)
         setError(null)
    }
    if (!text || text.length < 3) {
        reset()
        return
    };
    const delayFetch = setTimeout(() => {
      search();
    }, 1500); 

    return () => clearTimeout(delayFetch);
  }, [text,search]);


  return {text, setText, searchResult, searchError:error, searchIsLoading:isLoading,search};
}

export default useSearch