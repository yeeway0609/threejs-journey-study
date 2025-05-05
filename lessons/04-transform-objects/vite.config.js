import { defineConfig } from "vite"
import restart from "vite-plugin-restart"

export default defineConfig({
  root: "src/",
  publicDir: "../public",
  plugins: [restart({ restart: ["../public/**"] })],
  server: {
    hot: true,
  },
})
