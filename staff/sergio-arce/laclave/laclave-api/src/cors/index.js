'use strict'

function cors(req, res, next) {
    
    res.set('access-control-allow-headers', 'Accept, Authorization, Origin, Content-Type, Retry-After')
    res.set('access-control-allow-methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH')
    res.set('access-control-allow-origin', '*')

    next()
}

module.exports = cors