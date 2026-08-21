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
export async function GenerateResponse(message) {
  try {
    const response = await gemniModel.invoke([
         new SystemMessage("Aap ek madadgar assistant hain, jo sirf user dwara diye gaye input ke according language mein answer dete hain. Aapka jawab bahut hi friendly aur funny hona chahiye aur bahut hi helpful bhi hona chahiye. Is prakar se hona chahiye, jaise ki aap ek chhote se bachche ko samjha rahe hain aur usse bahut achhe se samajh mein aaye. Is prakar se aapka jawab hona chahiye. Sabse mahatvapurn baat yeh hai. "),

   new HumanMessage(message)

    ]);
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
