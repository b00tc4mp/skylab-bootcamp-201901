/**
 * ThegamesDB API client.
 *
 * @version 0.1.0
 */
const thegamesDbApi = {
    apiKey: 'NO-API-KEY',

    url: 'https://api.thegamesdb.net',

    proxy: 'https://skylabcoders.herokuapp.com/proxy?url=',

    /**
     * SEARCH GAMES
     *
     * @param {String} query - The text to match on games search.
     * @returns {Promise} - Resolves with games, otherwise rejects with error.
     *
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     */
    searchGame(query, params = '') {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`);

        if (!query.trim().length) throw Error('query is empty');

        if (typeof params !== 'string') throw TypeError(`${params} is not a string`);

        let url = new URL(`${this.url}/Games/ByGameName`);

        let urlParams = {};
        urlParams.apikey = this.apiKey;
        urlParams.name = query;
        urlParams.include = params;

        Object.keys(urlParams).forEach(key => url.searchParams.append(key, urlParams[key]));

        return fetch(`${this.proxy + url}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                const { code, status, data, include, pages } = response;

                if (status !== 'Success') throw Error(response.error);

                if (code !== 200) throw Error(status);

                return { data, include, pages };
            });
    },

    /**
     * RETRIEVE GAME DATA BY GAME ID
     *
     * @param {String} gameId - The ID to retrieve game data.
     * @returns {Promise} - Resolves with game profile, otherwise rejects with error.
     *
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     *
     */
    retrieveGame(gameId, fields = '', include = '') {
        if (typeof gameId !== 'string') throw TypeError(`${gameId} is not a string`);

        if (!gameId.trim().length) throw Error('gameId is empty');

        if (isNaN(Number(gameId))) throw Error(`${gameId} should be a number`);

        if (Number(gameId) < 1) throw Error(`${gameId} should be a bigger than 0 number`);

        if (Number(gameId) % 1 !== 0) throw Error(`${gameId} should be an integer number`);

        if (typeof fields !== 'string') throw TypeError(`${fields} is not a string`);

        if (typeof include !== 'string') throw TypeError(`${include} is not a string`);

        let url = new URL(`${this.url}/Games/ByGameID`);

        let urlParams = {};
        urlParams.apikey = this.apiKey;
        urlParams.id = gameId;
        urlParams.fields = fields;
        urlParams.include = include;

        Object.keys(urlParams).forEach(key => url.searchParams.append(key, urlParams[key]));

        return fetch(`${this.proxy + url}`)
            .then(response => response.json())
            .then(response => {
                const { status, data: { count } = {} } = response;

                if (!status) throw Error(response.error);
                if (status !== 'Success') throw Error(status);
                if (count === 0) throw Error(`${gameId} doesn't exist in database`);

                return response;
            });
    },

    /**
     * RETRIEVE GAME IMAGES BY GAME ID
     *
     * @param {String} gameId - The ID to retrieve game images.
     * @returns {Promise} - Resolves with an object containing game images urls,
     *                      otherwise rejects with error.
     *
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     *
     */
    retrieveImages(gameId) {
        if (typeof gameId !== 'string') throw TypeError(`${gameId} is not a string`);

        if (!gameId.trim().length) throw Error('gameId is empty');

        if (isNaN(Number(gameId))) throw Error(`${gameId} should be a number`);

        if (Number(gameId) < 1) throw Error(`${gameId} should be a bigger than 0 number`);

        if (Number(gameId) % 1 !== 0) throw Error(`${gameId} should be an integer number`);

        let url = new URL(`${this.url}/Games/Images`);

        let urlParams = {};
        urlParams.apikey = this.apiKey;
        urlParams.games_id = gameId;

        Object.keys(urlParams).forEach(key => url.searchParams.append(key, urlParams[key]));

        return fetch(`${this.proxy + url}`)
            .then(response => response.json())
            .then(response => {
                const { status, data: { count } = {} } = response;

                if (!status) throw Error(response.error);
                if (status !== 'Success') throw Error(status);
                if (count === 0) throw Error(`${gameId} doesn't exist in database`);

                return response;
            });
    },

    /**
     * RETRIEVE PLATFORM LIST
     *
     * @param {String} fields - The fields to get data from
     * @returns {Promise} - Resolves with platform list, otherwise rejects with error.
     *
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     *
     */
    retrievePlatformList(fields = '') {
        if (typeof fields !== 'string') throw TypeError(`${fields} is not a string`);

        let url = new URL(`${this.url}/Platforms`);

        let urlParams = {};
        urlParams.apikey = this.apiKey;
        urlParams.fields = fields;

        Object.keys(urlParams).forEach(key => url.searchParams.append(key, urlParams[key]));

        return fetch(`${this.proxy + url}`)
            .then(response => response.json())
            .then(response => {
                const { status } = response;

                if (!status) throw Error(response.error);
                if (status !== 'Success') throw Error(status);
                return response;
            });
    },

    /**
     * RETRIEVE GENRES LIST
     *
     * @returns {Promise} - Resolves with genres list, otherwise rejects with error.
     *
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     *
     */
    retrieveGenresList() {
        let url = new URL(`${this.url}/Genres`);

        let urlParams = {};
        urlParams.apikey = this.apiKey;

        Object.keys(urlParams).forEach(key => url.searchParams.append(key, urlParams[key]));

        return fetch(`${this.proxy + url}`)
            .then(response => response.json())
            .then(response => {
                const { status } = response;

                if (!status) throw Error(response.error);
                if (status !== 'Success') throw Error(status);
                return response;
            });
    },

    /**
     * RETRIEVE DEVELOPERS LIST
     *
     * @returns {Promise} - Resolves with developers list, otherwise rejects with error.
     *
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     *
     */
    retrieveDevelopersList() {
        let url = new URL(`${this.url}/Developers`);

        let urlParams = {};
        urlParams.apikey = this.apiKey;

        Object.keys(urlParams).forEach(key => url.searchParams.append(key, urlParams[key]));

        return fetch(`${this.proxy + url}`)
            .then(response => response.json())
            .then(response => {
                const { status } = response;

                if (!status) throw Error(response.error);
                if (status !== 'Success') throw Error(status);
                return response;
            });
    },

    /**
     * RETRIEVE PUBLISHERS LIST
     *
     * @returns {Promise} - Resolves with publishers list, otherwise rejects with error.
     *
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     *
     */
    retrievePublishersList() {
        let url = new URL(`${this.url}/Publishers`);

        let urlParams = {};
        urlParams.apikey = this.apiKey;

        Object.keys(urlParams).forEach(key => url.searchParams.append(key, urlParams[key]));

        return fetch(`${this.proxy + url}`)
            .then(response => response.json())
            .then(response => {
                const { status } = response;

                if (!status) throw Error(response.error);
                if (status !== 'Success') throw Error(status);
                return response;
            });
    },

    retrieveGamesByPlatform(platformId, params = '') {
        if (typeof platformId !== 'string') throw TypeError(`${platformId} is not a string`);

        if (!platformId.trim().length) throw Error('platformId is empty');

        if (isNaN(Number(platformId))) throw Error(`${platformId} should be a number`);

        if (!platformId.trim().length) throw Error('PlatformId is empty');

        if (Number(platformId) < 1) throw Error(`${platformId} should be a bigger than 0`);

        if (Number(platformId) % 1 !== 0) throw Error(`${platformId} should be an integer number`);

        if (typeof params !== 'string') throw TypeError(`${params} is not a string`);

        let url = new URL(`${this.url}/Games/ByPlatformID`);

        let urlParams = {};
        urlParams.apikey = this.apiKey;
        urlParams.id = platformId;
        urlParams.include = params;

        Object.keys(urlParams).forEach(key => url.searchParams.append(key, urlParams[key]));

        return fetch(`${this.proxy + url}`)
            .then(response => response.json())
            .then(response => {
                const { code, status, data, include, data: { count } = {}, pages } = response;
                if (!status) throw Error(response.error);
                if (status !== 'Success' || code !== 200) throw Error(status);
                if (!count) throw Error(`${platformId} doesn't exist in database`);
                return { data, include, pages };
            });
    }
};


export default thegamesDbApi;
