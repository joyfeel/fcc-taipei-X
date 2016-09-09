import React, { Component } from 'react'

const SignInInputs = () =>
  <div className='sign-in-inputs'>
    <div className='sign-form-email'>
      <input type="email" name="email"  id="email" placeholder='email' className="email-input"/>
      <label className='email-icon' htmlFor="email"></label>
    </div>
    <div className='sign-form-password'>
      <input type="password" name="password"  id="password" placeholder='password' className="password-input"/>
      <label className='password-icon' htmlFor="password"></label>
      <i className='eye-closed'></i>
    </div>
    <button className='submit' role='submit' disabled={true}>SIGN IN</button>
    <a href="" className='forget-ps' alt='forget password'>forget password?</a>
  </div>

export default SignInInputs
