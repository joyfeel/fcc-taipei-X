//mongod --dbpath ~/data/db/
import Koa from 'koa'
import convert from 'koa-convert'
import path from 'path'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'

import serve from 'koa-static'
import historyApiFallback from 'koa-connect-history-api-fallback'

import webpack from 'webpack'
import WebpackDevMiddleware from "koa-webpack-dev-middleware"
import WebpackHotMiddleware from "koa-webpack-hot-middleware"
import webpackConfig from '../webpack.config'

import jwt from 'koa-jwt'

import Router from 'koa-router'
import signupRouter from '../server/router/signup'
import signinRouter from '../server/router/signin'
import memberRouter from '../server/router/members'
import reportRouter from '../server/router/reports'
import accountSettingsRouter from '../server/router/account-settings'
import forgotPasswordRouter from '../server/router/forgot-password'
import resetPasswordRouter from '../server/router/reset-password'
import googleRouter from '../server/router/auth/google'
import githubRouter from '../server/router/auth/github'

import './config/database'
import Config from './config'

const app = new Koa()

app.use(async(ctx, next) => {
  try {
    await next()
    const status = ctx.status || 404
    if (status === 404) {
      ctx.throw(404)
    }
  } catch (err) {
    //console.log(err.message)  //real error message
    //console.log(err.status)   //status code
    //console.log(err.name)     //status code name
    ctx.status = err.status || 500
    ctx.body = {
      status: 'error',
      errors: {
        message: err.message
      }
    }
    if (ctx.status >= 500) {
      ctx.app.emit('internalError', err, ctx)
    }
  }
})

app.on('internalError', (err, ctx) => {
  console.log(err)
  console.log('Maybe someone is hacking your server')
})

//app.use(logger())
app.use(convert(bodyParser()))
app.use(convert(historyApiFallback({
  verbose: false
})))

const compiler = webpack(webpackConfig)
app.use(convert(WebpackDevMiddleware(compiler, {
  hot: true,
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  historyApiFallback: true
})))

app.use(convert(WebpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
})))

//app.use('/api', expressJwt({secret: secret}).unless({path: new RegExp('/api\/public.*/', 'i') }))
app.use(serve(__dirname + '/../public'))
app.use(convert(jwt({
  secret: process.env.JWT_SECRET
  //credentialsRequired: false,
  // getToken: function(req) {
  //   console.log(req)
  //   console.log('...............?')
  // }
}).unless({
  path: [
    '/v1/signin',
    '/v1/signup',
    new RegExp('/v1\/signup.*/', 'i'),
    '/v1/auth/google',
    '/v1/auth/google/callback',
    '/v1/auth/github',
    '/v1/auth/github/callback',
    '/v1/forgot_password',
    //'/v1/reset_password',
    '/v1/reports',
    '/favicon.ico'
  ]
})))

app.use(signupRouter.routes())
app.use(signupRouter.allowedMethods({
  throw: true
}))
app.use(signinRouter.routes())
app.use(signinRouter.allowedMethods({
  throw: true
}))
app.use(memberRouter.routes())
app.use(memberRouter.allowedMethods({
  throw: true
}))
app.use(reportRouter.routes())
app.use(reportRouter.allowedMethods({
  throw: true
}))
app.use(accountSettingsRouter.routes())
app.use(accountSettingsRouter.allowedMethods({
  throw: true
}))
app.use(forgotPasswordRouter.routes())
app.use(forgotPasswordRouter.allowedMethods({
  throw: true
}))
app.use(resetPasswordRouter.routes())
app.use(resetPasswordRouter.allowedMethods({
  throw: true
}))
app.use(googleRouter.routes())
app.use(googleRouter.allowedMethods({
  throw: true
}))
app.use(githubRouter.routes())
app.use(githubRouter.allowedMethods({
  throw: true
}))

app.listen(Config.port, () => {
  console.log(`listening on port ${Config.port}`)
})

export default app
