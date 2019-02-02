'use strict'


// http://www.omdbapi.com/?apikey=ef8a2f56&s=madonna

/**
 * OMDB API client.
 * 
 * @version 1.0.0
 */
const omdbApi = {
    api: 'ef8a2f56',
    url: `http://www.omdbapi.com/?apikey=ef8a2f56`,

     /**
     * Search movie items *** 
     * 
     * @param {string} query - The text to match on movies & series search.
     * @retuns {Promise} - Resolves with array of movies, otherwise rejects with an error.
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     * 
     * //http://www.omdbapi.com/?apikey=ef8a2f56&s=titanic
     */

    searchItems(query) { 
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if (!query.trim().length) throw Error('query is empty')

        return fetch(`${this.url}&s=${query}`)
            .then(response => response.json())
            .then(response => {
                if (!response.Response) throw Error(response.Reponse)
                console.log(response.Search)
                return response.Search
        })
    },

    /**
     * Retrieve detail from movie or serie.
     * 
     * @param {string} itemId - The movie query
     * @returns {Promise} - Resolves with movies & series, otherwise rejects with error.
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     * 
     * // http://www.omdbapi.com/?apikey=ef8a2f56&i=tt1632708
     */
    retrieveItem(itemId) {
        if (typeof itemId !== 'string') throw TypeError(`${itemId} is not a string`)
        if (!itemId.trim().length) throw Error('itemId is empty')

        return fetch(`${this.url}&i=${itemId}`)
            .then(item => item.json())
            .then(item => console.log(item))
        
    }

    // {
    //     Actors: "Jason Robards, Richard Jordan, David Selby, Anne Archer",
    //     Awards: "3 nominations.",
    //     BoxOffice: "N/A",
    //     Country: "UK, USA",
    //     DVD: "21 Jan 2014",
    //     Director: "Jerry Jameson",
    //     Genre: "Action, Drama, Thriller, Adventure",
    //     Language: "English",
    //     Metascore: "N/A",
    //     Plot: "To obtain a supply of a rare mineral, a ship raising operation is conducted for the only known source, the R.M.S. Titanic.",
    //     Poster: "https://m.media-amazon.com/images/M/MV5BM2MyZWYzOTQtMTYzNC00OWIyLWE2NWItMzMwODA0OGQ2ZTRkXkEyXkFqcGdeQXVyMjI4MjA5MzA@._V1_SX300.jpg",
    //     Production: "Associated Film Distribution",
    //     Rated: "PG",
    //     Ratings:    [
    //                     {Source: "Internet Movie Database", Value: "4.8/10"}.
    //                     {Source: "Rotten Tomatoes", Value: "43%"}
    //                 ],
    //     Released: "01 Aug 1980",
    //     Response: "True",
    //     Runtime: "115 min",
    //     Title: "Raise the Titanic",
    //     Type: "movie",
    //     Website: "N/A",
    //     Writer: "Adam Kennedy (screenplay), Eric Hughes (adaptation), Clive Cussler (novel)",
    //     Year: "1980",
    //     imdbID: "tt0081400",
    //     imdbRating: "4.8",
    //     imdbVotes: "3,460",
    // }
}

omdbApi.searchItems('titanic')
omdbApi.retrieveItem('tt0081400')

export default omdbApi