import { configureStore } from "@reduxjs/toolkit";
import SongSlice from "../features/Song/SongSlice";
import UserSlice from "../features/User/UserSlice";
import AdvertisingSlice from "../features/Advertising/AdvertisingSlice";

export const store = configureStore({

    reducer:{
            song: SongSlice,
            user:UserSlice,
            advertising:AdvertisingSlice

    }
})