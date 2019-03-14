'use strict'

function cors(req, res, next) {
    res.set('access-control-allow-headers', 'Accept, Authorization, Origin, Content-Type, Retry-After')
    res.set('access-control-allow-origin', '*')
    res.set('access-control-allow-methods','GET,POST,PUT,DELETE,OPTIONS')


    next()
}

module.exports = cors