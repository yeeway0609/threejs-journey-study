import "./style.css"
import ReactDOM from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import App from "./App.jsx"
import * as THREE from "three"

const root = ReactDOM.createRoot(document.querySelector("#root"))

// 1. Bg Color
function created({ gl, scene }) {
  // gl.setClearColor("lightblue") // 法1
  // scene.background = new THREE.Color("lightblue") // 法2
}

root.render(
  <Canvas
    shadows={false} // ContactShadows不適用，其他shadow要開
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [3, 2, 6],
    }}
    onCreated={created}
  >
    <color args={["lightblue"]} attach="background" /> {/* 法3 */}
    <App />
  </Canvas>
)
