import express from 'express'
import { userregister, userlogin , logout} from "../controller/authController.js";


export const authRouter = express.Router()

authRouter.post("/registered", userregister);
authRouter.post("/userlogin", userlogin);
authRouter.post("/logout", logout);