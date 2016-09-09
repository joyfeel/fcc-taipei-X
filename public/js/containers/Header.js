import React, { Component } from 'react'
import { connect } from 'react-redux'
import Logo from '../components/Header/Logo'
import MemberPanel from '../components/Header/MemberPanel'
import Notification from '../components/Header/Notification'

const Header = (props) =>
  <header className="header">
    <div className="header-panel login">
      <Logo />
      <MemberPanel profile={props.profile} />
      <Notification />
    </div>
  </header>

const mapStateToProps = (state) => {
  const { isFetching, profile } = state.auth
  return {
    profile,
    isFetching
  }
}

export default connect(mapStateToProps)(Header)
