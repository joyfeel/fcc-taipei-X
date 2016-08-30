import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './style.css'

const MemberNickname = () =>
  <span styleName="member-nickname">
    <span>Hi,&nbsp;</span>
      Don Corleone
  </span>

export default CSSModules(MemberNickname, styles)
