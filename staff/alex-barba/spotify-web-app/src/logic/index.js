'use strict'

const userApi = require('../user-api')
const spotifyApi = require('../spotify-api')


/**
 * Abstraction of business logic.
 */
class Logic {
    constructor(storage = {}) {
        if (typeof storage !== 'object') throw Error(`${storage} is not an Object`)

        this.__storage__ = storage
    }

    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
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

        return userApi.authenticate(email, password)
            .then(({ id, token }) => {
                this.__storage__.userId = id
                this.__storage__.userApiToken = token
            })
    }

    /**
     * Checks user is logged in.
     */
    get isUserLoggedIn() {
        return !!this.__storage__.userId
    }

    /**
     * Logs out the user.
     */
    logOutUser() {
        this.__storage__.userId = null
        this.__storage__.userApiToken = null
    }

    retrieveUser() {
        return userApi.retrieve(this.__storage__.userId, this.__storage__.userApiToken)
            .then(({ id, name, surname, username: email, favoriteArtists = [], favoriteAlbums = [], favoriteTracks = [] }) => ({
                id,
                name,
                surname,
                email,
                favoriteArtists,
                favoriteAlbums,
                favoriteTracks
            }))
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
     * Retrieves an artist.
     * 
     * @param {string} artistId 
     */
    retrieveArtist(artistId) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artistId is empty')

        return spotifyApi.retrieveArtist(artistId)
    }

    /**
     * Toggles a artist from non-favorite to favorite, and viceversa.
     * 
     * @param {string} artistId - The id of the artist to toggle in favorites.
     */
    toggleFavoriteArtist(artistId) {
        return userApi.retrieve(this.__storage__.userId, this.__storage__.userApiToken)
            .then(user => {
                const { favoriteArtists = [] } = user

                const index = favoriteArtists.findIndex(_artistId => _artistId === artistId)

                if (index < 0) favoriteArtists.push(artistId)
                else favoriteArtists.splice(index, 1)

                return userApi.update(this.__storage__.userId, this.__storage__.userApiToken, { favoriteArtists })
            })
    }

    /**
     * Retrieves albums from artist.
     * 
     * @param {string} artistId 
     */
    retrieveAlbums(artistId) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artistId is empty')

        return spotifyApi.retrieveAlbums(artistId)
    }

    /**
     * Retrieves an album.
     * 
     * @param {string} albumId 
     */
    retrieveAlbum(albumId) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        return spotifyApi.retrieveAlbum(albumId)
    }

    /**
     * Toggles a album from non-favorite to favorite, and viceversa.
     * 
     * @param {string} albumId - The id of the album to toggle in favorites.
     */
    toggleFavoriteAlbum(albumId) {
        return userApi.retrieve(this.__storage__.userId, this.__storage__.userApiToken)
            .then(user => {
                const { favoriteAlbums = [] } = user

                const index = favoriteAlbums.findIndex(_albumId => _albumId === albumId)

                if (index < 0) favoriteAlbums.push(albumId)
                else favoriteAlbums.splice(index, 1)

                return userApi.update(this.__storage__.userId, this.__storage__.userApiToken, { favoriteAlbums })
            })
    }

    /**
     * Retrieves tracks from album.
     * 
     * @param {string} albumId 
     */
    retrieveTracks(albumId) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        return spotifyApi.retrieveTracks(albumId)
    }

    /**
     * Retrieves track.
     * 
     * @param {string} trackId 
     */
    retrieveTrack(trackId) {
        if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)

        if (!trackId.trim().length) throw Error('trackId is empty')

        return spotifyApi.retrieveTrack(trackId)
    }

    /**
     * Toggles a track from non-favorite to favorite, and viceversa.
     * 
     * @param {string} trackId - The id of the track to toggle in favorites.
     */
    toggleFavoriteTrack(trackId) {
        return userApi.retrieve(this.__storage__.userId, this.__storage__.userApiToken)
            .then(user => {
                const { favoriteTracks = [] } = user

                const index = favoriteTracks.findIndex(_trackId => _trackId === trackId)

                if (index < 0) favoriteTracks.push(trackId)
                else favoriteTracks.splice(index, 1)

                return userApi.update(this.__storage__.userId, this.__storage__.userApiToken, { favoriteTracks })
            })
    }
}

module.exports = Logic