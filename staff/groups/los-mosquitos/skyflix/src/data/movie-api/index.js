import validate from '../../common/validate'
import call from '../../common/call'

const movieApi = {
    __url__: 'https://api.themoviedb.org/3',
    __APIKEY1__: '7440932e10d85a10682b0e59dcac82c9',  //Miguel
    __APIKEY2__: 'c8d4a3e8ed776dd6b9cd963b64c11df3', // Llorenç

    /**
     * This function will allow the user to search movies
     * 
     * @param {*} data object with the query(required) and other optional data
     */
    searchMovies(data) {
        validate.arguments([
            { name: 'data', value: data, type: 'object' }
        ])
        let query = ''
        for(let prop in data) {
            query += `&${prop}=${data[prop]}`
        }

        const search = ''.concat(this.__url__, '/search/movie?api_key=', this.__APIKEY1__, query)
        

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
            { name: 'id', value: id, type: 'number' }
        ])

        const url = ''.concat(this.__url__, '/movie/', id, '?api_key=', this.__APIKEY1__)
        return call(url)
            .then(response => response.json())
    },

    /**
     * This function will allow us to retrieve the genres of the movies
     */
    retrieveMovieGenres() {
        const url = ''.concat(this.__url__, '/genre/movie/list?api_key=', this.__APIKEY1__)
        return call(url)
            .then(response => response.json())
    },

    /**
     * This function will allow us to retrieve movies by different type of data like genre movies, etc..
     * 
     * @param {*} data the object with the different data
     */
    discoverMovies(data) {
        validate.arguments([
            { name: 'data', value: data, type: 'object' }
        ])
        let query = ''
        for(let prop in data) {
            query += `&${prop}=${data[prop]}`
        }

        const search = ''.concat(this.__url__, '/discover/movie?api_key=', this.__APIKEY1__, query)
        

        return call(search)
            .then(response => response.json())
    },

    retrieveTrailer(id) {
        const search = ''.concat(this.__url__, '/movie/', id, '/videos?api_key=', this.__APIKEY1__)
        return call(search)
            .then(response => response.json())
    }
}

export default movieApi