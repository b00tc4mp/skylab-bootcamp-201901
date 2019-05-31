'use strict'

const logic = {

    registerUser(name, surname, email, password, confirmpassword, callback) {
            validate.arguments([
                { name: 'name', value: name, type: 'string', notEmpty: true },
                { name: 'surname', value: surname, type: 'string', notEmpty: true },
                { name: 'email', value: email, type: 'string', notEmpty: true },
                { name: 'password', value: password, type: 'string', notEmpty: true },
                { name: 'confirmpassword', value: confirmpassword, type: 'string', notEmpty: true},
                { value: callback, type: 'function' }
            ])

            validate.email(email)
            validate.password(password, confirmpassword)

            userApi.create(name, surname, email, password, function(error, response) {
                if (error) callback(error)
                else if (response.status === 'OK') callback()
                else callback(new LogicError(response.error))
            })
    },

    loginUser(email, password, callback) {
        // try {
            validate.arguments([
                { name: 'email', value: email, type: 'string', notEmpty: true },
                { name: 'password', value: password, type: 'string', notEmpty: true },
                { value: callback, type: 'function' }
            ])
    
            userApi.authenticate(email, password, (error, response) => {
                if (error) callback(error)
                else if (response.status === 'OK') {
                    let {data: {id, token}} = response
                    this.__userId__ = id
                    this.__userToken__ = token
                    callback()
                } else {
                    const error = Error('wrong credentials')
                    error.code = 1;
                    callback(error)
                }
            })
        // } catch (error) { 
        //     callback(error)
        // }
    },

    retrieveUser(callback) {
        validate.arguments([
            { value: callback, type: 'function' }
        ])
    
        userApi.retrieve(this.__userId__, this.__userToken__, (error, response) => {
            if(error) callback(error)
            if(response.status === 'OK') {
                const { data: {name, surname, username: email}} = response
                callback(undefined, {name, surname, email}) //MIRAR ESTO BIEN!!!!!
            } else callback(Error(response.error))
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
