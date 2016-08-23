import React, { Component } from 'react'
// import Header from './Header';
// import Footer from './Footer';

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <Header />
//         {this.props.children}
//         <Footer />
//       </div>
//     )
//   }
// }

import CSSModules from 'react-css-modules';
// import styles from "../../css/main.css";
import Header from './containers/Header/';
import Wrapper from './containers/Wrapper/';
// import Logo from './Logo/Logo';
// import styles from "../../css/header.css";
// import styles from "../../css/logo.css";

// import styles from '../../css/icomoon.css';


const App = () => {
  return (
  <div>
    <Header />
    <Wrapper />
  </div>
  )
}


export default App
