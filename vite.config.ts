import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    base: './', // เพิ่มบรรทัดนี้: ช่วยให้ Deploy บน Hosting ต่างๆ ได้ราบรื่นขึ้น (แก้ปัญหาหาไฟล์ไม่เจอ)
    define: {
      // Map VORATHON_API_KEY (or fallback to API_KEY) to process.env.API_KEY
      'process.env.API_KEY': JSON.stringify(env.VORATHON_API_KEY || env.API_KEY)
    }
  }
})