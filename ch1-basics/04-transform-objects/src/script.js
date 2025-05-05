import * as THREE from "three"

const canvas = document.querySelector("canvas.webgl")

const scene = new THREE.Scene()

/** Axes Helper 坐標軸 */
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

/** Objects */
const group = new THREE.Group()
group.scale.y = 2
group.rotation.y = 0.2
scene.add(group)

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
cube1.position.x = -1.5
group.add(cube1)

const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
cube2.position.x = 0
group.add(cube2)

const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
cube3.position.x = 1.5
group.add(cube3)

/** Sizes */
const sizes = {
  width: 800,
  height: 600,
}

/** Camera */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.lookAt(new THREE.Vector3(0, - 1, 0))
// camera.lookAt(cube1.position)
scene.add(camera)

console.log(cube3.position.distanceTo(camera.position))

/** Renderer */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
