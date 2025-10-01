import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Необходимо для работы Docker
    port: 5173, // Порт, который использует Vite по умолчанию
    watch: {
      usePolling: true, // Решает проблему с горячей перезагрузкой на Windows/WSL
    },
  }
})
