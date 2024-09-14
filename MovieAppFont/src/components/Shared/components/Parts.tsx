import Grid from "./Grid"
import { TmdbMovie,TmdbSeries } from "../../../Types/apptypes";
import H1 from "../../Heading/H1";
interface Props {
  items: TmdbMovie[]|TmdbSeries[],
  part:string,
  rating?:boolean,
  median_type?:string
}
function Parts({items,part,rating=false,median_type}:Props) {
  return (
    <section className=" my-[2rem]">
      <H1 fontSize="1.8rem" text={part} fontFamily="font-big_Shoulders" />
      <Grid median_type={median_type} rating={rating} items={items} />
    </section>
  );
}

export default Parts