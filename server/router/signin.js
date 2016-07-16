import Router from 'koa-router'
import User from '../models/users'
import Boom from 'boom'
import jwt from 'koa-jwt'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import { getToken, getCleanUser } from '../utils'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/signin'
})

router.post('/',
  validate({
    'email:body': ['require', 'isEmail', 'email is required or not valid'],
    'password:body': ['require', 'password is required']
  }),
  authenticate,
  sendToken
)

async function authenticate(ctx, next) {
  try {
    const { email, password } = ctx.request.body
    //Ensure the email is existed in the DB
    const user = await User.findOne({ email })
    if (!user) {
      throw Boom.unauthorized('invalid user')
    }
    //Potentail design flaw?
    const isMatch = await user.validatePassword(password)
    if (!isMatch) {
      throw Boom.badImplementation('terrible implementation')
    }

    ctx.state.user = user
    await next()
  } catch (err) {
    if (err.name === 'MismatchError') {
      //401
      const UnauthorizedError = Boom.unauthorized('invalid password')
      ctx.throw(UnauthorizedError.output.statusCode, UnauthorizedError)
    }
    ctx.throw(err)
  }
}

async function sendToken(ctx, next) {
  try {
    const { email } = ctx.request.body,
          token = getToken['JWT'](email),
          user = getCleanUser(ctx.state.user)

    ctx.response.body = {
      results: 'Successfully signin',
      token,
      user,
      status: 'OK'
    }
  } catch (err) {
    ctx.throw(err)
  }
}

export default router
