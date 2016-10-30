import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import Logo from '../components/Header/Logo'
import MemberPanel from '../components/Header/MemberPanel'
import Notification from '../components/Header/Notification'

const Header = (props) => {
  const { profile, filter } = props
  const headerPanelClasses = cx({
    'header-panel': true,
    'login': profile.token
  })

  return (
    <header className={cx('header',{ mask: filter })}>
      <div className={headerPanelClasses}>
        <Logo />
        <MemberPanel profile={profile} />
        <Notification />
      </div>
    </header>
  )
}

const mapStateToProps = (state) => {
  const { isFetching, profile } = state.auth
  return {
    profile,
    isFetching
  }
}

export default connect(mapStateToProps)(Header)
