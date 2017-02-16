import Router from 'koa-router'
import Boom from 'boom'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import _ from 'lodash'
import User from '../../models/users'
import { getCleanUser } from '../../utils/mixed'
import { mailTransport, checkEmailStatus } from '../../utils/email'
import Config from '../../config'
/*
  account-settings (!!!此 component 頁面可跟 register component 頁面共用，差別在於 email 不能改)
  (1) Login => jwt token
  (2) 才能到修改頁面 (setting) => 可改 nickname (60 days), photo, password
  (3) Submit to server + email to user with modify password (no URL)
*/
const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/account_settings',
})

router.post('/',
  validate({
    'nickname:body': ['require', 'isAlphanumeric', 'nickname is required or not alphanumeric'],
    'email:body': ['require', 'isEmail', 'email is required or not valid'],
    'password:body': ['require', 'password is required'],
    'photo:body': ['require', 'isDataURI', 'photo is required or not dataURI'],
  }),
  async(ctx, next) => {
    try {
      const { email, nickname, password, photo } = ctx.request.body
      const result = await User.findOne({ email })
      if (!result) {
        throw Boom.notFound('user not found')
      }

      let user
      const oldNickname = result.nickname
      //如果 user 有嘗試改動 nickname
      if (oldNickname !== nickname) {
        user = await User.findById(result._id).where('nicknameChangeLimit').lt(Date.now())

        if (!user) {
          throw Boom.forbidden('nickname 60 days limit')
        }

        //除了改動 nickname、password 與 photo 外，也要重設 60 days 限制
        _.extend(user, {
          nickname,
          password,
          photo,
          nicknameChangeLimit: Config.dbSchema.user.nicknameChangeLimit()
        })
        await user.save()
      } else {
        user = await User.findById(result._id)
        _.extend(user, {
          password,
          photo
        })
        await user.save()
      }

      ctx.state.user = user
      ctx.state.nodemailerInfo = await mailTransport(ctx.request.body)
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
