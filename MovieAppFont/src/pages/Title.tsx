import Hero from "../components/Hero-section/Hero";
import Parts from "../components/Shared/components/Parts";
import Cast from "../components/Crew/Cast";
import { useSearchParams } from "react-router-dom";
import { limitNumberOfCast } from "../helpers/functions";
import { TmdbTVShowAndMovieResponse } from "../Types/apptypes";
import { useGetTitleQuery } from "../app_state/Query/movie";
const key = import.meta.env.VITE_MOVIE_KEY;

function Title() {
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const type = searchParam.get("type");
  const {data} = useGetTitleQuery({type,id,key},{refetchOnMountOrArgChange:true})

  


  const details: TmdbTVShowAndMovieResponse =
    data as TmdbTVShowAndMovieResponse;


  return (
    <>
      <Hero details={details} median_type={type} />
      <section className="px-4">
        <Cast casts={limitNumberOfCast(details?.credits?.cast)} />
        {details?.recommendations?.results.length > 0 && (
          <Parts
          rating={false}
          part="Similar"
            items={details?.recommendations?.results || []}
          />
        )}
        {details?.similar?.results.length > 0 && (
          <Parts 
          median_type={type as string} 
          rating={false} part="Recommend" 
          items={details?.similar?.results || []} 
          />
        )}
      </section>
    </>
  );
}

export default Title;
