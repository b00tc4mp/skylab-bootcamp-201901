import restApi from '../data/auctionlive-api'
import normalize from '../common/normalize'
import validate from 'auction-validate'
import { LogicError } from 'auction-errors'

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
            .catch(error => {
                if (error) throw new LogicError(error.message)
            })
    },

    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return restApi.authenticateUser(email, password)
            .then(({ token }) => {
                this.__userToken__ = token
            })
            .catch(error => {
                if (error) throw new LogicError(error.message)
            })
    },

    retrieveUser() {
        return restApi.retrieveUser(this.__userToken__)
            .then(response => {
                const { name, surname, email } = response

                return { name, surname, email }
            })
            .catch(error => {
                if (error) throw new LogicError(error.message)
            })
    },

    logoutUser() {
        sessionStorage.clear()
    },

    updateUser(data) {
        validate.arguments([
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return restApi.updateUser(this.__userToken__, data)
            .catch(error => {
                if (error) throw new LogicError(error.message)
            })
    },

    deleteUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return restApi.deleteUser(this.__userToken__, email, password)
            .catch(error => {
                if (error) throw new LogicError(error.message)
            })
    }
}

export default logic