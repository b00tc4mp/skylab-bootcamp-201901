/**
 * ThegamesDB API client.
 *
 * @version 1.0.0
 */
const thegamesDbApi = {
    apiKey: '387f91ccf550081f8c890fefc75982c76d309d2b215cfbefd959d520d397c72b',

    url: 'https://api.thegamesdb.net',

    proxy: 'https://skylabcoders.herokuapp.com/proxy?url=',

    /**
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

    retrieveGame(gameId) {
        if (typeof gameId !== 'string') throw TypeError(`${gameId} is not a string`);

        if (!gameId.trim().length) throw Error('gameId is empty');

        if (isNaN(Number(gameId))) throw Error(`${gameId} should be a number`);

        if (Number(gameId) < 1) throw Error(`${gameId} should be a bigger than 0 number`);

        if (Number(gameId) % 1 !== 0) throw Error(`${gameId} should be an integer number`);

        return fetch(
            `${this.proxy}${this.url}/Games/ByGameID?apikey=${
                this.apiKey
            }&id=${gameId}&fields=overview%2Cyoutube&include=boxart%2Cplatform`,
            {
                method: 'GET'
            }
        )
            .then(response => response.json())
            .then(response => {
                const status = response.status;
                if (status) {
                    if (status === 'Success') {
                        const count = response.data.count;
                        if (count !== 0) {
                            const {
                                code,
                                status,
                                data: { games },
                                include: { boxart }
                            } = response;
                            return response;
                        }
                        if (count === 0) throw Error(`${gameId} doesn't exist in database`);
                    } else {
                        throw Error(status);
                    }
                }
                throw Error(response.error);
            });
    },

    retrieveImages(gameId) {
        if (typeof gameId !== 'string') throw TypeError(`${gameId} is not a string`);

        if (!gameId.trim().length) throw Error('gameId is empty');

        if (isNaN(Number(gameId))) throw Error(`${gameId} should be a number`);

        if (Number(gameId) < 1) throw Error(`${gameId} should be a bigger than 0 number`);

        if (Number(gameId) % 1 !== 0) throw Error(`${gameId} should be an integer number`);

        return fetch(`${this.proxy}${this.url}/Games/Images?apikey=${this.apiKey}&games_id=${gameId}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                const status = response.status;
                if (status) {
                    if (status === 'Success') {
                        const count = response.data.count;
                        if (count !== 0) {
                            const {
                                code,
                                status,
                                data: { base_url, images }
                            } = response;
                            return response;
                        }
                        if (count === 0) throw Error(`${gameId} doesn't exist in database`);
                    } else {
                        throw Error(status);
                    }
                }
                throw Error(response.error);
            });
    }
};

export default thegamesDbApi;
