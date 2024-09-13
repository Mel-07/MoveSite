import H1 from "../Heading/H1"
import Grid from "../Shared/components/Grid";
import {
  TmdbMovie_TmdbSeries,

} from "../../Types/apptypes";
interface Props {
  items: TmdbMovie_TmdbSeries
}
function Recommend({ items }: Props){
  return (
    <section>
      <H1 fontSize="2rem" text="Recommended" fontFamily="font-big_Shoulders" />
      <Grid items={items} />
    </section>
  );
}

export default Recommend
