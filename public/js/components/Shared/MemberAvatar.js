import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

class MemberAvatar extends Component {
  constructor(props) {
    super(props)
    this.onOutsideClick = this.onOutsideClick.bind(this)
  }
  onOutsideClick(e) {
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      this.props.childClickSetMenuState()
    }
  }
  render() {
    const { avatar, childClickAvatar } = this.props
    return (
      <img src={avatar} className='member-avatar' alt='member-avatar' onClick={childClickAvatar} />
    )
  }
  componentDidMount() {
    document.addEventListener('click', this.onOutsideClick, false)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.onOutsideClick, false)
  }
}

MemberAvatar.propTypes = {
  avatar: PropTypes.string.isRequired,
  childClickAvatar: PropTypes.func.isRequired,
  childClickSetMenuState: PropTypes.func.isRequired,
}

export default MemberAvatar
