import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './style.css'
import SignTabs from '../SignTabs'

const SignForm = (props) =>
  <div styleName='sign-form'>
    <SignTabs />
    {props.children}
  </div>

export default CSSModules(SignForm, styles)
