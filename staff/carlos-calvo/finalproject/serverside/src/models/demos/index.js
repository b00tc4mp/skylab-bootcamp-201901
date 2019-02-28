// 'use strict'

// require('dotenv').config()

// const mongoose = require('mongoose')
// const { User, Comment } = require('../')

// const { env: { DB_URL } } = process

// mongoose.connect(DB_URL, { useNewUrlParser: true })
//     .then(() => Promise.all([User.deleteMany(), Comment.deleteMany()]))
//     .then(() => User.create({ name: 'Manuel', surname: 'Barzi', email: 'manuelbarzi@gmail.com', password: '123' }))
//     .then(user => Comment.create({ text: 'Hola Mundo', user: user.id, targetId: 'madonna-id', target: 'artist' }))
//     .then(comment => {debugger})
//     .then(() => mongoose.disconnect())
//     .then(() => console.log('demo ended'))


