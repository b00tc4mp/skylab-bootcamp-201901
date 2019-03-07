'use strict'

import coworkingApi from '../coworking-api'

/**
 * Abstraction of business logic.
 */
const logic = {
    __coworkingApiToken__: null,
    __isAdmin__: false,

    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */
    registerUser(name, surname, email, password, passwordConfirm) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirm !== 'string') throw TypeError(passwordConfirm + ' is not a string')

        if (!passwordConfirm.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirm) throw Error('passwords do not match')

        return coworkingApi.registerUser(name, surname, email, password, passwordConfirm)
            .then(() => { })
    },

    /**
     * Logs in the user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    logInUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return coworkingApi.authenticateUser(email, password)
            .then(({ token }) => {
                this.__coworkingApiToken__ = token
            })
    },
    
    /**
     * Checks user is logged in.
     */
    get isUserLoggedIn() {
        return !!this.__coworkingApiToken__
    },

        /**
     * Checks user is logged in.
     */
    get isUserAdmin() {
        return !!this.__isAdmin__
    },

    /**
     * Logs out the user.
     */
    logOutUser() {
        this.__coworkingApiToken__ = null
    },
    retrieveUser() {
        return coworkingApi.retrieveUser(this.__userApiToken__)
            .then(({ id, name, surname, email, favoriteArtists = [], favoriteAlbums = [], favoriteTracks = [] }) => ({
                id,
                name,
                surname,
                email,
                favoriteArtists,
                favoriteAlbums,
                favoriteTracks
            }))
    },

    removeUser(email, password) {
        return coworkingApi.removeUser(this.__userApiToken__, email, password)
            // .then( () => {})
    }

    // TODO updateUser and removeUser
}
export default logic