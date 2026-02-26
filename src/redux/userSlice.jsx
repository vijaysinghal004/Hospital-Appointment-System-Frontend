import { createSlice } from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        doctors:[],
        appointments:[]
    },
    reducers:{
        setUserData:(state,action)=>{
        state.userData=action.payload
        },
       
        setdoctors:(state,action)=>{
            state.doctors=action.payload
        },
         setAppointments:(state,action)=>{
            state.appointments=action.payload
        }
    }
})

export const {setUserData , setdoctors,setAppointments}=userSlice.actions
export default userSlice.reducer