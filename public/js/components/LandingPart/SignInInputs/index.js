import React, { Component } from 'react'
import CSSModules from 'react-css-modules';
import styles from './style.css';


const SignInInputs = () =>
  <div styleName='sign-in-inputs-on'>

    <div styleName='email-account'>
      <input type="email" name="email"  id="email" placeholder='email' styleName="email-input"/>
      <label styleName='email-icon' htmlFor="email"></label>
    </div>

    <div styleName='password'>
      <input type="password" name="password"  id="password" placeholder='password' styleName="password-input"/>
      <label styleName='password-icon' htmlFor="password"></label>
      <i styleName='eye-opened'></i>
    </div>

    <button styleName='submit' role="submit" disabled={true}>sign in</button>
    <a href="" styleName='forget-ps' alt='forget password'>forget password</a>

  </div>


export default CSSModules(SignInInputs, styles)
