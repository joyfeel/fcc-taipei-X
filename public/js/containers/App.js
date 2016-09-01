import React, { Component } from 'react'
import Header from './Header'

//temp
import SignForm from '../components/LandingPart/SignForm'


class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Header />
        <div className='wrapper'>
          <SignForm />
          {/* {this.props.children} */}
        </div>
      </div>
    )
  }
}

export default App
