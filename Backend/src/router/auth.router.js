import express from 'express'
import { userregister } from "../controller/authController.js";


export const authRouter = express.Router()

authRouter.post("/registered", userregister);