'use strict'

const spotifyApi = require('../spotify-api')
const users = require('../data/users')
const artistComments = require('../data/artist-comments')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

/**
 * Abstraction of business logic.
 */
const logic = {
    jwtSecret: null,

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

        return users.findByEmail(email)
            .then(user => {
                if (user) throw Error(`user with email ${email} already exists`)

                return bcrypt.hash(password, 10)
            })
            .then(hash => users.add({ name, surname, email, password: hash }))
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return users.findByEmail(email)
            .then(user => {
                if (!user) throw Error(`user with email ${email} not found`)

                return bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) throw Error('wrong credentials')

                        const { id } = user

                        const token = jwt.sign({ sub: id }, this.jwtSecret, { expiresIn: '4h' })

                        return token
                    })
            })
    },

    // TODO doc
    __verifyToken__(token) {
        const { sub } = jwt.verify(token, this.jwtSecret)

        if (!sub) throw Error(`user id not present in token ${token}`)

        return sub
    },

    // TODO doc
    retrieveUser(token) {
        // TODO validate userId and token type and content

        const userId = this.__verifyToken__(token)

        return users.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${id} not found`)

                delete user.password

                return user
            })
    },

    // TODO updateUser and removeUser

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
    },

    /**
     * Retrieves an artist.
     * 
     * @param {string} artistId 
     */
    retrieveArtist(artistId) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artistId is empty')

        return spotifyApi.retrieveArtist(artistId)
    },

    /**
     * Toggles a artist from non-favorite to favorite, and viceversa.
     * 
     * @param {string} artistId - The id of the artist to toggle in favorites.
     */
    toggleFavoriteArtist(token, artistId) {
        // TODO validate arguments

        const userId = this.__verifyToken__(token)

        return users.findById(userId)
            .then(user => {
                const { favoriteArtists = [] } = user

                const index = favoriteArtists.findIndex(_artistId => _artistId === artistId)

                if (index < 0) favoriteArtists.push(artistId)
                else favoriteArtists.splice(index, 1)

                user.favoriteArtists = favoriteArtists

                return users.update(user)
            })
    },

    addCommentToArtist(token, artistId, text) {
        // TODO validate userId, token, artistId and text

        const userId = this.__verifyToken__(token)

        const comment = {
            userId,
            artistId,
            text,
            date: new Date
        }

        return spotifyApi.retrieveArtist(artistId)
            .then(({ error }) => {
                if (error) throw Error(error.message)
            })
            .then(() => artistComments.add(comment))
            .then(() => comment.id)
    },

    listCommentsFromArtist(token, artistId) {
        // TODO validate artistId

        const userId = this.__verifyToken__(token)

        return users.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                return artistComments.find({ artistId })
            })

    },

    /**
     * Retrieves albums from artist.
     * 
     * @param {string} artistId 
     */
    retrieveAlbums(artistId) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artistId is empty')

        return spotifyApi.retrieveAlbums(artistId)
    },

    /**
     * Retrieves an album.
     * 
     * @param {string} albumId 
     */
    retrieveAlbum(albumId) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        return spotifyApi.retrieveAlbum(albumId)
    },

    /**
     * Toggles a album from non-favorite to favorite, and viceversa.
     * 
     * @param {string} albumId - The id of the album to toggle in favorites.
     */
    toggleFavoriteAlbum(token, albumId) {
        // TODO validate arguments

        const userId = this.__verifyToken__(token)

        return users.findById(userId)
            .then(user => {
                const { favoriteAlbums = [] } = user

                const index = favoriteAlbums.findIndex(_albumId => _albumId === albumId)

                if (index < 0) favoriteAlbums.push(albumId)
                else favoriteAlbums.splice(index, 1)

                user.favoriteAlbums = favoriteAlbums

                return users.update(user)
            })
    },

    /**
     * Retrieves tracks from album.
     * 
     * @param {string} albumId 
     */
    retrieveTracks(albumId) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        return spotifyApi.retrieveTracks(albumId)
    },

    /**
     * Retrieves track.
     * 
     * @param {string} trackId 
     */
    retrieveTrack(trackId) {
        if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)

        if (!trackId.trim().length) throw Error('trackId is empty')

        return spotifyApi.retrieveTrack(trackId)
    },

    /**
     * Toggles a track from non-favorite to favorite, and viceversa.
     * 
     * @param {string} trackId - The id of the track to toggle in favorites.
     */
    toggleFavoriteTrack(token, trackId) {
        // TODO validate arguments

        const userId = this.__verifyToken__(token)

        return users.findById(userId)
            .then(user => {
                const { favoriteTracks = [] } = user

                const index = favoriteTracks.findIndex(_trackId => _trackId === trackId)

                if (index < 0) favoriteTracks.push(trackId)
                else favoriteTracks.splice(index, 1)

                user.favoriteTracks = favoriteTracks

                return users.update(user)
            })
    }
}

module.exports = logic