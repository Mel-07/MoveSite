import { TmdbTVShowAndMovieResponse } from "../../Types/apptypes";
import { calculateRuntime, checkMedianType,getFullDate } from "../../helpers/functions";
import { FaFilm, FaTv } from "react-icons/fa6";

import Genres from "./Genres";
import TagLine from "./TagLine";
import OverView from "./OverView";
import Rating from "../Shared/components/Rating";
interface Props{
    items:TmdbTVShowAndMovieResponse,
    font_size?:string[],
    median_type:string|null
}
function DetailsHero({items,font_size=['.8rem','.8rem','1.2rem'],median_type}:Props) {
    return (
      items && (
        <div>
          <div className="date-type-runtime">
            <span
              style={{
                fontSize: font_size[1],
              }}
            >
              {getFullDate(items)}
            </span>
            {<span></span>}
            <span>
              {checkMedianType(median_type)
                ? (
                    <FaFilm
                      style={{
                        fontSize: font_size[2],
                      }}
                    />
                  )
                : (
                    <FaTv
                      style={{
                        fontSize: font_size[2],
                      }}
                    />
                  )}
            </span>
            {<span></span>}
            <span
              style={{
                fontSize: font_size[3],
                textWrap: "nowrap",
              }}
            >
              {items && checkMedianType(median_type)}
            </span>
            {"runtime" in items && <span></span>}
            {"runtime" in items && (
              <span className="runtime">
                {"runtime" in items && calculateRuntime(items.runtime)}
              </span>
            )}
          </div>
          <Genres item={items?.genres} />
          <TagLine tagline={items?.tagline} />
          <OverView overview={items?.overview} />
          {items?.vote_average && (
            <Rating
              style={{
                position: "relative",
              }}
              rate={items?.vote_average}
            />
          )}
        </div>
      )
    );
}

export default DetailsHero