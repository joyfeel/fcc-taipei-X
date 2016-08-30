import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import Header from './Header'
import styles from './style.css'

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Header />
        <div styleName='wrapper'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default CSSModules(App, styles)
