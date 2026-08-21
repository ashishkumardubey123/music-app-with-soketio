import { GenerateResponse , GenerateChatTitle} from "../services/ai.service.js";

export async function sendMessage(req, res) {
  const { message,  } = req.body;
 const titlerespose= await GenerateChatTitle(message)
  const messagerespose= await GenerateResponse(message)

   res.status(200).json({
     success: true,
         aiChatTitle: titlerespose,
    aiMessage: messagerespose,

   })
}

