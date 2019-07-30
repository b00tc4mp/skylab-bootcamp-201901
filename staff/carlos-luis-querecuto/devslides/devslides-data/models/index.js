const mongoose = require('mongoose')
const schemas = require('./schemas')

const { user, presentation, slide, element } = schemas

module.exports = {
    User: mongoose.model('User', user),
    Presentation: mongoose.model('Presentation', presentation),
    Slide: mongoose.model('Slide', slide),
    Element: mongoose.model('Element', element)
}