import * as THREE from "three"
import gsap from "gsap"

const canvas = document.querySelector("canvas.webgl")

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const sizes = {
  width: 800,
  height: 600,
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)

/** Animate */
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

let time = Date.now()
const clock = new THREE.Clock()

const tick = () => {
  /** js 原生寫法 */
  // const currentTime = Date.now()
  // const deltaTime = currentTime - time
  // time = currentTime
  // mesh.rotation.y += 0.001 * deltaTime

  /** three.js 寫法 */
  // const collapsedTime = clock.getElapsedTime()
  // mesh.rotation.y = collapsedTime
  // mesh.position.y = Math.sin(collapsedTime)
  // mesh.position.x = Math.cos(collapsedTime)

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
