import { TmdbMovie, TmdbSeries, TmdbTVShowAndMovieResponse } from "../../Types/apptypes";
import { FaFilm, FaTv } from "react-icons/fa6";
import { checkMovieType } from "../../helpers/functions";
import '../../styles/general.scss'
import TitleMovie from "./TitleMovie";

interface Props {
    items:TmdbMovie|TmdbSeries|TmdbTVShowAndMovieResponse,
    font_size?:string[],
    title:boolean
}

function TitlePoster({items,font_size =['.8rem','.8rem','.8rem','.8rem'],title}:Props) {

  return (
    <div>
      <div>
        <div className="date-icon-median">
          <span
            style={{
              fontSize: font_size[1],
            }}
          >
            {checkMovieType(items, true)}
          </span>
          <span></span>
          <span>
            {checkMovieType(items) === "Movie" ? (
              <FaFilm
                style={{
                  fontSize: font_size[2],
                }}
              />
            ) : (
              <FaTv
                style={{
                  fontSize: font_size[2],
                }}
              />
            )}
          </span>
          <span
            style={{
              fontSize: font_size[3],
            }}
          >
            {checkMovieType(items)}
          </span>
        </div>
        {title && (
          <TitleMovie
            font_size={font_size[0]}
            children={checkMovieType(items, undefined, true)}
          />
        )}
      </div>
    </div>
  );
}

export default TitlePoster
