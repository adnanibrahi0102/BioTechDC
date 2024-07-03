import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false,
    user:null,
    accessToken:null,
    refreshToken:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status = true,
            state.user = action.payload.user,
            state.accessToken=action.payload.accessToken,
            state.refreshToken=action.payload.refreshToken
        },
        logout:(state , action)=>{
            state.status = false,
            state.user = null,
            state.accessToken=null,
            state.refreshToken=null
        }
    }
})

export const {login,logout} = authSlice.actions;

export default authSlice.reducer;