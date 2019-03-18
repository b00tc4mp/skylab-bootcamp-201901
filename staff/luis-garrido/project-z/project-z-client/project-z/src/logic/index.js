"use strict";


import projectZApi from "../project-z-api";

/**
 * Abstraction of business logic.
 */
const logic = {
    __userApiToken__: null,

    /**
     * Registers a user.
     *
     * @param {string} username
     * @param {string} name
     * @param {string} surname
     * @param {string} email
     * @param {string} password
     * @param {string} passwordConfirmation
     */
    registerUser(
        username,
        name,
        surname,
        email,
        password,
        passwordConfirmation
    ) {
        if (typeof username !== "string")
            throw TypeError(username + " is not a string");

        if (!username.trim().length) throw Error("username cannot be empty");

        if (typeof name !== "string")
            throw TypeError(name + " is not a string");

        if (!name.trim().length) throw Error("name cannot be empty");

        if (typeof surname !== "string")
            throw TypeError(surname + " is not a string");

        if (!surname.trim().length) throw Error("surname cannot be empty");

        if (typeof email !== "string")
            throw TypeError(email + " is not a string");

        if (!email.trim().length) throw Error("email cannot be empty");

        if (typeof password !== "string")
            throw TypeError(password + " is not a string");

        if (!password.trim().length) throw Error("password cannot be empty");

        if (typeof passwordConfirmation !== "string")
            throw TypeError(passwordConfirmation + " is not a string");

        if (!passwordConfirmation.trim().length)
            throw Error("password confirmation cannot be empty");

        if (password !== passwordConfirmation)
            throw Error("passwords do not match")
        
        return projectZApi
            .registerUser(
                username,
                name,
                surname,
                email,
                password,
                passwordConfirmation
            )
            .then(() => {});
    },

    /**
     * Logs in the user by its credentials.
     *
     * @param {string} email
     * @param {string} password
     */
    loginUser(userData, password) {
        if (typeof userData !== "string")
            throw TypeError(userData + " is not a string");

        if (!userData.trim().length) throw Error("userData cannot be empty");

        if (typeof password !== "string")
            throw TypeError(password + " is not a string");

        if (!password.trim().length) throw Error("password cannot be empty");

        return projectZApi.authenticateUser(userData, password).then(user => {
            this.__userApiToken__ = user.token;
        });
    },

    /**
     * Checks user is logged in.
     */
    get isUserLoggedIn() {
        return !!this.__userApiToken__;
    },

    /**
     * Logs out the user.
     */
    logOutUser() {
        this.__userApiToken__ = null;
    },

    retrieveUserInfo() {
        return projectZApi.retrieveUser(this.__userApiToken__);
    },

    retrieveUserInfoByUsername(username) {
        if (typeof username !== "string")
            throw TypeError(`${username} is not a string`);

        if (!username.trim().length) throw Error("username is empty");

        return projectZApi.retrieveUserInfoByUsername(username);
    },

    // TODO updateUser and removeUser
    /**
     * Retrieve best scored games
     *
     * @returns {object} best scored games based in their finalScore property
     *
     */
    retrieveBestScored(limit) {
        return projectZApi.retrieveBestScored(limit);
    },

    searchGames(query) {
        if (typeof query !== "string")
            throw TypeError(`${query} is not a string`);

        if (!query.trim().length) throw Error("query is empty");

        return projectZApi.searchGames(query);
    },

    retrieveGameInfo(gameId) {
        if (typeof gameId !== "string")
            throw TypeError(`${gameId} is not a string`);

        if (!gameId.trim().length) throw Error("gameId is empty");

        if (isNaN(Number(gameId)))
            throw TypeError(`${gameId} should be a number`);

        if (!isNaN(Number(gameId)) && Number(gameId) < 1)
            throw Error(`${gameId} should be a bigger than 0 number`);

        if (!isNaN(Number(gameId)) && Number(gameId) % 1 !== 0)
            throw Error(`${gameId} should be an integer number`);

        return projectZApi.retrieveGameInfo(gameId);
    },

    postReview(gameId, title, text, score) {
        return projectZApi.postReview(this.__userApiToken__, gameId, title, text, score)
    },

    getRandomGame() {
        return projectZApi.getRandomGame()
    },

    getPreScore(gameId, gameInfo) {
        if (typeof gameId !== "string")
            throw TypeError(`${gameId} is not a string`);

        if (!gameId.trim().length) throw Error("gameId is empty");

        return projectZApi.getPreScore(this.__userApiToken__, gameId, gameInfo)
    }

    // /**
    //  * Search artists.
    //  *
    //  * @param {string} query
    //  * @returns {Promise}
    //  */
    // searchArtists(query) {
    //     if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

    //     if (!query.trim().length) throw Error('query is empty')

    //     return musicApi.searchArtists(query)
    // },

    // /**
    //  * Retrieves an artist.
    //  *
    //  * @param {string} artistId
    //  */
    // retrieveArtist(artistId) {
    //     if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

    //     if (!artistId.trim().length) throw Error('artistId is empty')

    //     return musicApi.retrieveArtist(artistId)
    // },

    // /**
    //  * Toggles a artist from non-favorite to favorite, and viceversa.
    //  *
    //  * @param {string} artistId - The id of the artist to toggle in favorites.
    //  */
    // toggleFavoriteArtist(artistId) {
    //     return musicApi.retrieveUser(this.__userApiToken__)
    //         .then(user => {
    //             const { favoriteArtists = [] } = user

    //             const index = favoriteArtists.findIndex(_artistId => _artistId === artistId)

    //             if (index < 0) favoriteArtists.push(artistId)
    //             else favoriteArtists.splice(index, 1)

    //             return musicApi.update(this.__userApiToken__, { favoriteArtists })
    //         })
    // },

    // /**
    //  * Retrieves albums from artist.
    //  *
    //  * @param {string} artistId
    //  */
    // retrieveAlbums(artistId) {
    //     if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

    //     if (!artistId.trim().length) throw Error('artistId is empty')

    //     return musicApi.retrieveAlbums(artistId)
    // },

    // /**
    //  * Retrieves an album.
    //  *
    //  * @param {string} albumId
    //  */
    // retrieveAlbum(albumId) {
    //     if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

    //     if (!albumId.trim().length) throw Error('albumId is empty')

    //     return musicApi.retrieveAlbum(albumId)
    // },

    // /**
    //  * Toggles a album from non-favorite to favorite, and viceversa.
    //  *
    //  * @param {string} albumId - The id of the album to toggle in favorites.
    //  */
    // toggleFavoriteAlbum(albumId) {
    //     return musicApi.retrieveUser(this.__userApiToken__)
    //         .then(user => {
    //             const { favoriteAlbums = [] } = user

    //             const index = favoriteAlbums.findIndex(_albumId => _albumId === albumId)

    //             if (index < 0) favoriteAlbums.push(albumId)
    //             else favoriteAlbums.splice(index, 1)

    //             return musicApi.update(this.__userApiToken__, { favoriteAlbums })
    //         })
    // },

    // /**
    //  * Retrieves tracks from album.
    //  *
    //  * @param {string} albumId
    //  */
    // retrieveTracks(albumId) {
    //     if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

    //     if (!albumId.trim().length) throw Error('albumId is empty')

    //     return musicApi.retrieveTracks(albumId)
    // },

    // /**
    //  * Retrieves track.
    //  *
    //  * @param {string} trackId
    //  */
    // retrieveTrack(trackId) {
    //     if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)

    //     if (!trackId.trim().length) throw Error('trackId is empty')

    //     return musicApi.retrieveTrack(trackId)
    // },

    // /**
    //  * Toggles a track from non-favorite to favorite, and viceversa.
    //  *
    //  * @param {string} trackId - The id of the track to toggle in favorites.
    //  */
    // toggleFavoriteTrack(trackId) {
    //     return musicApi.retrieveUser(this.__userApiToken__)
    //         .then(user => {
    //             const { favoriteTracks = [] } = user

    //             const index = favoriteTracks.findIndex(_trackId => _trackId === trackId)

    //             if (index < 0) favoriteTracks.push(trackId)
    //             else favoriteTracks.splice(index, 1)

    //             return musicApi.update(this.__userApiToken__, { favoriteTracks })
    //         })
    // }
};

export default logic;
