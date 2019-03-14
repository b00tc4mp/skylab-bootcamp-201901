"use strict";

/**
 * Spotify API client.
 *
 * @version 1.0.0
 */
const spotifyApi = {
  token:
    "BQAHyxzu8_aJslQhzQttJ9EIbZTzC32pP29oSvKWUw7_M8lS5k4wguo7M2u2BshDhrhc45KeyI6xhCK6SeMO1GZV9mjB7-74ob4tbTHlqu3y7N-ytfXs3CURNVdUkMrL-meIJWHRiJxwE65i-g",

  /**
   * Searches ducklings.
   *
   * @param {string} query - The text to match on artists search.
   * @param {function} callback - The expression to evaluate on response. If error first
   * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching
   * results.
   */
  searchArtists(query, callback) {
    fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${this.token}`
      }
    })
      .then(res => res.json())
      .then(res => {
        const { error } = res;
        if (error) throw error;
        return res;
      })
      .then(({ artists: { items } }) => callback(undefined, items))
      .catch(callback);
  },

  /**
   * Retrieves albums from artist.
   *
   * @param {string} artistId - The artist to retrieve albums from.
   * @param {*} callback - callback - The expression to evaluate on response. If error first
   * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching
   * results.
   */
  searchAlbums(artistId, callback) {
    fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${this.token}`
      }
    })
      .then(res => res.json())
      .then(res => callback(undefined, res.items))
      .catch(callback);
  }
};
