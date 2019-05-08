
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

    registerUser(name, surname, email, password, confirmPassword, callback) {
        let error

        try {
            validate.arguments([
                { name: 'name', value: name, type: 'string', notEmpty: true },
                { name: 'surname', value: surname, type: 'string', notEmpty: true },
                { name: 'password', value: password, type: 'string', notEmpty: true },
                { name: 'confirmPassword', value: confirmPassword, type: 'string', notEmpty: true },
                { value: callback, type: 'function', notEmpty: true }
            ])
        } catch (error) {
            error = TypeError('Wrong field/s')
            error.code = 2

            throw error
        }

        if (password !== confirmPassword) {
            error = TypeError('Passwords do not match')
            error.code = 3

            throw error
        }

        try {
            validate.email(email)
        } catch (error) {
            error = Error(`incorrect email`)
            error.code = 4
            throw error
        }

        userApi.create(name, surname, email, password, function (error, response) {
            if (error) callback(error)
            else if (response.status === 'OK') callback()
            else {
                error = new LogicError(response.error)
                error.code = 6
                callback(error)
            }
        })
    },

    login(email, password, callback) {

        try {
            validate.email(email)
        } catch (error) {
            error = Error(`incorrect email`)
            error.code = 4
            throw error
        }

        try {
            validate.arguments([
                { name: 'password', value: password, type: 'string', notEmpty: true },
                { value: callback, type: 'function' }
            ])
        } catch (error) {
            error = Error(`Password can't be empty`)
            error.code = 5
            throw error
        }

        userApi.authUser(email, password, (error, response) => {
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

        userApi.retrieveUser( this.__userToken__, this.__userId__, (error, response) => {
            if (error) callback(error)
            else if (response.status === 'OK') {
                const { data: { name, surname, username: email } } = response

                callback(undefined, { name, surname, email })
            } else callback(new LogicError(response.error))
        })
    },

    logOut() {
        sessionStorage.clear()
    },

    searchDucks(query, callback) {
        let error

        if (query === undefined) {
            error = TypeError('Search can not be undefined')

            error.code = 8

            throw error
        }

        if (callback instanceof Function === false) {
            error = TypeError('Callback is not a function')

            error.code = 9

            throw error
        };

        duckApi.searchDucks(query, callback)

    },

    retrieveDucklingDetail(id, callback) {
        let error

        if (id === undefined) {
            error = TypeError('Not a valid ID')

            error.code = 8

            throw error
        }

        if (callback instanceof Function === false) {
            error = TypeError('Callback is not a function')

            error.code = 9

            throw error
        }

        duckApi.retrieveDuck(id, callback)
    }

}