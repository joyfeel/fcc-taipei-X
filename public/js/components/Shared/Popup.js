import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cx from 'classnames'
import SubmitBtn from './SubmitBtn'
import SignFormEmail from './SignFormEmail'
import * as AuthActions from '../../actions/auth'

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
    const { btnTxt } = this.props.popupMsg
    if (btnTxt !== 'SEND') this.setState({ valid: false })
  }


  setUpEmailState(flag, val) {
    flag ? this.setState({email: val, valid: false}) : this.setState({valid: true})
  }
  detectEmailState(e) {
    const val  = e.target.value.trim()

    if(val.length > 0) {
      this.setUpEmailState(true, val)
    } else {
      this.setUpEmailState(false, undefined)
    }
  }

  handlePopupClick(e) {
    e.preventDefault()
    const btnClass = e.target.className
    const { btnTxt } = this.props.popupMsg
    const { email } = this.state

    if(btnTxt === 'SEND' && btnClass === 'submit-btn') {
      this.props.auth.forgetPSRequest({ email })
    }

    this.setState({ offPopup: true, email: null })
    this.props.auth.clearPopupMsg()
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
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: bindActionCreators(AuthActions, dispatch)
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
