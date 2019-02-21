'use strict'

const user = {
    collection: null,

    add(user) {
        // TODO validate user and its fields (type and content)

        return this.collection.insertOne(user)
            .then(res => res.insertedId.toString())
    }
}

module.exports = user