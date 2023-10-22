import { tag, Component, h, render } from 'omi'

@tag('hello-omi')
class HelloOmi extends Component {
  render(props) {
    return (
      <div id="app">
        <h1>Hello {props.msg}!</h1>
      </div>
    )
  }
}

render(<hello-omi msg='Omi' />, 'body')