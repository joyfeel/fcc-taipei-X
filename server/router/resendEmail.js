import Router from 'koa-router'
import Boom from 'boom'
import jwt from 'koa-jwt'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import _ from 'underscore'
import User from '../models/users'
import { getToken, getCleanUser } from '../utils'
import { mailTransport, checkEmailStatus } from '../utils/email'
import Config from '../config'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/resendEmail'
})

router.post('/',
  validate({
    'email:body': ['require', 'isEmail', 'Format of email address is wrong']
  }),
  async(ctx, next) => {
    try {
      const { email } = ctx.request.body
      const user = await User.findOne({ email })
      if (!user) {
        throw Boom.badRequest('Email is not valid')
      }

      if (user.isEmailActived === false) {
        const emailToken = await getToken['EMAIL'](email)
        const result = await User.findOneAndUpdate({ email }, {
          nicknameChangeLimit: Config.user.nicknameChangeLimit(),
          verifyEmailToken: emailToken
        })
        if (!result) {
          throw Boom.unauthorized('Email token is not valid or expired')
        }
        const nickname = user.nickname
        ctx.state.user = user
        ctx.state.nodemailerInfo = await mailTransport({ email, nickname }, 'signup', 'activate', emailToken)
        await next()
      } else {
        throw Boom.badRequest('Your account has already been activated')
      }
    } catch (err) {
      console.log(err)
      if (err.output.statusCode) {
        ctx.throw(err.output.statusCode, err)
      } else {
        ctx.throw(500, err)
      }
    }
  },
  checkEmailStatus
)

export default router
