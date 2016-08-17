import request from '../utils'
import { getToken, verifyToken } from '../../../server/utils'
import { expect } from 'chai'
import User from '../../../server/models/users'

describe('/signup', () => {
  //Create a fake account
  const userSignupInfo = {
    email: "joybee210@gmail.com",
    password: "123456"
  }
})
