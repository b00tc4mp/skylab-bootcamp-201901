'use strict'

require('dotenv').config()

const mongoose = require('mongoose')
const { User } = require('../')

const { env: { DB_URL } } = process

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => Promise.all([User.deleteMany()]))
    .then(() => User.create({ name: 'Manuel', surname: 'Barzi', email: 'manuelbarzi@gmail.com', password: '123' }))
    .then(() => mongoose.disconnect())
    .then(() => console.log('demo ended'))


