import express from 'express';
import { sendMessage, } from '../controller/chat.Controller.js';
import { authUser } from '../middleware/autth.middleware.js';

const chatRouter = express.Router();

chatRouter.post("/message", authUser, sendMessage);   


export default chatRouter;