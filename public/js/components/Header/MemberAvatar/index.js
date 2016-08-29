import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './style.css';

const MemberAvatar = () => <img src="images/_mado.jpg" styleName='member-avatar' alt="member-avatar" />

export default CSSModules(MemberAvatar, styles)

//member-avatar-login
