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
