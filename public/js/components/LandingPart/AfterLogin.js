import React, { Component } from 'react'
import { Link } from 'react-router'

const AfterLogin = (props) =>
  <div>
    <h1>You have already logged</h1>
    <Link to='/about'>about</Link>
    {props.children}
  </div>

export default AfterLogin
