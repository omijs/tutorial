import { tag, Component, render, h } from 'omi'

@tag('hello-omi')
class HelloOmi extends Component {
  static css = `span { color: #07c160 } `

  render(props) {
    return (
      <p>
        Hello, <span>{props.msg}</span>!
      </p>
    )
  }
}

render(<hello-omi msg="Omi" />, 'body')
