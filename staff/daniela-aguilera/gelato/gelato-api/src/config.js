require('dotenv').config()

const {
  MONGO_URL_LOGIC,
  MONGO_URL_LOGIC_TEST,
  NODE_ENV,
  PORT = 8080
} = process.env

module.exports = {
  MONGO_URL_LOGIC,
  MONGO_URL_LOGIC_TEST,
  ENV: NODE_ENV,
  PORT
}

// cloudinary.config({
//   cloud_name: CLOUDINARY_CLOUD_NAME,
//   api_key: CLOUDINARY_API_KEY,
//   api_secret: CLOUDINARY_API_SECRET
// })
