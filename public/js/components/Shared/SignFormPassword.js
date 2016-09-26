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
    const { toggleEmail, focus, blur, change } = this.props
    const { eyeToggle } = this.state

    return (
      <div className={cx('sign-form-password', toggleEmail)}>
        <input
          type={eyeToggle ? 'text' : 'password'}
          name='password'
          id='password'
          placeholder='password'
          className='password-input'
          maxLength='12'
          onFocus={focus}
          onBlur={blur}
          onChange={change}
        />
        <label className='password-icon' htmlFor='password'></label>
        <i className={cx(eyeToggle ? 'eye-opened' : 'eye-closed')} onClick={this.visible}></i>
      </div>
    )
  }
}

SignFormPassword.propTypes = {
  toggleEmail: PropTypes.string,
  focus: PropTypes.func,
  blur: PropTypes.func,
  change: PropTypes.func
}
SignFormPassword.defaultProps = {
  toggleEmail: null
}

export default SignFormPassword
