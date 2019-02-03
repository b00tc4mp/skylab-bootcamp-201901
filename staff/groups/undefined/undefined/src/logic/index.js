'use strict'

import ombdApi from '../ombd-api'
//import userApi from '../user-api'

/**
 * Abstraction of business logic.
 */
const logic = {
    // __userId__: null,
    // __userApiToken__: null,

    // /**
    // * Registers a user.
    // * 
    // * @param {string} name 
    // * @param {string} surname 
    // * @param {string} email 
    // * @param {string} password 
    // * @param {string} passwordConfirmation 
    // */
    // registerUser(name, surname, email, password, passwordConfirmation) {
    //     if (typeof name !== 'string') throw TypeError(name + ' is not a string')

    //     if (!name.trim().length) throw Error('name cannot be empty')

    //     if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

    //     if (!surname.trim().length) throw Error('surname cannot be empty')

    //     if (typeof email !== 'string') throw TypeError(email + ' is not a string')

    //     if (!email.trim().length) throw Error('email cannot be empty')

    //     if (typeof password !== 'string') throw TypeError(password + ' is not a string')

    //     if (!password.trim().length) throw Error('password cannot be empty')

    //     if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

    //     if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

    //     if (password !== passwordConfirmation) throw Error('passwords do not match')

    //     return userApi.register(name, surname, email, password)
    //         .then(() => { })
    // },

    // /**
    //  * Logins a user by its credentials.
    //  * 
    //  * @param {string} email 
    //  * @param {string} password 
    //  */
    // loginUser(email, password) {
    //     if (typeof email !== 'string') throw TypeError(email + ' is not a string')

    //     if (!email.trim().length) throw Error('email cannot be empty')

    //     if (typeof password !== 'string') throw TypeError(password + ' is not a string')

    //     if (!password.trim().length) throw Error('password cannot be empty')

    //     return userApi.authenticate(email, password)
    //         .then(({ id, token }) => {
    //             this.__userId__ = id
    //             this.__userApiToken__ = token
    //         })
    // },

    // retrieveUser() {
    //     return userApi.retrieve(this.__userId__, this.__userApiToken__)
    //         .then(({ id, name, surname, username }) => ({
    //             id,
    //             name,
    //             surname,
    //             email: username
    //         }))
    // },

    // TODO updateUser and removeUser

    /**
     * Search artists.
     * 
     * @param {string} query 
     * @returns {Promise}
     */
    searchItems(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!query.trim().length) throw Error('query is empty')

        return ombdApi.searchItemsList(query)
    },

    /**
     * Retrieves albums from artist.
     * 
     * @param {string} itemId 
     */
    retrieveItem(itemId) {
        if (typeof itemId !== 'string') throw TypeError(`${itemId} is not a string`)

        if (!itemId.trim().length) throw Error('itemId is empty')

        return ombdApi.retrieveItem(itemId)
    }
    
}

export default logic