import "./style.css"
import ReactDOM from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import App from "./App.jsx"
import { Bvh } from "@react-three/drei"

const root = ReactDOM.createRoot(document.querySelector("#root"))

root.render(
  <Canvas
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [3, 2, 6],
    }}
    onPointerMissed={() => {
      console.log("You missed!")
    }}
  >
    <Bvh>
      <App />
    </Bvh>
  </Canvas>
)
