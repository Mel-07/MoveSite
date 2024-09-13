import Hero from "../components/Hero-section/Hero";
import Parts from "../components/Shared/components/Parts";
import Cast from "../components/Crew/Cast";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Results, useFetch } from "../utils/useFetch";
import { newdata } from "../data/moviType&Ids";
import { joinAndRandomizeArray, limitNumberOfCast } from "../helpers/functions";
import { TmdbTVShowAndMovieResponse } from "../Types/apptypes";
const key = import.meta.env.VITE_MOVIE_KEY;
const getRandomIndex = joinAndRandomizeArray(true,
    Array.from({ length: newdata.length }).map((_, i) => i)
  )[0] as unknown;
const randomIndex =(Array.isArray(getRandomIndex)? getRandomIndex[0]: getRandomIndex);

function Title() {
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const type = searchParam.get("type");
  const [idType, setIdType] = useState<string | null>(
      id === null ? newdata[randomIndex].id.toString() : id
    );
  const [movieType, setMovieType] = useState<string | null>(
      type === null ? newdata[randomIndex].media_type : type
    );
  const [apis, setApis] = useState<string[]>([
    `https://api.themoviedb.org/3/${movieType}/${idType}?api_key=${key}&append_to_response=credits,similar,recommendations`,
  ]);

  const resultDetails: Results<TmdbTVShowAndMovieResponse> = useFetch(apis);

  const details = resultDetails[2]?.[0] as TmdbTVShowAndMovieResponse;


  return (
    <div>
      <Hero details={details} median_type={movieType} />
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
          <Parts rating={true} part="Recommend" items={details?.similar?.results || []} />
        )}
      </section>
    </div>
  );
}

export default Title;
