import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { signInRequest } from '../../actions'
import SignInSocialIcon from './SignInSocialIcon'
import SignFormEmail from '../Shared/SignFormEmail'
import SignFormPassword from '../Shared/SignFormPassword'
import SubmitBtn from '../Shared/SubmitBtn'

class SignInForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mailToggle: true
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMailClick = this.handleMailClick.bind(this)
    this.onResize = this.onResize.bind(this)
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
    this.props.dispatch(signInRequest({ email, password }))
  }
  handleMailClick(e) {
    e.preventDefault()
    this.setState({
      emailToggle: !this.state.emailToggle
    })
  }
  render() {
    const emailToggleFlex = cx({ 'flex': this.state.emailToggle})
    const emailToggleOn = cx({'on' : this.state.emailToggle})
    console.log(emailToggleFlex, emailToggleOn)
    return (
      <form className='sign-in-form' onSubmit={this.handleSubmit}>
        <p className='sign-in-indicated'>Choosing 1 of these icons to sign in</p>
        <SignInSocialIcon onMailClick={this.handleMailClick} />
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

export default connect()(SignInForm)
