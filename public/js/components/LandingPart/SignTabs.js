import React, { Component } from 'react'
import { Link } from 'react-router'

const SignTabs = () =>
  <div className='sign-tabs'>
    <Link to='/signin' className='tab-sign-in' activeClassName='active'>SIGN IN</Link>
    <Link to='/signup' className='tab-sign-up' activeClassName='active'>SIGN UP</Link>
  </div>
  
export default SignTabs
