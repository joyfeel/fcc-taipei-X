import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './style.css';

import MemberAvatar from '../MemberAvatar/';
import MemberNickname from '../MemberNickname/';

const MemberPanel = () =>
<div styleName="member-panel">
  <MemberNickname />
  <MemberAvatar />
</div>


// export default MemberPanel
export default CSSModules(MemberPanel, styles)
