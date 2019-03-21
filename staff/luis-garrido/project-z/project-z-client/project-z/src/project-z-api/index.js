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
    // url: "http://localhost:8000/api",
    url: "https://shielded-hamlet-42041.herokuapp.com/api",

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
                if (error) {
                    throw Error(error);
                }

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
        validate([{ key: "limit", value: limit, type: String }]);

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
};

export default projectZApi;
