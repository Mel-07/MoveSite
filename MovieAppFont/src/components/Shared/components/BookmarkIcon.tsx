
import { FaRegBookmark } from "react-icons/fa6";
import '../styles/bookmark-icon.scss'
import { HTMLAttributes, } from "react";
import {
  TmdbMovie,
  TmdbSeries,
  TopRatedMovies,
  TopRatedSeries,
} from "../../../Types/apptypes";
import { checkBooked } from "../../../helpers/functions";
/* the Bookmark when clicked should get all the data of a movie {
id and media type} to be sent and stored in the backend  */
interface Props extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  item: TmdbMovie | TmdbSeries | TopRatedMovies | TopRatedSeries;
  booked: TmdbMovie[]|[];
}


function BookmarkIcon({ className = "",item,booked, ...props }: Props) {

    // const result: Results<MedianItems> = useFetch<MedianItems>(apis);
    // const trending: TmdbMovie_TmdbSeries = result[2][0]?.results || [];
    // const upcoming = result[2][1] as TmdbUpcoming;
    // const upcomingList = upcoming?.results || [];
    // const recommendedMovies = result[2][3]?.results || [];

    // console.log([...trending, ...upcomingList, ...recommendedMovies]);

  /* --> function to send request to movie_back_end  <-- */

  const postBookmarkDetails = async () =>{
        if (!item) {
          console.error("Item is not defined.");
          return;
        }
    try {
      const res = await fetch(`http://localhost:8000/bookmark`,{
        headers:{
          "Content-Type":"application/json"
        },
        credentials:'include',
        method:'POST',
        body:JSON.stringify(item),
      });
      const data = await res.json();

      console.log(data)
    } catch (error) {

      const errorMessage = error as Error;
      console.error(errorMessage.message)
    }

  }



  return (
    <button
      {...props}
      type="button"
      className={`${
        item && booked && checkBooked(item, booked)
          ? " bookmarked"
          : "not-bookmarked"
      } bookmark-icon-container ${className}`}
      aria-label="Bookmark"
      onClick={postBookmarkDetails}
    >
      <FaRegBookmark />
    </button>
  );
}

export default BookmarkIcon;