'use strict'

require('dotenv').config()

const mongoose = require('mongoose')
const { User, Comment } = require('../')

const { env: { DB_URL } } = process

mongoose.connect(DB_URL, { useNewUrlParser: true })
    // clean data
    // .then(() => Promise.all([User.deleteMany(), Comment.deleteMany()]))
    .then(() => Promise.all([mongoose.connection.dropCollection('users'), mongoose.connection.dropCollection('comments')]))
    .catch(err => console.log('if collection is not found, then error, but not a big problem :)'))
    // demo 1
    // .then(() => User.create({ name: 'Manuel', surname: 'Barzi', email: 'manuelbarzi@gmail.com', password: '123' }))
    // .then(user => Comment.create({ text: 'Hola Mundo', user: user.id, targetId: 'madonna-id', target: 'artist' }))
    // .then(comment => {debugger})
    // demo 2
    .then(() => {
        const insertions = []

        for (let i = 0; i < 1000; i++)
            insertions.push(User.create({ name: 'Manuel', surname: 'Barzi', email: `manuelbarzi-${i}@gmail.com`, password: '123' }))

        return Promise.all(insertions)
    })
    .then(async () => {
        const cursor = User.find({ name: 'Manuel' }).cursor()

        let user

        while (user = await cursor.next())
            console.log(user)
    })
    // disconnect
    .then(() => console.log('demo ended'))
    // .then(() => mongoose.disconnect())
    .catch(console.error)


