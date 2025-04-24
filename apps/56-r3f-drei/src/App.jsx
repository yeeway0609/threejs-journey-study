import { useState, useRef } from "react"
import {
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
  OrbitControls,
  TransformControls,
  PivotControls,
} from "@react-three/drei"

export default function App() {
  const cubeRf = useRef()
  const sphereRef = useRef()

  const [count, setCount] = useState(0)

  function handleCount() {
    setCount((prev) => prev + 1)
  }

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <PivotControls anchor={[0, 1, 0]} depthTest={false} lineWidth={2} axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}>
        <mesh ref={sphereRef} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html wrapperClass="html-label" position={[1, 1, 1]} center distanceFactor={10} occlude={[cubeRf, sphereRef]}>
            Count: {count}
          </Html>
        </mesh>
      </PivotControls>

      <mesh ref={cubeRf} position-x={3} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={cubeRf} mode="rotate" />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial color="greenyellow" resolution={1024} blur={[1000, 1000]} mixBlur={1} />
      </mesh>

      <Html>
        <button onClick={handleCount}>count++</button>
      </Html>

      <Float speed={3}>
        <Text font="/bangers-v20-latin-regular.woff" color="salmon" position-y={2} fontSize={0.6}>
          React Three Fiber
        </Text>
      </Float>
    </>
  )
}
