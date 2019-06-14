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
            throw Error("passwords do not match");

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
        sessionStorage.clear();
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

    retrieveSimilarUsersReviews() {
        return projectZApi.retrieveSimilarUsersReviews(this.__userApiToken__);
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
        return projectZApi.postReview(
            this.__userApiToken__,
            gameId,
            title,
            text,
            score
        );
    },

    getRandomGame() {
        return projectZApi.getRandomGame();
    },

    getPreScore(gameId, gameInfo) {
        if (typeof gameId !== "string")
            throw TypeError(`${gameId} is not a string`);

        if (!gameId.trim().length) throw Error("gameId is empty");

        return projectZApi.getPreScore(this.__userApiToken__, gameId, gameInfo);
    }
};

export default logic;
