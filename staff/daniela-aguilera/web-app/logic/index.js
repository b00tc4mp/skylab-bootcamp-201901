const normalize = require('../common/normalize')
const validate = require('../common/validate')
const userApi = require('../data/user-api')
const duckApi = require('../data/duck-api')
const { LogicError } = require('../common/errors')
<<<<<<< HEAD

const sessionStorage = {
    clear() {
        const keys = Object.keys(sessionStorage)

        keys.forEach(key => delete sessionStorage[key])
    }
}

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
=======
const token = require('../common/token')

class Logic {
    constructor(token) {
        this.__userToken__ = token
    }

    get __userId__() {
        if (this.__userToken__) {
            const payload = token.payload(this.__userToken__)

            return payload.id
        }
    }

    get isUserLoggedIn() {
        return !!this.__userToken__
    }
>>>>>>> upstream/develop

    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return userApi.create(email, password, { name, surname })
            .then(response => {
                if (response.status === 'OK') return

                throw new LogicError(response.error)
            })
<<<<<<< HEAD
    },
=======
    }
>>>>>>> upstream/develop

    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return userApi.authenticate(email, password)
            .then(response => {
                if (response.status === 'OK') {
<<<<<<< HEAD
                    const { data: { id, token } } = response

                    this.__userId__ = id
                    this.__userToken__ = token
                } else throw new LogicError(response.error)
            })
    },
=======
                    const { data: { token } } = response

                    this.__userToken__ = token
                } else throw new LogicError(response.error)
            })
    }
>>>>>>> upstream/develop

    retrieveUser() {
        return userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                if (response.status === 'OK') {
                    const { data: { name, surname, username: email } } = response

                    return { name, surname, email }
                } else throw new LogicError(response.error)
            })
<<<<<<< HEAD
    },
=======
    }
>>>>>>> upstream/develop

    logoutUser() {
        // this.__userId__ = null
        // this.__userToken__ = null

        // OR fully remove all key values from session storage
        sessionStorage.clear()
<<<<<<< HEAD
    },
=======
    }
>>>>>>> upstream/develop


    searchDucks(query) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' }
        ])

        return duckApi.searchDucks(query)
            .then(ducks => ducks instanceof Array ? ducks : [])
<<<<<<< HEAD
    },
=======
    }
>>>>>>> upstream/develop

    retrieveDuck(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' }
        ])

        return duckApi.retrieveDuck(id)
<<<<<<< HEAD
    },
=======
    }
>>>>>>> upstream/develop

    toggleFavDuck(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' }
        ])

        return userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                const { status, data } = response

                if (status === 'OK') {
                    const { favs = [] } = data // NOTE if data.favs === undefined then favs = []

                    const index = favs.indexOf(id)

                    if (index < 0) favs.push(id)
                    else favs.splice(index, 1)

                    return userApi.update(this.__userId__, this.__userToken__, { favs })
                        .then(() => { })
                }

                throw new LogicError(response.error)
            })
<<<<<<< HEAD
    },
=======
    }
>>>>>>> upstream/develop

    retrieveFavDucks() {
        return userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                const { status, data } = response

                if (status === 'OK') {
                    const { favs = [] } = data

                    if (favs.length) {
                        const calls = favs.map(fav => duckApi.retrieveDuck(fav))

                        return Promise.all(calls)
                    } else return favs
                }

                throw new LogicError(response.error)
            })
    }
<<<<<<< HEAD
}

module.exports = logic
=======

    toggleCart(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' }
        ])
    
        return userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                const { status, data } = response
    
                if (status === 'OK') {
                    const { cart = [] } = data // NOTE if data.favs === undefined then favs = []
    
                    const index = cart.indexOf(id)
    
                    if (index < 0) cart.push(id)
                    else cart.splice(index, 1)
    
                    return userApi.update(this.__userId__, this.__userToken__, { cart })
                        .then(() => { })
                }
    
                throw new LogicError(response.error)
            })
    }

    retrieveCartDucks() {
        return userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                const { status, data } = response

                if (status === 'OK') {
                    const { cart = [] } = data

                    if (cart.length) {
                        const calls = cart.map(item => duckApi.retrieveDuck(item))

                        return Promise.all(calls)
                    } else return cart
                }

                throw new LogicError(response.error)
            })
    }
}










module.exports = Logic
>>>>>>> upstream/develop
