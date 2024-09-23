
import { FaRegBookmark } from "react-icons/fa6";
import '../styles/bookmark-icon.scss'
import { HTMLAttributes } from "react";
/* the Bookmark when clicked should get all the data of a movie {
id and media type} to be sent and stored in the backend  */
interface Props extends HTMLAttributes<HTMLButtonElement> {
    className?:string
}

function BookmarkIcon({ className = "", ...props }: Props) {
  return (
    <button
      {...props}
      type="button"
      className={`bookmark-icon-container ${className}`}
      aria-label="Bookmark"
    >
      <FaRegBookmark />
    </button>
  );
}

export default BookmarkIcon;