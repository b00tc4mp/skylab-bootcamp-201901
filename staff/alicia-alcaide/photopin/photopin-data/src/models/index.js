const { model } = require('mongoose')
const { user, pmap, pin } = require('./schemas/index')

module.exports = {
    User: model('User', user),
    PMap: model('PMap', pmap),
    Pin: model('Pin', pin)
}

