'use strict'

import pokemonApi from './apipokemon'
import userApi from './user-api'
/**
 * Abstraction of business logic.
 */
const logic = {
    //Pokemon Side
    retrievePokemon(query){
        return pokemonApi.searchPokemonByName(query)
    },

    retrieveAllPokemons(){
        return pokemonApi.searchAllPokemons()
    },


    // __userId__: null,
    // __userApiToken__: null,

    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */
    registerUser( email, username, password, passwordConfirmation) {
        if (typeof username !== 'string') throw TypeError(username + ' is not a string')

        if (!username.trim().length) throw Error('username cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return userApi.register(email, username, password, passwordConfirmation)
            .then(() => { })
    },

    /**
     * Logins a user by its credentials.
     * 
     * @param {string} username 
     * @param {string} password 
     */
    loginUser(username, password) {
        if (typeof username !== 'string') throw TypeError(username + ' is not a string')

        if (!username.trim().length) throw Error('username cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return userApi.authenticate(username, password)
            .then(({ id, token }) => {
                this.__userId__ = id
                this.__userApiToken__ = token
            })
    },



    // TODO updateUser and removeUser

    // /**
    //  * Search artists.
    //  * 
    //  * @param {string} query 
    //  * @returns {Promise}
    //  */
    // searchArtists(query) {
    //     if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

    //     if (!query.trim().length) throw Error('query is empty')

    //     return spotifyApi.searchArtists(query)
    // },

    // /**
    //  * Retrieves albums from artist.
    //  * 
    //  * @param {string} artistId 
    //  */
    // retrieveAlbums(artistId) {
    //     if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

    //     if (!artistId.trim().length) throw Error('artistId is empty')

    //     return spotifyApi.retrieveAlbums(artistId)
    // },

    // /**
    //  * Retrieves tracks from album.
    //  * 
    //  * @param {string} albumId 
    //  */
    // retrieveTracks(albumId) {
    //     if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

    //     if (!albumId.trim().length) throw Error('albumId is empty')

    //     return spotifyApi.retrieveTracks(albumId)
    // },

    // /**
    //  * Retrieves track.
    //  * 
    //  * @param {string} trackId 
    //  */
    // retrieveTrack(trackId) {
    //     if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)

    //     if (!trackId.trim().length) throw Error('trackId is empty')

    //     return spotifyApi.retrieveTrack(trackId)
    // }
}

export default logic