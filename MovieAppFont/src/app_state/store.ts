import { configureStore } from "@reduxjs/toolkit";
import { movieApi,backendApi } from "./Query/movie";
import {movieSlice} from "./app_logic/state"
import { setupListeners } from "@reduxjs/toolkit/query";


export const store = configureStore({
    reducer:{
        [movieApi.reducerPath]:movieApi.reducer,
        [backendApi.reducerPath]:backendApi.reducer,
        movieSlice:movieSlice.reducer
    },
    middleware:(getDefaultMiddleWare)=>{
        return getDefaultMiddleWare({
          serializableCheck: false,
        }).concat(movieApi.middleware, backendApi.middleware);
    }
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;