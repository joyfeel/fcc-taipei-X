import passport from 'koa-passport'
const GoogleStrategy = require('passport-google-oauth').Strategy
import User from '../models/users'
import Config from '../config'

const user = {
  id: 1,
  username: 'test'
}

// passport.serializeUser((user, done) => {
//   done(null, user._id)
// })
//
// passport.deserializeUser((id, done) => {
//   // User.findById(id, (err, user) => {
//   //   done(err, user)
//   // })
//   User.findById(id, done)
// })

//console.log(Config)

passport.use(new GoogleStrategy(Config.auth.google), (token, tokenSecret, profile, done) => {
  done(null, user)
})
