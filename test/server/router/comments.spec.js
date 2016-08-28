import request from '../utils'
import { expect } from 'chai'
import chai from 'chai'
import chaiThings from 'chai-things'
import Comment from '../../../server/models/comments'
import { getToken } from '../../../server/utils'

chai.should()
chai.use(chaiThings)

describe('/comments', () => {
  const jwtToken = getToken['JWT']('joybee210@gmail.com')

  it('abnormal post a comment [wrong mongo authorId]', done => {
    request()
      .post('/v1/comments')
      .set('Authorization', `bearer ${jwtToken}`)
      .send({
        author: '57c2867eb127e468df1639GG',
        post: '57c282466eaa459458e2efb1',
        content: 'This comment is cool!'
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .expect({
        errors: {
          message: 'authorId is required or not a mongo objectId'
        },
        status: 'error'
      })
      .end(done)
  })

  it('abnormal post a comment [wrong mongo postId]', done => {
    request()
      .post('/v1/comments')
      .set('Authorization', `bearer ${jwtToken}`)
      .send({
        author: '57c2867eb127e468df16394d',
        post: '57c282466eaa459458e2efGG',
        content: 'This comment is cool!'
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .expect({
        errors: {
          message: 'postId is required or not a mongo objectId'
        },
        status: 'error'
      })
      .end(done)
  })

  it('abnormal post a comment [wrong comment content]', done => {
    request()
      .post('/v1/comments')
      .set('Authorization', `bearer ${jwtToken}`)
      .send({
        author: '57c2867eb127e468df16394d',
        post: '57c282466eaa459458e2efb1'
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .expect({
        errors: {
          message: 'content is required or not valid'
        },
        status: 'error'
      })
      .end(done)
  })

  it('normal post a comment', done => {
    request()
      .post('/v1/comments')
      .set('Authorization', `bearer ${jwtToken}`)
      .send({
        author: '57c2867eb127e468df16394d',
        post: '57bfe17d4d9777c24e63fb83',
        content: 'This comment is cool!'
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, (err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.comment).to.include.keys(
          'id',
          'author',
          'content',
          'created_time',
          'updated_time'
        )
        expect(res.body.comment.author).to.include.keys(
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

})
