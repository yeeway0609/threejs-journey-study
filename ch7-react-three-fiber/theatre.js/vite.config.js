import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import restart from "vite-plugin-restart"

export default defineConfig({
  root: "src/",
  publicDir: "../public",
  plugins: [react(), restart({ restart: ["../public/**"] })],
  server: {
    hot: true,
  },
})
