# Implementing Bubble Sort Visualization with Omi Framework

In this article, we will demonstrate how to implement a simple bubble sort visualization using the Omi framework. We will use some of the core features of Omi, such as components, signals, bindings, and more, to build a simple bubble sort application.

## Implementing Bubble Sort Visualization

First, we need to create a Store class to store the application's state. In this example, we need to store a randomly generated array of numbers, two indices for comparison, and a boolean value indicating whether sorting is in progress. We also need to implement some methods in the Store class, such as initialization, reset, and sorting.

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

Next, we need to create an Omi component named MyElement. In this component, we need to use Omi's static css property to define some styles, such as the bar chart style and the highlight style.

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

In the render method of the MyElement component, we need to render a div element containing a bar chart and two button elements. The height of the bar chart is determined by the element values in the array of numbers. If the current index is equal to the index in comparison, the background color of the bar chart is red. The two buttons are used for starting the bubble sort and resetting the array of numbers.

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

      <button disabled={state.value.sorting} onClick={this.store?.sort}>Start Bubble Sort</button>
      <button style="margin-left: 5px" disabled={state.value.sorting} onClick={this.store?.reset}>Reset</button>
    </div>
  )
}
```

To implement the visualization of the bubble sort, we need to pause for a while in the bubbleSort method of the Store class so that users can observe the swapping process of the elements in the array. We can use the setTimeout function and Promise to achieve this feature.

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

When the user clicks the "Start Bubble Sort" button, we need to call the sort method of the Store class to perform the sorting. During the sorting process, we need to continuously update the indices in comparison and the state of the array. When the sorting is complete, we need to reset the indices in comparison to -1 and set the sorting state to false.

When the user clicks the "Reset" button, we need to call the reset method of the Store class to regenerate an array of numbers and reset the related state.

Finally, we need to use Omi's render method to render the MyElement component on the page.

```javascript
render(<my-element />, 'body')
```

## Conclusion

Through this simple example, we can see how the Omi framework helps us easily implement a bubble sort visualization. Omi's componentization, signal mechanism, and binding features make our code more modular and maintainable. If you are interested in the Omi framework, you can check out its official documentation for more information.