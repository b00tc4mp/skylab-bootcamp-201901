'use strict'

const user = {
    collection: null,

    add(user) {
        // TODO validate user and its fields (type and content)

        return this.collection.insertOne(user)
            .then(res => res.insertedId.toString())
    },

    findByEmail(email) {
        // TODO validate email

        return this.collection.findOne({ email })
    }
}

module.exports = user