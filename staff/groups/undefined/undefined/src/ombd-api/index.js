'use strict'

// http://www.omdbapi.com/?apikey=ef8a2f56&s=madonna

/**
 * OMDB API client.
 * 
 * @version 1.0.0
 */
const omdbApi = {
    key: 'NO-KEY',
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
     /*/

    // **** search for query with 10 results
    // {  
    //     "Search": [
    //         {
    //             "Title": "Titanic",
    //             "Year": "1997",
    //             "imdbID": "tt0120338",
    //             "Type": "movie",
    //             "Poster": "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
    //         },
    //         // +9 items
    //     ],
    //     "totalResults": "174",
    //     "Response": "True"
    // }

    // ***** search for query with no results
    // {
    //     "Response": "False",
    //     "Error": "Movie not found!"
    // }

    searchItems(query) { 
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if (!query.trim().length) throw Error('query is empty')

        return fetch(`${this.url}&s=${query}`)
            .then(response => response.json())
            .then(response => {
                if (!response.Response) throw Error(response.Error)
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
     * 
     * 
     
     /* retrieve item with imdbID = tt0081400
     * 
     * {    Title: "Raise the Titanic", Year: "1980", Rated: "PG", Released: "01 Aug 1980", Runtime: "115 min", …}
            Actors: "Jason Robards, Richard Jordan, David Selby, Anne Archer"
            Awards: "3 nominations."
            BoxOffice: "N/A"
            Country: "UK, USA"
            DVD: "21 Jan 2014"
            Director: "Jerry Jameson"
            Genre: "Action, Drama, Thriller, Adventure"
            Language: "English"
            Metascore: "N/A"
            Plot: "To obtain a supply of a rare mineral, a ship raising operation is conducted for the only known source, the R.M.S. Titanic."
            Poster: "https://m.media-amazon.com/images/M/MV5BM2MyZWYzOTQtMTYzNC00OWIyLWE2NWItMzMwODA0OGQ2ZTRkXkEyXkFqcGdeQXVyMjI4MjA5MzA@._V1_SX300.jpg"
            Production: "Associated Film Distribution"
            Rated: "PG"
            Ratings: (2) [{…}, {…}]
            Released: "01 Aug 1980"
            Response: "True"
            Runtime: "115 min"
            Title: "Raise the Titanic"
            Type: "movie"
            Website: "N/A"
            Writer: "Adam Kennedy (screenplay), Eric Hughes (adaptation), Clive Cussler (novel)"
            Year: "1980"
            imdbID: "tt0081400"
            imdbRating: "4.8"
            imdbVotes: "3,460"

        }

        retrieve item with non exists ID = asdcasdc 
        {
            "Response": "False",
            "Error": "Movie not found!"
        }
     */

    // DUDA - no debería lanzar un error este método??
    // por qué devuelve una Promise, se maneja desde la lógica?
    // DUDA: la validación de datos de entrada se debe hacer tanto en la lógica como 
    // en esta API? sólo en un lado? xq? puede llegar un itemId que NO existe?

    retrieveItem(itemId) {
        if (typeof itemId !== 'string') throw TypeError(`${itemId} is not a string`)
        if (!itemId.trim().length) throw Error('itemId is empty')

        return fetch(`${this.url}&i=${itemId}`)
            .then(item => item.json())
            .then(response => {
                if (!response.Response) throw Error(response.Error)
                return response
            })
    }
}

omdbApi.searchItems('titanic')
omdbApi.retrieveItem('tt0081400')

export default omdbApi