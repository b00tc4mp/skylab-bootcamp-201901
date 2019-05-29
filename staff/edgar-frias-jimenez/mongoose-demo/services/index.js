'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken (user) {
  const payload = {
    sub: user._id, // Ideally this souldn't be the mongodb id to mantain the db separated... :P
    iat: moment().unix(), // Creation date
    exp: moment().add(14, 'days').unix(), // Expiration date
  }

  return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken (token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN)

      if(payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: 'Token has expired'
        })
      }
      resolve(payload.sub)
    } catch(err) {
      reject({
        status: 500,
        message: 'Invalid token'
      })
    }
  })

  return decoded
}

module.exports = {
  createToken,
  decodeToken
}