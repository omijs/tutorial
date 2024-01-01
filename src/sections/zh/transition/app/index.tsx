import { tag, render, h, Component } from 'omi'
import 'omi-transition'

@tag('my-app')
class MyApp extends Component {
  static css = `
    .fade-leave-to,
    .fade-enter-from {
      opacity: 0;
      transform: translateX(15px);
    }

    .fade-leave-active,
    .fade-enter-active {
      transition: all 500ms ease-in;
    }`

  show = true
  list = ['ItemA', 'ItemB', 'ItemC', 'ItemD', 'ItemE']

  toggle = () => {
    this.show = !this.show
    this.update()
  }

  render() {
    return (
      <>
        <button onClick={this.toggle}>Toggle</button>

        <o-transition show={this.show} name="fade">
          <h4>OMI</h4>
        </o-transition>

        <ul>
          {this.list.map((item, index) => (
            <o-transition show={this.show} name="fade" delay={(index + 1) * 300}>
              <li>{item}</li>
            </o-transition>
          ))}
        </ul>
      </>
    )
  }
}

render(<my-app />, 'body')
