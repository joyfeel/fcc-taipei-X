import Router from 'koa-router'
import User from '../models/users'
import Boom from 'boom'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import { getToken } from '../utils'
import { mailTransport, checkEmailStatus } from '../utils/email'
import Config from '../config'
import _ from 'lodash'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/forgot_password'
})

router.post('/',
  validate({
    'email:body': ['require', 'isEmail', 'email is required or not valid']
  }),
  async(ctx, next) => {
    try {
      const { email } = ctx.request.body
      const accountExist = await User.findOne({ email })
      if (!accountExist) {
        throw Boom.notFound('We couldn\'t find your account')
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
