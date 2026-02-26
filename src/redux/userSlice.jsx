import { createSlice } from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        doctors:[],
    },
    reducers:{
        setUserData:(state,action)=>{
        state.userData=action.payload
        },
       
        setdoctors:(state,action)=>{
            state.doctors=action.payload
        }
    }
})

export const {setUserData , setdoctors}=userSlice.actions
export default userSlice.reducer