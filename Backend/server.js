import app from "./src/app.js"
import dbconnect from "./src/config/dbconfig.js";
import http from "http"
import { initSocket } from "./src/sockets/serevr.socket.js";
 
const httpserver = http.createServer(app)
initSocket(httpserver)

dbconnect();
 

const port = process.env.PORT || 3000;

httpserver.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})