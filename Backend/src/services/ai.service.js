import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.6-flash",
  apiKey: process.env.GOOGLE_GEMNI_API
});
export async function testAi() {
  try {
    const response = await model.invoke(
     `Tell me about today's special day. `

    );

    console.log(response.content);
  } catch (error) {
    console.error("AI Error:", error.message);
  }
}