import React, { Component } from 'react'
import Header from './Header'

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Header />
        <div className='wrapper'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App
