import supertest from 'supertest'
import app from '../../server'

export default function request() {
  return supertest.agent(app.listen())
}
