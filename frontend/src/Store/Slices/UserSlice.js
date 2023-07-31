import { createSlice } from "@reduxjs/toolkit";
import { checkLoginStatus } from "../../Utils/LoginStatus";

const initialState = {
    isLoggedIn : checkLoginStatus(),
}

const UserSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
       setIsLoggedIn : (state, action) => {
            state.isLoggedIn = action.payload;
       }
    }
})

export const {setIsLoggedIn} = UserSlice.actions;

export default UserSlice.reducer;