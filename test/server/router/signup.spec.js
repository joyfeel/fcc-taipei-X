import request from '../utils'
import { getToken, verifyToken } from '../../../server/utils'
import { expect } from 'chai'
import User from '../../../server/models/users'

describe('/signup', () => {
  //Create a fake account
  const userSignupInfo = {
    nickname: "Joey",
    email: "joybee210@gmail.com",
    password: "123456",
    avatar: "data:image/jpeg;base64,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"
  }
  const { email } = userSignupInfo
  const emailToken = getToken['EMAIL'](email)

  it('abnormal signup [wrong email]', done => {
    request()
      .post('/v1/signup')
      .send({
        ...userSignupInfo,
        email: 'nope'
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)          //Shold be change to 422 in the futher
      .expect({
        status: 'error',
        errors: {
          message: 'email is required or not valid'
        }
      })
      .end(done)
  })

  it('abnormal signup [no password]', done => {
    request()
      .post('/v1/signup')
      .send({
        ...userSignupInfo,
        password: null
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)          //Shold be change to 422 in the futher
      .expect({
        status: 'error',
        errors: {
          message: 'password is required'
        }
      })
      .end(done)
  })

  it('abnormal active [no token]', done => {
    request()
      .get('/v1/signup')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .expect({
        status: 'error',
        errors: {
          message: 'token is required'
        }
      })
      .end(done)
  })

  it('abnormal active [wrong token]', done => {
    const fakeToken = 'lol'
    request()
      .get('/v1/signup')
      .query({ token: fakeToken })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(401)
      .expect({
        status: 'error',
        errors: {
          message: 'Email Token is not valid or expired'
        }
      })
      .end(done)
  })

  it('abnormal active [not found user]', done => {
    request()
      .get('/v1/signup')
      .query({ token: emailToken })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(401)
      .expect({
        status: 'error',
        errors: {
          message: 'Email Token is not valid or expired'
        }
      })
      .end(done)
  })

  it('normal signup', function(done) {
    this.timeout(20000)    // SMTP server timeout
    request()
      .post('/v1/signup')
      .send(userSignupInfo)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect({
        status: 'success'
      })
      .end(done)
  })

  it('abnormal signup [not receve the email, resend]', function(done) {
    this.timeout(20000)    // SMTP server timeout
    request()
      .post('/v1/signup')
      .send(userSignupInfo)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect({
        status: 'success'
      })
      .end(done)
  })

  it('normal active', done => {
    request()
      .get('/v1/signup')
      .query({ token: emailToken })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, (err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.auth).to.include.keys(
          'token',
          'id',
          'nickname',
          'email',
          'avatar',
          'edit_nickname_time',
          'created_time',
          'updated_time'
        )
        done()
      })
  })

  it('abnormal active [active again, do nothing]', done => {
    request()
      .get('/v1/signup')
      .query({ token: emailToken })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, (err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.auth).to.include.keys(
          'token',
          'id',
          'nickname',
          'email',
          'avatar',
          'edit_nickname_time',
          'created_time',
          'updated_time'
        )
        done()
      })
  })

  it('abnormal signup [already have the active account]', function(done) {
    this.timeout(20000)    // SMTP server timeout
    request()
      .post('/v1/signup')
      .send(userSignupInfo)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(403)
      .expect({
        status: 'error',
        errors: {
          message: 'The email has already been registered'
        }
      })
      .end(done)
  })

  it('clear the user collection in DB', async done => {
    await User.remove({})
    done()
  })

})
