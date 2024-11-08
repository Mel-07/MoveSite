import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State, AllResults, TmdbMovie } from "../../Types/apptypes";
const initialState:State= {
    allResults:[],
    allBookmarks:[]
}

export const movieSlice = createSlice({
  name: "movieslice",
  initialState,
  reducers: {
    setAllResults(state, action: PayloadAction<AllResults[] | []>) {
      (state.allResults = [...action.payload]);
    },
    setAllBookmarks(state, action: PayloadAction<TmdbMovie[] | []>) {
        console.log(state.allBookmarks = [...action.payload])
    },
  },
});

export const {setAllResults,setAllBookmarks} = movieSlice.actions;