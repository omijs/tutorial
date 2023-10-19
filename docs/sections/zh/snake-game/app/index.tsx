import { render, h } from 'omi'
import './snake-game'
import store from './store'

render(<snake-game />, 'body', store)
