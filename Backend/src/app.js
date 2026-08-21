import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import authRouter from "./router/auth.router.js"
import morgan from "morgan";
import chatRouter from "./router/chat.router.js";
dotenv.config();
const app = express();

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);




app.use("/api/auth", authRouter)
app.use("/api/chats", chatRouter)

app.get('/', (req, res) => {
  res.send("💨server is running ")
})


export default app;