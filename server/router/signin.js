import Router from 'koa-router'
import Boom from 'boom'
import jwt from 'koa-jwt'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import User from '../models/users'
import { getToken, getCleanUser } from '../utils'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/signin'
})

router.post('/',
  validate({
    'email:body': ['require', 'isEmail', 'Format of email address is wrong'],
    'password:body': ['require']
  }),
  async(ctx, next) => {
    try {
      const { email, password } = ctx.request.body
      //Ensure the email account exists in the DB.
      const user = await User.findOne({ email })
      if (!user) {
        throw Boom.badRequest('Email or password is not valid')
      }
      //However, the email account need to be actived.
      if (user.isEmailActived === false) {
        //throw Boom.unauthorized('Your email account is not actived')
        throw Boom.notFound('Your email account is not actived')
      }

      await user.validatePassword(password)
      const token = getToken['JWT'](email)
      ctx.response.body = {
        status: 'success',
        auth: {
          token,
          ...getCleanUser(user)
        }
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
