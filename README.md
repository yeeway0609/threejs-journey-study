Course: https://threejs-journey.com

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
const mesh = new THREE.Mesh();
mesh.position.set(1, 2, 3);
mesh.rotation.x = 0.5;
mesh.geometry = new THREE.BoxGeometry(1, 1, 1);
mesh.material = new THREE.MeshBasicMaterial({ color: "red" });

scene.add(mesh);
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

We can change the constructor parameters by providing an array to the ~args~ attribute and follow the parameters order (`radius`, `widthSegments`, `heightSegments`):

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
    console.log("tick");
  });

  // ...
}
```

But how can we access the cube here to update its `rotation` property?

We are going to use a reference (`useRef`)

> 千萬不要在 useFrame 用 state！不然整個 component 都會 rerender，每個 frame 都操作的話會爆掉

### OrbitControls

We are now able to use <orbitControls> inside our JSX, but let’s not forget that we need to send the camera and the DOM element to it.

But where can we find those?

If you remember from earlier, we found them in the state variable when we used useFrame.

But we don’t want to get the state on each frame; we want it once when everything is ready.

We can do that with the `useThree` hook - will provide us the same state, but only once at the beginning of the component.

### Optimize vertices with useMemo

It’s working, but we made a mistake. CustomObject function 的程式碼會在 component 每次需要重新繪製時被呼叫

我們不希望每次 props 或 state 變化時都重新計算整個幾何體（範例不會，但以後可能會）。我們現在只有 10 個三角形，但我們可能會有成千上萬個三角形。

useMemo 是一個 React hook，我們可以傳遞一個函數給它。它會呼叫該函數並記住該值。如果組件被 re-render，useMemo 會 return 它第一次呼叫函數時得到的值。它的作用有點像 cache。

我們也可以指定成變數，如果這些變數改變了，useMemo 會忘記已保存的值並再次呼叫該函數。

### Canvas setting

- Camera
- Antialias
- Tone Mapping
- OUtput color space
- Alpha
- Pixel Ratio

## 56. R3F and Drei

## 62. Mouse events

```js
const handleClick = (event) => {
  console.log(event);
};
```

`event` is an object that contains many properties and methods:

```js
console.log("---");
console.log("distance", event.distance); // Distance between camera and hit point
console.log("point", event.point); // Hit point coordinates (in 3D)
console.log("uv", event.uv); // UV coordinates on the geometry (in 2D)
console.log("object", event.object); // The object that triggered the event
console.log("eventObject", event.eventObject); // The object that was listening to the event (useful where there is objects in objects)

console.log("---");
console.log("x", event.x); // 2D screen coordinates of the pointer
console.log("y", event.y);

console.log("---");
console.log("shiftKey", event.shiftKey); // 按著 shift 鍵
console.log("ctrlKey", event.ctrlKey); // 按著 ctrl 鍵
console.log("metaKey", event.metaKey); // 按著 command 鍵
```

比較特殊的方法：

- `onPointerOver`/`onPointerEnter：` 當滑鼠移入物件時觸發
- `onPointerOut`/`onPointerLeave`：當滑鼠移出物件時觸發
- `onPointerMove`：當滑鼠移動時，每個 frame 都會觸發
- `onPointerMissed`：當滑鼠跟除了自己的物件互動時觸發

### 漢堡模型

```jsx
<primitive
  object={hamburger.scene}
  scale={0.25}
  position-y={0.5}
  onClick={(e) => console.log(e.object.name)}
/>
```

因為漢堡有四層，所以這樣寫會跑出：

- topBun
- cheese
- meat
- bottomBun
