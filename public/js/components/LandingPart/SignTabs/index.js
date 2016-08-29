import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router'
import CSSModules from 'react-css-modules';
import styles from './style.css';

const SignTabs = () =>
  <div styleName='sign-tabs'>
    {/* <Link to='/'>sign in</Link> */}
    {/* <Link to='/signup'>sign up</Link> */}
    <a href="" alt="" styleName='tab-sign-in'>sign in</a>
    <a href="" alt="" styleName='tab-sign-up'>sign up</a>
  </div>


  export default CSSModules(SignTabs, styles)
