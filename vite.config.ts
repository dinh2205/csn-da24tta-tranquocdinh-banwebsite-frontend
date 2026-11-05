import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Nghe cả 127.0.0.1 lẫn localhost (mặc định Windows chỉ nghe IPv6 ::1 nên mở 127.0.0.1:5173 bị lỗi)
  server: { host: true },
})
