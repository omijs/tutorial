# 使用 Omi 框架实现冒泡排序可视化

在这篇文章中，我们将介绍如何使用 Omi 框架实现一个简单的冒泡排序可视化。我们将使用 Omi 的一些核心功能，如组件、信号、绑定、混入等，来构建一个简单的冒泡排序应用。


## 实现冒泡排序可视化

首先，我们需要创建一个 Store 类来存储应用的状态。在这个例子中，我们需要存储一个随机生成的数字数组、两个用于比较的索引以及一个表示是否正在排序的布尔值。我们还需要在 Store 类中实现一些方法，如初始化、重置、排序等。

```tsx
class Store {
  state: SignalValue<{
    arr?: number[]
    indexA?: number
    indexB?: number
    sorting?: boolean
  }>

  constructor() {
    this.state = signal({})
    this.init()
  }

  init() {
    this.state.value.arr = Array.from({ length: 30 }, () => this.randomInt())
    this.state.value.indexA = -1
    this.state.value.indexB = -1
    this.state.value.sorting = false
    this.state.update()
  }

  randomInt() {
    return Math.ceil(Math.random() * 25)
  }

  @bind
  reset() {
    this.init()
  }

  @bind
  sort() {
    this.state.value.sorting = true
    this.bubbleSort(this.state.value.arr!, {
      done: () => {
        this.state.value.indexA = -1
        this.state.value.indexB = -1
        this.state.value.sorting = false
        this.state.update()
      },
      check: (indexA: number, indexB: number) => {
        this.state.value.indexA = indexA
        this.state.value.indexB = indexB
        this.state.update()
      }
    })
  }
}
```

接下来，我们需要创建一个名为 MyElement 的 Omi 组件。在这个组件中，我们需要使用 Omi 的静态 css 属性来定义一些样式，如条形图的样式以及高亮的样式等。

```tsx
@tag('my-element')
class MyElement extends Component {
  static css = `
  .bar {
    display: inline-block;
    margin-left: 1px;
    background: #777;
    width: 10px;
  }
  
  .active {
    background: red;
  }
  `
}
```

在 MyElement 组件的渲染方法中，我们需要渲染一个包含条形图的 div 元素以及两个按钮元素。条形图的高度由数字数组中的元素值决定，如果当前索引等于比较中的索引，则条形图的背景色为红色。两个按钮分别用于开始冒泡排序和重置数字数组。

```tsx
render() {
  const { state } = this.store as Store
  return (
    <div>
      <div>
        {state.value.arr?.map((item: number, index: number) => (
          <div class={classNames('bar', {
            'active': index === state.value.indexA || index === state.value.indexB
          })} style={{ height: item * 10 }}></div>
        ))}
      </div>

      <button disabled={state.value.sorting} onClick={this.store?.sort}>开始冒泡排序</button>
      <button style="margin-left: 5px" disabled={state.value.sorting} onClick={this.store?.reset}>重置</button>
    </div>
  )
}
```

为了实现冒泡排序的可视化，我们需要在 Store 类的 bubbleSort 方法中暂停一段时间，以便用户可以观察到数组中元素的交换过程。我们可以使用 setTimeout 函数和 Promise 来实现这个功能。


```tsx
async bubbleSort(arr: number[], options: { done: Function; check: Function }) {
  const max = arr.length - 1
  for (let j = 0; j < max; j++) {
    let done = true
    for (let i = 0; i < max - j; i++) {
      options.check(i, i + 1)
      if (arr[i] > arr[i + 1]) {
        await this.swap(arr, i, i + 1)
        done = false
      }
    }
    if (done) {
      options.done(arr)
      break
    }
  }
  return arr
}

async swap(arr: number[], indexA: number, indexB: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      const temp = arr[indexA]
      arr[indexA] = arr[indexB]
      arr[indexB] = temp
      resolve(true)
    }, 20)
  })
}
```

当用户点击开始冒泡排序按钮时，我们需要调用 Store 类的 sort 方法来进行排序。排序过程中，我们需要不断更新比较中的索引以及数组的状态。当排序完成时，我们需要将比较中的索引重置为 -1，并将排序状态设置为 false。

当用户点击重置按钮时，我们需要调用 Store 类的 reset 方法来重新生成一个数字数组，并重置相关的状态。

最后，我们需要使用 Omi 的 render 方法将 MyElement 组件渲染到页面上。

```tsx
render(<my-element />, 'body')
```

## 总结

通过这个简单的例子，我们可以看到 Omi 框架如何帮助我们轻松地实现一个冒泡排序的可视化。Omi 的组件化、信号机制以及绑定等功能使得我们的代码更加模块化和易于维护。如果你对 Omi 框架感兴趣，可以查看其官方文档以了解更多信息。