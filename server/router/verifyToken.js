import Router from 'koa-router'
import Boom from 'boom'
import jwt from 'koa-jwt'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import User from '../models/users'
import { verifyToken, getCleanUser } from '../utils'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/verifyToken'
})

router.get('/',
  validate({
    'token:query': ['require', 'token is required']
  }),
  async(ctx, next) => {
    try {
      const accessToken = ctx.request.query.token
      const verifyResult = await verifyToken(accessToken)
      if (!verifyResult) {
        throw Boom.unauthorized('Access token is not valid or expired')
      }
      const { email } = verifyResult
      const result = await User.findOne({ email })
      if (!result) {
        throw Boom.unauthorized('Access token is not valid or expired')
      }
      const user = getCleanUser(result)
      ctx.response.body = {
        status: 'success',
        auth: {
          token: accessToken,
          ...user
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
