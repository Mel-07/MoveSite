
import { FaRegBookmark } from "react-icons/fa6";
import '../styles/bookmark-icon.scss'
import { HTMLAttributes } from "react";
import { TmdbMovie, TmdbSeries, } from "../../../Types/apptypes";
/* the Bookmark when clicked should get all the data of a movie {
id and media type} to be sent and stored in the backend  */
interface Props extends HTMLAttributes<HTMLButtonElement> {
    className?:string,
    item:TmdbMovie | TmdbSeries
}

function BookmarkIcon({ className = "",item, ...props }: Props) {

  /* --> function to send request to movie_back_end  <-- */

  const postBookmarkDetails = async () =>{
    try {
      const res = await fetch(`http://localhost:8000/bookmark`,{
        headers:{
          "Content-Type":"Application/json"
        },
        method:'POST',
        body:JSON.stringify({...item})
      });

      if(!res.ok){
        throw new Error("Not Successful")
      }
      const data = await res.json();

      console.log(data)
    } catch (error) {

      const errorMessage = error as Error;

      console.log(errorMessage.message)
      console.error(error)
    }

  }



  return (
    <button
      {...props}
      type="button"
      className={`bookmark-icon-container ${className}`}
      aria-label="Bookmark"
      onClick={postBookmarkDetails}
    >
      <FaRegBookmark />
    </button>
  );
}

export default BookmarkIcon;