 import { createSlice } from "@reduxjs/toolkit";

 const initialState = {
    firstName : "",
    lastName : "",
    email : "",
    image:"",
    _id:"",
 };

 export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginRedux:(state,action)=>{
           
           // state.user=action.payload.data
            state._id=action.payload.data._id
            state.firstName=action.payload.data.firstName
            state.lastName=action.payload.data.lastName
            state.email=action.payload.data.email
            state.image=action.payload.data.image
        },
        logOutRedux:(state,action)=>{
            state._id="";
            state.firstName="";
            state.lastName="";
            state.email="";
            state.image="";
        }    }
 })

 export default userSlice.reducer
 export const{loginRedux,logOutRedux} = userSlice.actions 