import React, { Component } from 'react'
import UploadAvatar from './UploadAvatar'
import SignUpInputs from './SignUpInputs';

import SignFormNickname from '../Shared/SignFormNickname'
import SignFormEmail from '../Shared/SignFormEmail'
import SignFormPassword from '../Shared/SignFormPassword'
import SubmitBtn from '../Shared/SubmitBtn'


const SignUpForm = () =>
  <form className='sign-up-form'>
    <UploadAvatar />
    <SignFormNickname />
    <SignFormEmail />
    <SignFormPassword />
    <SubmitBtn txt={'SIGN UP'}/>
    <p className='signup note'>@meet created by Wesley, Joey, Ching, Cha, Doma</p>

  </form>

export default SignUpForm
