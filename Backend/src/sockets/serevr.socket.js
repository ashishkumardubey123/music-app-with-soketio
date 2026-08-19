// import {server} from "socket.io"
import { Server } from "socket.io";


let io;
export function initSocket(httpServer) {
  io = new Server(httpServer, {
     cors:{
      origin : "http://localhost:5173",
      credentials: true
     }
    
  })



console.log("Socket.io server started")
  io.on("connect", (soket)=>{
        console.log("a user connected" + soket.id)
    })
}

export function getIo(){
  if(!io){
    throw new Error("Socket.io not initialized.")
  }
  return io
}
