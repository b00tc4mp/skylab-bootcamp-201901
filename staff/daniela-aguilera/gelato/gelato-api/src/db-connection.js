const { mongoose } = require('gelato-data')
const { MONGO_URL_LOGIC, MONGO_URL_LOGIC_TEST } = require('./config')

module.exports = function connectToDatabase ({ isTest } = {}) {
  const url = isTest
    ? MONGO_URL_LOGIC_TEST
    : MONGO_URL_LOGIC

  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
}
