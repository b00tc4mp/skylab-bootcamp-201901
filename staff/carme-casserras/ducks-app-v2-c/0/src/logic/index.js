import normalize from '../common/normalize'
import validate from '../common/validate'
import restApi from '../data/rest-api'
import { LogicError } from '../common/errors';


const logic = {
    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    get isUserLoggedIn() {
        return !!this.__userToken__
    },

    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return restApi.registerUser(name, surname, email, password)
            .then(({ error }) => {
                if (error) throw new LogicError(error)
            })
    },

    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return restApi.authenticateUser(email, password)
            .then(({ error, token }) => {
                if (error) throw new LogicError(error)

                this.__userToken__ = token
            })
    },

    retrieveUser() {
        return restApi.retrieveUser(this.__userToken__)
            .then(response => {
                const { error } = response

                if (error) throw new LogicError(error)

                return response
            })
    },

    logoutUser() {
        sessionStorage.clear()
    },

    searchDucks(query) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' }
        ])

        return restApi.searchDucks(this.__userToken__, query)
            .then(response => {
                const { error } = response

                if (error) throw new LogicError(error)

                return response instanceof Array ? response : []
            })
    },

    retrieveDuck(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' }
        ])

        return restApi.retrieveDuck(this.__userToken__, id)
            .then(response => {
                const { error } = response

                if (error) throw new LogicError(error)

                return response
            })
    },

    toggleFavDuck(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' }
        ])

        return restApi.toggleFavDuck(this.__userToken__, id)
            .then(({ error }) => {
                if (error) throw new LogicError(error)
            })
    },

    duckToCard(id) {
        validate.arguments([
            {name:'id', value: id, type: 'string'}
        ])

        return restApi.duckToCard(this.__userToken__, id)
            .then (({error}) => {
                if (error) throw new LogicError(error)
            })
    },

    retrieveFavDucks() {
        return restApi.retrieveFavDucks(this.__userToken__)
            .then(response => {
                const { error } = response

                if (error) throw new LogicError(error)

                return response
            })
    }
}

export default logic