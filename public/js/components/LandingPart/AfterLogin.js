import React, { Component } from 'react'

const AfterLogin = (props) =>
  <div>
    <h1>You have already logging</h1>
    {props.children}
  </div>

export default AfterLogin
