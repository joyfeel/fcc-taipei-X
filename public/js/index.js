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


const store = configureStore()
store.runSaga(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={getRoutes(store)} />
  </Provider>,
  document.getElementById('main')
)
