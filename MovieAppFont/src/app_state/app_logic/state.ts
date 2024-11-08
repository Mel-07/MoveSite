import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State, AllResults, TmdbMovie } from "../../Types/apptypes";
const initialState:State= {
    allResults:[],
    allBookmarks:[],
    page:1,
    type:'movie'
}

export const movieSlice = createSlice({
  name: "movieslice",
  initialState,
  reducers: {
    setAllResults(state, action: PayloadAction<AllResults[] | []>) {
      (state.allResults = [...action.payload]);
    },
    setAllBookmarks(state, action: PayloadAction<TmdbMovie[] | []>) {
        state.allBookmarks = [...action.payload]
    },
    setPageNumber (state, action:PayloadAction<number>) {
      const page = action.payload
      state.page = page
    },
    setMediaType (state,action:PayloadAction<'movie'|'tv'>){
      const type = action.payload
      state.type = type
    }
  },
});

export const {setAllResults,setAllBookmarks,setPageNumber,setMediaType} = movieSlice.actions;