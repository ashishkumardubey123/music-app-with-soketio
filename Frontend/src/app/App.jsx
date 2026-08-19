import { RouterProvider } from "react-router"
import { router } from "./app.routes"
import { useAuth } from "../features/auth/hook/useAuth"
import {  useLayoutEffect , useEffect } from "react"

function App() {
const auth = useAuth()
 useEffect(() => {
   auth.handelGetme()

 },[])

  return (
    <>



    <RouterProvider router={router} />
      
    </>
  )
}

export default App
