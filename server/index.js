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
import cors from 'kcors'

import Router from 'koa-router'
import signupRouter from './router/member/signup'
import signinRouter from './router/member/signin'
import accountSettingsRouter from './router/member/account-settings'
import forgotPasswordRouter from './router/member/forgot-password'
import verifyTokenRouter from './router/member/verifyToken'
import googleRouter from './router/oauth/google'

import postRouter from './router/blog/posts'
import commentRouter from './router/blog/comments'

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
    // console.log(err.message)    //real error message
    // console.log(err.status)   //status code
    // console.log(err.name)     //status code name
    ctx.status = err.status || 500
    if (err.data && err.data.code) {
      ctx.body = {
        status: 'error',
        message: err.message,
        code: err.data.code
      }
    } else {
      ctx.body = {
        status: 'error',
        message: err.message,
        code: -1
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
app.use(convert(cors()))
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
    '/v1/signup',
    '/v1/signin',
    '/v1/forgot_password',
    '/v1/verifyToken',
    '/v1/auth/google',
    '/favicon.ico',
  ]
})))

//  /v1/signup
app.use(signupRouter.routes())
app.use(signupRouter.allowedMethods({
  throw: true
}))
//  /v1/signin
app.use(signinRouter.routes())
app.use(signinRouter.allowedMethods({
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
app.use(verifyTokenRouter.routes())
app.use(verifyTokenRouter.allowedMethods({
  throw: true
}))
app.use(googleRouter.routes())
app.use(googleRouter.allowedMethods({
  throw: true
}))

app.use(postRouter.routes())
app.use(postRouter.allowedMethods({
  throw: true
}))
app.use(commentRouter.routes())
app.use(commentRouter.allowedMethods({
  throw: true
}))

app.listen(Config.port, () => {
  console.log(`listening on port ${Config.port}`)
})

export default app
