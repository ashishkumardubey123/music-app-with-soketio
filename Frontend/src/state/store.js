import {configureStore} from '@reduxjs/toolkit';
import userSliceReducer from './Slices/counterSlice';


export const  store = configureStore(

reducer:{
 
  user: userSliceReducer

}
)