import { useDispatch } from "react-redux";
import {regester,Login,Getuser} from "../services/auth.api"
import {setUser,setLoading, setError} from "../auth.slice"


export function useAuth(){

  const dispatch = useDispatch()

  async function handleregister({email,username, password}){
    try{
      dispatch(setLoading(true))
        
      await regester({email,username, password})


    }catch(err){
       dispatch(setError(err.response?.data?.message || "Your registration has failed for some reason. "))
    }finally{
      dispatch(setLoading(false))
    }
  }
   

async function handelLogin({email, password}){
  try{
    dispatch(setLoading(true))
    const data = await Login({email, password})
    dispatch(setUser(data.user))
      return data
  }catch(ERROR){
dispatch(setError(ERROR.response?.data?.message || "Login failed"))
    return ERROR
  }finally{
    dispatch(setLoading(false))
  }
}


async function handelGetme(){
  try{
 dispatch(setLoading(true))
 const data = await Getuser()
 dispatch(setUser(data.user))
    
  }catch(error){
    dispatch(setError(error.response?.data?.message || "User not found. Something went wrong. "))
  }finally{
    dispatch(setLoading(false))
  }
}

return{
  handleregister,
  handelLogin,
  handelGetme
}

}