import Grid from "./Grid"
import { TmdbMovie_TmdbSeries } from "../../../Types/apptypes";

interface Props {
  items: TmdbMovie_TmdbSeries;
  rating?: boolean;
  error:Error|null,
  isLoading:boolean
}
function SearchResult({ items, rating=true, error,isLoading}:Props)

{
    if(isLoading){
        return <div>Result is loading</div>
    }

  return error ? (
    <div>{error.message}</div>
  ) : (
    <Grid rating={rating} items={items} />
  );
}

export default SearchResult