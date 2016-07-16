import Router from 'koa-router'
import User from '../models/users'
import Boom from 'boom'
import nodemailer from 'nodemailer'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import { getToken, verifyToken, getCleanUser } from '../utils'
import { mailTransport, checkEmailStatus } from '../utils/email'
import Config from '../config'
import _ from 'underscore'
/*
  Register
  (1) User input their user info
  (2) Server send mail
  (3) User click URL
  (4) Go to Link (register router component) + email token
  (5) Verify email token => jwt token => Login Status ing
*/
const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/register'
})

//Verify the email token
router.get('/',
  validate({
    'token:query': ['require', 'token is required']
  }),
  async(ctx, next) => {
    try {
      //Config.user.nicknameChangeLimit
      const emailToken = ctx.request.query.token
      const { email } = await verifyToken(emailToken)
      const result = await User.findOneAndUpdate({ email }, {
        isEmailActived: true,
        verifyEmailToken: undefined
      })
      if (!result) {
        throw Boom.unauthorized('Email Token is not valid')
      }
      const user = getCleanUser(result)
      const jwtToken = await getToken['JWT'](email)

      ctx.response.body = {
        results: 'Successlly verify the email token',
        token: jwtToken,
        user,
        status: 'OK'
      }
    } catch(err) {
      if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        const TokenError = Boom.unauthorized('Email Token is not valid or expired')
        ctx.throw(TokenError.output.statusCode, TokenError)
      } else if (err.output.statusCode) {
        ctx.throw(err.output.statusCode, err)
      } else {
        ctx.throw(500, err)
      }
    }
  }
)

function isUserUnique(email) {
  return new Promise((resolve, reject) => {
    User.findOne({ email, isEmailActived: true }, (err, user) => {
      if (err) {
        return reject(err)
      }
      resolve(user)
    })
  })
}

router.post('/',
  validate({
    'nickname:body': ['require', 'isAlphanumeric', 'nickname is required or not alphanumeric'],
    'email:body': ['require', 'isEmail', 'email is required or not valid'],
    'password:body': ['require', 'password is required'],
    'photo:body': ['require', 'isDataURI', 'photo is required or not dataURI'],
  }),
  async(ctx, next) => {
    try {
      console.log('?0')
      const { email } = ctx.request.body
      //1. Check the account is unique
      const accountExist = await isUserUnique(email)
      if (accountExist) {
        throw Boom.forbidden('This email address has already been registered')
      }
      //2. The user may forget to receive their email to authentication
      const result = await User.findOne({ email, isEmailActived: false })
      const emailToken = await getToken['EMAIL'](email)
      let user
      //If email account is not active, resend the registered email to user
      if (result) {
        user = await User.findById(result._id)
        _.extend(user, {
          ...ctx.request.body,
          verifyEmailToken: emailToken,
          nicknameChangeLimit: Config.user.nicknameChangeLimit()
        })
        await user.save()
      } else {
        //3. Store new user info in DB (finally!)
        user = new User(ctx.request.body)
        await user.save()

        _.extend(user, {
          verifyEmailToken: emailToken
        })
        await user.save()
      }
      ctx.state.user = user
      ctx.state.nodemailerInfo = await mailTransport(ctx.request.body, emailToken)
      await next()
    } catch (err) {
      if (err.output.statusCode) {
        ctx.throw(err.output.statusCode, err)
      } else if (err.code === 11000) {
        const MongoError = Boom.conflict('DB Conflict')
        ctx.throw(MongoError.output.statusCode, MongoError)
      } else if (err.name === 'ValidationError') {
        const UserInputError = Boom.badData('Your data is bad and you should feel bad')
        ctx.throw(UserInputError.output.statusCode, UserInputError)
      } else {
        ctx.throw(500, err)
      }
    }
  },
  checkEmailStatus
)

// async function checkEmailStatus(ctx, next) {
//   const nodemailerInfo = ctx.state.nodemailerInfo,
//         user = getCleanUser(ctx.state.user)
//
//   if (nodemailerInfo.rejected.length === 0) {
//     ctx.response.body = {
//       results: 'Successlly send registered email',
//       user,
//       status: 'OK'
//     }
//   } else {
//     throw Boom.badImplementation('Your data is bad and you should feel bad')
//   }
// }

export default router
