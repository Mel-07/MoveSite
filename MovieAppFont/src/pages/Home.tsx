import Trending from "../components/Trending/Trending";
import Trailer from "../components/Trailer/Trailer";
import Recommend from "../components/Recommendations/Recommend";
import {
  MedianItems,
  TmdbMovie,
  TmdbMovie_TmdbSeries,
  TmdbSeries,
  TmdbUpcoming,
} from "../Types/apptypes";
import { useFetch, Results } from "../utils/useFetch";
import "swiper/css/navigation";
import "swiper/css";

import "swiper/css/grid";
import { joinAndRandomizeArray } from "../helpers/functions";
import { useState } from "react";
const key = import.meta.env.VITE_MOVIE_KEY;
const ids = {
  movie: 124905, // Godzilla 2014
  series: 94997, //House of dragon
};



function Home() {

  const [apis] = useState<string[]>([
    `https://api.themoviedb.org/3/trending/all/day?api_key=${key}`,
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`,
    `https://api.themoviedb.org/3/tv/${ids["series"]}/recommendations?api_key=${key}`,
    `https://api.themoviedb.org/3/movie/${ids["movie"]}/recommendations?api_key=${key}`,
  ]);
  const result: Results<MedianItems> = useFetch<MedianItems>(apis);
  const error = result[1];
  const trending: TmdbMovie_TmdbSeries = result[2][0]?.results || [];
  const upcoming = result[2][1] as TmdbUpcoming;
  const upcomingList = upcoming?.results || [];
  const recommendedSeries =     result[2][2]?.results||[];
  const recommendedMovies = result[2][3]?.results || [];
  const joinRecommendation = joinAndRandomizeArray<
    TmdbMovie | TmdbSeries
  >(true, recommendedMovies, recommendedSeries)[0] as unknown;
  const cover = joinRecommendation as TmdbMovie_TmdbSeries
cover.map(value=>{
    return {
      media_type:value.media_type,
      id:value.id
    };
  })


  return (
    <>
      <div className=" px-2">
        {error ? (
          <div>{error.message}</div>
        ) : (
          <div>
            <Trending trending={trending} />
            <Trailer upcoming={upcomingList} />
            <Recommend items={cover} />
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
