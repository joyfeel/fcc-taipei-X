import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'

export default function getRoutes(store) {
  return (
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/about' component={About} />
      <Route path='/login' component={Login} />
    </Route>
  )
}
