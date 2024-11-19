import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State, AllResults, TmdbMovie } from "../../Types/apptypes";
const initialState:State= {
    allResults:[],
    allBookmarks:[],
    page:1,
    type:'movie',
    isBooked:false,
    formData:{
      image:null,
      userName:'',
      email:'',
      password:''
    }
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
    },
    setIsBooked (state,action:PayloadAction<boolean>){
      const isBooked = action.payload
      state.isBooked = isBooked
    },
    setProfileData (state,action:PayloadAction<{
      userName:string,
      email:string,
      image:string|null,
      password:string
    }>){

      
      const {userName,email,image, password} = action.payload;
      if(userName || email || image){
        state.formData = {
          userName,
          email,
          image,
          password
        }
      }
    },
    setFormData (state,action:PayloadAction<{
      name:string,
      value:string
    }>){
      const {name,value} = action.payload

      if(name == 'userName'){
        state.formData[name] = value;
      }
      if(name == 'email'){
        state.formData[name] = value
      }
      if(name == 'password'){
        state.formData[name] = value
      }
    }
  },
});

export const {setFormData,setProfileData,setAllResults,setAllBookmarks,setPageNumber,setMediaType,setIsBooked} = movieSlice.actions;