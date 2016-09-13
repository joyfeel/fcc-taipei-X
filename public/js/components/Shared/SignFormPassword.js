import React, { Component, PropTypes } from 'react'
import cx from 'classnames'

class SignFormPassword extends Component {
  constructor(props) {
    super(props)
    this.state = { eyeToggle : false }
    this.visible = this.visible.bind(this)
  }
  visible() {
    this.setState({ eyeToggle : !this.state.eyeToggle })
  }
  render() {
    const { eyeToggle } = this.state
    const eyeClasses = cx({
      'eye-opened': eyeToggle,
      'eye-closed': !eyeToggle
    })
    const passwordClasses = cx(
      'sign-form-password',
      this.props.toggleEmail
    )

    return (
      <div className={passwordClasses}>
        <input type={eyeToggle ? 'text' : 'password'} name='password' id='password' placeholder='password' className='password-input' />
        <label className='password-icon' htmlFor='password'></label>
        <i className={eyeClasses} onClick={this.visible}></i>
      </div>
    )
  }
}

SignFormPassword.propTypes = {
  toggleEmail: PropTypes.string
}
SignFormPassword.defaultProps = {
  toggleEmail: null
}

export default SignFormPassword
