import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../../actions/auth'

class MemberMenu extends Component {
  constructor(props) {
    super(props)
    this.handleClickLogout = this.handleClickLogout.bind(this)
  }
  handleClickLogout() {
    this.props.auth.logoutRequest()
  }
  render() {
    return (
      <nav className={this.props.className}>
        <h2 className='sr'>
          Menu
        </h2>
        <i className='search-1'>Search</i>
        <i className='noti-1'>Notification</i>
        <i>Profile</i>
        <i className='bookmark-1'>Bookmark</i>
        <i className='setting-1'>Setting</i>
        <i>Online</i>
        <i className='logout-1' onClick={this.handleClickLogout}>Logout</i>
      </nav>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: bindActionCreators(AuthActions, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(MemberMenu)
