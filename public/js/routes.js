import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import SignForm from './components/LandingPart/SignForm'
import SignInForm from './components/LandingPart/SignInForm'
import SignUpForm from './components/LandingPart/SignUpForm'
import AfterLogin from './containers/AfterLogin'
import VerifyToken from './components/LandingPart/VerifyToken'
import About from './components/About'
import auth from './utils/auth'

export default function getRoutes(store) {
  const tokenNotExist = (nextState, replace) => {
    if (!auth.loggedIn()) {
      replace('/signin')
    }
  }
  const tokenExist = (nextState, replace) => {
    if (auth.loggedIn()) {
      replace('/')
    }
  }

  return (
    <Route path='/' component={App}>
      <IndexRoute component={AfterLogin} onEnter={tokenNotExist} />
      <Route component={SignForm} onEnter={tokenExist}>
        <Route path='/signin' component={SignInForm} />
        <Route path='/signup' component={SignUpForm} />
        <Route path='/verifyToken' component={VerifyToken} />
      </Route>
      <Route onEnter={tokenNotExist}>
        <Route path='/about' component={About} />
      </Route>
    </Route>
  )
}
