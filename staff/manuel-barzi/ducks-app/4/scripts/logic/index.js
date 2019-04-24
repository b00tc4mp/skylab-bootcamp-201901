'use strict'

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

    registerUser(name, surname, email, password, callback) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'callback', value: callback, type: 'function' }
        ])

        validate.email(email)

        userApi.create(name, surname, email, password)
            .then(response => {
                if (response.status === 'OK') callback()
                else callback(new LogicError(response.error))
            })
            .catch(callback)
    },

    loginUser(email, password, callback) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'callback', value: callback, type: 'function' }
        ])

        validate.email(email)

        userApi.authenticate(email, password)
            .then(response => {
                if (response.status === 'OK') {
                    const { data: { id, token } } = response

                    this.__userId__ = id
                    this.__userToken__ = token

                    callback()
                } else callback(new LogicError(response.error))
            })
            .catch(callback)
    },

    retrieveUser(callback) {
        userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                if (response.status === 'OK') {
                    const { data: { name, surname, username: email } } = response
    
                    callback(undefined, { name, surname, email })
                } else callback(new LogicError(response.error))
            })
            .catch(callback)
    },

    logoutUser() {
        // this.__userId__ = null
        // this.__userToken__ = null

        // OR fully remove all key values from session storage
        sessionStorage.clear()
    },


    searchDucks(query, callback) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' },
            { name: 'callback', value: callback, type: 'function' }
        ])

        duckApi.searchDucks(query)
            .then(ducks => callback(undefined, ducks))
            .catch(callback)
    },

    retrieveDuck(id, callback) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' },
            { name: 'callback', value: callback, type: 'function' }
        ])

        duckApi.retrieveDuck(id)
            .then(duck => callback(undefined, duck))
            .catch(callback)

    }
}