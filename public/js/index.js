import 'babel-polyfill'

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, Router, Route, Link, withRouter } from 'react-router'
import routes from './routes'
import configureStore from './store/configureStore'

import CounterContainer from './containers/CounterContainer'
import getRoutes from './routes';
import * as auth from './utils/auth'

import rootSaga from './sagas'
import '../css/main.scss'

// class Login extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       error: false
//     }
//
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }
//
//   handleSubmit(e) {
//     e.preventDefault()
//   }
//
//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label><input ref="email" placeholder="email" defaultValue="joybee210@gmail.com" /></label>
//         <label><input ref="pass" placeholder="password" defaultValue="p" /></label>(hint: ppp)<br />
//         <button type="submit">login</button>
//         {this.state.error && (
//           <p>Bad login information</p>
//         )}
//       </form>
//     )
//   }
// }
// Login = withRouter(Login)
//
// class About extends Component {
//   render() {
//     return <h1>About</h1>
//   }
// }
//
// class LinkToGithub extends Component {
//   render() {
//     return <a href="/v1/auth/github">Click me to login github</a>
//   }
// }

const store = configureStore()
store.runSaga(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={getRoutes(store)} />
  </Provider>,
  document.getElementById('main')
)

/*
<Route path="/" component={App}>
  <Route path="login" component={Login} />
  <Route path="about" component={About} />
  <Route path="github" component={LinkToGithub} />

  <Route path="logout" component={Logout} />
  <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
</Route>
*/
