import React, { Component } from 'react'
import { Link } from 'react-router'

const Logo = () =>
  <h1>
    <Link to='/' className="logo">@meet, MEET ALL YOUR NEED.</Link>
    {/* <a href='' className='logo' alt=''>@meet, MEET ALL YOUR NEED.</a> */}
  </h1>

export default Logo
