import Router from 'koa-router'
import Boom from 'boom'
import jwt from 'koa-jwt'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import User from '../../models/users'
import { getToken } from '../../utils/auth'
import { getCleanUser } from '../../utils/mixed'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/signin',
})

router.post('/',
  validate({
    'email:body': ['require', 'isEmail', 'Format of email address is wrong'],
    'password:body': ['require', 'Password is required'],
  }),
  async(ctx, next) => {
    try {
      const { email, password } = ctx.request.body
      const socialAccountExist = await User.findOne({ email, social: true })
      if (socialAccountExist) {
        throw Boom.create(403, 'The email has already been registered in social account', { code: 403001 })
      }
      //Ensure the email account exists in the DB.
      const user = await User.findOne({ email })
      if (!user) {
        throw Boom.create(401, 'Email or password is not valid', { code: 401001 })
      }
      //However, the email account need to be actived.
      if (user.isEmailActived === false) {
        throw Boom.create(404, 'Your email account is not activated', { code: 404001 })
      }

      const isPassword = await user.validatePassword(password)
      if (!isPassword) {
        throw Boom.create(401, 'Email or password is not valid', { code: 401001 })
      }
      const userId = user._id
      const token = getToken['JWT']({ userId, email })
      ctx.body = {
        status: 'success',
        auth: {
          token,
          ...getCleanUser(user)
        },
        code: 200003,
        message: 'Signin success',
      }
    } catch (err) {
      if (err.output.statusCode) {
        ctx.throw(err.output.statusCode, err)
      } else {
        ctx.throw(500, err)
      }
    }
  }
)

export default router
