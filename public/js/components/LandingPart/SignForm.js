import React, { Component } from 'react'
import SignTabs from './SignTabs'





const SignForm = (props) =>
  <div className='sign-form'>
    <SignTabs />
    {props.children}
  </div>

export default SignForm
