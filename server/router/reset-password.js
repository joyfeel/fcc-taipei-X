import Router from 'koa-router'
import User from '../models/users'
import Boom from 'boom'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import { getToken, verifyToken } from '../utils'
import { mailTransport, checkEmailStatus } from '../utils/email'
import Config from '../config'
import _ from 'underscore'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/reset_password'
})

router.post('/',
  validate({
    'password:body': ['require', 'password is required or not valid']
  }),
  async(ctx, next) => {
    try {
      const token = ctx.request.header.authorization.split(' ')[1]
      const user = await verifyToken(token)
      const { email } = user

      const accountExist = await User.findOne({ email })
      if (!accountExist) {
        throw Boom.notFound('We couldn\'t find your account')
      }

      accountExist.password = ctx.request.body.password
      await accountExist.save()
      ctx.response.body = {
        status: 'success'
      }
    } catch (err) {
      console.log('...............')
      console.log(err)
      if (err.output.statusCode) {
        ctx.throw(err.output.statusCode, err)
      } else {
        ctx.throw(500, err)
      }
    }
  }
)

export default router
