import H1 from "../components/Heading/H1";
import Search from "../components/Shared/components/Search";
import SearchResult from "../components/Shared/components/SearchResult";
import { FaGripfire } from "react-icons/fa6";
import { useEffect, useMemo, useState } from "react";
import useSearch from "../utils/useSearch";
import Grid from "../components/Shared/components/Grid";
const key = import.meta.env.VITE_MOVIE_KEY;
import { TopRatedSeries,TopRatedMovies,SearchType} from "../Types/apptypes";
import { getPageNumberArray } from "../helpers/functions";
import { useGetTopRatedQuery } from "../app_state/Query/movie";
import { useAppDispatch} from "../app_state/hooks";
import { setAllResults } from "../app_state/app_logic/state";

function TopRated() {

  const [type, setType] = useState<'movie'|'tv'>("movie");
  const [error] = useState<string|null>(null);
  const [page,setPage] = useState<number|string>(1);
  const [isLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
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
const {data:rate} = useGetTopRatedQuery({page,type,key})
  const mediaResults:TopRatedMovies[]| TopRatedSeries[] = useMemo(()=>{ return rate?.results || [];},[rate])
  const pageNumber = rate?.total_pages;

  useEffect(() => {
    dispatch(setAllResults([...mediaResults]));
  }, [ dispatch, mediaResults]);

  
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
