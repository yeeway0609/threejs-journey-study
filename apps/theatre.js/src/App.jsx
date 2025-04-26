import { useEffect } from "react"
import { getProject } from "@theatre/core"
import studio from "@theatre/studio"
import extension from "@theatre/r3f/dist/extension"
import { SheetProvider, editable as e } from "@theatre/r3f"
import { PerspectiveCamera } from "@theatre/r3f"
import demoState from "./demo.theatre-project-state.json"

studio.initialize()
studio.extend(extension)

// 一個專案中可以有多個 sheet，每個 sheet 可以有多個 object
// State 是從 studio 匯出的專案 json
const demoProject = getProject("Demo Project", { state: demoState })

// Sheet 代表一個動畫場景，SheetProvider 用來提供 sheet 給子元件使用
const demoSheet = getProject("Demo Project", { state: demoState }).sheet("Demo Sheet 123")

export default function Theatre() {
  useEffect(() => {
    demoSheet.project.ready.then(() => {
      // 在 sheet 載入完成後，自動播放動畫
      console.log("Demo sheet ready")

      // 在 0 到 3 秒之間循環播放
      demoSheet.sequence.play({ iterationCount: Infinity, range: [0, 3] })
    })
  }, [])

  return (
    <SheetProvider sheet={demoSheet}>
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[3, 3, -5]}
        fov={75}
        onUpdate={(self) => {
          self.lookAt(1, 1, 1)
        }}
      />
      <ambientLight />
      <e.directionalLight theatreKey="Light" position={[1, 2, 3]} intensity={2} />

      <e.mesh theatreKey="Cube">
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </e.mesh>
    </SheetProvider>
  )
}
