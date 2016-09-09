import React, { Component } from 'react'
import SubmitBtn from './SubmitBtn'
import SignFormEmail from './SignFormEmail'

class Popup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='popup off'>
        <div className='popup-panel'>
          <span className='cancel'></span>
          <i className='activate-success-popup'></i>
          <SignFormEmail />

          <p className='description'>The account does not exist.</p>
          <SubmitBtn txt={'OK'} />
        </div>
      </div>
  )}
}

export default Popup
