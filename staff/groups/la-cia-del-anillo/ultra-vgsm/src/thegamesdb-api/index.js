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
        const { code, status, data, include , pages } = response;

        if (code !== 200) throw Error(status);

        return { data, include , pages };
      });
  }
};

export default thegamesDbApi;
