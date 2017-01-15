export default {
  databaseURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fcc-taipei-x',
  databaseOption: {
    user : process.env.MONGO_USER || null,
    pass : process.env.MONGO_PASS || null
  }
}
