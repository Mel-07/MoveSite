import { FaRegBookmark } from "react-icons/fa6";
import "../styles/bookmark-icon.scss";
import { HTMLAttributes } from "react";
import {
  TmdbMovie,
  TmdbSeries,
  TopRatedMovies,
  TopRatedSeries,
} from "../../../Types/apptypes";
import { checkBooked } from "../../../helpers/functions";
import {
  useDeletePostMutation,
  useGetBookmarkQuery,
  usePostBookmarkMutation,
} from "../../../app_state/Query/movie";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  item: TmdbMovie | TmdbSeries | TopRatedMovies | TopRatedSeries;
  media_type?: string;
}

function BookmarkIcon({ className = "", item, media_type, ...props }: Props) {
  const [addBookmark] = usePostBookmarkMutation();
  const [removeBookmark,{
    data
  }] = useDeletePostMutation();
  const { data: bookedGotten, refetch } = useGetBookmarkQuery();
  const booked = bookedGotten?.newBookmarkLists ?? [];


  const postBookmarkDetails = async () => {
    try {
      if (checkBooked(item, booked)) {
        const title =
          "title" in item ? item.title : "name" in item ? item.name : null;
        const bookedItem = booked.find(
          (book) => book.id === item.id && book.title === title
        );
        console.log({
          id:bookedItem?.id,
          title
        });
       removeBookmark({id:bookedItem? bookedItem.id : null,title})
       console.log("yes");
        if (bookedItem) {
                  // await removeBookmark({ id: bookedItem.id, title }).unwrap();
                  logger();
                  // Refetch to confirm deletion
                  await refetch();
        }
      } else if(!checkBooked(item, booked)){
        console.log("no");
        if (media_type) {
          await addBookmark({ ...item, media_type }).unwrap();
        } else {
          await addBookmark(item).unwrap();
        }
        await refetch();
      }
    } catch (error) {
      console.error("Error in bookmark operation:", error);
    }
  };

  function logger(){
     console.log(data);
  }

  return (
    <button
      {...props}
      type="button"
      className={`${
        checkBooked(item, booked) ? "bookmarked" : "not-bookmarked"
      } bookmark-icon-container ${className}`}
      aria-label="Bookmark"
      onClick={postBookmarkDetails}
    >
      <FaRegBookmark />
    </button>
  );
}

export default BookmarkIcon;
