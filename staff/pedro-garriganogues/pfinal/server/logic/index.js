'use strict'

const { mongoose, models: { User, Category, Product, Order } } = require('data')
const mongoose = require('mongoose')

const logic = {

    register(name, surname, email, password, passwordConfirmation) {

    },

    retrieve() {

    },

    authenticateUser(email, password) {
        return Promise.resolve()
            .then(() => {
                return User.findOne({ email, password })
            })
            .then(user => {
                if (!user) throw Error('wrong credentials')

                return user.id
            })
    },

    authen(email, password) {
        return Promise.resolve()
            .then(() => {
                return User.findOne({ email, password }, { _id: 1, email: 1 })
            })
            .then(user => {
                if (!user) throw Error('email and/or password wrong')

                return user
            })
    },

    update() {

    },

    delete() {

    }
}

module.exports = logic