
import Search from "../components/Shared/components/Search";
import SearchResult from "../components/Shared/components/SearchResult";
import { SearchType, } from "../Types/apptypes";
import { useGetBookmarkQuery } from "../app_state/Query/movie";
import useSearch from "../utils/useSearch";
import DisplayBookmark from "../components/Bookmarks/DisplayBookmark";
import { useEffect } from "react";
import { useAppDispatch} from "../app_state/hooks";
import { setAllBookmarks } from "../app_state/app_logic/state";

function BookMark() {
  const { text, setText, searchResult, searchError, searchIsLoading, search } = useSearch();
  const dispatch = useAppDispatch()
  const {data,error} = useGetBookmarkQuery();  

  useEffect(()=>{
    if(data !== undefined){
          if (data?.newBookmarkLists.length > 0) {
            dispatch(setAllBookmarks(data?.newBookmarkLists));
          }
          else{
            dispatch(setAllBookmarks([]))
          }
    }else{
      dispatch(setAllBookmarks([]));
    }

  },[dispatch,data])
 

  const searchValue = searchResult as SearchType

  return (
    <div className="px-2 ">
      <Search
        text={text}
        setText={setText}
        search={search}
        searchResult={searchResult}
      />
      {searchResult ? (
        searchValue?.results.length > 0 ? (
          <SearchResult
            error={searchError}
            isLoading={searchIsLoading}
            items={searchValue?.results}
          />
        ) : searchError ? (
          <div>{searchError.message}</div>
        ) : null
      ) : error ? (
        <div>BookMark Error</div>
      ) : (
        <div>
          {/**
           * send bookmark array to DisplayBookmark
           */}
          <DisplayBookmark  bookmarkNumber={data?.numberOfBookmark} data={data?.newBookmarkLists||[]} />
        </div>
      )}
    </div>
  );
}

export default BookMark;
