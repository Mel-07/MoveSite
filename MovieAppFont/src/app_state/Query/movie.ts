import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Trending, TmdbSeries, TopRatedMovies, TopRatedSeries,TmdbUpcoming,TmdbTopRatedMovie,TmdbTopRatedSeries,BookmarkList, TmdbTVShowAndMovieResponse, TmdbMovie} from "../../Types/apptypes";
import { FormDataProfile } from "../../Types/fromType";


export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.themoviedb.org/3/`,
  }),
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    /* get Trending */
    getTrending: builder.query<Trending, string>({
      query: (key) => ({ url: `trending/all/day?api_key=${key}` }),
    }),
    /* get upcoming movie */
    getUpcoming: builder.query<TmdbUpcoming, string>({
      query: (key) => ({ url: `movie/upcoming?api_key=${key}` }),
    }),
    /* get recommended movies */
    getRecommendationsMovie: builder.query<
      TmdbUpcoming,
      { key: string; movie: number }
    >({
      query: ({ key, movie }) => ({
        url: `movie/${movie}/recommendations?api_key=${key}`,
      }),
    }),
    /* get top-rated movies */
    getTopRated: builder.query<
      TmdbTopRatedMovie | TmdbTopRatedSeries,
      { page: number | string; type: "tv" | "movie"; key: string }
    >({
      query: ({ page, type, key }) => ({
        url: `/${type}/top_rated?api_key=${key}&page=${page}&language=en-US`,
      }),
    }),

    /* get title */

    getTitle: builder.query<
      TmdbTVShowAndMovieResponse,
      { type: string | null; id: string | null; key: string }
    >({
      query: ({ type, id, key }) => ({
        url: `${type}/${id}?api_key=${key}&append_to_response=credits,similar,recommendations`,
      }),
    }),
  }),
});

export const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000`,
  }),
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getBookmark: builder.query<BookmarkList, void>({
      query: () => ({
        url: `/bookmarks`,
        credentials: "include",
      }),
    }),
    postBookmark: builder.mutation<
      TmdbMovie[] | [],
      | TmdbMovie
      | TmdbSeries
      | TopRatedMovies
      | TopRatedSeries
      | ({ media_type: string } & TopRatedMovies)
      | ({ media_type: string } & TopRatedSeries)
    >({
      query: (marked) => ({
        url: "/bookmark",
        credentials: "include",
        body: marked,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getProfile: builder.query<FormDataProfile, void>({
      query: () => {
        return {
          url: "/profile",
          credentials: "include",
        };
      },
    }),
    postProfile: builder.mutation<FormDataProfile, FormDataProfile>({
      query: () => ({
        url: "/profile",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),
  }),
});

export const{useGetTitleQuery,useGetTrendingQuery,useGetUpcomingQuery,useGetRecommendationsMovieQuery,useGetTopRatedQuery} = movieApi;
export const {useGetBookmarkQuery,usePostBookmarkMutation} = backendApi