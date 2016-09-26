import Router from 'koa-router'
import User from '../../models/users'
import Boom from 'boom'
import nodemailer from 'nodemailer'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import { getToken, verifyToken, getCleanUser } from '../../utils'
import { mailTransport, checkEmailStatus } from '../../utils/email'
import Config from '../../config'
import _ from 'lodash'

import passport from 'koa-passport'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/auth/github'
})

router.get('/oauth2callback',
  // validate({
  //   'token:query': ['require', 'token is required']
  // }),
  async(ctx, next) => {
    try {
      passport.authenticate('github', {
        failureRedirect: '/error'
      })

      ctx.response.body = {
        results: 'Successlly github callback',
        status: 'OK'
      }
    } catch(err) {
      if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        const TokenError = Boom.unauthorized('Email Token is not valid or expired')
        ctx.throw(TokenError.output.statusCode, TokenError)
      } else if (err.output.statusCode) {
        ctx.throw(err.output.statusCode, err)
      } else {
        ctx.throw(500, err)
      }
    }
  }
)

router.get('/',
  // validate({
  //   'token:query': ['require', 'token is required']
  // }),
  async(ctx, next) => {
    try {
      console.log('Step 1: /')
      // const a = await passport.authenticate('github', {
      //   scope: [
      //     'user'
      //   ]
      // })
      console.log('Step 2: /')

      // //Config.user.nicknameChangeLimit
      // const emailToken = ctx.request.query.token
      // const { email } = await verifyToken(emailToken)
      // const result = await User.findOneAndUpdate({ email }, {
      //   isEmailActived: true,
      //   verifyEmailToken: undefined
      // })
      // if (!result) {
      //   throw Boom.unauthorized('Email Token is not valid')
      // }
      // const user = getCleanUser(result)
      // const jwtToken = await getToken['JWT'](email)

      ctx.response.body = {
        results: 'Successlly send to github',
        status: 'OK'
      }
    } catch(err) {
      if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        const TokenError = Boom.unauthorized('Email Token is not valid or expired')
        ctx.throw(TokenError.output.statusCode, TokenError)
      } else if (err.output.statusCode) {
        ctx.throw(err.output.statusCode, err)
      } else {
        ctx.throw(500, err)
      }
    }
  }
)

export default router
