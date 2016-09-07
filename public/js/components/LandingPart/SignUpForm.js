import React, { Component } from 'react'
import UploadAvatar from './UploadAvatar'
import SignUpInputs from './SignUpInputs';

const SignUpForm = () =>
  <form>
    <UploadAvatar />
    <SignUpInputs />

    <p className='signup note'>@meet created by Wesley, Joey, Ching, Cha, Doma</p>

  </form>

export default SignUpForm
