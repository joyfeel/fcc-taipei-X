import Router from 'koa-router'
import _ from 'lodash'
import fetch from 'node-fetch'
import qs from 'querystring'
import Boom from 'boom'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import User from '../../models/users'
import { getToken } from '../../utils/auth'
import { encodeRemoteImg } from '../../utils/mixed'
import Config from '../../config'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/auth/google'
})

router.post('/',
  validate({
    'code:body': ['require', 'code is required']
  }),
  async(ctx, next) => {
    try {
      const { code } = ctx.request.body
      const { accessTokenUrl, peopleApiUrl } = Config.google

      const params = {
        code,
        ...Config.google,
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
          const { name, email, picture, id } = userInfo

          const accountExist = await User.findOne({ email, social: false })
          if (accountExist) {
            throw Boom.forbidden('The email has already been registered in our web approach')
          }
          const socialAccountExist = await User.findOne({ googleId: id })
          const base64URI = await encodeRemoteImg(picture)
          const userBdy = {
            nickname: name,
            email,
            avatar: base64URI,
          }
          const token = getToken['JWT'](email)
          if (socialAccountExist) {
            return ctx.response.body = {
              status: 'success',
              auth: {
                token,
                ...userBdy
              }
            }
          }

          const user = new User(_.extend(userBdy, {
            isEmailActived: true,
            social: true,
            googleAccessToken: access_token,
            googleId: id
          }))
          await user.save()

          return ctx.response.body = {
            status: 'success',
            auth: {
              token,
              ...userBdy
            }
          }
        }
      }
      /* Bad */
      const BadRequestError = Boom.badRequest(`${userInfoResponse.statusText} ${userInfoResponse.url}`)
      ctx.throw(BadRequestError.output.statusCode, BadRequestError)
    } catch(err) {
      if (err.output.statusCode) {
        ctx.throw(err.output.statusCode, err)
      } else {
        ctx.throw(500, err)
      }
    }
  }
)

export default router