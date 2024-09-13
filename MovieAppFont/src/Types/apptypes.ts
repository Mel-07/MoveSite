// seriesList 

interface TmdbSeriesListResponse  {
  page: number;
  results: TmdbSeries[];
  total_pages: number;
  total_results: number;
};
interface TmdbSeries {
  adult: boolean;
  backdrop_path: string|null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string|null;
  vote_average: number;
  vote_count: number;
};

// movieList

interface TmdbMoviesListResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
};
interface TmdbMovie {
  adult: boolean;
  backdrop_path: string|null;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string|null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

// upcoming movie/series

interface TmdbUpcoming {
  dates: DatesUpcoming;
  page: number;
  results: (TmdbMovie | TmdbSeries)[];
  total_pages: number;
  total_results: number;
}
interface DatesUpcoming{
  maximum: string; 
  minimum: string;
}

type MedianItems = TmdbMoviesListResponse | TmdbSeriesListResponse|TmdbUpcoming;
type TmdbMovie_TmdbSeries = Array<TmdbMovie|TmdbSeries>
//  single Details Series
interface TmdbTVShowDetail {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  tagline: string;
  type: string;
  status: string;
  adult: boolean;
  backdrop_path: string | null;
  created_by: CreatedBy[];
  credits: Credits;
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode;
  next_episode_to_air: Episode | null;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  recommendations: TVShowList;
  reviews: Reviews;
  seasons: Season[];
  similar: TVShowList;
  spoken_languages: SpokenLanguage[];
  vote_average: number;
  vote_count: number;
}

// Created By
interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  profile_path: string | null;
}

// Episode
interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
}

// Genre
interface Genre {
  id: number;
  name: string;
}

// Credits (Cast and Crew)
interface Credits {
  cast: Casts[];
  crew: Crew[];
}

interface Casts {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  original_name: string | null;
  known_for_department:string|null;
}

interface Crew {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

// Production Company
interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

// Production Country
interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

// Spoken Language
interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

// Similar and Recommendations
interface TVShowList {
  page: number;
  results: TmdbSeries[];
  total_pages: number;
  total_results: number;
}


// Season
interface Season {
  id: number;
  name: string;
  episode_count: number;
  season_number: number;
  air_date: string;
  poster_path: string | null;
}

// Reviews
interface Reviews {
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
}

// Single Details Movie
interface TmdbMovieDetail {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: BelongsToCollection | null;
  budget: number;
  credits: Credits;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  recommendations: MovieRecommendations;
  release_date: string;
  revenue: number;
  reviews: Reviews;
  runtime: number | null;
  similar: MovieRecommendations;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// Belongs to Collection
interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

// Credits (Cast and Crew)
interface Credits {
  cast: Casts[];
  crew: Crew[];
}

// Genre
interface Genre {
  id: number;
  name: string;
}

// Production Company
interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

// Production Country
interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

// Spoken Language
interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

// Recommendations and Similar Movies
interface MovieRecommendations {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}


// Reviews
interface Reviews {
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
}

// Combined Type
type TmdbTVShowAndMovieResponse = TmdbMovieDetail |TmdbTVShowDetail;

export type {
    TmdbMovie,
    TmdbMoviesListResponse,
    TmdbSeries,
    TmdbSeriesListResponse,
    TmdbUpcoming,
    MedianItems,
    TmdbMovie_TmdbSeries,
    TmdbMovieDetail,
    TmdbTVShowDetail,
    TmdbTVShowAndMovieResponse,
    Genre,
    TVShowList,
    MovieRecommendations,
    Casts
}