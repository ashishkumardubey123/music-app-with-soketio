import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import authRouter from "./router/auth.router.js"
import morgan from "morgan";
dotenv.config();
const app = express();

app.use(cookieParser());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/api/auth", authRouter)

app.get('/', (req, res) => {
  res.send("💨server is running ")
})


export default app;