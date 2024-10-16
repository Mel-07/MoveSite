import Skeleton from "react-loading-skeleton";
import CustomElement from "./CustomElement";
import List from "./List";
import "../styles/grid.scss";
import { TmdbMovie_TmdbSeries} from "../../../Types/apptypes";
interface Props {
  items: TmdbMovie_TmdbSeries;
  rating?: boolean,
  median_type?:string
}
function Grid({ items,rating=true,median_type }: Props) {
  return (
    <CustomElement className="grid-container" tag="ul">
      {items.length > 0
        ? items.map((item) => (
            <List
              rating={rating}
              item={item}
              key={item.id}
              to={`/app/title?id=${item.id}&type=${
                median_type ? median_type : item.media_type
              }`}
            />
          ))
        : Array.from({ length: 14 }).map((_, i) => (
            <Skeleton
              key={i}
              baseColor="#0b0b0b"
              className="skeleton-width-height"
              containerClassName="trailer-aspect-ratio"
              highlightColor="#2c2c2c"
            />
          ))}
    </CustomElement>
  );
}

export default Grid;
