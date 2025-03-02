import { Save } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit"

const myState = {
    //  userLoggedIn: {email:"", password:"", name:"נעמה שריר", status:1}
    userLoggedIn: null,
    playbackToOrder: null
}

const UserSlice = createSlice({
    name: "MyUser",
    initialState: myState,
    reducers: {
        onUserLoggedIn: (state, action) => {
            state.userLoggedIn = action.payload;
        },
        onUserRegistered: (state, action) => {
            state.userLoggedIn = action.payload;
        },
        onUserLoggedOut:(state)=>{
            state.userLoggedIn = null;
        },
        // פונקציה שאיתה אני אשמור את הפלייבק
        savePlaybackToOrder: (state, action) => {
            state.playbackToOrder = action.payload;
        }
    }
})
export const { onUserLoggedIn, onUserRegistered, onUserLoggedOut, savePlaybackToOrder } = UserSlice.actions;
export default UserSlice.reducer;