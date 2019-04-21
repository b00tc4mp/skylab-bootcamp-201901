'use strict';

const logic = {

    registerUser: function (name, surname, email, password, callback, callbackError) {
        let error
        try {
            validate.arguments([
                { name: 'name', value: name, type: 'string', notEmpty: true },
                { name: 'surname', value: surname, type: 'string', notEmpty: true },
                { name: 'password', value: password, type: 'string', notEmpty: true }
            ])
        } catch (error) {
            error = TypeError('Wrong field/s')
            error.code = 5

            throw error
        }

        try {
            validate.email(email)
        } catch (error) {
            error = Error('Incorrect email')
            error.code = 6
            throw error
        }
        
        try {
            validate.arguments([
                { name: 'callback', value: callback, type: 'function' },
                { name: 'callbackError', value: callbackError, type: 'function' }    
            ])
        } catch (error) {
         // si se quiere manterner el TypeError, eliminar esto
            error = Error('Internal error')
            error.code = 7
         //
            throw error
        }

        userApi.create(name, surname, email, password, callback, callbackError)
      
    },

    loginUser(email, password, callback, callbackError) {
        try {
            validate.email(email)
        } catch (error) {
            error = Error('Incorrect email')
            error.code = 4
            throw error
        }

        try {
            validate.arguments([
                { name: 'password', value: password, type: 'string', notEmpty: true }
            ])
        } catch (error) {
            error = Error("Password can't be empty")
            error.code = 8
            throw error
        }

        try {
            validate.arguments([
                { name: 'callback', value: callback, type: 'function' },
                { name: 'callbackError', value: callbackError, type: 'function' }    
            ])
        } catch (error) {
         // si se quiere manterner el TypeError, eliminar esto
            error = Error('Internal error')
            error.code = 7
         //
            throw error
        }


        userApi.authenticate(email, password, callback, callbackError)
      
    },


    logoutUser(){
        __userId__ = ""
        __userToken__ = ""
    },

    retrieveUser(id, token, callback, callbackError) {
        try {
            validate.arguments([
                { name: 'id', value: id, type: 'string', notEmpty: true },
                { name: 'token', value: token, type: 'string', notEmpty: true },
                { name: 'callback', value: callback, type: 'function' },
                { name: 'callbackError', value: callbackError, type: 'function' }
            ])    
        } catch (error) {
         // si se quiere manterner el TypeError, eliminar esto
            error = Error('Internal error')
            error.code = 7
         //
            throw error
        }

        userApi.retrieve(id, token, callback, callbackError)

    },


    searchDucks: function (query, callback, callbackError) {
        validate.arguments([
            { name: 'query', value: query, type: 'string', notEmpty: true },
            { name: 'callback', value: callback, type: 'function' },
            { name: 'callbackError', value: callbackError, type: 'function' }
        ])
        
        duckApi.searchDucks(query, callback, callbackError)
    },


    retrieveDuck: function(id, callback, callbackError) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'callback', value: callback, type: 'function' },
            { name: 'callbackError', value: callbackError, type: 'function' }
        ])

        duckApi.retrieveDuck(id, callback, callbackError)
    }
}
