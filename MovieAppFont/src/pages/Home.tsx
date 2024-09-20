import Trending from "../components/Trending/Trending";
import Trailer from "../components/Trailer/Trailer";
import Recommend from "../components/Recommendations/Recommend";
import Search from "../components/Shared/components/Search";
import SearchResult from "../components/Shared/components/SearchResult";
import {
  MedianItems,
/*   TmdbMovie, */
  TmdbMovie_TmdbSeries,
 /*  TmdbSeries, */
  TmdbUpcoming,
  SearchType
} from "../Types/apptypes";
import { useFetch, Results } from "../utils/useFetch";
import "swiper/css/navigation";
import "swiper/css";

import "swiper/css/grid";
/* import { joinAndRandomizeArray } from "../helpers/functions"; */
import {  useState } from "react";
const key = import.meta.env.VITE_MOVIE_KEY;
const ids = {
  movie: 124905, // Godzilla 2014
  series: 94997, //House of dragon
}
import useSearch from "../utils/useSearch";

function Home() {

  const [apis] = useState<string[]>([
    `https://api.themoviedb.org/3/trending/all/day?api_key=${key}`,
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`,
    `https://api.themoviedb.org/3/tv/${ids["series"]}/recommendations?api_key=${key}`,
    `https://api.themoviedb.org/3/movie/${ids["movie"]}/recommendations?api_key=${key}`,
  ]);
  const result: Results<MedianItems> = useFetch<MedianItems>(apis);
  const { text, setText, searchResult, searchError, searchIsLoading, search }=useSearch();
  const homePageError = result[1];
  const trending: TmdbMovie_TmdbSeries = result[2][0]?.results || [];
  const upcoming = result[2][1] as TmdbUpcoming;
  const upcomingList = upcoming?.results || [];
/*   const recommendedSeries =     result[2][2]?.results||[]; */
  const recommendedMovies = result[2][3]?.results || [];

  const searchValue = searchResult as SearchType

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
          <SearchResult error={searchError} items={searchValue?.results} isLoading={searchIsLoading} />
        ) : searchError ? (
          <div>{searchError.message}</div>
        ) : null
      ) : homePageError ? (
        <div>{homePageError.message}</div>
      ) : (
        <div>
          <Trending trending={trending} />
          <Trailer upcoming={upcomingList} />
          <Recommend items={recommendedMovies} />
        </div>
      )}
    </div>
  </>
);

}

export default Home;
