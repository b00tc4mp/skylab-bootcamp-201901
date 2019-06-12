import auctionLiveApi from '../data/auctionlive-api'
import normalize from '../common/normalize'
import validate from 'auction-validate'
import { LogicError } from 'auction-errors'
import jwt from 'jsonwebtoken'
import moment from 'moment'

const logic = {
    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    get __isTokenValid__() {
        const {exp} = jwt.decode(this.__userToken__) 
        const expDate = new Date(exp * 1000)
        
        return moment().isBefore(expDate)
    },

    get isUserLoggedIn() {
        return !!(this.__userToken__ && this.__isTokenValid__)
    },

    get userId() {
        const { sub } = jwt.decode(this.__userToken__)

        return sub
    },

    getFormat(number) {
        const formatter = new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0
        })

        return formatter.format(number)
    },

    registerUser(name, surname, email, password, confirmPassword) {
        validate.arguments([
            { name: 'name', value: name, type: String, notEmpty: true },
            { name: 'surname', value: surname, type: String, notEmpty: true },
            { name: 'email', value: email, type: String, notEmpty: true },
            { name: 'password', value: password, type: String, notEmpty: true },
            { name: 'confirmPassword', value: confirmPassword, type: String, notEmpty: true }
        ])

        validate.email(email)
        validate.samePassword(password, confirmPassword)

        return (async () => {
            try {
                await auctionLiveApi.registerUser(name, surname, email, password)
            } catch ({ message }) {
                throw new LogicError(message)
            }
        })()
    },

    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: String, notEmpty: true },
            { name: 'password', value: password, type: String, notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            try {
                const { token } = await auctionLiveApi.authenticateUser(email, password)
                this.__userToken__ = token
            } catch ({ message }) {
                throw new LogicError(message)
            }
        })()
    },

    async retrieveUser() {
        try {
            const user = await auctionLiveApi.retrieveUser(this.__userToken__)

            return user
        } catch ({ message }) {
            throw new LogicError(message)
        }
    },

    logoutUser() {
        sessionStorage.clear()
    },

    updateUser(data) {
        validate.arguments([
            { name: 'data', value: data, type: Object, notEmpty: true }
        ])

        return (async () => {
            try {
                const user = await auctionLiveApi.updateUser(this.__userToken__, data)

                return user
            } catch ({ message }) {
                throw new LogicError(message)
            }
        })()
    },

    deleteUser(email, password, confirmPassword) {
        validate.arguments([
            { name: 'email', value: email, type: String, notEmpty: true },
            { name: 'password', value: password, type: String, notEmpty: true },
            { name: 'confirmPassword', value: confirmPassword, type: String, notEmpty: true }
        ])

        validate.email(email)
        validate.samePassword(password, confirmPassword)

        return (async () => {
            try {
                await auctionLiveApi.deleteUser(this.__userToken__, email, password)
            } catch ({ message }) {
                throw new LogicError(message)
            }
        })()
    },

    async retrieveUserItems() {
        try {
            const items = await auctionLiveApi.retrieveUserItems(this.__userToken__)

            return items
        } catch ({ message }) {
            throw new LogicError(message)
        }
    },

    async retrieveUserItemsBids() {
        try {
            const itemsBids = await auctionLiveApi.retrieveUserItemsBids(this.__userToken__)

            return itemsBids
        } catch ({ message }) {
            throw new LogicError(message)
        }
    },

    searchItems(query) {
        validate.arguments([
            { name: 'query', value: query, type: Object, optional: true }
        ])

        return (async () => {
            try {
                return await auctionLiveApi.searchItems(query)
            } catch ({ message }) {
                throw new LogicError(message)
            }
        })()
    },

    retrieveItem(itemId) {
        validate.arguments([
            { name: 'itemId', value: itemId, type: String, notEmpty: true }
        ])

        return (async () => {
            try {
                return await auctionLiveApi.retrieveItem(itemId, this.__userToken__)
            } catch ({ message }) {
                throw new LogicError(message)
            }
        })()
    },

    async retrieveCities() {
        try {
            return await auctionLiveApi.retrieveCities()
        } catch ({ message }) {
            throw new LogicError(message)
        }
    },

    async retrieveCategories() {
        try {
            return await auctionLiveApi.retrieveCategories()
        } catch ({ message }) {
            throw new LogicError(message)
        }
    },

    placeBid(itemId, amount) {
        validate.arguments([
            { name: 'itemId', value: itemId, type: String, notEmpty: true },
            { name: 'amount', value: amount, type: Number, notEmpty: true }
        ])

        return (async () => {
            try {
                await auctionLiveApi.placeBid(itemId, this.__userToken__, amount)
            } catch ({ message }) {
                throw new LogicError(message)
            }
        })()
    },

    retrieveItemBids(itemId) {
        validate.arguments([
            { name: 'itemId', value: itemId, type: String, notEmpty: true }
        ])

        return (async () => {
            try {
                return await auctionLiveApi.retrieveItemBids(itemId, this.__userToken__)
            } catch ({ message }) {
                throw new LogicError(message)
            }
        })()
    }
}

export default logic