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
  prefix: '/v1/auth/facebook',
})

router.post('/',
  validate({
    'code:body': ['require', 'code is required'],
  }),
  async(ctx, next) => {
    try {
      const { code } = ctx.request.body
      const { accessTokenUrl, client_id, redirect_uri, client_secret } = Config.auth.facebook
      const params = {
        client_id,
        redirect_uri,
        client_secret,
        code,
      }
      const OAuthEndpointUrl = `${accessTokenUrl}?${qs.stringify(params)}`
      const response = await fetch(OAuthEndpointUrl, {
        method: 'get',
      })
      if (!response.ok) {
        throw Boom.create(response.status, response.statusText, { code: 400000 })
      }
      const { access_token, token_type } = await response.json()
      const graphApiUrl = Config.auth.facebook.graphApiUrl(access_token)
      const userInfoResponse = await fetch(graphApiUrl, {
        method: 'get',
      })
      if (!userInfoResponse.ok) {
        throw Boom.create(userInfoResponse.status, userInfoResponse.statusText, { code: 400000 })
      }
      const userInfo = await userInfoResponse.json()
      const { name, email, picture, id } = userInfo

      const accountExist = await User.findOne({ email, social: false })
      if (accountExist) {
        throw Boom.create(403, 'The email has already been registered in our web approach', { code: 403007 })
      }
      const socialAccountExist = await User.findOne({ facebook: id })
      let token
      if (!socialAccountExist) {
        let user = await User.findOne({ email })
        if (user) {
          throw Boom.create(403, 'The email has already been registered in other social approach', { code: 403001 })
        }
        const base64URI = await encodeRemoteImg(picture.data.url)
        user = new User({
          email,
          nickname: name,
          avatar: base64URI,
          isEmailActived: true,
          social: true,
          facebook: id,
        })
        await user.save()
        const userId = user._id
        token = getToken['JWT']({ userId , email })
        return ctx.response.body = {
          status: 'success',
          auth: {
            token,
            ...getCleanUser(user),
            code: 200012,
            message: 'Facebook signin success',
          }
        }
      } else {
        // 曾經 facebook signin 過
        const userId = socialAccountExist._id
        token = getToken['JWT']({ userId, email })
        return ctx.response.body = {
          status: 'success',
          auth: {
            token,
            ...getCleanUser(socialAccountExist),
          },
          code: 200011,
          message: 'Facebook signup success',
        }
      }
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
