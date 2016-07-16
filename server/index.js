//mongod --dbpath ~/data/db/
import Koa from 'koa'
import convert from 'koa-convert'
import path from 'path'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
//import session from 'koa-session'
import serve from 'koa-static'
import historyApiFallback from 'koa-connect-history-api-fallback'

import webpack from 'webpack'
import WebpackDevMiddleware from "koa-webpack-dev-middleware"
import WebpackHotMiddleware from "koa-webpack-hot-middleware"
import webpackConfig from '../webpack.config'

import jwt from 'koa-jwt'

import Router from 'koa-router'
import registerRouter from '../server/router/register'
import signinRouter from '../server/router/signin'
import memberRouter from '../server/router/members'
import reportRouter from '../server/router/reports'
import accountSettingsRouter from '../server/router/account-settings'
import forgotPasswordRouter from '../server/router/forgot-password'
import googleRouter from '../server/router/auth/google'
import githubRouter from '../server/router/auth/github'

import './config/database'
import Config from './config'

//===========================
//import passport from 'koa-passport'
//const GoogleStrategy = require('passport-google-oauth').Strategy
//import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
//import { Strategy as GithubStrategy } from 'passport-github2'
//const GitHubStrategy = require('passport-github2').Strategy
//import { OAuth2Strategy as GithubStrategy } from 'passport-github2'
//===========================

//const session = require('koa-generic-session')
const app = new Koa()

app.use(async(ctx, next) => {
  try {
    await next()
    const status = ctx.status || 404
    if (status === 404) {
      ctx.throw(404)
    }
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = { message: err.message }
    // if (ctx.status === 404) {
    //   ctx.body = { message: err.message }
    // } else {
    //   ctx.body = { message: err.message }
    // }

    ctx.app.emit('error', err, ctx)
  }
})

app.on('error', (a, b) => {
  console.log('Maybe someone is hacking your server')
})

//app.keys = ['your-session-secret']
//app.use(convert(session()))

app.use(logger())
app.use(convert(bodyParser()))

// passport.serializeUser(function(user, done) {
//   done(null, user.id)
// })
//
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   })
// })

/*
passport.use(new GoogleStrategy(Config.auth.google, (token, tokenSecret, profile, done) => {
  console.log('Google Strategy')
  done(null, 'asdasd')
}))

console.log(Config.auth.github)
passport.use(new GitHubStrategy(Config.auth.github, (accessToken, refreshToken, profile, done) => {
  console.log('GithubStrategy Strategy.........')
  done(null, profile)
}))
*/

//app.use(passport.initialize())
//app.use(passport.session())

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
}).unless({
  path: [
    '/v1/signin',
    '/v1/register',
    new RegExp('/v1\/register.*/', 'i'),
    '/v1/auth/google',
    '/v1/auth/google/callback',
    '/v1/auth/github',
    '/v1/auth/github/callback',
    '/v1/forgot_password',
    '/favicon.ico'
  ]
})))

app.use(registerRouter.routes())
app.use(registerRouter.allowedMethods({
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
