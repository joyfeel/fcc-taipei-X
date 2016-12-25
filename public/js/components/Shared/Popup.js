import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cx from 'classnames'
import SubmitBtn from './SubmitBtn'
import SignFormEmail from './SignFormEmail'
import * as AuthActions from '../../actions/auth'
import * as PopupActions from '../../actions/popup'
import * as PostActions from '../../actions/post'

class Popup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      offPopup: !this.props.isPopup,
      email: null,
      valid: true
    }
    this.handlePopupClick = this.handlePopupClick.bind(this)
    this.detectEmailState = this.detectEmailState.bind(this)
  }

  componentWillMount() {
    const { icon } = this.props.popupMsg
    if (icon !== 'email-input-popup') this.setState({ valid: false })
  }


  setUpEmailState(flag, val) {
    flag ? this.setState({email: val, valid: false}) : this.setState({valid: true})
  }
  detectEmailState(e) {
    const val  = e.target.value.trim()
    val.length > 0 ? this.setUpEmailState(true, val) : this.setUpEmailState(false, undefined)
  }

  handlePopupClick(e) {
    e.preventDefault()
    const btnClass = e.target.className
    const { icon } = this.props.popupMsg
    const { email } = this.state

    if(icon === 'email-input-popup' && btnClass === 'submit-btn') {
      this.props.auth.forgetPSRequest(email)
    }

    if(icon === 'delete-post-popup') {
      const { id, title, content } = this.props.popupMsg
      this.props.post.deletePostRequest({ id, title, content })
    }

    this.setState({ offPopup: true, email: null })
    this.props.popup.popupClose()
  }
  render() {
    const { icon, message, btnTxt } = this.props.popupMsg
    const { valid } = this.state

    return (
      <div className={cx('popup', { off: this.state.offPopup })}>
        <div className='popup-panel'>
          <span className='cancel' onClick={this.handlePopupClick}></span>
          <i className={icon}></i>
          <SignFormEmail
            focus={this.detectEmailState}
            blur={this.detectEmailState}
            change={this.detectEmailState}
            keydown={this.detectEmailState}
          />
          <p className='description'>
            {message}
          </p>
          <SubmitBtn txt={btnTxt} onClick={this.handlePopupClick} valid={valid} />
          <button className='cancel-btn' onClick={this.handlePopupClick }>NO</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: bindActionCreators(AuthActions, dispatch),
    popup: bindActionCreators(PopupActions, dispatch),
    post: bindActionCreators(PostActions, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Popup)

Popup.propTypes = {
  popupMsg: PropTypes.object.isRequired,
  isPopup: PropTypes.bool.isRequired,
  btnTxt: PropTypes.string
}

Popup.defaultProps = {
  popupMsg: null
}
