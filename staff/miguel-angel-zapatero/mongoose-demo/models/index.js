const {heroes, villians} = require('./schemas')
const { model } = require('mongoose')

const Hero = model('Hero', heroes)
const Villians = model('Villians', villians)

module.exports = { 
    Hero,
    Villians
}