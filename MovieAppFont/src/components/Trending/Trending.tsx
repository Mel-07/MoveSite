import { TmdbMovie_TmdbSeries,TopRatedMovies,TopRatedSeries,TmdbMovie,TmdbSeries,TmdbTVShowAndMovieResponse} from "../../Types/apptypes";
import { Link } from "react-router-dom";
import H1 from "../Heading/H1";
import Skeleton from "react-loading-skeleton";
import TitlePoster from "../Title/TitlePoster";
import Rating from "../Shared/components/Rating";
import trendinBackUpBg from"../../assets/images/trendingtransparent.png"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import './trending.scss'
import "react-loading-skeleton/dist/skeleton.css";
import { checkMovieType } from "../../helpers/functions";
import BookmarkIcon from "../Shared/components/BookmarkIcon";


interface TrendingProps {
  trending: TmdbMovie_TmdbSeries;
}

function Trending({trending}:TrendingProps) {
  return (
    <section className="trending-container">
      <H1 fontSize="2rem" text="Trending" fontFamily="font-big_Shoulders" />
      <Swiper
        wrapperTag="ul"
        tag="section"
        spaceBetween={20}
        slidesPerView={"auto"}
        className="poster-container"
        freeMode={true}
        modules={[Navigation, FreeMode]}
        navigation={true}
      >
        {trending.length > 0
          ? trending.map((items) => (
              <SwiperSlide
                tag="li"
                key={items.id}
                className="poster-aspect-ratio  poster"
                style={{
                  backgroundImage: items.poster_path
                    ? `url(https://image.tmdb.org/t/p/w342/${items.poster_path})`
                    : `url(${trendinBackUpBg})`,
                  backgroundSize: !items.poster_path ? "150%" : "",
                }}
              >
                <Link
                  className="poster-link"
                  to={`/app/title?id=${items.id}&type=${checkMovieType(items)
                    ?.split(" ")[0]
                    .toLowerCase()}`}
                >
                  <TitlePoster
                    title={true}
                    items={
                      items as
                        | TopRatedMovies
                        | TopRatedSeries
                        | TmdbMovie
                        | TmdbSeries
                        | TmdbTVShowAndMovieResponse
                    }
                  />
                </Link>
                <Rating rate={items.vote_average} />
                <BookmarkIcon
                  item={
                    items as
                      | TmdbMovie
                      | TmdbSeries
                      | TopRatedMovies
                      | TopRatedSeries
                  }
                />
              </SwiperSlide>
            ))
          : Array.from({ length: 12 }).map((_, i) => (
              <SwiperSlide key={i} className="poster-aspect-ratio " tag="li">
                <Skeleton
                  key={i}
                  baseColor="#0b0b0b"
                  className="skeleton-width-height"
                  containerClassName="poster-aspect-ratio"
                  highlightColor="#2c2c2c"
                />
              </SwiperSlide>
            ))}
      </Swiper>
    </section>
  );
}

export default Trending
