"use strict";

/**
 * 
 * Business logic for Marvel App
 * 
 */

import marvelApi from "../../marvel-api";
import userApi from "../../user-api";

const logic = {

    setUserId(id) {
        this.___userId___ = id
    },

    getUserId() {
        return this.___userId___
    },

    setUserApiToken(token) {
        this.___userApiToken___ = token
    },

    getUserApiToken() {
        return this.___userApiToken___
    },

    set __userId__(id) {
        this.setUserId(id)
    },

    get __userId__() {
        return this.getUserId()
    },

    set __userApiToken__(token) {
        this.setUserApiToken(token)
    },

    get __userApiToken__() {
        return this.getUserApiToken()
    },


    /**
   * Registers a user.
   *
   * @param {string} name
   * @param {string} surname
   * @param {string} email
   * @param {string} password
   * @param {string} passwordConfirm
   *
   * @throws {TypeError} - If any param is not a string.
   * @throws {Error} - If any param is empty.
   * @throws {Error} - If password and password confirmation do not match.
   *
   * @returns {String} - User Id.
   */

    register(name, surname, email, password, passwordConfirm) {
        if (typeof name !== "string") throw TypeError(name + " is not a string");

        if (!name.trim().length) throw Error("name is empty");

        if (typeof surname !== "string")
            throw TypeError(surname + " is not a string");

        if (!surname.trim().length) throw Error("surname is empty");

        if (typeof email !== "string") throw TypeError(email + " is not a string");

        if (!email.trim().length) throw Error("email is empty");

        if (typeof password !== "string")
            throw TypeError(password + " is not a string");

        if (!password.trim().length) throw Error("password is empty");

        if (typeof passwordConfirm !== "string")
            throw TypeError(passwordConfirm + " is not a string");

        if (!passwordConfirm.trim().length)
            throw Error("password confirmation is empty");

        if (password !== passwordConfirm) throw Error("passwords do not match");

        return userApi.register(name, surname, email, password).then(() => { });
    },

    /**
     * Login by credentials.
     *
     * @param {string} email
     * @param {string} password
     *
     * @throws {TypeError} - If any param is not a string.
     * @throws {Error} - If any param is empty.
     *
     * @returns {Object} - Contains user Id and Token.
     */
    login(email, password) {
        if (typeof email !== "string") throw TypeError(email + " is not a string");

        if (!email.trim().length) throw Error("email is empty");

        if (typeof password !== "string")
            throw TypeError(password + " is not a string");

        if (!password.trim().length) throw Error("password is empty");

        return userApi.authenticate(email, password).then(response => {
            const { data: { id, token }, status} = response

            if (status === "OK") {
                this.__userId__ = id
                this.__userApiToken__ = token
                return response.data
            }
            throw Error(response.error)
        });
    },

    get userLoggedIn() {
        return !!this.__userId__
    },

    logout() {
        this.__userId__ = null
        this.__userApiToken__ = null
    },

    /**
     * Retrieve user data.
     *
     * @param {string} id
     * @param {string} token
     *
     * @throws {TypeError} - If any param is not a string.
     * @throws {Error} - If any param is empty.
     *
     * @returns {Object} - With all user info.
     */

    retrieveUser() {

        return userApi.retrieve(this.__userId__, this.__userApiToken__).then(response => {
            const { name } = response

            if (name) return response
            throw Error(response.error);
        });
    },

    /**
     *
     * Search characters
     *
     * @param {string} query
     *
     * @returns {Promise}
     */

    searchCharacter(query) {
        if (typeof query !== "string") throw TypeError(`${query} is not a string`);
        if (!query.trim().length) throw Error("query is empty");

        return marvelApi.searchCharacter(query);
    },

    /**
     *
     * Retrieve character
     *
     * @param {string} characterId
     *
     * @returns {Promise}
     */

    retrieveCharacter(characterId) {
        if (typeof characterId !== "string")
            throw TypeError(`${characterId} is not a string`);
        if (!characterId.trim().length) throw Error(`characterId is empty`);

        return marvelApi.retrieveCharacter(characterId);
    },

    /**
     *
     * Retrieve comic
     *
     * @param {string} comicId
     *
     * @returns {Promise}
     */

    retrieveComic(comicId) {
        if (typeof comicId !== "string")
            throw TypeError(`${comicId} is not a string`);
        if (!comicId.trim().length) throw Error(`comicId is empty`);

        return marvelApi.retrieveComic(comicId);
    },

    /**
     * Updates user favourites.
     *
     * @param {Object} - New data to be added
     *
     * @throws {TypeError} - If the param is not an Object.
     *
     * @returns {Array} - Array with favourites data.
     */

    updateFavourites(fav) {
        if (fav.constructor !== Object) throw TypeError(`${fav} is not an object`);

        let favourites;
        let exists;
        let temp = fav;
        return this.retrieveUser(this.__userId__, this.__userApiToken__)
            .then(data => {
                favourites = data.favourites;
            })
            .then(() => {
                exists = favourites.findIndex(obj => obj.id === temp.id);

                if (exists !== -1) {
                    favourites.splice(exists, 1);
                    return this.updateUser({ favourites: favourites });
                } else {
                    favourites.push(temp);
                    return this.updateUser({ favourites: favourites });
                }
            })
            .then(() => this.retrieveFavourites());
    },

    /**
     * 
     * Retrieves favourites data.
     * 
     * @returns {Array} - Array with favourites data.
     */

    retrieveFavourites() {
        return this.retrieveUser(this.__userId__, this.__userApiToken__)
            .then(favs => {
                return favs.favourites;
            }
        );
    },

    /**
     * 
     * Updates user favourites.
     *
     * @param {Object} - New data to be added
     *
     * @throws {TypeError} - If the param is not an Object.
     *
     * @returns {Object} - If the update was successfull or not.
     */

    updateUser(data) {
        if (data.constructor !== Object)throw TypeError(`${data} is not an object`)

        return userApi.update(this.__userId__, this.__userApiToken__, data)
            .then(response => {
                const { status } = response

                if (status === "OK") return response
                throw Error(response.error)
            });
    }
};

export default logic
