import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, Router } from 'react-router'
import routes from './routes'
import configureStore from './store/configureStore'
import CounterContainer from './containers/CounterContainer'
import getRoutes from './routes'
import rootSaga from './sagas'
// import '../css/main.css'

// const store = configureStore()
// store.runSaga(rootSaga)
//
// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={browserHistory} routes={getRoutes(store)} />
//   </Provider>,
//   document.getElementById('main')
// )
