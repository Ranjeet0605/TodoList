import {createSlice,configureStore } from "@reduxjs/toolkit"
const authSlice = createSlice({
    name:"auth",
    initialState:{user_id: "", isLoggedIn: false},
    reducers:{
        login(state){
            state.isLoggedIn=true;
        },
        logout(state){
            state.isLoggedIn=false;
        },
    },
})
export const authAcitons = authSlice.actions;

export const Store = configureStore({
    reducer:authSlice.reducer,
})