import passport from 'koa-passport'
//const GoogleStrategy = require('passport-google-oauth').Strategy
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
//import { Strategy as GithubStrategy } from 'passport-github2'
const GitHubStrategy = require('passport-github2').Strategy


import User from '../models/users'
import Config from '../config'

passport.use(new GoogleStrategy(Config.auth.google, (token, tokenSecret, profile, done) => {
  console.log('Google Strategy')
  done(null, 'asdasd')
}))

console.log(Config.auth.github)
passport.use(new GitHubStrategy(Config.auth.github, (accessToken, refreshToken, profile, done) => {
  console.log('GithubStrategy Strategy')
  done(null, profile)
}))


// const usersss = {
//   id: 1,
//   username: 'test'
// }

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

/*
{
  clientID: '524481294139-03nll8r7ohb5hnb94m89jdtj8b319svc.apps.googleusercontent.com',
  clientSecret: 'AIzaSyAGd8mJk_fUYl00tKqpmOQCRjMEXU5Ln6I',
  callbackURL: 'http://localhost:3000/auth/google/callback'
}
*/
