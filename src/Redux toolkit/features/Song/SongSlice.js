import { createSlice } from "@reduxjs/toolkit"

const myState={
    song1:"תפילת כלה"
}

const SongSlice=createSlice({
    name: "MySongs",
    initialState: myState,
    retucers: {
        addSong: (state)=>{
            state.song1++;
        },
        lessSong: (state)=>{
            state.song1--;

        }
    }
})
export const{addSong, lessSong}=SongSlice.actions;
export default SongSlice.reducer;