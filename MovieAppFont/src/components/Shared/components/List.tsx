import { Link } from "react-router-dom";
import TitlePoster from "../../Title/TitlePoster";
import { TmdbMovie, TmdbSeries, } from "../../../Types/apptypes";
import Rating from "./Rating";
import backUpBg from '../../../assets/images/movie-background-collage.jpg'
import BookmarkIcon from "./BookmarkIcon";
interface Props {
  to: string;
  item: TmdbMovie | TmdbSeries ;
  rating?: boolean;
}
function List({to,item,rating}:Props){
  return (
    <li
      style={{
        backgroundImage: item.backdrop_path ?`url(https://image.tmdb.org/t/p/w342//${item.backdrop_path})` : `url(${backUpBg})`,
      }}
      className="list-aspect-ratio grid-items"
    >
      <Link className="grid-link-items" to={to}>
      <TitlePoster title={true} font_size={['1.1rem','.9rem','1rem','1rem']} items={item}/>
      </Link>
      {rating && <Rating rate={item.vote_average}/>}
      <BookmarkIcon item={item}/>
    </li>
  );
}

export default List;
