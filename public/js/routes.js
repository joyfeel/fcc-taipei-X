import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'
import App from './containers/App'
import SignForm from './components/LandingPart/SignForm'
import SignInForm from './components/LandingPart/SignInForm'
import SignUpForm from './components/LandingPart/SignUpForm'
import AfterLogin from './components/LandingPart/AfterLogin'
import VerifyToken from './components/LandingPart/VerifyToken'
import About from './components/About'

export default function getRoutes(store) {
  const checkAuth = (nextState, replace) => {
    const { token } = store.getState().auth

    if (nextState.location.pathname !== '/afterlogin') {
      if (token) {
        if (nextState.location.state && nextState.location.pathname) {
          replace(nextState.location.pathname)
        }
        replace('/')
      }
    } else {
      if (!token) {
        if (nextState.location.state && nextState.location.pathname) {
          replace(nextState.location.pathname)
        }
        replace('/')
      }
    }
  }

  return (
    <Route path='/' component={App}>
      <Route onEnter={checkAuth}>
      <IndexRedirect to='/signin' />
        <Route component={SignForm}>
          <Route path='/signin' component={SignInForm} />
          <Route path='/signup' component={SignUpForm} />
          <Route path='/verifyToken' component={VerifyToken} />
        </Route>
        <Route component={AfterLogin}>
          <Route path='/afterlogin' component={About} />
        </Route>
      </Route>
    </Route>
  )
}
