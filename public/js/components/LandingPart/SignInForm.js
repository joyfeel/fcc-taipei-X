import React, { Component } from 'react'


import SignInSocialIcon from './SignInSocialIcon'
import SignFormEmail from '../Shared/SignFormEmail'
import SignFormPassword from '../Shared/SignFormPassword'
import SubmitBtn from '../Shared/SubmitBtn'

const SignInForm = () =>
  <form className='sign-in-form'>
    <p className='sign-in-indicated'>Choosing 1 of these icons to sign in</p>

    <SignInSocialIcon />
    <SignFormEmail />
    <SignFormPassword />
    <SubmitBtn txt={'SIGN IN'} />

    <a href="" className='forget-ps' alt='forget password'>forget password?</a>
    <p className='note'>@meet created by Wesley, Joey, Ching, Cha, Doma</p>

  </form>

export default SignInForm
