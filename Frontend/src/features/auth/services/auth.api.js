import axios from "axios"

const api = axios.create({
  baseURL :"http://localhost:3000",
  withCredentials:true
})

export async function regester({username, email, password }){
  const response = await api.post("/api/auth/registered",{username, email, password})
   return response.data
}
export async function Login({ email, password }){
  const response = await api.post("/api/auth/userlogin",{ email, password})
   return response.data
}


export async function Getuser(){
  const response = await api.get("/api/auth/get-me")
  return response.data
  

}