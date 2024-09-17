import  { ChangeEvent, KeyboardEvent,Dispatch,SetStateAction } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "../styles/search.scss";
import {  TmdbMoviesListResponse, TmdbSeriesListResponse } from "../../../Types/apptypes";


interface Props{
  text:string|null,
  setText:Dispatch<SetStateAction<string|null>>,
  search:()=>Promise<void>,
  searchResult:unknown,
}


  function Search({
    text,
    setText,search,
    searchResult
  }:Props) {
   const result = searchResult as TmdbMoviesListResponse| TmdbSeriesListResponse|null;
    return (
      <>
        <form
          onKeyDown={(e: KeyboardEvent<HTMLFormElement>) => {
            if (e.code === "Enter") {
              e.preventDefault();
              if (text && text?.length >= 3) search();
            }
          }}
          className=" search-form"
        >
          <button
            type="button"
            onClick={() => {
              if (text && text?.length >= 3) search();
            }}
            className="search-btn"
          >
            <FaMagnifyingGlass color="#e1e1e1" />
          </button>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
            value={typeof text === "string" ? text : ""}
            type="text"
            className="search-input"
            name="search"
            id="search-movies"
            placeholder="Search movies or shows..."
          />
        </form>
        {result && (
          <div>Found {result?.results?.length} results for '{text}'</div>
        )}
      </>
    );
  }

  export default Search
