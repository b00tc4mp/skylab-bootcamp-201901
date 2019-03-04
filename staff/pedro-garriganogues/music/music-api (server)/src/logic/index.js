'use strict'

const spotifyApi = require('../spotify-api')
const { models: { User, Comment } } = require('music-data')
const bcrypt = require('bcrypt')
const { AuthError, EmptyError, DuplicateError, MatchingError, NotFoundError } = require('music-errors')

/**
 * Abstraction of business logic.
 */
const logic = {
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

        if (!name.trim().length) throw new EmptyError('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw new EmptyError('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw new EmptyError('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw new EmptyError('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw new EmptyError('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw new MatchingError('passwords do not match')

        // return User.findOne({ email })
        //     .then(user => {
        //         if (user) throw Error(`user with email ${email} already exists`)

        //         return bcrypt.hash(password, 10)
        //     })
        //     .then(hash => User.create({ name, surname, email, password: hash }))
        //     .then(({ id }) => id)

        return (async () => {
            const user = await User.findOne({ email })

            if (user) throw new DuplicateError(`user with email ${email} already exists`)

            const hash = await bcrypt.hash(password, 10)

            const { id } = await User.create({ name, surname, email, password: hash })

            return id
        })()
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw new EmptyError('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw new EmptyError('password cannot be empty')

        return (async () => {
                const user = await User.findOne({ email })
                
                if (!user) throw new NotFoundError(`user with email ${email} not found`)
                
                const match = await bcrypt.compare(password, user.password)
                
                if (!match) throw new AuthError('wrong credentials')
                
                return user.id
        })()
    },

    // TODO doc
    retrieveUser(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)

        if (!userId.trim().length) throw new EmptyError('user id is empty')

        return User.findById(userId).select('-password -__v').lean()
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)

                // delete user.password
                // delete user.__v

                user.id = user._id.toString()

                delete user._id

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
     * @param {string} userId - The id of the user toggling the artist.
     * @param {string} artistId - The id of the artist to toggle in favorites.
     */
    toggleFavoriteArtist(userId, artistId) {
        // TODO validate arguments

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

    addCommentToArtist(userId, artistId, text) {
        // TODO validate userId, token, artistId and text

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

    listCommentsFromArtist(userId, artistId) {
        // TODO validate arguments

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
    toggleFavoriteAlbum(userId, albumId) {
        // TODO validate 

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
    toggleFavoriteTrack(userId, trackId) {
        // TODO validate arguments

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