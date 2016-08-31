import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './style.css'
import MemberAvatar from '../MemberAvatar'
import MemberNickname from '../MemberNickname'

const MemberPanel = () =>
  <div styleName="member-panel-login">
    <MemberNickname />
    <MemberAvatar />
  </div>

export default CSSModules(MemberPanel, styles)
