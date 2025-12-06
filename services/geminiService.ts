import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// safely access process.env.API_KEY
const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';

// Initialize Gemini API only if key exists to prevent immediate crash
// If apiKey is empty, calls will fail gracefully in the function
const ai = new GoogleGenAI({ apiKey: apiKey || 'MISSING_KEY' });

export const generateRealEstateAdvice = async (
  prompt: string,
  history: { role: string; parts: { text: string }[] }[]
) => {
  try {
    if (!apiKey) {
      throw new Error("API Key is missing. Please check your environment configuration.");
    }

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