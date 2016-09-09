import React, { Component } from 'react'
import Header from './Header'
import Loading from '../components/Shared/Loading'
import Popup from '../components/Shared/Popup'

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Header />
        <div className='wrapper mask'>
          {this.props.children}
        </div>
        <Loading />
        <Popup />
      </div>
    )
  }
}

export default App
