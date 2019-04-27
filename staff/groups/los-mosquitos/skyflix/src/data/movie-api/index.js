import validate from '../../common/validate'
import call from '../../common/call'

const movieApi = {
    __url__: 'https://api.themoviedb.org/3',
    __APIKEY1__: '7440932e10d85a10682b0e59dcac82c9',  //Miguel
    __APIKEY2__: 'c8d4a3e8ed776dd6b9cd963b64c11df3', // Llorenç

    /**
     * This function will allow the user to search movies
     * 
     * @param {*} query the name of the movie that the user is searching
     */
    searchMovies(query) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' }
        ])
        const search = ''.concat(this.__url__, 'search/movie?api_key=', this.__APIKEY1__, '&query=', query)
        return call(search)
            .then(response => response.json())
    },

    /**
     * This function will allow us to retrieve the movies detail
     * 
     * @param {*} id the identifier of the movie
     */
    retrieveMovie(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' }
        ])

        const search = ''.concat(this.__url__, '/movie/', id, '/?api_key=', this.__APIKEY1__)
        return call(search)
            .then(response => response.json())
    },

    mostPopularmovies() {
        //todo
    }

}

export default movieApi