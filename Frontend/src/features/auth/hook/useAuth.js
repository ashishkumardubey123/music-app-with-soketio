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
   

async function handelLogin({email , Password }){
  try{
    dispatch(setLoading(true))
    const data = await Login({email, Password})
    dispatch(setUser(data.user))
  }catch(ERROR){
     dispatch(setError(ERROR.responce.data.message|| "login Faild"))
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
    dispatch(setError(error.responce.data.message || "User not found. Something went wrong. "))
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