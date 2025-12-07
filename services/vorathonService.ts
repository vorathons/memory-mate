// services/vorathonService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// สร้าง instance ของ AI โดยใช้ API Key จาก environment variable
const ai = new GoogleGenerativeAI(process.env.VITE_API_KEY!);

export async function generateCompanionResponse(
  message: string,
  history: { role: "user" | "assistant"; content: string }[]
): Promise<string> {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    // รวม system + history + user เป็น prompt string เดียว
    const promptLines = [
      `คุณคือ "Vorathon" ผู้ช่วย AI ที่เป็นมิตร ใจเย็น และเข้าอกเข้าใจ  
คุณกำลังคุยกับผู้สูงอายุที่มีปัญหาเรื่องความจำ (อัลไซเมอร์ระยะเริ่มต้น)

คำแนะนำในการตอบ:
– ใช้ภาษาไทยสุภาพ เรียบง่าย และให้กำลังใจ  
– หากจำไม่ได้ / พูดซ้ำ ให้ตอบอย่างใจเย็น  
– ชวนคุยเรื่องที่คุ้นเคย เช่น อดีต / กิจวัตรง่าย ๆ  
– หลีกเลี่ยงโต้แย้ง และเรียกตัวเองว่า "ผม" หรือ "Vorathon"`,
      ...history.map(h => `${h.role === "user" ? "คุณ: " : "Vorathon: "}${h.content}`),
      `คุณ: ${message}`,
      "Vorathon:" // ให้ model ตอบ
    ];
    const fullPrompt = promptLines.join("\n");

    // เรียก API
    const result = await model.generateContent(fullPrompt);

    // ดึงข้อความออกจากผลลัพธ์
    const text = result.response.text();
    return text || "ขอโทษครับ ผมไม่ได้ยิน — ช่วยพูดอีกครั้งได้ไหมครับ?";
  } catch (err) {
    console.error("Gemini API error:", err);
    return "ขอโทษครับ ระบบขัดข้อง ลองใหม่อีกครั้งนะครับ";
  }
}
