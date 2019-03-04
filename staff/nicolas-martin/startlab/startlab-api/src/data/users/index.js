'use strict'

const { ObjectId } = require('mongodb')

const user = {
    collection: null,

    /**
     * Normalize an user for security reasons
     * Remove the _id from mongo
     * 
     * @param {object} user to normalize
     * @returns {object} the normalized user
     */
    __normalize__(user) {
        user.id = user._id.toString()
        delete user._id
        //delete user.isAdmin // used in logic and client need it
        delete user.password
        return user
    },

    /**
     * Add an user
     * 
     * @param {object} user
     * @returns {string} the id from the user
     */
    add(user) {
        if (user.constructor !== Object) throw TypeError(`${user} is not an object`)
        
        return this.collection.insertOne(user)
            .then(res => res.insertedId.toString())
    },


    /**
     * Find an user per email
     * 
     * @param {string} email 
     * @returns {object} the normalized user is found, null otherwise
     */

    findByEmail(email){
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email cannot be empty')

        return this.collection.findOne({ email })
            .then(user => {
                if (!user) return null 

                // logic need the password when authenticates
                // return this.__normalize__(user)

                // temporary before mongooose
                user.id = user._id.toString()
                delete user._id

                return user
            })
    },

    /**
     * Find an user per id
     * 
     * @param {string} id 
     * @returns {object} the normalized user is found, null otherwise
     */
    findById(id) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id cannot be empty')

        return this.collection.findOne({ _id: ObjectId(id) })
            .then(user => {
                if (!user) return null

                return this.__normalize__(user)
            })
    },

    /**
     * Updates an user
     * 
     * @param {string} id 
     * @param {object} data - the new data to update or to add to the user 
     * @returns {object} the normalized user is found, null otherwise
     */

    update(user) {
        if (user.constructor !== Object) throw TypeError(`${user} is not an object`)

        const { id, ..._user } = user
        return this.collection.findOneAndUpdate({ _id: ObjectId(id) }, { $set: _user })
            .then(() => { })
    }

    // { upsert: true } // used with update method which creates a new document if the query 
                        // does not retrieve any documents satisfying the criteria

    // findOneAndUpdate returns the document before the change 
    // updateOne is when you don't need the document and want to 
    // save a bit of time and bandwidth.
}

module.exports = user