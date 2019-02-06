'use strict';

import thegamesDbApi from '../thegamesdb-api';
import userApi from '../user-api';

/**
 * Abstraction of business logic.
 */
const logic = {
    setUserId(id) {
        this.___userId___ = id;
    },

    getUserId() {
        return this.___userId___;
    },

    setUserApiToken(token) {
        this.___userApiToken___ = token;
    },

    getUserApiToken() {
        return this.___userApiToken___;
    },

    set __userId__(id) {
        this.setUserId(id);
    },

    get __userId__() {
        return this.getUserId();
    },

    set __userApiToken__(token) {
        this.setUserApiToken(token);
    },

    get __userApiToken__() {
        return this.getUserApiToken();
    },

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
        if (typeof name !== 'string') throw TypeError(name + ' is not a string');

        if (!name.trim().length) throw Error('name cannot be empty');

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string');

        if (!surname.trim().length) throw Error('surname cannot be empty');

        if (typeof email !== 'string') throw TypeError(email + ' is not a string');

        if (!email.trim().length) throw Error('email cannot be empty');

        if (typeof password !== 'string') throw TypeError(password + ' is not a string');

        if (!password.trim().length) throw Error('password cannot be empty');

        if (typeof passwordConfirmation !== 'string')
            throw TypeError(passwordConfirmation + ' is not a string');

        if (!passwordConfirmation.trim().length)
            throw Error('password confirmation cannot be empty');

        if (password !== passwordConfirmation) throw Error('passwords do not match');

        return userApi.register(name, surname, email, password).then(() => {});
    },

    /**
     * Logins a user by its credentials.
     *
     * @param {string} email
     * @param {string} password
     */
    loginUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string');

        if (!email.trim().length) throw Error('email cannot be empty');

        if (typeof password !== 'string') throw TypeError(password + ' is not a string');

        if (!password.trim().length) throw Error('password cannot be empty');

        return userApi.authenticate(email, password).then(({ id, token }) => {
            this.__userId__ = id;
            this.__userApiToken__ = token;
        });
    },

    retrieveUser() {
        return userApi
            .retrieve(this.__userId__, this.__userApiToken__)
            .then(({ id, name, surname, username }) => ({
                id,
                name,
                surname,
                email: username
            }));
    },

    get userLoggedIn() {
        return !!this.__userId__;
    },

    logout() {
        this.__userId__ = null;
        this.__userApiToken__ = null;
    },

    /**
     * Search games.
     *
     * @param {string} query
     * @returns {Promise}
     */
    searchGame(query, params = '') {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`);

        if (!query.trim().length) throw Error('query is empty');

        if (typeof params !== 'string') throw TypeError(`${params} is not a string`);

        return thegamesDbApi.searchGame(query, params);
    },

    /**
     * Retrieves data from game.
     *
     * @param {string} gameId
     */
    retrieveGame(gameId, fields = '', include = '') {
        if (typeof gameId !== 'string') throw TypeError(`${gameId} is not a string`);

        if (!gameId.trim().length) throw Error('gameId is empty');

        if (isNaN(Number(gameId))) throw Error(`${gameId} should be a number`);

        if (Number(gameId) < 1) throw Error(`${gameId} should be a bigger than 0 number`);

        if (Number(gameId) % 1 !== 0) throw Error(`${gameId} should be an integer number`);

        if (typeof fields !== 'string') throw TypeError(`${fields} is not a string`);

        if (typeof include !== 'string') throw TypeError(`${include} is not a string`);

        return thegamesDbApi.retrieveGame(gameId, fields, include);
    },

    /**
     * Retrieves images from game.
     *
     * @param {string} gameId
     */
    retrieveImages(gameId) {
        
        if (typeof gameId !== 'string') throw TypeError(`${gameId} is not a string`);

        if (!gameId.trim().length) throw Error('gameId is empty');

        if (isNaN(Number(gameId))) throw Error(`${gameId} should be a number`);

        if (Number(gameId) < 1) throw Error(`${gameId} should be a bigger than 0 number`);

        if (Number(gameId) % 1 !== 0) throw Error(`${gameId} should be an integer number`);
        return thegamesDbApi.retrieveImages(gameId);
    },

    /**
     * Retrieves a platform list
     *
     * @param {string} fields
     */
    retrievePlatformList(fields = '') {
        if (typeof fields !== 'string') throw TypeError(`${fields} is not a string`);

        return thegamesDbApi.retrievePlatformList(fields);
    },

    /**
     * Retrieves a genres list
     *
     */
    retrieveGenresList() {
        return thegamesDbApi.retrieveGenresList();
    },

    /**
     * Retrieves a developers list
     *
     */
    retrieveDevelopersList() {
        return thegamesDbApi.retrieveDevelopersList();
    },

    /**
     * Retrieves a publishers list
     *
     */
    retrievePublishersList() {
        return thegamesDbApi.retrievePublishersList();
    },

    /**
     * Retrieves platforms by Id.
     *
     * @param {string} gameId
     */

    retrieveGamesByPlatform(platformId, params = '') {
        if (typeof platformId !== 'string') throw TypeError(`${platformId} is not a string`);

        if (!platformId.trim().length) throw Error('platformId is empty');

        if (isNaN(Number(platformId))) throw Error(`${platformId} should be a number`);

        if (Number(platformId) < 1) throw Error(`${platformId} should be a bigger than 0`);

        if (Number(platformId) % 1 !== 0) throw Error(`${platformId} should be an integer number`);

        return thegamesDbApi.retrieveGamesByPlatform(platformId, params);
    }
};

export default logic;
