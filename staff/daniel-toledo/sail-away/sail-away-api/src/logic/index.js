'use strict'

const jwt = require('jsonwebtoken')
const { models: { User, Journey }, } = require('sail-away-data')
const bcrypt = require('bcrypt')

const logic = {
    addJourney(sea, route, dates, description) {
        if (route.constructor !== Array) throw TypeError(route + ' is not an Array')
        if (!route.length) throw Error('route cannot be empty')

        if (dates.constructor !== Array) throw TypeError(dates + ' is not an Array')
        if (!dates.length) throw Error('dates cannot be empty')

        if (typeof description !== 'string') throw TypeError(description + ' is not a string')
        if (!description.trim().length) throw Error('description cannot be empty')

        return (async () => {
            const journey = new Journey({ sea, route, dates, description })
            await journey.save()
            return journey.id
        })()
    },

    retrieveJourney(id) {
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        return (async () => {
            const result = await Journey.findById(id).select('-__v').lean()
            if (!result) return { error: 'journey not found' }
            else {
                result.id = result._id.toString()
                delete result._id
                return result
            }
        })()
    },

    listJourneys() {
        return (async () => {
            const results = await Journey.find().lean()
            debugger
            results.map(result => {
                result.id = result._id.toString()
                delete result._id
                delete result.__v
                return result
            })

            return results
        })()
    },

    searchJourneys(query) {
        if (typeof query !== 'string') throw TypeError(query + ' is not a string')
        if (!query.trim().length) throw Error('query cannot be empty')

        return (async () => {
            const results = await Journey.find({ "sea.name": query }).lean()

            results.map(result => {
                result.id = result._id.toString()
                delete result._id
                delete result.__v
                return result
            })

            return results
        })()
    },

    updateJourney(id, sea, route, dates, description) {
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        if (route.constructor !== Array) throw TypeError(route + ' is not an Array')
        if (!route.length) throw Error('route cannot be empty')

        if (dates.constructor !== Array) throw TypeError(dates + ' is not an Array')
        if (!dates.length) throw Error('dates cannot be empty')

        if (typeof description !== 'string') throw TypeError(description + ' is not a string')
        if (!description.trim().length) throw Error('description cannot be empty')


        return (async () => {
            const { id, error } = await Journey.findByIdAndUpdate(id, { $set: { sea, route, dates, description } }).lean()

            return id
        })()

    },

    deleteJourney(id) {
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        return (async () => {
            const { id } = await Journey.findByIdAndDelete(id)

            return id
        })()

    }

}

module.exports = logic