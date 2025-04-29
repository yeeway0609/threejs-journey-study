## 55. First R3F Application

- We didn't have to create a Scene
- We didn't have to create the WebGLRenderer
- We didn't have to place a PerspectiveCamefa
- We didn't have to pull it back from the center
- When you resize the viewport, everything that needs resizing is handled automatically
- We didn't have to provide any specific value for the ‹torusKnotGeometry>
- We didn't have to import the Mesh, nor the SphereGeometry, nor the MeshNormalMaterial
- We don't even have to reload the page (most of the time)

```js
const mesh = new THREE.Mesh()
mesh.position.set(1, 2, 3)
mesh.rotation.x = 0.5
mesh.geometry = new THREE.BoxGeometry(1, 1, 1)
mesh.material = new THREE.MeshBasicMaterial({ color: "red" })

scene.add(mesh)
```

```jsx
<mesh position={[1, 2, 3]} rotation-x={0.5}>
  <boxGeometry />
  <meshBasicMaterial color="red" />
</mesh>
```

The `set` function seems to be called automatically and we can still change individual properties like the `rotation.x`

If you check the SphereGeometry class documentation, the first 3 parameters are:

- `radius`
- `widthSegments`
- `heightSegments`

We can change the constructor parameters by providing an array to the ~args~ attribute and follow the
parameters order (`radius`, `widthSegments`, `heightSegments`):

要注意時常更新 geometry 參數的話，他會一直被 rebuilt，所以會有效能問題

```jsx
<mesh>
  <sphereGeometry args={[1.5, 32, 32]} />
  <meshBasicMaterial />
</mesh>
```

或是改成用 props 的寫法

### Animate

```jsx
export default function App() {
  useFrame(() => {
    console.log("tick")
  })

  // ...
}
```

But how can we access the cube here to update its `rotation` property?

We are going to use a reference (`useRef`)

> 千萬不要在 useFrame 用 state！不然整個 component 都會 rerender，每個 frame 都操作的話會爆掉

### OrbitControls

We are now able to use <orbitControls> inside our JSX, but let’s not forget that we need to send the
camera and the DOM element to it.

But where can we find those?

If you remember from earlier, we found them in the state variable when we used useFrame.

But we don’t want to get the state on each frame; we want it once when everything is ready.

We can do that with the `useThree` hook - will provide us the same state, but only once at the beginning
of the component.

### Optimize vertices with useMemo

It’s working, but we made a mistake. CustomObject function 的程式碼會在 component 每次需要重新繪製時被呼叫

我們不希望每次 props 或 state 變化時都重新計算整個幾何體（範例不會，但以後可能會）。我們現在只有 10 個三角形，但我們可能會
有成千上萬個三角形。

useMemo 是一個 React hook，我們可以傳遞一個函數給它。它會呼叫該函數並記住該值。如果組件被 re-render，useMemo 會 return
它第一次呼叫函數時得到的值。它的作用有點像 cache。

我們也可以指定成變數，如果這些變數改變了，useMemo 會忘記已保存的值並再次呼叫該函數。

### Canvas setting

- Camera
- Antialias
- Tone Mapping
- OUtput color space
- Alpha
- Pixel Ratio

## 58. Environment and Staging

1. Bg Color
   - 使用 setClearColor，我們需要存取 renderer，並且只需要在建立 renderer 時執行一次此操作，因為我們顯然不需要在每個 frame
     都重新設置背景顏色。
2. Light
3. Shadow
   - Baking: 只會初始渲染一次，然後將陰影儲存到 texture 中，提升效能。但是這樣對於正在旋轉的方塊，影子就不會動了
   - Shadow map：一種從光源角度生成深度貼圖，用來即時計算場景中哪些區域應呈現陰影的技術。
   - Soft shadow：使用 PCF（Percentage Closer Filtering）技術來模擬柔和的陰影邊緣，根據光源的大小和距離，陰影邊緣會變得模糊，
     這樣可以減少硬邊陰影帶來的生硬感。
   - AccumulativeShadows
4. Sky
5. Environment map
   - HDRI: High Dynamic Range Imaging，能夠捕捉更廣泛的亮度範圍，提供更真實的光照效果。
6. Stage
   - 啥都懶得用，就用這個

## 62. Mouse events

```js
const handleClick = (event) => {
  console.log(event)
}
```

`event` is an object that contains many properties and methods:

```js
console.log("---")
console.log("distance", event.distance) // Distance between camera and hit point
console.log("point", event.point) // Hit point coordinates (in 3D)
console.log("uv", event.uv) // UV coordinates on the geometry (in 2D)
console.log("object", event.object) // The object that triggered the event
console.log("eventObject", event.eventObject) // The object that was listening to the event (useful where there is objects in objects)

console.log("---")
console.log("x", event.x) // 2D screen coordinates of the pointer
console.log("y", event.y)

console.log("---")
console.log("shiftKey", event.shiftKey) // 按著 shift 鍵
console.log("ctrlKey", event.ctrlKey) // 按著 ctrl 鍵
console.log("metaKey", event.metaKey) // 按著 command 鍵
```

比較特殊的方法：

- `onPointerOver`/`onPointerEnter：` 當滑鼠移入物件時觸發
- `onPointerOut`/`onPointerLeave`：當滑鼠移出物件時觸發
- `onPointerMove`：當滑鼠移動時，每個 frame 都會觸發
- `onPointerMissed`：當滑鼠跟除了自己的物件互動時觸發

### 漢堡模型

```jsx
<primitive object={hamburger.scene} scale={0.25} position-y={0.5} onClick={(e) => console.log(e.object.name)} />
```

因為漢堡有四層，所以這樣寫會跑出：

- topBun
- cheese
- meat
- bottomBun

### Performance

1.  meshBounds

    會在 mesh 周圍建立一個理論上的球體（稱為 bounding sphere），滑鼠事件將會針對這個球體進行碰撞判定，而不是直接測試 mesh
    的幾何形狀。這在不需要對複雜幾何進行精確偵測時非常有用。
    我們將在 cube（立方體）上測試這個功能。需要注意的是，meshBounds 只能作用於單一 mesh，這也是為什麼我們無法將它用在 hamburger
    （漢堡模型）上，因為它是由多個 mesh 組成的。

2.  Bvh

    如果有非常複雜的幾何形狀，又需要精準且高效的滑鼠事件偵測，也可以使用 BVH（Bounding Volume Hierarchy，包圍體階層結構）。
    這是一種更複雜的做法，但透過 drei 提供的 <Bvh> 輔助工具可以簡化實作。由於 <Bvh> 輔助工具需要包裹整個場景（experience），
    我們會將它加在 main.jsx 中。
    唯一的缺點是：它需要為每個 Mesh 產生一棵 boundsTree（邊界樹），該結構會被 <Bvh> 在內部使用。這個過程每個 Mesh 只需執行一次，
    但若幾何形狀過於複雜，仍可能造成短暫的卡頓（freeze）。
