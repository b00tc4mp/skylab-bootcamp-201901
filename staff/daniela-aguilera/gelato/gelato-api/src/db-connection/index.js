const { mongoose } = require('gelato-data')
const { MONGO_URL, MONGO_URL_TEST } = require('../config')

module.exports = function connectToDatabase ({ isTest } = {}) {
  const url = isTest
    ? MONGO_URL_TEST
    : MONGO_URL

  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
}
