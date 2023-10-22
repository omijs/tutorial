import { tag, render, h, Component } from 'omi'

const markup = '<h3>Some HTML to render.</h3>'

@tag('my-element')
class MyElement extends Component {
  render() {
    return <div unsafeHTML={{ html: markup }}></div>
  }
}

render(<my-element />, 'body')