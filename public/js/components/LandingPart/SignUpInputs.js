import React, { Component } from 'react'

const SignUpInputs = () =>
  <div className='sign-up-inputs'>
    <div className='sign-up-nickname'>
      <input type="text" name="nickname"  id="nickname" placeholder='nickname' className="nickname-input"/>
      <label className='nickname-icon' htmlFor="nickname"></label>
    </div>
    <div className='sign-up-email'>
      <input type="email" name="email"  id="email" placeholder='email' className="email-input"/>
      <label className='email-icon' htmlFor="email"></label>
    </div>
    <div className='sign-up-password'>
      <input type="password" name="password"  id="password" placeholder='password' className="password-input"/>
      <label className='password-icon' htmlFor="password"></label>
      <i className='eye-closed'></i>
    </div>
    <button className='submit' role='submit' disabled={true}>SIGN UP</button>
  </div>

export default SignUpInputs
