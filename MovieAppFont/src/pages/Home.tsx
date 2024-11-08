import Trending from "../components/Trending/Trending";
import Trailer from "../components/Trailer/Trailer";
import Recommend from "../components/Recommendations/Recommend";
import Search from "../components/Shared/components/Search";
import SearchResult from "../components/Shared/components/SearchResult";
import {
/*   TmdbMovie, */
  TmdbMovie_TmdbSeries,
 /*  TmdbSeries, */
  SearchType
} from "../Types/apptypes";
import "swiper/css/navigation";
import "swiper/css";

import "swiper/css/grid";
const key = import.meta.env.VITE_MOVIE_KEY;

import useSearch from "../utils/useSearch";
import { useGetTrendingQuery,useGetUpcomingQuery,useGetRecommendationsMovieQuery} from "../app_state/Query/movie";
import {  useMemo } from "react";
import { useGetBookmarkQuery } from "../app_state/Query/movie";

function Home() {

  const {data:trendingMovie}=useGetTrendingQuery(key)
  const {data:upcomingMovie} = useGetUpcomingQuery(key);
  const { data: recommendation } = useGetRecommendationsMovieQuery({
    key,
    movie: 124905,
  });

  const { data:bookmark} = useGetBookmarkQuery()

  const { text, setText, searchResult, searchError, searchIsLoading, search }=useSearch();
  const homePageError = false
  const trending: TmdbMovie_TmdbSeries = useMemo(()=>{ return trendingMovie?.results || []},[trendingMovie]);
  const upcoming = upcomingMovie;
  const upcomingList = useMemo(()=>{ return upcoming?.results || []},[upcoming]);
  const recommendedMovies = useMemo(()=>{ return recommendation?.results || []},[recommendation])

  const searchValue = searchResult as SearchType

  // useEffect(()=>{
  //   dispatch(setAllResults([...trending,...upcomingList,...recommendedMovies]))
  // },[trending,upcomingList,recommendedMovies,dispatch])

return (
  <>
    <div className="px-2">
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
      ) : homePageError ? (
        <div>{homePageError}</div>
      ) : (
        <div>
          <Trending
            bookmark={bookmark?.newBookmarkLists || []}
            trending={trending}
          />
          <Trailer upcoming={upcomingList} />
          <Recommend
            items={recommendedMovies}
            bookmark={bookmark?.newBookmarkLists || []}
          />
        </div>
      )}
    </div>
  </>
);

}

export default Home;
