import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './style.css';

import SignFormRoute from '../../components/LandingPart/SignForm';


const Wrapper = () =>
  <div styleName='wrapper'>
    <SignFormRoute />
  </div>


export default CSSModules(Wrapper, styles)
