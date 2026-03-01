# useLayoutEffect 使用说明

## 是什么

`useLayoutEffect` 是 React 内置的一个 Hook，签名与 `useEffect` 完全相同：

```js
useLayoutEffect(() => {
  // 副作用逻辑
  return () => {
    // 可选的清理函数
  };
}, [依赖数组]);
```

## 与 useEffect 的核心区别

| | `useEffect` | `useLayoutEffect` |
|---|---|---|
| 执行时机 | 浏览器/原生层**绘制完成后**异步执行 | DOM/原生层**绘制前**同步执行 |
| 是否阻塞渲染 | 否 | 是（执行完才绘制） |
| 适用场景 | 数据请求、订阅、日志等 | 需要在用户看到画面之前就改变 UI 的操作 |

执行顺序：

```
render → useLayoutEffect → 浏览器绘制 → useEffect
```

---

## 为什么这里必须用 useLayoutEffect

回到 `CategoriesScreen.js` 中的代码：

```js
useLayoutEffect(() => {
  navigation.getParent()?.setOptions({
    headerLeft: () => (
      <IconButton
        icon="bars"
        onPress={() => navigation.openDrawer()}
      />
    ),
  });
}, [navigation]);
```

这段代码的目的是：在 Stack 的 Header 上动态注入一个汉堡按钮。

### 如果换成 useEffect 会发生什么

```
Screen 渲染 → 浏览器绘制（此时 Header 还没有按钮）→ useEffect 执行 → Header 注入按钮
```

用户会看到 Header **先短暂出现一个没有按钮的状态**，然后按钮才"跳出来"，产生闪烁。

### useLayoutEffect 为什么能避免闪烁

```
Screen 渲染 → useLayoutEffect 执行（Header 注入按钮）→ 绘制（用户直接看到有按钮的 Header）
```

`useLayoutEffect` 在浏览器/原生层绘制前同步执行，所以用户永远不会看到"没有按钮"的中间状态。

---

## 使用规则

### 1. 依赖数组

```js
useLayoutEffect(() => {
  // ...
}, [navigation]); // navigation 是依赖项
```

- 依赖数组为空 `[]`：只在组件挂载时执行一次
- 有依赖项：每当依赖项变化时重新执行
- 省略依赖数组：每次渲染后都执行（不推荐）

### 2. 清理函数

如果副作用需要清理（如取消订阅），在回调里返回一个函数：

```js
useLayoutEffect(() => {
  const subscription = someEvent.subscribe();

  return () => {
    subscription.unsubscribe(); // 组件卸载或依赖变化时执行
  };
}, []);
```

### 3. 不能在条件语句中使用

```js
// ❌ 错误
if (condition) {
  useLayoutEffect(() => { ... }, []);
}

// ✅ 正确：条件放在回调内部
useLayoutEffect(() => {
  if (condition) {
    // ...
  }
}, [condition]);
```

---

## 常见使用场景

### 场景一：在渲染前动态更新导航 Header（本项目用法）

```js
// 在子屏幕中修改父级导航器的 Header 配置
useLayoutEffect(() => {
  navigation.getParent()?.setOptions({
    headerLeft: () => <MyButton />,
    title: "动态标题",
  });
}, [navigation]);
```

### 场景二：读取 DOM/布局尺寸并立即调整

```js
const ref = useRef(null);
const [height, setHeight] = useState(0);

useLayoutEffect(() => {
  if (ref.current) {
    // 在绘制前同步读取布局信息，避免闪烁
    setHeight(ref.current.offsetHeight);
  }
}, []);
```

### 场景三：在动画开始前设置初始状态

```js
useLayoutEffect(() => {
  // 动画库在绘制前初始化，避免用户看到动画前的"默认位置"
  animation.setValue(0);
}, []);
```

---

## React Native 中的注意事项

- React Native 中 `useLayoutEffect` 的行为与 Web 一致，同样在原生层绘制前同步执行
- 服务端渲染（SSR）环境下 `useLayoutEffect` 会报警告，此时应使用 `useEffect`。React Native 不涉及 SSR，无需担心此问题
- 不要在 `useLayoutEffect` 中执行耗时操作（大量计算、网络请求），因为它会阻塞渲染，影响帧率

---

## 总结

> 默认用 `useEffect`。当你发现副作用执行前用户能看到错误的 UI 状态（闪烁）时，换成 `useLayoutEffect`。
