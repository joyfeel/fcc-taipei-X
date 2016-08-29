import React, { Component } from 'react';
// import { Route, IndexRoute } from 'react-router'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router'


import CSSModules from 'react-css-modules';
import styles from './style.css';

import SignTabs from '../SignTabs/';
import SignInForm from '../SignInForm';
// import SignUp from '../SignUp';



// class SignFormRoute extends Component {
//   render() {
//     return (
//       <Router history={ browserHistory }>
//         <Route path='/' component={SignForm}>
//           <IndexRoute component={SignIn} />
//           <Route path='signup' component={SignUp} />
//           {/* <Route path='*' component={NotFound} /> */}
//         </Route>
//       </Router>
//   )}
// }


// const SignForm = (props) =>
//   <div styleName='sign-form'>
//     <signTab />
//     {props.children}
//   </div>


  const SignForm = () =>
    <div styleName='sign-form'>
      <h2 className='sr'>sign in and sign up panels</h2>
      <SignTabs />
      <SignInForm />
    </div>



// export default CSSModules(SignFormRoute, styles)
export default CSSModules(SignForm, styles)
