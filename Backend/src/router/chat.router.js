import express from 'express';
import { getchat, getmessages, sendMessage, } from '../controller/chat.Controller.js';
import { authUser } from '../middleware/autth.middleware.js';

const chatRouter = express.Router();

chatRouter.post("/message", authUser, sendMessage);   
chatRouter.get("/getchat", authUser, getchat);   
chatRouter.get("/getmessages/:id", authUser, getmessages);   


export default chatRouter;