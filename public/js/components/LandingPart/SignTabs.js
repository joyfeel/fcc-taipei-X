import React, { Component } from 'react'
import { Link } from 'react-router'


const SignTabs = () =>
  <div className='sign-tabs'>
    <Link to='/signin' className='tab-sign-in' activeClassName='active'>sign in</Link>
    <Link to='/signup' className='tab-sign-up' activeClassName='active'>sign up</Link>
  </div>




export default SignTabs
