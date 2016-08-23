import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './style.css';


const Notification = () =>
  <div styleName="notification">9</div>


// export default Notification
export default CSSModules(Notification, styles)
