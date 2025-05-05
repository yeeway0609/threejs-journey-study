import { useFrame } from "@react-three/fiber"
import { meshBounds, OrbitControls, useGLTF } from "@react-three/drei"
import { useRef } from "react"

export default function MouseEvent() {
  const cube = useRef()
  const hamburger = useGLTF("/hamburger.glb")

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2
  })

  function handleClick() {
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 70%)`)
  }

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      {/* 透過球體去點擊方塊的話會被擋掉 */}
      <mesh position-x={-2} onClick={(e) => console.log(e.stopPropagation())}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cube}
        raycast={meshBounds}
        position-x={2}
        scale={1.5}
        onClick={handleClick}
        onPointerEnter={() => (document.body.style.cursor = "pointer")}
        onPointerLeave={() => (document.body.style.cursor = "")}
        // 這邊也可以用 drei 的 useCursor
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <primitive
        object={hamburger.scene}
        scale={0.25}
        position-y={0.5}
        onClick={(e) => {
          console.log(e.object.name)
          console.log(e.eventObject)
          // e.stopPropagation(); // 這樣只會觸發一個
        }}
      />
    </>
  )
}
