import express from 'express';
import { deleteMessages, getchat, getmessages, sendMessage, } from '../controller/chat.Controller.js';
import { authUser } from '../middleware/autth.middleware.js';

const chatRouter = express.Router();

chatRouter.post("/message", authUser, sendMessage);   
chatRouter.get("/getchat", authUser, getchat);   
chatRouter.get("/getmessages/:chatid", authUser, getmessages);   
chatRouter.delete("/deleteMessages/:chatid", authUser, deleteMessages);   


export default chatRouter;