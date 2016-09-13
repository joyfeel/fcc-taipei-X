import React, { Component, PropTypes } from 'react'
import cx from 'classnames'

const SignFormEmail = (props) =>
  <div className={cx('sign-form-email', props.toggleEmail)}>
    <input type="email" name="email"  id="email" placeholder='email' className="email-input" />
    <label className='email-icon' htmlFor="email"></label>
  </div>

SignFormEmail.propTypes = {
  toggleEmail: PropTypes.string
}
SignFormEmail.defaultProps = {
  toggleEmail: null
}

export default SignFormEmail
