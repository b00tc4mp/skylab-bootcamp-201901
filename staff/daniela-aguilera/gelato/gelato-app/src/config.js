require('dotenv').config()

const {
  MONGO_URL_LOGIC,
  MONGO_URL_LOGIC_TEST,
  PORT = 8080
} = process.env

module.exports = {
  MONGO_URL_LOGIC,
  MONGO_URL_LOGIC_TEST,
  PORT
}
