import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getTravelAssistantResponse = async (userQuery: string) => {
  try {
    const ai = getAIClient();
    if (!ai) return "Maaf, sistem AI sedang tidak tersedia (API Key missing).";

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: userQuery,
      config: {
        systemInstruction: "You are Kaisa AI, the digital concierge for Kaisa Rossie, a premium Boutique Travel Atelier. Your expertise covers three core areas: 1) Sacred Journeys (Umrah and Hajj), 2) Global & Domestic Tours (Cultural and Leisure heritage travel), and 3) Luxury Mobility (Bus and Sprinter rentals for corporate and VIP groups). Be sophisticated, helpful, and concise. If asked about tours, highlight cultural discovery. If asked about buses, mention safety and luxury amenities. For Umrah/Hajj, focus on spiritual tranquility and logistical excellence.",
      },
    });
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, saya sedang mengalami kendala teknis. Mohon hubungi konsultan kami secara langsung.";
  }
};

export const getPackageRecommendations = async (preferences: string) => {
  try {
    const ai = getAIClient();
    if (!ai) return null;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Based on these preferences: ${preferences}, suggest the best travel category (Umrah, Hajj, Global Heritage Tour, or VIP Group Rental) and explain why.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedCategory: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            tips: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });
    return JSON.parse(response.text() || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};