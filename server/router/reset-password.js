import Router from 'koa-router'
import User from '../models/users'
import Boom from 'boom'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import { getToken, verifyToken } from '../utils'
import { mailTransport, checkEmailStatus } from '../utils/email'
import Config from '../config'
import _ from 'underscore'
/*
  reset-password
  (1) 是在 Login 頁面點選的，需要 user 填入 email 後按下 submit
  (2) 收信後點擊 URL，代表此人一定是此帳號的擁有者。
  (3) 接著到 Home page 頁面，會有 prompt (類似 alert box)。
      User 要輸入新的 password，此外還有兩個按鈕，submit 與 skip。
      按下 Submit: 改 DB 的資料後，拿掉 prompt 與濾鏡。 Email to user with modify new password (no URL)
      按下 Skip: 拿掉 prompt 與濾鏡。
*/
const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/reset_password'
})

router.post('/',
  validate({
    'email:body': ['require', 'isEmail', 'email is required or not valid'],
    'password:body': ['require', 'password is required or not valid']
  }),
  async(ctx, next) => {
    try {
      const token = ctx.request.header.authorization.split(' ')[1]
      const user = await verifyToken(token)
      const { email, password } = ctx.request.body
      if (user.email !== email) {
        throw Boom.unauthorized('Bad way to hack')
      }

      const accountExist = await User.findOne({ email })
      if (!accountExist) {
        throw Boom.notFound('We couldn\'t find your account')
      }

      const result = await User.findOneAndUpdate({ email }, {
        isEmailActived: true,
        verifyEmailToken: undefined
      })
      // console.log(password)
      ctx.response.body = {
        status: 'success'
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
