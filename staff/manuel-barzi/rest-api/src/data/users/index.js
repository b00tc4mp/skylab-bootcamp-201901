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
            .then(user => {
                if (!user) return null

                user.id = user._id.toString()

                delete user._id

                return user
            })
    }
}

module.exports = user