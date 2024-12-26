import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State, AllResults, TmdbMovie } from "../../Types/apptypes";
import { validateUserName,validateEmail,validatePassWord } from "../../helpers/vaildators";
const initialState:State= {
    allResults:[],
    allBookmarks:[],
    page:1,
    type:'movie',
    isBooked:false,
    formData:{
      image:null,
      userName:{
        userName:'',
        userNameIsValid:false
      },
      email:{
        email:'',
        emailIsValid:false
      },
      password:{
        password:'',
        passwordIsValid:false
      }
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
          userName:{
            userName,
            userNameIsValid:true
          },
          email:{
            email,
            emailIsValid:true
          },
          image,
          password:{
            password,
            passwordIsValid:true
          }
        }
      }
    },
    setFormData (state,action:PayloadAction<{
      name:string,
      value:string
    }>){
      const {name,value} = action.payload

      if(name == 'userName'){
        state.formData[name].userNameIsValid = validateUserName(value)
        state.formData[name][name] = value;
      }
      if(name == 'email'){
        state.formData[name].emailIsValid = validateEmail(value)
        state.formData[name][name] = value
      }
      if(name == 'password'){
        state.formData[name].passwordIsValid = validatePassWord(value)
        state.formData[name][name] = value
      }
    }
  },
});

export const {setFormData,setProfileData,setAllResults,setAllBookmarks,setPageNumber,setMediaType,setIsBooked} = movieSlice.actions;