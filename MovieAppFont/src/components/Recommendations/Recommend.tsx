import H1 from "../Heading/H1"
import Grid from "../Shared/components/Grid";
import {
  TmdbMovie_TmdbSeries,
  TmdbMovieUpcoming,
  TmdbMovie,
} from "../../Types/apptypes";
interface Props {
  items: TmdbMovie_TmdbSeries | TmdbMovieUpcoming[];
  rating?: boolean;
  bookmark: TmdbMovie[] | [];
}
function Recommend({ items,rating=false,bookmark }: Props){
  return (
    <section>
      <H1 fontSize="2rem" text="Recommended" fontFamily="font-big_Shoulders" />
      <Grid bookmark={bookmark} rating={rating} items={items} />
    </section>
  );
}

export default Recommend
