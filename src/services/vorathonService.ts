import { GoogleGenAI as Vorathon } from "@google/genai";

// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
const ai = new Vorathon({ apiKey: process.env.API_KEY });

export const generateCompanionResponse = async (
  message: string,
  history: { role: string; content: string }[]
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct prompt with context
    const systemInstruction = `
      คุณคือ "Vorathon" ผู้ช่วย AI ที่เป็นมิตร ใจเย็น และมีความเข้าอกเข้าใจ 
      คุณกำลังคุยกับผู้สูงอายุที่มีปัญหาเรื่องความจำ (อัลไซเมอร์ระยะเริ่มต้น)
      
      คำแนะนำในการตอบ:
      1. ใช้ภาษาไทยที่สุภาพ เรียบง่าย ชัดเจน และให้กำลังใจ
      2. อย่าใช้ประโยคที่ซับซ้อนหรือยาวเกินไป
      3. ถ้าผู้ใช้งานจำไม่ได้ หรือพูดซ้ำ ให้ตอบด้วยความอดทน ไม่ตำหนิ
      4. ชวนคุยเรื่องความสุขในอดีต หรือเรื่องกิจวัตรประจำวันง่ายๆ
      5. หลีกเลี่ยงการโต้แย้ง ถ้าผู้ใช้เข้าใจผิด ให้เบี่ยงเบนความสนใจอย่างนุ่มนวล
      6. เรียกแทนตัวเองว่า "ผม" หรือ "Vorathon"
    `;

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
      history: history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.content }]
      }))
    });

    const result = await chat.sendMessage({
      message: message
    });

    return result.text || "ขอโทษครับ ผมไม่ได้ยิน ช่วยพูดอีกครั้งได้ไหมครับ?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "ขออภัยครับ ระบบขัดข้องชั่วคราว ลองใหม่อีกครั้งนะครับ";
  }
};