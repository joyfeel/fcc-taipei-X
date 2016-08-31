import React, { Component } from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './style.css'

const Logo = () =>
  <h1>
    <Link to='/' styleName="logo-login">@meet, MEET ALL YOUR NEED.</Link>
  </h1>

export default CSSModules(Logo, styles)
