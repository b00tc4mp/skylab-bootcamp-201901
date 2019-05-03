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
            { name: 'email', value: email, type: 'string', notEmpty: true},
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
        sessionStorage.clear()
    },


    searchBooks(query) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' }
        ])

        return searchBooksApi.searchBooks(query)
    },

    retrieveBook(isbn) {
        validate.arguments([
             { name: 'isbn', value: isbn, type: 'string' }
         ])

        return searchBooksApi.retrieveBook(isbn)
    },

    toggleFavBook(isbn) {
        validate.arguments([
            { name: 'isbn', value: isbn, type: 'string' }
        ])

        return userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                const { status, data } = response

                if (status === 'OK') {
                    const { bookFavs = [] } = data // NOTE if data.bookFavs === undefined then bookFavs = []

                    const index = bookFavs.indexOf(isbn)

                    if (index < 0) bookFavs.push(isbn)
                    else bookFavs.splice(index, 1)

                    return userApi.update(this.__userId__, this.__userToken__, { bookFavs })
                        .then(() => bookFavs)
                }
                else throw new LogicError(response.error)
            })
    },

    retrieveFavBooks() {
        return userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                const { status, data } = response

                if (status === 'OK') {
                    const { bookFavs = [] } = data

                    if (bookFavs.length) {
                        const calls = bookFavs.map(fav => searchBooksApi.retrieveBook(fav))

                        return Promise.all(calls)
                    } else return bookFavs
                }

                throw new LogicError(response.error)
            })
    }
}

export default logic