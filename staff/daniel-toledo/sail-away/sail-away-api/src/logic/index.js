'use strict'

const jwt = require('jsonwebtoken')
const { User, Journey } = require('sail-away-data')
const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose
const bcrypt = require('bcrypt')

const logic = {
    addJourney(route, dates, description) {
        if (route.constructor !== Array) throw TypeError(route + ' is not an Array')
        if (!route.length) throw Error('route cannot be empty')

        if (dates.constructor !== Array) throw TypeError(dates + ' is not an Array')
        if (!dates.length) throw Error('dates cannot be empty')

        if (typeof description !== 'string') throw TypeError(description + ' is not a string')
        if (!description.trim().length) throw Error('description cannot be empty')

        return (async () => {

            const res = await Journey.create({route, dates, description})
            debugger
            return res.id
        })()
    }

}

module.exports = logic