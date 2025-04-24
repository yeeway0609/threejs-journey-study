import { useRef } from "react"
import { extend, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import CustomObject from "./CustomObject"

extend({ OrbitControls })

export default function App() {
  const { camera, gl } = useThree()
  const cubeRef = useRef()
  const groupRef = useRef()

  useFrame((state, delta) => {
    // console.log("Current time:", state.clock.getElapsedTime().toFixed(5), "秒");
    // console.log("Delta time:", delta.toFixed(5), "秒"); // 如果螢幕刷新率是 60 FPS，每幀的間隔大約是 1 / 60 = 0.01667 秒

    // 讓方塊與整個 group 原地轉動
    cubeRef.current.rotation.y += delta * 3 // 每秒轉動 0.01667 * 60 * 3 = 3 弧度
    groupRef.current.rotation.y -= delta

    // 讓相機看向原點並繞圈拍攝
    // const angle = state.clock.getElapsedTime();
    // state.camera.position.x = 6 * Math.sin(angle);
    // state.camera.position.z = 6 * Math.cos(angle);
    // state.camera.lookAt(0, 0, 0);
  })

  return (
    <>
      {/* 軌道控制器: 加上後就能用滑鼠控制相機 */}
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight position={[1, 2, 3]} intensity={2} />
      <ambientLight intensity={1} />

      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <mesh ref={cubeRef} rotation-y={Math.PI * 0.25} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>

      <mesh rotation-x={-Math.PI * 0.5} position-y={-1} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="lightgreen" />
      </mesh>

      <CustomObject />
    </>
  )
}
