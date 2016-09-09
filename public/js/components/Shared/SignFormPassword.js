import React, { Component } from 'react'

const SignFormPassword = () =>
  <div className='sign-form-password'>
    <input type="password" name="password"  id="password" placeholder='password' className="password-input"/>
    <label className='password-icon' htmlFor="password"></label>
    <i className='eye-closed'></i>
  </div>


export default SignFormPassword
