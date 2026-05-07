import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

export function getGenAI(): GoogleGenAI {
  if (!ai) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set.");
    }
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

const SYSTEM_INSTRUCTION = `You are MEDOS AI, an advanced Autonomous Healthcare Operating System.
You act as an AI Clinical Copilot and Autonomous Medical Organization.
Your output must be structured, clinical, authoritative yet safe.

If providing a patient analysis or reasoning, follow this format loosely:
• Differential Diagnoses
• Risk Level
• Confidence Score
• Recommended Tests
• Escalation Priority

Keep responses concise, using bullet points, and maintain a highly technical, futuristic tone.`;

export async function sendCopilotMessage(prompt: string, history: Array<{role: string, parts: any[]}> = []) {
  const genAI = getGenAI();
  
  const contents = [...history, { role: "user", parts: [{ text: prompt }] }];
  
  const response = await genAI.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: contents,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.2,
    }
  });
  
  return response.text;
}
