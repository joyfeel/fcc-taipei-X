import React from 'react'
import { Route, IndexRoute } from 'react-router'
// import App from './components/App'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import NotFound from './components/NotFound'

// export default function getRoutes(store) {
//   const ignoreWhenAuthenticated = (nextState, replace) => {
//     if (store.getState().auth.token) {
//       replace('/')
//     }
//   }
//
//   return (
//     <Route path='/' component={App}>
//       <IndexRoute component={Home} />
//       <Route path='/about' component={About} />
//       <Route path='/login' component={Login} onEnter={ignoreWhenAuthenticated} />
//       <Route path='*' component={NotFound} />
//     </Route>
//   )
// }
