import { createSlice } from "@reduxjs/toolkit";



export const userSlice = createSlice({
  name: "user",
  initialState:{
    value: []
  },
  reducers:{

    userRegister:(state)=>{
      state.value += 1
    },


    userLogin:(state)=>{
    state.value -= 1
    },
    
    userLogout:(state)=>{
    state.value -= 1
    }
    

  }
  
})

export const {userRegister,userLogin, userLogout} = userSlice.actions
export default userSlice.reducer