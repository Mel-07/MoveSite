import H1 from "../components/Heading/H1";
import Search from "../components/Shared/components/Search";
import SearchResult from "../components/Shared/components/SearchResult";
import { FaGripfire } from "react-icons/fa6";
import { useEffect, useState } from "react";
import useSearch from "../utils/useSearch";
import Grid from "../components/Shared/components/Grid";
const key = import.meta.env.VITE_MOVIE_KEY;
import { TmdbMovie, TmdbMoviesListResponse,TmdbSeries,TmdbSeriesListResponse,SearchType} from "../Types/apptypes";
import { getPageNumberArray } from "../helpers/functions";

function TopRated() {

  const [type, setType] = useState<string>("movie");
  const [error, setError] = useState<string|null>(null);
  const [page,setPage] = useState<number|string>(1);
  const [isLoading,setIsLoading] = useState<boolean>(true);
  const [results,setResults] = useState<TmdbMoviesListResponse|TmdbSeriesListResponse|null>(null)
  const { text, setText, searchResult, searchError, searchIsLoading, search } = useSearch();

  const changeTypeMovie=()=>{
  
      setType('movie')
      setPage(1)
  }
  const changeTypeSeries = () => {
    setType("tv");
          setPage(1);

  };  

/* fetch the top-rated movies and series  */

useEffect(()=>{

  const handleFetch = async()=>{

    setIsLoading(true)

    try{
          const res = await fetch(
      `https://api.themoviedb.org/3/${type}/top_rated?api_key=${key}&page=${page}&language=en-US`
    );
    if (!res.ok){
      throw new Error('No Respond From Sever')
    }
    const results = await res.json();

    setResults(results)
    setIsLoading(false)

    console.log(results)
    }catch(err){
      const newError = err as Error;
      setError(newError.message)
    }finally{
      setIsLoading(false)
    }

  }

  handleFetch()

},[type,page])
  const mediaResults: TmdbMovie[]|TmdbSeries[] = results?.results || [];
  const pageNumber = results?.total_pages;
  const searchValue = searchResult as SearchType;

  return (
    <div className=" px-2 min-h-min">
      <Search
        text={text}
        setText={setText}
        searchResult={searchResult}
        search={search}
      />
      {searchResult ? (
        searchValue?.results.length > 0 ? (
          <SearchResult
            error={searchError}
            items={searchValue?.results}
            isLoading={searchIsLoading}
          />
        ) : searchError ? (
          <div>{searchError.message}</div>
        ) : null
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <section className=" flex items-center gap-x-2">
            <FaGripfire className=" text-[2rem] text-[#ff4500]" />
            <H1
              text="Top Rated"
              fontSize="1.8rem"
              fontFamily="font-big_Shoulders"
            />
            <div className=" bg-[#ff4500] border-[#ff4500] border-[.1rem] min-h-full gap-x-2 flex items-center">
              <button
                onClick={changeTypeMovie}
                className={`p-1 ${
                  type === "movie" && "bg-[#0b0b0b]"
                } transition-colors ease-in-out duration-200 rounded-r-md`}
              >
                Movies
              </button>
              <button
                onClick={changeTypeSeries}
                className={`p-1 ${
                  type === "tv" && "bg-[#0b0b0b]"
                } transition-colors ease-in-out duration-200 rounded-l-md`}
              >
                Tv series
              </button>
            </div>
          </section>
          <Grid median_type={type} items={mediaResults} />
          <section className="page-number-section">
            <ul className="page-number-container">
              {pageNumber &&
                isLoading === false &&
                getPageNumberArray(pageNumber).map(
                  (v) =>
                    v <= 10 && (
                      <li
                        className={`page-number ${
                          page === v && "bg-[#ff4500]"
                        }`}
                        onClick={() => setPage(v)}
                      >
                        {v}
                      </li>
                    )
                )}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}

export default TopRated
