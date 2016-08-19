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
    'email:body': ['require', 'isEmail', 'email or password are not valid'],
    'password:body': ['require', 'email or password are not valid']
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
      throw Boom.badRequest('email or password are not valid')
    }

    const isMatch = await user.validatePassword(password)
    if (!isMatch) {
      throw Boom.badImplementation('terrible implementation')
    }

    ctx.state.user = user
    await next()
  } catch (err) {
    if (err.name === 'MismatchError') {
      const BadRequest = Boom.badRequest('email or password are not valid')
      ctx.throw(BadRequest.output.statusCode, BadRequest)
    } else if (err.output.statusCode) {
      ctx.throw(err.output.statusCode, err)
    } else {
      ctx.throw(500, err)
    }
  }
}

async function sendToken(ctx, next) {
  try {
    const { email } = ctx.request.body,
      token = getToken['JWT'](email),
      user = getCleanUser(ctx.state.user)

    ctx.response.body = {
      status: 'success',
      auth: {
        token,
        ...user
      }
    }
  } catch (err) {
    ctx.throw(err)
  }
}

export default router
