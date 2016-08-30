import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'
import App from './containers/App'
import SignForm from './components/LandingPart/SignForm'
import SignInForm from './components/LandingPart/SignInForm'
import About from './components/About'
import AfterLogin from './components/LandingPart/AfterLogin'

export default function getRoutes(store) {
  const ignoreWhenAuthenticated = (nextState, replace) => {
    if (store.getState().auth.token) {
      replace('/')
    }
  }

  return (
    <Route path='/' component={App}>
      <IndexRedirect to='/signin' />
      <Route component={SignForm}>
        <Route path='/signin' component={SignInForm} />
        <Route path='/signup' component={About} />
      </Route>
      <Route component={AfterLogin}>
        <Route path='/afterlogin' component={About} />
      </Route>
    </Route>
  )
}
