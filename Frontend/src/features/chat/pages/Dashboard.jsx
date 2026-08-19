import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useChat } from '../hooks/usechat'

function Dashboard() {

  const chat = useChat()
  const {user} = useSelector((state) => state.auth)

  useEffect(()=>{
    chat.initializeSocketConnection()
  },[])
   console.log(user)
  return (
    <div>
     {/* <h1> {user.username} This is my new dashboard function component. </h1> */}
     <h1> This is my new dashboard function component. </h1>
    </div>
  )
}

export default Dashboard
