'use strict'

require('dotenv').config()

const mongoose = require('mongoose')
const { User } = require('../')

const { env: { DB_URL } } = process

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => Promise.all([User.deleteMany()]))
    .then(() => mongoose.disconnect())
    .then(() => console.log('demo ended'))




