import { Casts } from "../../Types/apptypes";
import H1 from "../Heading/H1"
import { Swiper, SwiperSlide } from "swiper/react";
import {  FreeMode } from "swiper/modules";
import user from '../../assets/images/user.svg'
import'./Cast.scss'
interface Props{
  casts:Casts[]
}
function Cast({casts}:Props) {
  return (
    casts && (
      <section className=" my-[2rem]">
        <H1 text="Top Cast" fontSize="1.8rem" fontFamily="font-big_Shoulders" />
        <Swiper
          wrapperTag="ul"
          tag="section"
          spaceBetween={5}
          slidesPerView={"auto"}
          freeMode={true}
          modules={[FreeMode]}
          className=" cast-container"
        >
          {casts &&
            casts.map((cast) => (
              <SwiperSlide key={cast.id} tag="li" className="cast-items">
                <div className="cast-inner-container">
                  <div className=" cast-img-container">
                    <img
                      className=" cast-img"
                      src={
                        cast.profile_path !== null
                          ? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${cast.profile_path}`
                          : `${user}`
                      }
                      alt=""
                    />
                  </div>

                  <div className="cast-details">
                    <p>{cast.name}</p>
                    <p>{cast.character}</p>
                    <p>{cast.known_for_department}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
    )
  );
}

export default Cast