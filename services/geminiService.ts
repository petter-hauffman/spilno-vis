import { GoogleGenAI } from '@google/genai';
import { SYSTEM_CONTEXT_PROMPT } from '../constants';

let aiClient: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const sendMessageToGemini = async (
  userMessage: string,
  contextPrompt?: string
): Promise<string> => {
  if (!aiClient) {
    return 'API key not configured. Add GEMINI_API_KEY to your .env to enable the AI assistant.';
  }

  const systemInstruction = contextPrompt ?? SYSTEM_CONTEXT_PROMPT;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: { systemInstruction },
    });
    return response.text ?? "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'Error communicating with the AI. Please try again later.';
  }
};
