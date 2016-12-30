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
    this.handlePopupClickConfirm = this.handlePopupClickConfirm.bind(this)
    this.handlePopupClickCancel = this.handlePopupClickCancel.bind(this)
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
  strategyPopupAction() {
    return {
      'email-input-popup': () => {
        const { email } = this.state
        return this.props.auth.forgetPSRequest(email)
      },
      'delete-post-popup': () => {
        const { id, title, content } = this.props.popupMsg
        return this.props.post.deletePostRequest({ id, title, content })
      },
    }
  }
  handlePopupClickConfirm(e) {
    e.preventDefault()
    const { icon } = this.props.popupMsg
    this.strategyPopupAction()[icon]()
    this.handlePopupClickCancel(e)
  }
  handlePopupClickCancel(e) {
    e.preventDefault()
    this.setState({ offPopup: true, email: null })
    this.props.popup.popupClose()
  }
  render() {
    const { icon, message, btnTxt } = this.props.popupMsg
    const { valid } = this.state

    return (
      <div className={cx('popup', { off: this.state.offPopup })}>
        <div className='popup-panel'>
          <span className='cancel' onClick={this.handlePopupClickCancel}></span>
          <i className={icon}></i>
          <SignFormEmail
            focus={this.detectEmailState}
            blur={this.detectEmailState}
            change={this.detectEmailState}
            keydown={this.detectEmailState}
          />
          <p className='description'>{message}</p>
          <SubmitBtn txt={btnTxt} onClick={this.handlePopupClickConfirm} valid={valid} />
          <button className='cancel-btn' onClick={this.handlePopupClickCancel}>NO</button>
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

Popup.propTypes = {
  popupMsg: PropTypes.object.isRequired,
  isPopup: PropTypes.bool.isRequired,
  btnTxt: PropTypes.string
}

Popup.defaultProps = {
  popupMsg: null
}

export default connect(null, mapDispatchToProps)(Popup)
