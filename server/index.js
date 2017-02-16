//mongod --dbpath ~/data/db/
import 'babel-polyfill'
import Koa from 'koa'
import convert from 'koa-convert'
import path from 'path'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'

import historyApiFallback from 'koa-connect-history-api-fallback'

import jwt from 'koa-jwt'
import cors from 'kcors'

import Router from 'koa-router'
import signupRouter from './router/auth/signup'
import signinRouter from './router/auth/signin'
import accountSettingsRouter from './router/auth/account-settings'
import forgotPasswordRouter from './router/auth/forgot-password'
import verifyTokenRouter from './router/auth/verifyToken'
import facebookRouter from './router/oauth/facebook'
import twitterRouter from './router/oauth/twitter'
import googleRouter from './router/oauth/google'
import githubRouter from './router/oauth/github'

import postRouter from './router/blog/posts'
import commentRouter from './router/blog/comments'
import checkPostLimitRouter from './router/blog/checkPostLimit'

import './config/database'
import Config from './config'
import initialSocket from './socket'

const app = new Koa()
app.use(async(ctx, next) => {
  try {
    await next()
    const status = ctx.status || 404
    if (status === 404) {
      ctx.throw(404)
    }
  } catch (err) {
    // console.log(err.message)  //real error message
    // console.log(err.status)   //status code
    // console.log(err.name)     //status code name
    ctx.status = err.status || 500
    if (err.data && err.data.code) {
      const code = err.data.code
      delete err.data.code
      //const data = err.data
      ctx.body = {
        status: 'error',
        message: err.message,
        code,
        ...err.data,
      }
    } else if (err.status === 401) {
      // JWT Error Catcher
      ctx.body = {
        status: 'error',
        message: err.message,
        code: 401004,
      }
    } else {
      ctx.body = {
        status: 'error',
        message: err.message,
        code: -1,
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
  verbose: false,
})))

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const WebpackDevMiddleware = require('koa-webpack-dev-middleware')
  const webpackDevelopmentConfig = require('../webpack.development')

  app.use(convert(WebpackDevMiddleware(webpack(webpackDevelopmentConfig), {
    stats: {
      colors: true,
      cached: false,
      chunks: false,
      hash: false,
      version: false,
      warnings: false,
      children: false,
      assets: false,
    },
  })))
} else {
  const serve = require('koa-static')
  app.use(serve(path.join(__dirname, '../dist')))
}

app.use(convert(jwt({
  secret: process.env.JWT_SECRET
}).unless({
  path: [
    '/v1/signup',
    '/v1/signin',
    '/v1/forgot_password',
    '/v1/verifyToken',
    '/v1/auth/facebook',
    '/v1/auth/twitter',
    '/v1/auth/google',
    '/v1/auth/github',
    '/favicon.ico',
  ]
})))

const server = app.listen(Config.port, () => {
  console.log(`listening on port ${Config.port}`)
})

const io = require('socket.io')(server)
initialSocket(io)

app.use(signupRouter.routes()).use(signupRouter.allowedMethods({
  throw: true
}))
app.use(signinRouter.routes()).use(signinRouter.allowedMethods({
  throw: true
}))
app.use(accountSettingsRouter.routes()).use(accountSettingsRouter.allowedMethods({
  throw: true
}))
app.use(forgotPasswordRouter.routes()).use(forgotPasswordRouter.allowedMethods({
  throw: true
}))
app.use(verifyTokenRouter.routes()).use(verifyTokenRouter.allowedMethods({
  throw: true
}))
app.use(facebookRouter.routes()).use(facebookRouter.allowedMethods({
  throw: true
}))
app.use(twitterRouter.routes()).use(twitterRouter.allowedMethods({
  throw: true
}))
app.use(googleRouter.routes()).use(googleRouter.allowedMethods({
  throw: true
}))
app.use(githubRouter.routes()).use(githubRouter.allowedMethods({
  throw: true
}))

app.use(postRouter.routes()).use(postRouter.allowedMethods({
  throw: true
}))
app.use(commentRouter.routes()).use(commentRouter.allowedMethods({
  throw: true
}))
app.use(checkPostLimitRouter.routes()).use(checkPostLimitRouter.allowedMethods({
  throw: true
}))
