import mongoose from 'mongoose'
import config from './index'

mongoose.Promise = global.Promise
mongoose.connect(config.databaseURI, config.databaseOption || null)

mongoose.connection.on('connected', () => {
  console.log('mongo connection open')
})

mongoose.connection.on('error', (err) => {
  throw `Mongo connection: ${err}`
})

mongoose.connection.on('disconnected', () => {
  console.log('mongo connection disconnected')
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit(0, console.log('mongo connection disconnected through app termination'))
  })
})
