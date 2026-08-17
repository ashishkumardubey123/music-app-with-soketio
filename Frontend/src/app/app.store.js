import {configureStore} from "@reduxjs/toolkit";
import authRedusecer from "../features/auth/auth.slice"


export const store = configureStore({
      
  reducer:{
   auth: authRedusecer
  }
  
})