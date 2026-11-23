import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// مسار فولدر src (بيتحسب من مكان الملف ده بدون @types/node)
// الـ replace بيشيل "/" الزيادة اللي بتظهر قبل اسم الدرايف على Windows (مثلاً /C:/)
const srcPath = decodeURIComponent(new URL("./src", import.meta.url).pathname).replace(
  /^\/([A-Za-z]:)/,
  "$1",
);

// إعداد Vite: React + Tailwind، والـ alias "@" بيشاور على فولدر src
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": srcPath,
    },
  },
});
