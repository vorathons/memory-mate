import React, { useMemo } from 'react';

interface HealthTipsCardProps {
  condition: string;
  name: string;
}

const HealthTipsCard: React.FC<HealthTipsCardProps> = ({ condition, name }) => {
  // Simple keyword matching logic for safety (instead of AI hallucination on medical topics)
  const getAdvice = (text: string) => {
    const lowerText = text.toLowerCase();
    const tips = [];

    // Alzheimer's / Memory
    if (lowerText.includes('อัลไซเมอร์') || lowerText.includes('ความจำ') || lowerText.includes('สมอง')) {
      tips.push({ icon: '🧠', text: 'พยายามทำกิจวัตรเดิมๆ ทุกวัน ช่วยให้จำง่ายขึ้นครับ' });
      tips.push({ icon: '📸', text: 'ดูรูปเก่าๆ และเล่าเรื่องราวช่วยกระตุ้นความจำได้ดี' });
      tips.push({ icon: '🎶', text: 'การฟังเพลงที่ชอบ ช่วยให้อารมณ์ดีและผ่อนคลาย' });
    }

    // Hypertension (High Blood Pressure)
    if (lowerText.includes('ความดัน') || lowerText.includes('หัวใจ')) {
      tips.push({ icon: '🧂', text: 'ลดเค็ม ลดเกลือ ในอาหาร ช่วยคุมความดันได้' });
      tips.push({ icon: '🥗', text: 'ทานผักผลไม้เพิ่มขึ้น และดื่มน้ำให้เพียงพอ' });
      tips.push({ icon: '😌', text: 'ระวังอย่าเครียด พักผ่อนให้เพียงพอนะครับ' });
    }

    // Diabetes
    if (lowerText.includes('เบาหวาน') || lowerText.includes('น้ำตาล')) {
      tips.push({ icon: '🍬', text: 'เลี่ยงของหวานและผลไม้รสหวานจัด' });
      tips.push({ icon: '🦶', text: 'หมั่นดูแลเท้า อย่าให้เกิดแผล และใส่รองเท้าที่นุ่มสบาย' });
      tips.push({ icon: '🍚', text: 'ควบคุมปริมาณข้าวและแป้งในแต่ละมื้อ' });
    }

    // General / Bone / Joint
    if (lowerText.includes('กระดูก') || lowerText.includes('ข้อ') || lowerText.includes('ปวด')) {
      tips.push({ icon: '🚶', text: 'เดินออกกำลังกายเบาๆ แต่อย่าหักโหมเกินไป' });
      tips.push({ icon: '☀️', text: 'รับแสงแดดอ่อนๆ ตอนเช้า ช่วยเสริมวิตามินดี' });
      tips.push({ icon: '🥛', text: 'ดื่มนมหรือทานปลาตัวเล็กเสริมแคลเซียม' });
    }

    // Default formatting if no specific match or add general tips
    if (tips.length === 0) {
      tips.push({ icon: '💧', text: 'จิบน้ำบ่อยๆ ตลอดวัน เพื่อให้ร่างกายสดชื่น' });
      tips.push({ icon: '😴', text: 'นอนหลับพักผ่อนให้เพียงพอ อย่างน้อย 7-8 ชั่วโมง' });
      tips.push({ icon: '😊', text: 'ทำจิตใจให้แจ่มใส ยิ้มแย้มเข้าไว้นะครับ' });
    }

    return tips;
  };

  const adviceList = useMemo(() => getAdvice(condition), [condition]);

  return (
    <div className="bg-white rounded-3xl p-5 border border-green-100 shadow-sm relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-green-50 rounded-full opacity-50"></div>
      
      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center relative z-10">
        <span className="bg-green-100 p-2 rounded-lg mr-2 text-xl">🏥</span> 
        คำแนะนำสำหรับคุณ{name}
      </h3>
      
      <p className="text-xs text-gray-400 mb-4 ml-1">
        อ้างอิงตามอาการ: <span className="text-blue-500">{condition}</span>
      </p>

      <div className="space-y-3 relative z-10">
        {adviceList.slice(0, 3).map((tip, index) => (
          <div key={index} className="flex items-start space-x-3 bg-green-50/50 p-3 rounded-xl">
            <span className="text-2xl mt-1">{tip.icon}</span>
            <p className="text-gray-700 text-sm leading-relaxed pt-1 font-medium">
              {tip.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthTipsCard;