import React, { Component } from 'react'


import SignInSocialIcon from './SignInSocialIcon'
import SignInInputs from './SignInInputs'

const SignInForm = () =>
  <form>
    <p className='sign-in-indicated'>Choosing 1 of these icons to sign in</p>

    <SignInSocialIcon />
    <SignInInputs />

    <p className='note'>@meet created by Wesley, Joey, Ching, Cha, Doma</p>

  </form>

export default SignInForm
