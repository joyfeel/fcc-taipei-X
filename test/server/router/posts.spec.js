import request from '../utils'
import { expect } from 'chai'
import chai from 'chai'
import chaiThings from 'chai-things'
import Post from '../../../server/models/posts'
import { getToken } from '../../../server/utils'

chai.should()
chai.use(chaiThings)

describe('/posts', () => {
  const jwtToken = getToken['JWT']('joybee210@gmail.com')

  it('abnormal post an article [wrong mongo authorId]', done => {
    request()
      .post('/v1/posts')
      .set('Authorization', `bearer ${jwtToken}`)
      .send({
        author: '57bd7a333f7045152f6a97GG',
        subject: 'Learn how to catch a cat',
        content: 'Haha, the way to catch is to......'
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

  it('abnormal post an article [wrong comment subject]', done => {
    request()
      .post('/v1/posts')
      .set('Authorization', `bearer ${jwtToken}`)
      .send({
        author: '57bd7a333f7045152f6a9762',
        content: 'Haha, the way to catch is to......'
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .expect({
        errors: {
          message: 'subject is required or not valid'
        },
        status: 'error'
      })
      .end(done)
  })

  it('abnormal post an article [wrong comment content]', done => {
    request()
      .post('/v1/posts')
      .set('Authorization', `bearer ${jwtToken}`)
      .send({
        author: '57bd7a333f7045152f6a9762',
        subject: 'Learn how to catch a cat'
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

  it('normal post an article', done => {
    request()
      .post('/v1/posts')
      .set('Authorization', `bearer ${jwtToken}`)
      .send({
        author: '57bd7a333f7045152f6a9762',
        subject: 'Learn how to catch a cat',
        content: 'Haha, the way to catch is to......'
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, (err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.post).to.include.keys(
          'id',
          'author',
          'subject',
          'content',
          'like_count',
          'dislike_count',
          'comments',
          'created_time',
          'updated_time'
        )
        expect(res.body.post.author).to.include.keys(
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

  it('normal get all articles', done => {
    request()
      .get('/v1/posts')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${jwtToken}`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, (err, res) => {
        expect(res.body.status).to.equal('success')
        const { posts } = res.body
        posts.should.all.have.property('id')
        posts.should.all.have.property('author')
        posts.should.all.have.property('subject')
        posts.should.all.have.property('content')
        posts.should.all.have.property('like_count')
        posts.should.all.have.property('dislike_count')
        posts.should.all.have.property('comments')
        posts.should.all.have.property('created_time')
        posts.should.all.have.property('updated_time')
        done()
      })
  })

})
