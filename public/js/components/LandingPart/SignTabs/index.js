import React, { Component } from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './style.css'

const SignTabs = () =>
  <div styleName='sign-tabs'>
    <Link to='/signin' styleName='tab-sign-in'>sign in</Link>
    <Link to='/signup' styleName='tab-sign-up'>sign up</Link>
  </div>

export default CSSModules(SignTabs, styles)
