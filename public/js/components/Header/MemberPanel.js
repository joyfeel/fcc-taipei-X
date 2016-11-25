import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import MemberAvatar from '../Shared/MemberAvatar'
import MemberNickname from '../Shared/MemberNickname'
import MemberMenu from './MemberMenu'

class MemberPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false,
    }
    this.childClickAvatar = this.childClickAvatar.bind(this)
    this.childClickSetMenuState = this.childClickSetMenuState.bind(this)
  }
  childClickAvatar(e){
    this.setState({
      showMenu: !this.state.showMenu,
    })
  }
  childClickSetMenuState() {
    this.setState({
      showMenu: false,
    })
  }
  render() {
    return (
      <div className='member-panel'>
        <MemberNickname nickname={this.props.profile.nickname} />
        <MemberAvatar
          avatar={this.props.profile.avatar}
          childClickAvatar={this.childClickAvatar}
          childClickSetMenuState={this.childClickSetMenuState}
        />
        <MemberMenu className={cx('member-menu', { on: this.state.showMenu })} />
      </div>
    )
  }
}

export default MemberPanel
