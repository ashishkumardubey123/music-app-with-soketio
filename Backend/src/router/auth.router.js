import express from 'express'
import { userregister, userlogin , logout} from "../controller/auth.Controller.js";
import { registerValidation , validetor} from "../validators/auth.validetor.js";
const authRouter = express.Router();

authRouter.post("/registered",   registerValidation, validetor,  userregister);
authRouter.post("/userlogin", userlogin);
authRouter.post("/logout", logout);


export default authRouter;