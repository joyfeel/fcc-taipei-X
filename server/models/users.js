import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'
import bcrypt from 'bcryptjs-then'
import Boom from 'boom'
import Config from '../config'

const SALT_WORK_FACTOR = 10
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: false,
    index: {
      unique: true,
    },
  },
  hashedPassword: {
    type: String,
  },
  nickname: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    //default: 'ugly photo'
  },
  isEmailActived: {
    type: Boolean,
    default: false,
  },
  verifyEmailToken: {
    type: String,
  },
  isEmailDeleted: {
    type: Boolean,
    default: false,
  },
  nicknameChangeLimit: {
    type: Date,
    default: Config.dbSchema.user.nicknameChangeLimit(),
  },
  createdPostLimit: {
    type: Date,
    default: Config.dbSchema.post.createdPostLimit(),
  },
  social: {
    type: Boolean,
    default: false,
  },
  facebook: {
    type: String,
  },
  github: {
    type: String,
  },
  twitter: {
    type: String,
  },
  google: {
    type: String,
  },
})

UserSchema.plugin(timestamps)
UserSchema.path('nickname').required(true, 'nickname is required')
//UserSchema.path('email').required(true, 'email is required')

UserSchema.virtual('password')
  .set(function(value) {
    this.__password = value
  })
  .get(function() {
    return this.__password
  })

UserSchema.pre('validate', function (next) {
  if (this.password) {
    if (this.password.length < 6) {
      const err = Boom.create(422, 'Length of password must >= 6', { code: 422001 })
      next(err)
    }
  }
  next()
})

UserSchema.pre('save', async function (next) {
  if (!this.password) {
    //return next()
    next()
  }
  try {
    this.hashedPassword = await bcrypt.hash(this.password)
    next()
  } catch (err) {
    const err = Boom.create(500, 'Bcrypt error', { code: 500001 })
    next(err)
  }
})

UserSchema.methods.validatePassword = async function validatePassword(_password) {
  return await bcrypt.compare(_password, this.hashedPassword)
}

export default mongoose.model('User', UserSchema)
