import normalize from '../common/normalize'
import validate from '../common/validate'
import userApi from '../data/user-api'
import searchBooksApi from '../data/booksearch-api'
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

    registerUser(alias, email, password) {
        validate.arguments([
            { name: 'alias', value: alias, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)


        return userApi.create(email, password, { alias })
            .then(response => {
                if (response.status === 'OK') return

                throw new LogicError(response.error)
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
                    const { data: { alias, username: email } } = response

                    return { alias, email }
                } else throw new LogicError(response.error)
            })
    },

    logoutUser() {
        // this.__userId__ = null
        // this.__userToken__ = null

        // OR fully remove all key values from session storage
        sessionStorage.clear()
    },


    searchBooks(query) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' }
        ])

        return searchBooksApi.searchBooks(query)
    },

    // retrieveBook(isbn) {
    //     validate.arguments([
    //         { name: 'isbn', value: isbn, type: 'string' }
    //     ])

    //     return searchBooksApi.retrieveBook(isbn)
    // },

    // toggleFavDuck(id) {
    //     validate.arguments([
    //         { name: 'id', value: id, type: 'string' }
    //     ])

    //     return userApi.retrieve(this.__userId__, this.__userToken__)
    //         .then(response => {
    //             const { status, data } = response

    //             if (status === 'OK') {
    //                 const { favs = [] } = data // NOTE if data.favs === undefined then favs = []

    //                 const index = favs.indexOf(id)

    //                 if (index < 0) favs.push(id)
    //                 else favs.splice(index, 1)

    //                 return userApi.update(this.__userId__, this.__userToken__, { favs })
    //                     .then(() => { })
    //             }

    //             throw new LogicError(response.error)
    //         })
    // },

    // retrieveFavDucks() {
    //     return userApi.retrieve(this.__userId__, this.__userToken__)
    //         .then(response => {
    //             const { status, data } = response

    //             if (status === 'OK') {
    //                 const { favs = [] } = data

    //                 if (favs.length) {
    //                     const calls = favs.map(fav => searchBooksApi.retrieveDuck(fav))

    //                     return Promise.all(calls)
    //                 } else return favs
    //             }

    //             throw new LogicError(response.error)
    //         })
    // }
}

export default logic