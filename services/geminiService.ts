import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateRealEstateAdvice = async (
  prompt: string,
  history: { role: string; parts: { text: string }[] }[]
) => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are a highly knowledgeable and friendly real estate assistant for a platform called 'ViewList'.
        Your goal is to help users find properties, understand mortgage rates, and navigate the real estate market.
        Keep answers concise, professional, and helpful.
        If asked about listings, suggest looking at the 'Featured Properties' section but provide general advice on what to look for.`,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const response = await chat.sendMessageStream({ message: prompt });
    return response;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};