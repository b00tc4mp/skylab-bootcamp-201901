'use strict'

const { mongoose, models: { User } } = require('data')
const mongoose = require('mongoose')

const logic = {

    async registerUser(name, surname, email, password, passwordConfirmation) {

        if (typeof email !== 'string') throw Error('email is not a string')

        const user = await User.findOne({ email }).exec()

        if (user) throw Error(`user with email ${email} already exists`)

        await User.create({ name, surname, email, password, passwordConfirmation }).exec()

    },

    // retrieveUser() {
    // },


    // update() {

    // },

    // delete() {

    // }
}

module.exports = logic





// Ez way:

// const logic = {
//     authenticateUser(email, password) {
//         return Promise.resolve()
//             .then(() => {
//                 return User.findOne({ email, password })
//             })
//             .then(user => {
//                 if (!user) throw Error('wrong credentials')

//                 return user.id
//             })
//     }
// }

// Async way:

// const logic = {
//     async authenticateUser(email, password) {
//         const user = await User.findOne({ email, password }).exec()
//         return user
//     }
// }

// Call mode 1:

// async function login(email, password) {

//     return await logic.authenticateUser(email, password)

// }


// Call mode 2: 

// login = async (email, password) => await logic.authenticateUser(email, password)

