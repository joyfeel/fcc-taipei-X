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
        <i className='search-3'>Search</i>
        <i className='noti-4'>Notification</i>
        <i className='member-4'>Profile</i>
        <i className='bookmark-2'>Bookmarks</i>
        <i className='setting-6'>Settings</i>
        <i className='chat-3'>Messenger(2)</i>
        <i className='logout-5' onClick={this.handleClickLogout}>Logout</i>
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
