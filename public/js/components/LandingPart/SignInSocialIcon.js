import React, { Component } from 'react'

const SignInSocialIcon = (props) =>
  <div className='sign-in-social-icon'>
    <a href="" className='facebook' alt='facebook'></a>
    <a href="" className='twitter' alt='twitter'></a>
    <a href="" className='g-plus' alt='google-plus'></a>
    <a href="" className='github' alt='github'></a>
    <a href="" className='email' alt='email' onClick={props.onMailClick}></a>
  </div>

export default SignInSocialIcon
