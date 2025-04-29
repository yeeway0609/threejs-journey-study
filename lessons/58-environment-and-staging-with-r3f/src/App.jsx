import { useFrame, useThree } from "@react-three/fiber"
import {
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
  Stage,
} from "@react-three/drei"
import { useRef, useEffect } from "react"
import { Perf } from "r3f-perf"
import * as THREE from "three"
import { useControls } from "leva"

export default function App() {
  const cube = useRef()

  const directionalLight = useRef()
  // useHelper(directionalLight, THREE.DirectionalLightHelper, 1, "hotpink") // 顯示燈光的輔助線

  const { color, opacity, blur } = useControls("contact shadows", {
    color: "#000000",
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 },
  })

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  })

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls("environment map", {
    envMapIntensity: { value: 7, min: 0, max: 12 },
    envMapHeight: { value: 7, min: 0, max: 100 },
    envMapRadius: { value: 28, min: 10, max: 1000 },
    envMapScale: { value: 100, min: 10, max: 1000 },
  })

  const scene = useThree((state) => state.scene)

  // useEffect(() => {
  //   scene.environmentIntensity = envMapIntensity
  // }, [envMapIntensity])

  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime // 測試 AccumulativeShadows
    // cube.current.position.x = 2 + Math.sin(time) // 測試 AccumulativeShadows
    cube.current.rotation.y += delta * 0.2
  })

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* 2. Light */}
      {/* <ambientLight intensity={1.5} />
      <directionalLight
        ref={directionalLight}
        // position={[1, 2, 3]}
        position={sunPosition}
        intensity={4.5}
        castShadow
        shadow-mapSize={[1024 * 2, 1024 * 2]} // 數值越大，陰影越清晰
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      /> */}

      {/* 3. Shadows */}
      {/* <BakeShadows /> */}
      {/* <SoftShadows size={25} samples={10} focus={0} /> */}

      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        // frames={1000} // 數值太大會導致性能下降，初次渲染時會有點慢
        temporal // 解決上面的問題，影子會慢慢疊加，這樣初次渲染時就不用等全部渲染完畢
        frames={Infinity} // 讓陰影一直更新，才會跟著物體移動
        blend={100}
        // 最終效果還是不太好，AccumulativeShadows 不適合用在會動的物體，改用 ContactShadows
      >
        <RandomizedLight position={[1, 2, 3]} amount={8} radius={1} ambient={0.5} intensity={3} bias={0.001} />
      </AccumulativeShadows> */}

      {/* <ContactShadows
        // position={[0, -0.99, 0]}
        position={[0, 0, 0]} // 移除 planeGeometry 地板後
        scale={10}
        resolution={512}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        frames={1} // Bake shadow 要設為 1
      /> */}

      {/* 4. Sky */}
      {/* <Sky sunPosition={sunPosition} /> */}

      {/* 5.Environment map  */}
      {/* <Environment
        background
        resolution={64}
        // files="./environmentMaps/the_sky_is_on_fire_2k.hdr" // HDR 環境圖
        preset="sunset" // drei 提供的 HDR 環境圖
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
      >
        <color args={["#000000"]} attach="background" />
      </Environment> */}

      {/* <mesh castShadow position-x={-2} position-y={1}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow ref={cube} position-x={2} position-y={1} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh> */}

      {/* <mesh
        rotation-x={-Math.PI * 0.5}
        position-y={0}
        scale={10}
        // receiveShadow
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh> */}

      {/* 6. Stage */}
      <Stage
        shadows={{ type: "contact", opacity: 0.2, blur: 3 }}
        environment="sunset"
        preset="portrait"
        intensity={envMapIntensity}
      >
        <mesh castShadow position-y={1} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
        </mesh>

        <mesh castShadow ref={cube} position-y={1} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
        </mesh>
      </Stage>
    </>
  )
}
