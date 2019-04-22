'use strict'

const logic = {
    // es5 like
    // __userId__: null,
    // __userToken__: null,

    //es6
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
            { value: callback, type: 'function' }
        ])

        validate.email(email)

        userApi.create(name, surname, email, password, function (error, response) {
            if (error) callback(error)
            else if (response.status === 'OK') callback()
            else callback(new LogicError(response.error))
        })
    },

    loginUser(email, password, callback) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { value: callback, type: 'function' }
        ])

        validate.email(email)

        userApi.authenticate(email, password, (error, response) => {
            if (error) callback(error)
            else if (response.status === 'OK') {
                const { data: { id, token } } = response

                this.__userId__ = id
                this.__userToken__ = token

                callback()
            } else callback(new LogicError(response.error))
        })
    },

    retrieveUser(callback) {
        userApi.retrieve(this.__userId__, this.__userToken__, (error, response) => {
            if (error) callback(error)
            else if (response.status === 'OK') {
                const { data: { name, surname, username: email } } = response

                callback(undefined, { name, surname, email })
            } else callback(new LogicError(response.error))
        })
    },

    logoutUser() {
        // this.__userId__ = null
        // this.__userToken__ = null

        // OR fully remove all key values from session storage
        sessionStorage.clear()
    },


    searchDucks(query, callback) {
        // TODO validate inputs

        // TODO handle api errors
        duckApi.searchDucks(query, callback)
    },

    retrieveDuck(id, callback) {
        // TODO validate inputs

        // TODO handle api errors
        duckApi.retrieveDuck(id, callback)
    }
}

// es5 like

// Object.defineProperty(logic, '__userId__', {
//     set: function(id) {
//         sessionStorage.userId = id
//     },

//     get: function() {
//         return sessionStorage.userId
//     }
// })

// Object.defineProperty(logic, '__userToken__', {
//     set: function(token) {
//         sessionStorage.userToken = token
//     },

//     get: function() {
//         return sessionStorage.userToken
//     }
// })