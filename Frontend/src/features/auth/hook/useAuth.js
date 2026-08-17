import { useDispatch } from "react-redux";
import {regester,Login,Getuser} from "../services/auth.api"
import {setUser,setLoading, setError} from "../auth.slice"


export function useAuth(){

  const dispatch = useDispatch()

  async function handleregister({email,username, password}){
    try{
      dispatch(setLoading(true))
        
      const data = await regester({email,username, password})


    }catch(err){
       dispatch(setError(err.response?.data?.message || "Your registration has failed for some reason. "))
    }finally{
      dispatch(setLoading(false))
    }
  }

}