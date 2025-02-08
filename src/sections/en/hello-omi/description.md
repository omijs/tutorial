# Getting started

Welcome to OMI tutorial!

The goal of this tutorial is to let you quickly experience the use of Omi to develop **cross framework components** or build **entire applications**, using jsx/tsx you are familiar with.

## Preconditions

This tutorial assumes that you are basically familiar with HTML, CSS, javascript/typescript, and jsx/tsx.

## Hello Omi

Import dependencies from omi:

```tsx
import { tag, render, h, Component } from 'omi'
```

Declare custom element label name:

```tsx
@tag('hello-omi')
```

Define custom element:

```tsx
class HelloOmi extends Component {
  render(props) {
    return (
      <div id="app">
        <h1>Hello {props.msg}!</h1>
      </div>
    )
  }
}
```

Render custom elements to body:
```tsx
render(<hello-omi msg='Omi' />, 'body')
```

Because it is a standard custom element, you can directly use the DOM API to achieve the same effect as above:

```tsx
document.body.appendChild(document.creatElement('hello-omi'))
```

## Define Stateful Application

```tsx
import { tag, Component, h, render, signal } from 'omi'

const count = signal(0)

@tag('hello-omi')
class HelloOmi extends Component {
  render(props) {
    return (
      <>
        <h1>Hello {props.msg}!</h1>
        {count.value}<button onClick={()=>count.value++}>+</button>
      </>
    )
  }
}

render(<hello-omi msg='Omi' />, 'body')
```

The change of `count.value` will automatically update the component.

Congratulations on getting started!


