import "./style.css"
import ReactDOM from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import App from "./App.jsx"
import { StrictMode } from "react"
import { Leva } from "leva"

const root = ReactDOM.createRoot(document.querySelector("#root"))

root.render(
  <StrictMode>
    <Leva collapsed />
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [3, 2, 6],
      }}
    >
      <App />
    </Canvas>
  </StrictMode>
)
