module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8000,
  URL: process.env.BASE_URL || 'http://localhost:8000',
  MONGODB_URI : process.env.MONGODB_URI || 'mongodb://<user>:<password>@<domain provided>.mlab.com:57064/api-users-1',
}