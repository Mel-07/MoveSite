import { useState } from "react";
import Search from "../components/Shared/components/Search";
import SearchResult from "../components/Shared/components/SearchResult";
import { SearchType } from "../Types/apptypes";
import useSearch from "../utils/useSearch";

function BookMark() {
  const { text, setText, searchResult, searchError, searchIsLoading, search } = useSearch();
  const [error] = useState<Error|null>(null);

    const searchValue = searchResult as SearchType

  return (
    <div className="px-2">
      <Search
        text={text}
        setText={setText}
        search={search}
        searchResult={searchResult}
      />
      {
        searchResult ?(
          searchValue?.results.length > 0 ? (
         <SearchResult  error={searchError} isLoading={searchIsLoading} items={searchValue?.results}/> 
        ): searchError ? (<div>{searchError.message}</div>) :null
        ): error ? (<div>BookMark Error</div>):(
          <div>
            bookmark
          </div>
        )

      }
    </div>
  );
}

export default BookMark;
