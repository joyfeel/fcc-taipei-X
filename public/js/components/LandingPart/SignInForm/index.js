import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './style.css'
import SignInSocialIcon from '../SignInSocialIcon'
import SignInInputs from '../SignInInputs'

const SignInForm = () =>
  <form>
    <p styleName='sign-in-indicated'>Choosing 1 of these icons to sign in</p>

    <SignInSocialIcon />
    <SignInInputs />

    <p styleName='note'>@meet created by Wesley, Joey, Ching, Cha, Doma</p>

  </form>

export default CSSModules(SignInForm, styles)
