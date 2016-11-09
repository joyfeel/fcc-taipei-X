import Router from 'koa-router'
import Boom from 'boom'
import jwt from 'koa-jwt'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import User from '../../models/users'
import { verifyToken } from '../../utils/auth'
import { getCleanUser } from '../../utils/mixed'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/verifyToken',
})

router.get('/',
  validate({
    'token:query': ['require', 'token is required'],
  }),
  async(ctx, next) => {
    try {
      const jwtToken = ctx.request.query.token
      const verifyResult = await verifyToken(jwtToken)
      if (!verifyResult) {
        throw Boom.unauthorized('Token is not valid or expired')
      }
      const { email } = verifyResult
      const result = await User.findOne({ email })
      if (!result) {
        throw Boom.unauthorized('Account is not valid or expired')
      }
      const user = getCleanUser(result)
      ctx.body = {
        status: 'success',
        auth: {
          token: jwtToken,
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
