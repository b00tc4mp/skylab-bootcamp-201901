"use strict";

const {
    AuthError,
    EmptyError,
    DuplicateError,
    MatchingError,
    NotFoundError
} = require("project-z-errors");
const validate = require("project-z-validation");

const projectZApi = {
    url: "http://localhost:8000/api",

    registerUser(
        username,
        name = "",
        surname = "",
        email,
        password,
        passwordConfirmation,
        admin = false,
        avatar = "10"
    ) {
       
        validate([
            { key: "admin", value: admin, type: Boolean },
            { key: "username", value: username, type: String },
            { key: "avatar", value: avatar, type: String },
            { key: "name", value: name, type: String, optional: true },
            { key: "surname", value: surname, type: String, optional: true },
            { key: "email", value: email, type: String },
            { key: "password", value: password, type: String },

            {
                key: "passwordConfirmation",
                value: passwordConfirmation,
                type: String
            }
        ]);
        
        return fetch(`${this.url}/user`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                admin,
                username,
                avatar,
                name,
                surname,
                email,
                password,
                passwordConfirm: passwordConfirmation
            })
        })
            .then(response => response.json())
            .then(({ error, id }) => {
                // console.log(id, error);
                if (error) {
                    throw Error(error);}

                return id;
            });
    },

    authenticateUser(loggingData, password) {
        validate([
            { key: "loggingData", value: loggingData, type: String },
            { key: "password", value: password, type: String }
        ]);

        return fetch(`${this.url}/user/auth`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email: loggingData, password })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error);

                return response;
            });
    },

    retrieveUser(token) {
        validate([{ key: "token", value: token, type: String }]);

        return fetch(`${this.url}/user`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error);

                return response;
            });
    },

    retrieveUserInfoByUsername(username) {
        validate([{ key: "username", value: username, type: String }]);

        return fetch(`${this.url}/user/${username}`)
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error);
                console.log(response);
                return response;
            });
    },

    // updateUser(token, data) {
    //     if (typeof token !== "string")
    //         throw TypeError(`${token} is not a string`);
    //     if (!token.trim().length) throw Error("token is empty");

    //     if (data.constructor !== Object)
    //         throw TypeError(`${data} is not an object`);

    //     return fetch(`${this.url}/user`, {
    //         method: "PUT",
    //         headers: {
    //             authorization: `Bearer ${token}`,
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then(response => response.json())
    //         .then(response => {
    //             if (response.error) throw Error(response.error);

    //             return response;
    //         });
    // },

    // removeUser(token, email, password) {
    //     if (typeof token !== "string")
    //         throw TypeError(`${token} is not a string`);
    //     if (!token.trim().length) throw Error("token is empty");

    //     if (typeof email !== "string")
    //         throw TypeError(`${email} is not a string`);
    //     if (!email.trim().length) throw Error("email is empty");

    //     if (typeof password !== "string")
    //         throw TypeError(`${password} is not a string`);
    //     if (!password.trim().length) throw Error("password is empty");

    //     return fetch(`${this.url}/user`, {
    //         method: "DELETE",
    //         headers: {
    //             authorization: `Bearer ${token}`,
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify({ email, password })
    //     })
    //         .then(response => response.json())
    //         .then(response => {
    //             if (response.error) throw Error(response.error);

    //             return response;
    //         });
    // },

    searchGames(query) {
        validate([{ key: "query", value: query, type: String }]);

        return fetch(`${this.url}/games?q=${query}`)
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error);

                return response;
            });
    },

    retrieveGameInfo(gameId) {
        validate([{ key: "gameId", value: gameId, type: String }]);

        if (isNaN(Number(gameId)))
            throw TypeError(`${gameId} should be a number`);

        if (!isNaN(Number(gameId)) && Number(gameId) < 1)
            throw Error(`${gameId} should be a bigger than 0 number`);

        if (!isNaN(Number(gameId)) && Number(gameId) % 1 !== 0)
            throw Error(`${gameId} should be an integer number`);

        return fetch(`${this.url}/game/${gameId}`)
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error);

                return response;
            });
    },

    postReview(token, gameId, title, text, score) {
        
        validate([
            { key: "token", value: token, type: String },
            { key: "gameId", value: gameId, type: String },
            { key: "text", value: text, type: String, optional: true },
            { key: "title", value: title, type: String, optional: true },
            { key: "score", value: score, type: Number }
        ]);
        
        if (score < 0 || score > 5)
            throw Error("score must be between 0 and 5");

        if (score % 1 !== 0) throw Error(`score should be an integer number`);
        return fetch(`${this.url}/game/${gameId}/review`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({ title, text, score })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error);

                return response;
            });
    },

    retrieveBestScored(limit) {
        validate([
            { key: "limit", value: limit, type: String },
        ])

        return fetch(`${this.url}/ranking/${limit}`)
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error);

                return response;
            });
    },

    retrieveSimilarUsersReviews(token) {
        // validate([
        //     { key: "limit", value: limit, type: String },
        // ])

        return fetch(`${this.url}/similarityranking`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error);

                return response;
            });
    },

    getRandomGame() {
        return fetch(`${this.url}/random`)
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error);
                return response;
            });
    },

    getPreScore(token, gameId, gameInfo) {
        validate([
            { key: "token", value: token, type: String },
            { key: "gameId", value: gameId, type: String },
            { key: "gameInfo", value: gameInfo, type: Object }
        ]);

        return fetch(`${this.url}/game/${gameId}/prediction`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({ gameInfo })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error);

                return response;
            });
    }

    // /**
    //  * Searches artists.
    //  *
    //  * @param {string} query - The text to match on artists search.
    //  * @retuns {Promise} - Resolves with artists, otherwise rejects with error.
    //  *
    //  * @throws {TypeError} - On wrong parameters type.
    //  * @throws {Error} - On empty parameters value.
    //  */
    // searchArtists(query) {
    //     if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

    //     if (!query.trim().length) throw Error('query is empty')

    //     return fetch(`${this.url}/artists?q=${query}`)
    //         .then(response => response.json())
    //         .then(response => {
    //             if (response.error) throw Error(response.error)

    //             return response
    //         })
    // },

    // /**
    //  * Retrieves an artist.
    //  *
    //  * @param {string} artistId - The artist to retrieve.
    //  * @returns {Promise} - Resolves with albums, otherwise rejects with error.
    //  *
    //  * @throws {TypeError} - On wrong parameters type.
    //  * @throws {Error} - On empty parameters value.
    //  */
    // retrieveArtist(artistId) {
    //     if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

    //     if (!artistId.trim().length) throw Error('artistId is empty')

    //     return fetch(`${this.url}/artists/${artistId}`, {
    //         headers: {
    //             authorization: `Bearer ${this.token}`
    //         }
    //     })
    //         .then(response => response.json())
    // },

    // /**
    //  * Adds a user comment to an artist.
    //  *
    //  * @param {string} token - The access token.
    //  * @param {string} artistId - The artist id.
    //  * @param {string} text - The comment text.
    //  *
    //  * @throws {TypeError} - On wrong parameters type.
    //  * @throws {Error} - On empty parameters value.
    //  */
    // addCommentToArtist(token, artistId, text) {
    //     // TODO validate arguments

    //     return fetch(`${this.url}/artist/${artistId}/comment`, {
    //         method: 'POST',
    //         headers: {
    //             authorization: `Bearer ${token}`,
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify({ text })
    //     })
    //         .then(response => response.json())
    //         .then(response => {
    //             if (response.error) throw Error(response.error)

    //             return response.id
    //         })
    // },

    // /**
    //  * Lists comments from an artist.
    //  *
    //  * @param {string} token - The access token.
    //  * @param {string} artistId - The artist id.
    //  *
    //  * @throws {TypeError} - On wrong parameters type.
    //  * @throws {Error} - On empty parameters value.
    //  */
    // listCommentsFromArtist(token, artistId) {
    //     // TODO validate arguments

    //     return fetch(`${this.url}/artist/${artistId}/comment`, {
    //         method: 'GET',
    //         headers: {
    //             authorization: `Bearer ${token}`,
    //             'content-type': 'application/json'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(response => {
    //             if (response.error) throw Error(response.error)

    //             response.forEach(comment => comment.date = new Date(comment.date))

    //             return response
    //         })
    // },

    // /**
    //  * Retrieves albums from artist.
    //  *
    //  * @param {string} artistId - The artist to retrieve albums from.
    //  * @returns {Promise} - Resolves with albums, otherwise rejects with error.
    //  *
    //  * @throws {TypeError} - On wrong parameters type.
    //  * @throws {Error} - On empty parameters value.
    //  */
    // retrieveAlbums(artistId) {
    //     if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

    //     if (!artistId.trim().length) throw Error('artistId is empty')

    //     return fetch(`${this.url}/artists/${artistId}/albums`, {
    //         headers: {
    //             authorization: `Bearer ${this.token}`
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(response => {
    //             if (response.error) throw Error(response.error)

    //             return response
    //         })
    // },

    // /**
    //  * Retrieves an album.
    //  *
    //  * @param {string} albumId - The album to retrieve.
    //  * @preturns {Promise} - Resolves with tracks, otherwise rejects with error.
    //  *
    //  * @throws {TypeError} - On wrong parameters type.
    //  * @throws {Error} - On empty parameters value.
    //  */
    // retrieveAlbum(albumId) {
    //     if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

    //     if (!albumId.trim().length) throw Error('albumId is empty')

    //     return fetch(`${this.url}/albums/${albumId}`, {
    //         headers: {
    //             authorization: `Bearer ${this.token}`
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(response => {
    //             if (response.error) throw Error(response.error)

    //             return response
    //         })
    // },

    // /**
    //  * Retrieves tracks from album.
    //  *
    //  * @param {string} albumId - The album to retrieve tracks from.
    //  * @preturns {Promise} - Resolves with tracks, otherwise rejects with error.
    //  *
    //  * @throws {TypeError} - On wrong parameters type.
    //  * @throws {Error} - On empty parameters value.
    //  */
    // retrieveTracks(albumId) {
    //     if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

    //     if (!albumId.trim().length) throw Error('albumId is empty')

    //     return fetch(`${this.url}/albums/${albumId}/tracks`, {
    //         headers: {
    //             authorization: `Bearer ${this.token}`
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(response => {
    //             if (response.error) throw Error(response.error)

    //             return response
    //         })
    // },

    // /**
    //  * Retrieves track.
    //  *
    //  * @param {string} trackId - The id of the track to be retrieved.
    //  * @returns {Promise} Resolves with track, otherwise rejects with error.
    //  *
    //  * @throws {TypeError} - On wrong parameters type.
    //  * @throws {Error} - On empty parameters value.
    //  */
    // retrieveTrack(trackId) {
    //     if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)

    //     if (!trackId.trim().length) throw Error('trackId is empty')

    //     return fetch(`${this.url}/tracks/${trackId}`, {
    //         headers: {
    //             authorization: `Bearer ${this.token}`
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(response => {
    //             if (response.error) throw Error(response.error)

    //             return response
    //         })
    // }
};

export default projectZApi;
