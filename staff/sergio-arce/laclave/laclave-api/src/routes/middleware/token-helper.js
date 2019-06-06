'use strict'

const jwt = require('jsonwebtoken')

const tokenHelper = {
    jwtSecret: 'skylab-inn-rules',

    /**
     * Creates a new token.
     * 
     * @param {any} data
     * 
     * @returns {String} - token
     */
    createToken(data) {
        return jwt.sign({ userId: data }, this.jwtSecret, { expiresIn: '48h' })
    },

    /**
     * verify token
     * 
     * @param {String} token
     * 
     * @throws {TypeError} - if token is not a string.
     * 
     * @returns {String} - sub
     */
    verifyToken(token) {
        if (typeof token !== 'string') throw new TypeError(`${token} should be a string`)
        if (!token.trim().length) throw new Error('token is empty')
        
        const { userId } = jwt.verify(token, this.jwtSecret)
        
        if (!userId) throw Error(`subject not present in token ${token}`)

        return userId
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