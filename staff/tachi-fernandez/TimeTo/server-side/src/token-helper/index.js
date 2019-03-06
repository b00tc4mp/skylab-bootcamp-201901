'use strict'

const jwt = require('jsonwebtoken')

const tokenHelper = {
    jwtSecret: null,

    createToken(userId) {
        return jwt.sign({ sub: userId }, this.jwtSecret, { expiresIn: '3000000h' })
    },

    verifyToken(token) {
        const { sub } = jwt.verify(token, this.jwtSecret)

        if (!sub) throw Error(`subject not present in token ${token}`)

        return sub
    },

    tokenVerifierMiddleware(req, res, next) {
        const { headers: { authorization } } = req

        const token = authorization.substring(7)

        try {
            const userId = this.verifyToken(token)

            req.userId = userId
        } catch ({ message }) {
            return res.status(401).json({ error: message })
        }

        next()
    }
}

const { createToken, verifyToken, tokenVerifierMiddleware } = tokenHelper

tokenHelper.createToken = createToken.bind(tokenHelper)
tokenHelper.verifyToken = verifyToken.bind(tokenHelper)
tokenHelper.tokenVerifierMiddleware = tokenVerifierMiddleware.bind(tokenHelper)

module.exports = tokenHelper
