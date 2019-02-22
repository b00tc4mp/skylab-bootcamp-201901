'use strict'

const { ObjectId } = require('mongodb')

const user = {
    collection: null,

    __normalize__(user) {
        user.id = user._id.toString()

        delete user._id

        return user
    },

    add(user) {
        // TODO validate user and its fields (type and content)

        return this.collection.insertOne(user)
            .then(res => res.insertedId.toString())
    },

    findByEmail(email) {
        // TODO validate email

        return this.collection.findOne({ email })
            .then(user => {
                if (!user) return null

                return this.__normalize__(user)
            })
    },

    findById(id) {
        // TODO validate email

        return this.collection.findOne({ _id: ObjectId(id) })
            .then(user => {
                if (!user) return null

                return this.__normalize__(user)
            })
    },

    update(user) {
        // TODO validate user is an object with at least an id field

        const { id, ..._user } = user

        return this.collection.findOneAndUpdate({ _id: ObjectId(id) }, { $set: _user })
            .then(() => { })
    }
}

module.exports = user