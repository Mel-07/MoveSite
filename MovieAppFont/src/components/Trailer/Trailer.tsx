import { TmdbMovieUpcoming } from "../../Types/apptypes";
import H1 from "../Heading/H1";
import Skeleton from "react-loading-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import { FaPlay } from "react-icons/fa6";
import './trailer.scss'
import { checkMovieType, getFullDate } from "../../helpers/functions";

interface Props {
  upcoming: TmdbMovieUpcoming[];
}

function Trailer({upcoming}:Props) {
  return (
    <section className="trailer-container">
      <H1
        fontSize="2rem"
        text="Latest Trailer"
        fontFamily="font-big_Shoulders"
      />
      <Swiper
        wrapperTag="ul"
        tag="section"
        spaceBetween={30}
        slidesPerView={"auto"}
        className="back-drop-container"
        freeMode={true}
        modules={[Navigation, FreeMode]}
        navigation={true}
      >
        {upcoming.length > 0
          ? upcoming.map((items) => (
              <SwiperSlide
                tag="li"
                key={items.id}
                className="trailer-aspect-ratio  trailer"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w342/${items.backdrop_path})`,
                }}
              >
                <div className="trailer-content">
                  <FaPlay className="play " />
                  <div className=" description">
                    <span>{checkMovieType(items, undefined, true)}</span>
                    <span>{getFullDate(items)}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))
          : Array.from({ length: 12 }).map((_, i) => (
              <SwiperSlide
                key={i}
                className="trailer-aspect-ratio  trailer "
                tag="li"
              >
                <Skeleton
                  key={i}
                  baseColor="#0b0b0b"
                  className="skeleton-width-height"
                  containerClassName="trailer-aspect-ratio"
                  highlightColor="#2c2c2c"
                />
              </SwiperSlide>
            ))}
      </Swiper>
    </section>
  );
}

export default Trailer
