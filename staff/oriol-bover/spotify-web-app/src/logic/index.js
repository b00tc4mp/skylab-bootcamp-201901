'use strict'
const userApi = require('../user-api')
const spotifyApi = require('../spotify-api')

/**
 * Abstraction of business logic.
 */
class Logic {

    constructor(storage = {}) {
        if (typeof storage != 'object') throw TypeError(`${storage} is not an object`)

        this.__storage__ = storage
    }

    /**
     * check if the user is logged
     */

    get isUserLoggedIn() {
        return !!this.__storage__.userId
    }

    /**
     * Logs out the user
     */

    logOutUser() {
        this.__storage__.userId = null
        this.__storage__.userApiToken = null
    }

    /**
    * Registers a user.
    * 
    * Register a user in the application
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    * 
    * @returns {promise} - returns a empty promise
    */
    registerUser(name, surname, email, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return userApi.register(name, surname, email, password)
            .then(() => { })
    }

    /**
     * 
     * Login User
     * 
     * Logins a user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {promise} - sets in sessioin storage the token and the id of the user
     */
    loginUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return userApi.authenticate(email, password)
            .then((data) => {
                this.__storage__.userId = data.id
                this.__storage__.userApiToken = data.token
                return data
            })
    }
    /**
     * Retrieve user
     * 
     * retrieve the information of the logged user
     * 
     * 
     * @returns {promise} - returns the infromation of a user in object format
     * 
     */
    retrieveUser() {
        return userApi.retrieve(this.__storage__.userId, this.__storage__.userApiToken)
            .then(({ id, name, surname, username, favourites }) => ({
                id,
                name,
                surname,
                email: username,
                favourites,
            }))
    }

    /**
     * 
     * update user
     * 
     * updates an user with new information
     * 
     * @param {Object} - data 
     * 
     * @returns {promise}
     */

    updateUser(data) {
        if (data.constructor !== Object) throw TypeError(data + 'is not an Object')

        return userApi.update(this.__storage__.userId(), this.__storage__.userApiToken(), data)
    }

    /**
     * Search artists.
     * 
     * @param {string} query 
     * @returns {Promise}
     */
    searchArtists(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!query.trim().length) throw Error('query is empty')

        return spotifyApi.searchArtists(query)
    }


    /**
     * Retrieve Albums
     * 
     * @param {string} artistId
     * @returns {Promise} 
     */
    retrieveAlbums(artistId) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artistId is empty')

        return spotifyApi.retrieveAlbums(artistId)
    }


    /**
     * 
     * Retrieve Album
     * 
     * @param {string} albumId 
     * @returns {Promise}
     */
    retrieveAlbum(albumId) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        return spotifyApi.retrieveAlbum(albumId)
    }


    /**
     * Retrieve Tracks
     * 
     * @param {string} albumId 
     * @returns {Promise}
     */
    retrieveTracks(albumId) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        return spotifyApi.retrieveTracks(albumId)
    }


    /**
     * Retrieve Track
     * 
     * @param {string} trackId 
     * @returns {Promise}
     */
    retrieveTrack(trackId) {
        if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)

        if (!trackId.trim().length) throw Error('trackId is empty')

        return spotifyApi.retrieveTrack(trackId)
    }

}

module.exports = Logic