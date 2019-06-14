const mongoose = require('mongoose')
const schemas =  require('./schemas')

const { user, point, tracker, track } = schemas


module.exports = {
    User: mongoose.model('User', user),
    Point: mongoose.model('Point', point),
    Tracker: mongoose.model('Tracker', tracker),
    Track: mongoose.model('Track', track),
    mongoose
}