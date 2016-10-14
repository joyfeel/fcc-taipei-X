import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cx from 'classnames'
import SignInSocialIcon from './SignInSocialIcon'
import SignFormEmail from '../Shared/SignFormEmail'
import SignFormPassword from '../Shared/SignFormPassword'
import SubmitBtn from '../Shared/SubmitBtn'
import * as AuthActions from '../../actions/auth'
import * as OauthActions from '../../actions/oauth'

class SignInForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mailToggle: true
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMailClick = this.handleMailClick.bind(this)
    this.onResize = this.onResize.bind(this)
    this.handleOauthClick = this.handleOauthClick.bind(this)
  }
  initWindowSize() {
    if (window.innerWidth < 400) {
      this.setState({
        emailToggle: false
      })
    }
  }
  onResize() {
    this.initWindowSize()
  }
  componentDidMount() {
    window.addEventListener('resize', this.onResize, false)
    this.initWindowSize()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }
  handleSubmit(e) {
    e.preventDefault()
    const email = e.target.email.value.trim()
    const password = e.target.password.value.trim()
    this.props.auth.signInRequest({ email, password })
  }
  handleMailClick(e) {
    e.preventDefault()
    this.setState({
      emailToggle: !this.state.emailToggle
    })
  }
  handleOauthClick(provider) {
    this.props.oauth.oauthRequest(provider)
  }
  render() {
    const emailToggleFlex = cx({ 'flex': this.state.emailToggle })
    const emailToggleOn = cx({ 'on': this.state.emailToggle })

    return (
      <form className='sign-in-form' onSubmit={this.handleSubmit}>
        <p className='sign-in-indicated'>Choosing 1 of these icons to sign in</p>
        <SignInSocialIcon onMailClick={this.handleMailClick} onOauthClick={this.handleOauthClick} />
        <SignFormEmail toggleEmail={emailToggleFlex} />
        <SignFormPassword toggleEmail={emailToggleFlex} />
        <SubmitBtn txt={'SIGN IN'} toggleEmail={emailToggleOn} />
        <a href="" className={`forget-ps ${emailToggleOn}`} alt='forget password'>forget password?</a>
        <p className='note'>@meet created by Wesley, Joey, Ching, Cha, Doma</p>
      </form>
    )
  }
}

SignInForm.propTypes = {
  dispatch: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: bindActionCreators(AuthActions, dispatch),
    oauth: bindActionCreators(OauthActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(SignInForm)
