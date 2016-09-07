import React, { Component } from 'react'
import Logo from '../components/Header/Logo'
import MemberPanel from '../components/Header/MemberPanel'
import Notification from '../components/Header/Notification'

const Header = () =>
  <header className="header">
    <div className="header-panel">
      <Logo />
      <MemberPanel />
      <Notification />
    </div>
  </header>

export default Header
