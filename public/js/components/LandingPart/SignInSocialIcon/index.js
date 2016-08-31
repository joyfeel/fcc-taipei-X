import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './style.css'

const SignInSocialIcon = () =>
  <div styleName='sign-in-social-icon'>
    <a href="" styleName='facebook' alt='facebook'></a>
    <a href="" styleName='twitter' alt='twitter'></a>
    <a href="" styleName='g-plus' alt='google-plus'></a>
    <a href="" styleName='github' alt='github'></a>
    <a href="" styleName='email' alt='email'></a>
  </div>


export default CSSModules(SignInSocialIcon, styles)
