
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
import { usePostBookmarkMutation } from "../../../app_state/Query/movie";
/* the Bookmark when clicked should get all the data of a movie {
id and media type} to be sent and stored in the backend  */
interface Props extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  item:
    | TmdbMovie
    | TmdbSeries
    | TopRatedMovies
    | TopRatedSeries
  booked: TmdbMovie[] | [];
  media_type?: string;
}

interface Details {
  item: TmdbMovie | TmdbSeries | TopRatedMovies | TopRatedSeries | ({ media_type: string } & TopRatedMovies)
    | ({ media_type: string } & TopRatedSeries);
  booked: TmdbMovie[] | [];
}

function BookmarkIcon({
  className = "",
  item,
  booked,
  media_type,
  ...props
}: Props) {
  const [addBookmark, result] = usePostBookmarkMutation();

  /* --> function to send request to movie_back_end  <-- */

  const postBookmarkDetails = async ({ item, booked }: Details) => {
    const bookedV = booked;
    if (!item || !bookedV) {
      console.error("Item is not defined.");
      return;
    }

    if (checkBooked(item, bookedV)) {
      console.log('present')
    } else {
      if (media_type) {
        addBookmark({ ...item, media_type });
      } else {
        addBookmark(item);
      }
      
    }
    // try {
    //   const res = await fetch(`http://localhost:8000/bookmark`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //     method: "POST",
    //     body: JSON.stringify(item),
    //   });
    //   const data = await res.json();

    //   console.log(data);
    // } catch (error) {
    //   const errorMessage = error as Error;
    //   console.error(errorMessage.message);
    // }
    console.log(result);
  };

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
      onClick={async () => await postBookmarkDetails({ item, booked })}
    >
      <FaRegBookmark />
    </button>
  );
}

export default BookmarkIcon;