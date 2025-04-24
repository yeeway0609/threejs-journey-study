import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"

const triangleCount = 10
const verticesCount = triangleCount * 3 // 每個三角形有 3 個頂點
const positionsCount = verticesCount * 3 // 每個頂點有 3 個xyz座標

export default function CustomObject() {
  const geoRef = useRef()

  useEffect(() => {
    if (geoRef.current) {
      geoRef.current.computeVertexNormals()
    }
  }, [])

  const positions = useMemo(() => {
    const positions = new Float32Array(positionsCount)

    for (let i = 0; i < positionsCount; i++) {
      positions[i] = (Math.random() - 0.5) * 3
    }

    return positions
  }, [])

  return (
    <mesh position-y={2}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" count={verticesCount} itemSize={3} array={positions} />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
  )
}
