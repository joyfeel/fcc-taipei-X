import request from './utils'

describe('Hello', () => {
  it('expect is hello world', (done) => {
    request()
      .get('/v1/reports')
      .set('accept', 'application/json')
      .expect(200)
      .expect({ result: 'YA' }, done)
  })
})
