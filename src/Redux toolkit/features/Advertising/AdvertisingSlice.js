import { Save } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit"

const myState = {
    //  userLoggedIn: {email:"", password:"", name:"נעמה שריר", status:1}
    ArrAdvertising: []
}

const AdvertisingSlice = createSlice({
    name: "MyArrAdvertising",
    initialState: myState,
    reducers: {
        saveArrAdvertising: (state, action) => {
            state.ArrAdvertising = action.payload;
        },
        deleteFromArrAdvertisingById: (state, action) => {

            state.ArrAdvertising=state.ArrAdvertising.filter((x)=>{return x.idadvertising != action.payload});
        },
        addToArrAdvertising:(state, action)=>{
            
            state.ArrAdvertising = [...state.ArrAdvertising,action.payload];
            console.log(state.ArrAdvertising)
        }
    }
})
export const { saveArrAdvertising, deleteFromArrAdvertisingById, addToArrAdvertising } = AdvertisingSlice.actions;
export default AdvertisingSlice.reducer;