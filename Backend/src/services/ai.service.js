import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage,SystemMessage,AIMessage   } from "langchain";
dotenv.config();

const gemniModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.6-flash",
  apiKey: process.env.GOOGLE_GEMNI_API
});


const mistrulModel = new ChatMistralAI({
 model: "mistral-small-latest",
  apiKey: process.env.Mistral_API
});
export async function GenerateResponse(messages) {
  try {
    const response = await gemniModel.invoke(messages.map((msg)=>{
  if (msg.role == "user") {
    return new HumanMessage(msg.content)
} 
else if (msg.role == "ai") {
    return new AIMessage(msg.content)
}
      
    }))
        return response.text;
  } catch (error) {
    console.error("AI Error:", error.message);
    throw error;
  }
}
export async function GenerateChatTitle(message) {
  try {
    const response = await mistrulModel.invoke([
        new SystemMessage(
  `You are a professional chat title generator only.
  User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 3 to 4 words. The title should be clear, relevant, and engaging enough to give users a quick understanding of the chat's topic. `
),

   new HumanMessage(message)
    ]);
        return response.text; 
  } catch (error) {
    console.error("AI Error:", error.message);
    throw error;
  } 
}
