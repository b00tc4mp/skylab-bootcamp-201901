import normalize from '../common/normalize'
import validate from '../common/validate'
import userApi from '../data/user-api'
import movieApi from '../data/movie-api'
import { LogicError } from '../common/errors'

const logic = {
    set __userId__(id) {
        sessionStorage.userId = id
    },

    get __userId__() {
        return normalize.undefinedOrNull(sessionStorage.userId)
    },

    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    get isUserLoggedIn() {
        return !!(this.__userId__ && this.__userToken__)
    },

    registerUser(fullname, email, password, confirmPassword, suscription) {
        validate.arguments([
            { name: 'fullname', value: fullname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'password', value: confirmPassword, type: 'string', notEmpty: true },
            { name: 'suscription', value: suscription, type: 'string', notEmpty: true }

        ])

        validate.email(email)

        validate.password(password, confirmPassword)

        return userApi.create(email, password, { fullname, app: "skyflix", suscription })
            .then(response => {
                if (response.status === 'OK') return
            })
    },


    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return userApi.authenticate(email, password)
            .then(response => {
                if (response.status === 'OK') {
                    const { data: { id, token } } = response

                    this.__userId__ = id
                    this.__userToken__ = token
                } else throw new LogicError(response.error)
            })
    },

    retrieveUser() {
        return userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                if (response.status === 'OK') {
                    const { data: { fullname, username: email, subscription, app, genres } } = response

                    return { fullname, email, subscription, app, genres }
                }
                else throw new LogicError(response.error)
            })
    },

    updateGenresUser(genres) {
        validate.arguments([
            { name: 'data', value: genres, type: 'number', notEmpty: true }
        ])

        return userApi.update(this.__userId__, this.__userToken__, { genres })
            .then(response => {
                if (response.status === 'OK') return
            })
    },

    logoutUser() {
        sessionStorage.clear()
    },

    searchMovies(query) {
        validate.arguments([
            { name: 'query', value: query, type: 'string', notEmpty: true}
        ])

        return movieApi.searchMovies({ query })
    },

    searchMoviesWithPage(query, page) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' },
            { name: 'page', value: page, type: 'number'}
        ])

        return movieApi.searchMovies({ query, page })  
    },

    retrieveMovie(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'number' }
        ])

        return movieApi.retrieveMovie(id)
    },

    retrieveTrailer(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'number' }
        ])
        return movieApi.retrieveTrailer(id)
    },

    toggleMovieUserList(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'number' }
        ])

        return userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                const { status, data } = response

                if (status === 'OK') {
                    const { movieList = [] } = data // NOTE if data.favs === undefined then favs = []

                    const index = movieList.indexOf(id)

                    if (index < 0) movieList.push(id)
                    else movieList.splice(index, 1)

                    return userApi.update(this.__userId__, this.__userToken__, { movieList })
                        .then(() => { })
                }

                throw new LogicError(response.error)
            })
    },

    retrieveMovieUserList() {
        return userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                const { status, data } = response

                if (status === 'OK') {
                    const { movieList = [] } = data

                    if (movieList.length) {
                        const calls = movieList.map(id => movieApi.retrieveMovie(id))

                        return Promise.all(calls)
                    } else return movieList
                }

                throw new LogicError(response.error)
            })
    },
    removeFromMovieUserList(id){

        return userApi.retrieve(this.__userId__, this.__userToken__)
        .then(response => {
            const { status,data } = response

                if (status === 'OK') {
                    const { movieList = [] } = data


            const index=movieList.indexOf(id)
            movieList.splice(index,1)
    
            return  userApi.update(this.__userId__, this.__userToken__, { movieList })
    
            }
        })
        
    },

    retrieveMovieGenres() {
        return movieApi.retrieveMovieGenres()
    },

    retrieveMoviesWithGenre(genre){
        return movieApi.discoverMovies({with_genres: genre})
    }
}

export default logic