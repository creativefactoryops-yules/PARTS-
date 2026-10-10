
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AIResponse, GroundingSource } from "../types";

export const getIFSExplanation = async (term: string): Promise<AIResponse> => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
  
  if (!apiKey) {
    console.error("Gemini API Error: No API key found in environment.");
    return {
      definition: "",
      sources: [],
      isLoading: false,
      error: "Gemini API Error: No API key configured. Please set the GEMINI_API_KEY environment variable."
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
      Explain the term "${term}" in the context of Internal Family Systems (IFS) therapy. 
      Provide a deep, empathetic, and clinical definition. 
      Include:
1. What it is.
2. Its role in the internal system.
3. How it relates to "The Self".
      Keep the tone therapeutic and informative.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    if (!text) {
      const finishReason = response.candidates?.[0]?.finishReason;
      throw new Error(`Model returned no text. Finish reason: ${finishReason}`);
    }
    
    // Extract grounding sources
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = groundingChunks
      .filter(chunk => chunk.web)
      .map(chunk => ({
        title: chunk.web?.title,
        uri: chunk.web?.uri,
      }));

    return {
      definition: text,
      sources,
      isLoading: false
    };
  } catch (error: any) {
    console.error("Gemini API Error Detail:", error);
    const errorMessage = error?.message || String(error);
    return {
      definition: "",
      sources: [],
      isLoading: false,
      error: `Gemini API Error: ${errorMessage}`
    };
  }
};
