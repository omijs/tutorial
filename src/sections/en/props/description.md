## Props

Transfer data to sub elements through props, such as:

```jsx
import { Component, define, render } from 'omi'

define('my-element', class extends Component {
  render(props) {
    return (
      <h1>Hello, {props.name}!</h1>
    )
  }
})
```

Using element:

```jsx
<my-element name="world"></my-element>
```

You can also pass any type of data to props:

```jsx
define('my-element', class extends Component {
  render(props) {
    return (
      <h1>Hello, {props.myObj.name}!</h1>
    )
  }
})
```

Using element:

```jsx
<my-element myObj={{ name: 'world' }}></my-element>
```

You can set the default value by the `static defaultProps` property，use `static propTypes` to set the type:

```jsx
define('my-element', class extends Component {
  static defaultProps = {
    name: 'Omi',
    myAge: 18
  }

  static propTypes = {
    name: String,
    myAge: Number
  }
  
  render(props) {
    return (
      <h1>Hello, {props.name}! Age {props.myAge}</h1>
    )
  }
})
```

Special attention should be paid to adding `static propTypes` if your custom elements want to be used directly in other frameworks or without frameworks. For example, it can be used directly in the body:

```html
<body>
  <my-element name="dntzhang" my-age="20"></my-element>
</body>
```

### Once Props

```jsx
define('my-element', class extends Component {
  install() {
    this.name = this.props.name
  }

  render() {
    return (
      <h1>Hello, {this.name}!</h1>
    )
  }
})
```

Next time the parent component updated and changed props, it will not affect the component.
