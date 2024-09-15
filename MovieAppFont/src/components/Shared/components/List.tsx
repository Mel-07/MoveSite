import { Link } from "react-router-dom";
import TitlePoster from "../../Title/TitlePoster";
import { TmdbMovie, TmdbSeries, } from "../../../Types/apptypes";
import Rating from "./Rating";
interface Props {
  to: string;
  item: TmdbMovie | TmdbSeries ;
  rating?: boolean;
}
function List({to,item,rating}:Props){
  console.log(item)
  return (
    <li
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w342//${item.backdrop_path})`,
      }}
      className="list-aspect-ratio grid-items"
    >
      <Link className="grid-link-items" to={to}>
      <TitlePoster title={true} font_size={['1.1rem','.9rem','1rem','1rem']} items={item}/>
      </Link>
      {rating && <Rating rate={item.vote_average}/>}
    </li>
  );
}

export default List;
