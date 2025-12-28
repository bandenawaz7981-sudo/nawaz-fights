
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { ImageSize, AspectRatio } from "./types";

const API_KEY = process.env.API_KEY || "";

export const getGeminiClient = () => {
  return new GoogleGenAI({ apiKey: API_KEY });
};

export const checkProKey = async (): Promise<boolean> => {
  if (typeof window.aistudio?.hasSelectedApiKey === 'function') {
    return await window.aistudio.hasSelectedApiKey();
  }
  return true; // Fallback if not in environment that supports this check
};

export const requestProKey = async (): Promise<void> => {
  if (typeof window.aistudio?.openSelectKey === 'function') {
    await window.aistudio.openSelectKey();
  }
};

export const generateAIResponse = async (
  message: string,
  history: { role: 'user' | 'model', parts: { text: string }[] }[] = [],
  usePro: boolean = false,
  useThinking: boolean = false
): Promise<string> => {
  const ai = getGeminiClient();
  const model = usePro ? 'gemini-3-pro-preview' : 'gemini-2.5-flash-lite-latest';
  
  const config: any = {};
  if (useThinking && usePro) {
    config.thinkingConfig = { thinkingBudget: 32768 };
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        ...config,
        systemInstruction: "You are FlyHigh AI, an expert travel assistant. Help users find flights, hotels, plan itineraries, and provide travel tips. Be concise and helpful."
      }
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error: any) {
    if (error.message?.includes("Requested entity was not found")) {
        throw new Error("PRO_KEY_REQUIRED");
    }
    console.error("AI Response Error:", error);
    return "Error generating response.";
  }
};

export const generateTravelImage = async (
  prompt: string,
  size: ImageSize = ImageSize.S1K,
  ratio: AspectRatio = AspectRatio.A1_1
): Promise<string | null> => {
  const ai = getGeminiClient();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: ratio as any,
          imageSize: size as any
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error: any) {
    if (error.message?.includes("Requested entity was not found")) {
        throw new Error("PRO_KEY_REQUIRED");
    }
    console.error("Image Generation Error:", error);
    return null;
  }
};
