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
import fetch from 'node-fetch'
import qs from 'querystring'

//import request from 'request'

import passport from 'koa-passport'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/auth/google'
})

router.get('/callback',
  // validate({
  //   'token:query': ['require', 'token is required']
  // }),
  async(ctx, next) => {
    try {
      ctx.response.body = {
        results: 'Successlly google callback',
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

router.post('/',
  // validate({
  //   'token:query': ['require', 'token is required']
  // }),
  async(ctx, next) => {
    try {
      console.log(ctx.request.headers)
      const accessTokenUrl = 'https://www.googleapis.com/oauth2/v4/token',
            peopleApiUrl = 'https://www.googleapis.com/oauth2/v2/userinfo'

      const params = {
        code: ctx.request.body.code,
        client_id: ctx.request.body.clientId,
        client_secret: 'u8yj8r01dKIExw-al9OEigYU',
        redirect_uri: ctx.request.body.redirectUri,
        grant_type: 'authorization_code'
      }
      const accessTokenResponse = await fetch(accessTokenUrl, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify(params)
      })
      if (accessTokenResponse.ok) {
        const { access_token, token_type } = await accessTokenResponse.json()
        const userInfoResponse = await fetch(peopleApiUrl, {
          method: 'get',
          headers: {
            Authorization: `${token_type} ${access_token}`
          }
        })
        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json()
          const token = getToken['OAuth2'](userInfo)
          //const a = await verifyToken(token)
          //console.log('aaaaaaaaaaaaaaaaaaaaaa')
          //console.log(a)
          ctx.response.body = {
            token,
            user: userInfo
          }
        } else {
          if (userInfoResponse.status === 400) {
            const BadRequestError = Boom.badRequest(`${userInfoResponse.statusText} ${userInfoResponse.url}`)
            ctx.throw(BadRequestError.output.statusCode, BadRequestError)
          }
        }
      } else {
        if (accessTokenResponse.status === 400) {
          const BadRequestError = Boom.badRequest(`${accessTokenResponse.statusText} ${accessTokenResponse.url}`)
          ctx.throw(BadRequestError.output.statusCode, BadRequestError)
        }
      }
    } catch(err) {
      console.log('BACK ERR')
      console.log(err)
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
