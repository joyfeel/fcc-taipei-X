import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './style.css';


const Logo = () =>
  <h1>
    <a href="" styleName="logo">@meet, meet your need.</a>
  </h1>


export default CSSModules(Logo, styles)
