import { browserHistory } from 'react-router'

export function forwardTo (location) {
  browserHistory.push(location)
}
