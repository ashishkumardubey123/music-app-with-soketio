import axios from "axios"

const api = axios.create({
  baseURL :"http://localhost:300",
  withCredentials:true
})

export async function regester({username, email, password }){
  const response = await axios.post("/api/auth/registered",{username, email, password})
   return response.data
}
export async function Login({ email, password }){
  const response = await axios.post("/api/auth/userlogin",{ email, password})
   return response.data
}


export async function Getuser(){
  const response = await axios.get("/api/auth/get-me")
  return response.data
  

}