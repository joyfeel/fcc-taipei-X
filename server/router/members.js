import Router from 'koa-router'
import mongoose from 'mongoose'
import User from '../models/users'
import Boom from 'boom'

const router = new Router({
  prefix: '/v1/members'
})

router.get('/', async(ctx, next) => {
  try {
    const userList = await User.find()
    ctx.response.body = {
      results: userList,
      status: 'OK'
    }
    ctx.response.status = 200
  } catch (err) {
    console.log('.....??')
    ctx.throw(err.output.statusCode, err)
  }
})

router.get('/?:userID', async(ctx, next) => {
  try {
    console.log(ctx.params.userID)
    const userList = await User.findOne({ _id: ctx.params.userID})
    ctx.response.body = {
      results: userList,
      status: 'OK'
    }
    ctx.response.status = 200
  } catch (err) {
    ctx.throw(err.output.statusCode, err)
  }
})


//  {{URL}}/v1/members/aa/34/bb/78?YA=889900
router.get('/aa/:dd/bb/:kk', async(ctx, next) => {
  console.log('AAAAAAAAA')
  console.log(ctx.params)
  console.log(ctx.params.dd)
  console.log(ctx.params.kk)
  console.log(ctx.request.query)
  console.log('BBBBBBBBB')
})

export default router
