import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import Logo from '../components/Header/Logo'
import Slider from '../components/Header/Slider'
import MemberPanel from '../components/Header/MemberPanel'
import Notification from '../components/Header/Notification'

const Header = (props) => {
  const { profile, isPostformOpen } = props
  const headerPanelClasses = cx({
    'header-panel': true,
    'login': profile.token,
  })
  return (
    <header className={cx('header',{ mask: isPostformOpen })}>
      <div className={headerPanelClasses}>
        <Logo />
        {profile.token ? <MemberPanel profile={profile} /> : null}
        {profile.token ? <Notification /> : null}
      </div>
      <Slider />
    </header>
  )
}

const mapStateToProps = (state) => {
  const { profile } = state.auth
  return {
    profile,
  }
}

export default connect(mapStateToProps)(Header)
