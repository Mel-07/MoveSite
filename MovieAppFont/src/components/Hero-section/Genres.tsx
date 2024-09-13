
import { Genre } from "../../Types/apptypes";
interface Props {
  item: Genre[]
}

function Genres({item}:Props) {

  return (
    <div className="genres">
      {item && (<span className="genres-heading">Genres:</span>)}
      <ul className="genres-container">
        {item && item.map((genres) => <li className="genres-items" key={genres?.id}>{genres?.name}</li>)}
      </ul>
    </div>
  );
}

export default Genres;
