import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
// Assume process.env.API_KEY is pre-configured and accessible.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAssistantResponse = async (userQuery: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction: `你是 "ScholarBot"（学术小助手），服务于 "ScholarPost"（学术海报通）平台。
        这个平台致力于帮助无法亲自参会的科研人员寻找可靠的代贴人（Proxy）在会议现场打印并张贴学术海报。
        
        你的职责是：
        1. 解答关于学术海报标准的问题（如A0尺寸、36x48英寸、字体大小建议等）。
        2. 提供关于如何与代贴人沟通的建议（例如确认张贴地点、拍照反馈等）。
        3. 如果被问及，可以总结主要学术会议的基本信息。
        
        请使用中文（简体）回答所有问题。保持回答简洁、专业且富有助益。`,
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster chat response
      }
    });
    
    return response.text || "抱歉，我现在无法生成回复。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，连接知识库时出现问题，请稍后再试。";
  }
};