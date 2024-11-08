import { TmdbMovie } from "../../Types/apptypes"
import Grid from "../Shared/components/Grid"
import './displayBookmark.scss'

interface Props {
  data: TmdbMovie[] | [];
  bookmarkNumber:number|null|undefined,
  booked:TmdbMovie[]|[]
}

function DisplayBookmark({data,bookmarkNumber,booked}:Props) {
  /* data.length <= 0 && bookmarkNumber === null */
  if (data.length <= 0 && bookmarkNumber === null) {
    return (
      <div className="no-bookmark-container">
        <div>You Currently Don't have any Bookmarks</div>
      </div>
    );
  } else {
    return (
      <div>
        <Grid items={data} bookmark={booked} />
      </div>
    );
  }
}

export default DisplayBookmark