
import HeroTitle from "./HeroTitle";
import './hero.scss'
import { TmdbTVShowAndMovieResponse } from "../../Types/apptypes";
import { checkMovieType } from "../../helpers/functions";
import DetailsHero from "./DetailsHero";
 interface Props{
  details:TmdbTVShowAndMovieResponse,
  median_type:string|null
 }

function Hero({details,median_type}:Props) {

  

  return (
    <>
      <section
        style={{
          backgroundImage: `url('https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${details?.backdrop_path}')`,
        }}
        className=" hero"
      >
        <div className="hero-container">
          <div className="details">
            <HeroTitle
              title={
                checkMovieType(details, undefined, true) &&
                checkMovieType(details, undefined, true)
              }
              year={
                checkMovieType(details, true) &&
                `(${checkMovieType(details, true)})`
              }
            />
            <DetailsHero items={details} median_type={median_type} />
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero