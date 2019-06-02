const handleErrors = require('./handle-errors')
const { UnauthorizedError } = require('gelato-errors')
const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET } } = process

module.exports = (req, res, next) => {
  handleErrors(() => {
    return Promise.resolve()
      .then(() => {
        const { headers: { authorization } } = req

        if (!authorization) throw new UnauthorizedError()

        const token = authorization.slice(7)

        const { adm, sub } = jwt.verify(token, JWT_SECRET)

        req.userId = sub
        req.isAdmin = adm

        next()
      })
  }, res)
}
