import express from 'express'
import { authUser } from "../middleware/autth.middleware.js";
import { userregister, userlogin, verifyemail, logout, getme } from "../controller/auth.Controller.js";
import { registerValidation, loginValidation, validetor } from "../validators/auth.validetor.js";
const authRouter = express.Router();

authRouter.post("/registered", registerValidation, validetor, userregister);
authRouter.post("/userlogin", loginValidation, validetor, userlogin);
authRouter.post("/logout", logout);
authRouter.get("/verify-email", verifyemail)
authRouter.get("/get-me", authUser, getme);


export default authRouter;