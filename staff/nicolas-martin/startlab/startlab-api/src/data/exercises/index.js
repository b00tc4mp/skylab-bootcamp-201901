'use strict'

const { ObjectId } = require('mongodb')

const exercise = {

    collection: null,

    __normalize__(exercise) {
        exercise.id = exercise._id.toString()
        delete exercise._id
        return exercise
    },

    create(exercise) {
        if (exercise.constructor !== Object) throw TypeError(`${exercise} is not an object`)

        return this.collection.insertOne(exercise)
            .then(res => res.insertedId.toString())
    },

    findById(exerciseId) {
        if (typeof exerciseId !== 'string') throw Error(`${exerciseId} is not a string`)
        if (!exerciseId.trim().length) throw Error('exerciseId can not be empty')

        return this.collection.findOne({ _id: ObjectId(exerciseId) })
            .then(exercise => {
                if (!exercise) return { error: 'exercise not found' }
                return this.__normalize__(exercise)
            })
    },

    delete(exerciseId) {
        if (typeof exerciseId !== 'string') throw Error(`${exerciseId} is not a string`)
        if (!exerciseId.trim().length) throw Error('exerciseId can not be empty')

        return this.collection.deleteOne({ _id: ObjectId(exerciseId) })
            .then((res) => {
                if (res.deletedCount !== 1) throw Error(`exercise with id ${exerciseId} not found`)

                return { status: 'ok', message: `exercise with id ${exerciseId} deleted` }
            })
    },

    update(exercise) {
        if (exercise.constructor !== Object) throw TypeError(`${exercise} is not an object`)

        const { id, ..._exercise } = exercise

        return this.collection.findOneAndUpdate({ _id: ObjectId(id) }, { $set: _exercise })
            .then((res) => {
                if (res.value === null) throw Error(`exercise with ${id} not found`)
                return { status: 'ok', message: `exercise with id ${id} updated` }
            })
    }
}

module.exports = exercise