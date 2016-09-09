import React, { Component } from 'react'
import SubmitBtn from './SubmitBtn';
import SignFormEmail from './SignFormEmail';


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

        <p className='description'>this account doesn't exist.</p>
        <SubmitBtn txt={'OK'}/>
      </div>
    </div>
  )}
}


const data = {
  name : 'activate-success-popup',
  txt: ''
}


//activate-success-popup
//congratulation! register successful.

//activate-email-send-popup
//check your mailbox to get a registerd mail from @meet. &#9786;

//forget-ps-popup
//check your mailbox to get our confirm letter. &#9989;

//sign-in-error-popup
//invalid email or password. &#8264;

//network-error-popup
//network error.

//repeated-register-popup
//This email has been registered.

//not-exist-popup
//This account doesn't exist.

//email-input-popup   ,{txt='SEND'}


export default Popup
