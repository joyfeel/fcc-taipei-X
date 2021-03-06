import React, { Component, PropTypes } from 'react'
import cx from 'classnames'

const SignFormEmail = ({ toggleEmail, focus, blur, change, keydown }) =>
  <div className={cx('sign-form-email', toggleEmail)}>
    <input
      type='email'
      name='email'
      id='email'
      placeholder='email'
      className='email-input'
      onFocus={focus}
      onBlur={blur}
      onChange={change}
      onKeyDown={keydown}
    />
  <label className='email-icon' htmlFor='email'></label>
  </div>

SignFormEmail.propTypes = {
  toggleEmail: PropTypes.string,
  focus: PropTypes.func,
  blur: PropTypes.func,
  change: PropTypes.func,
  keydown: PropTypes.func
}
SignFormEmail.defaultProps = {
  toggleEmail: null,
  keydown: null
}

export default SignFormEmail
