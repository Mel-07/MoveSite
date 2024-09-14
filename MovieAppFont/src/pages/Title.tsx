import Hero from "../components/Hero-section/Hero";
import Parts from "../components/Shared/components/Parts";
import Cast from "../components/Crew/Cast";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { limitNumberOfCast } from "../helpers/functions";
import { TmdbTVShowAndMovieResponse } from "../Types/apptypes";
const key = import.meta.env.VITE_MOVIE_KEY;

function Title() {
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const type = searchParam.get("type");
  const [results,setResult] = useState<[]|TmdbTVShowAndMovieResponse>([]);

  useEffect(()=>{
    const getRecommendations = async ()=>{
          try {
            const res = await fetch(
              `https://api.themoviedb.org/3/${type}/${id}?api_key=${key}&append_to_response=credits,similar,recommendations`
            );

            const results = await res.json()

            console.log(results)
            setResult(results)

            if(!res.ok){
              throw new Error('Respond Not Found')
            }
          } catch (err) {
            console.log(err as Error
            )
          } finally{
            
          }
    }
    getRecommendations()
  },[id,type])


  const details = results as TmdbTVShowAndMovieResponse;


  return (
    <div>
      <Hero details={details} median_type={type} />
      <section className="px-4">
        <Cast casts={limitNumberOfCast(details?.credits?.cast)} />
        {details?.recommendations?.results.length > 0 && (
          <Parts
          rating={true}
          part="Similar"
          items={details?.recommendations?.results || []}
          />
        )}
        {details?.similar?.results.length > 0 && (
          <Parts 
          median_type={type as string} 
          rating={true} part="Recommend" 
          items={details?.similar?.results || []} 
          />
        )}
      </section>
    </div>
  );
}

export default Title;
