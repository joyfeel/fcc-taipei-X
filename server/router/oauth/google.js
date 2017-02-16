import Router from 'koa-router'
import _ from 'lodash'
import fetch from 'node-fetch'
import qs from 'querystring'
import Boom from 'boom'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import User from '../../models/users'
import { getToken } from '../../utils/auth'
import { getCleanUser } from '../../utils/mixed'
import { encodeRemoteImg } from '../../utils/mixed'
import Config from '../../config'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/auth/google',
})

router.post('/',
  validate({
    'code:body': ['require', 'code is required'],
  }),
  async(ctx, next) => {
    try {
      const { code } = ctx.request.body
      const { accessTokenUrl, peopleApiUrl } = Config.auth.google

      const params = {
        code,
        ...Config.auth.google,
      }
      const response = await fetch(accessTokenUrl, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify(params),
      })
      if (response.ok) {
        const { access_token, token_type } = await response.json()
        const userInfoResponse = await fetch(peopleApiUrl, {
          method: 'get',
          headers: {
            Authorization: `${token_type} ${access_token}`,
          },
        })
        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json()
          const { name, email, picture, id } = userInfo

          const accountExist = await User.findOne({ email, social: false })
          if (accountExist) {
            throw Boom.create(403, 'The email has already been registered in our web approach', { code: 403007 })
          }
          const socialAccountExist = await User.findOne({ google: id })
          let token
          // 從未 google signin 過
          if (!socialAccountExist) {
            let user = await User.findOne({ email })
            if (user) {
              throw Boom.create(403, 'The email has already been registered in other social approach', { code: 403001 })
            }
            const base64URI = await encodeRemoteImg(picture)
            user = new User({
              email,
              nickname: name,
              avatar: base64URI,
              isEmailActived: true,
              social: true,
              google: id,
            })
            await user.save()
            const userId = user._id
            token = getToken['JWT']({ userId , email })
            return ctx.response.body = {
              status: 'success',
              auth: {
                token,
                ...getCleanUser(user),
                code: 200010,
                message: 'Google signin success',
              }
            }
          } else {
            // 曾經 google signin 過
            const userId = socialAccountExist._id
            token = getToken['JWT']({ userId, email })
            return ctx.response.body = {
              status: 'success',
              auth: {
                token,
                ...getCleanUser(socialAccountExist),
              },
              code: 200009,
              message: 'Google signup success',
            }
          }
        }
      }
      /* Bad */
      // const BadRequestError = Boom.badRequest(`${userInfoResponse.statusText} ${userInfoResponse.url}`)
      // ctx.throw(BadRequestError.output.statusCode, BadRequestError)
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
