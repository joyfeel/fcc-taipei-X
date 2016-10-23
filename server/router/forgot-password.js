import Router from 'koa-router'
import User from '../models/users'
import Boom from 'boom'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import { getToken } from '../utils/auth'
import { mailTransport, checkEmailStatus } from '../utils/email'
import Config from '../config'
import _ from 'lodash'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/forgot_password'
})

router.post('/',
  validate({
    'email:body': ['require', 'isEmail', 'Format of email address is wrong']
  }),
  async(ctx, next) => {
    try {
      const { email } = ctx.request.body
      const socialAccountExist = await User.findOne({ email, social: true })
      if (socialAccountExist) {
        throw Boom.create(403, 'The email has already been registered in social account', { code: 403001 })
      }

      const accountExist = await User.findOne({ email })
      if (!accountExist) {
        throw Boom.create(404, 'We could not find your account', { code: 404002 })
      }

      const emailToken = await getToken['EMAIL'](email)
      const user = await User.findById(accountExist._id)
      ctx.state.user = user
      ctx.state.nodemailerInfo = await mailTransport({ email, nickname: user.nickname }, 'forgot-password', 'recover', emailToken)
      await next()
    } catch (err) {
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
