const { Schema } = require('mongoose')

const heroes = new Schema({
    name: String,
    realName: String,
    age: Number,
    powers: Array
})

const villians = new Schema({
    name: String,
    realName: String,
    age: Number,
    powers: Array
})

module.exports = {
    heroes,
    villians
}