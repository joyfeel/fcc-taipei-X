import React, { Component } from 'react'
import cx from 'classnames'

const SignFormEmail = (props) =>
  <div className={`sign-form-email ${props.toggleEmail}`}>
    <input type="email" name="email"  id="email" placeholder='email' className="email-input" />
    <label className='email-icon' htmlFor="email"></label>
  </div>

export default SignFormEmail
