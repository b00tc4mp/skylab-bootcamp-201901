'use strict'

const logic = {
    __userId__: null,
    __userToken__: null,
    
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
                const { data: { id, token }} = response

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
                const { data: {name, surname, username: email } } = response

                callback(undefined, { name, surname, email })
            } else callback(new LogicError(response.error))
        })
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
