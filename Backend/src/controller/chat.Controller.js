import { GenerateResponse, GenerateChatTitle } from "../services/ai.service.js";
import chatModel from "../model/chat.model.js";
import messageModel from "../model/message.model.js";
export async function sendMessage(req, res) {
  let { message, chatId } = req.body;

  let chat = null,
    titlerespose = null;

  if (!chatId) {
    titlerespose = await GenerateChatTitle(message);

    chat = await chatModel.create({
      user: req.user.id,
      chatTitle: titlerespose,
    });

    chatId = chat._id;
  }

  const userMessage = await messageModel.create({
    chatId: chatId || chat._id,
    content: message,
    role: "user",
  });

  const allMessages = await messageModel.find({ chatId });

  const messagerespose = await GenerateResponse(allMessages);

  const Aimessage = await messageModel.create({
    chatId: chatId || chat._id,
    content: messagerespose,
    role: "ai",
  });

  res.status(200).json({
    success: true,
    chat,
    Aimessage,

  });
} 

export async function getchat(req,res){
   const user = req.user.id
console.log(user)
   
   const allchat = await chatModel.find({ user: user })

   console.log(allchat)
   res.status(200).json({
    success: true,
    message: "All chat are successfully received. ",
    allchat
   })

}

export async function getmessages(req,res) {
   const {chatid} = req.params;

   console.log(chatid)

     const chat = await chatModel.findOne({
        _id: chatid,
        user:req.user.id
     })
       if(!chat){
    return res.status(404).json({
       success:false,
       message: "Chat not found. "
    })
  }


  const messages = await messageModel.find({chatId:chatid})

   res.status(200).json({
    success:true,
    message: " all messages are found. ",
    messages
   })

}
export async function deleteMessages(req,res) {
  const  {chatid} = req.params;

    const chat = await chatModel.findOneAndDelete({
        _id: chatid,
        user:req.user.id
     })

      if(!chat){
    return  res.status(404).json({
       success:false,
       message: "Chat not found. "
    })
  }

     
await messageModel.deleteMany({
  chatId:chatid
})

 


   res.status(200).json({
    success:true,
    message: " Chat deleted successfully. ",
    
   })

}

