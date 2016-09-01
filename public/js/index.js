import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, Router } from 'react-router'
import routes from './routes'
import configureStore from './store/configureStore'
import getRoutes from './routes'
import rootSaga from './sagas'
import '../css/main.scss'

// temp
// import App from './Containers/App';


const store = configureStore()
store.runSaga(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={getRoutes(store)} />
  </Provider>,
  // <App />,
  document.getElementById('main')
)
