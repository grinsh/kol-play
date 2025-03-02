import { configureStore } from "@reduxjs/toolkit";
import SongSlice from "../features/Song/SongSlice";
import UserSlice from "../features/User/UserSlice";
export const store = configureStore({

    reducer:{
            song: SongSlice,
            user:UserSlice
    }
})