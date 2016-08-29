import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './style.css';

import Logo from '../../components/Header/Logo/';
import MemberPanel from '../../components/Header/MemberPanel/';
import Notification from '../../components/Header/Notification/';


const Header = () =>
<header styleName="header">
  <div styleName="header-panel-login">
    <Logo />
    <MemberPanel />
    <Notification />
  </div>
</header>

export default CSSModules(Header, styles)


 //header-panel, header-panel-login
