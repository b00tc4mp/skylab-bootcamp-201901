
// import normalize from '../components/Normalize'
const validate = require('../components/Validate')
const { LogicError } = require('../components/Errors')
const cinemaApi = require('../services')


const appLogic = {

    __userToken__ : null,

    // set __userToken__(token) {
    //     sessionStorage.userToken = token
    // },

    // get __userToken__() {
    //     return normalize.undefinedOrNull(sessionStorage.userToken)
    // },

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

        return (async () => {
            try {

                await cinemaApi.registerUser(name, surname, email, password )

            } catch (error) {

                throw new LogicError(error)

            }
        })()
    },

    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            try {

                const res = await cinemaApi.authenticateUser(email, password)

                this.__userToken__ = res.token

            } catch (error) {

                throw new LogicError(error)

            }
        })()
    },

    logoutUser() {
        sessionStorage.clear()
    },

    retrieveUser() {

        return (async () => {
            try {

                return await cinemaApi.retrieveUser(this.__userToken__)

            } catch (error) {

                throw new LogicError(error)

            }
        })()
    },


    updateUser( data) {
    //updateUser(name, surname, email, password) {
        // validate.arguments([
        //     { name: 'name', value: name, type: 'string', notEmpty: true },
        //     { name: 'surname', value: surname, type: 'string', notEmpty: true },
        //     { name: 'email', value: email, type: 'string', notEmpty: true },
        //     { name: 'password', value: password, type: 'string', notEmpty: true }
        // ])
        //validate.email(email)

        validate.arguments([
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return (async () => {
            try {

                await cinemaApi.updateUser(this.__userToken__, data)

            } catch (error) {

                throw new LogicError(error)

            }
        })()
    },

    removeUser() {

        return (async () => {
            try {

                await cinemaApi.removeUser(this.__userToken__)

            } catch (error) {

                throw new LogicError(error)

            }
        })()
    },

    //----------------------------------------------------------------------------------

    retrieveUserMaps(){
        return (async () => {
            try {
                return await cinemaApi.retrieveUserMaps(this.__userToken__)
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    retrieveUserMap(mapId) {

        validate.arguments([
            { name: 'mapId', value: mapId, type: 'string', notEmpty: true }
        ])

        return (async () => {
            try {
                return await cinemaApi.retrieveUserMap(this.__userToken__, mapId)
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    createMapCollection(mapId, collections) {

        validate.arguments([
            { name: 'mapId', value: mapId, type: 'string', notEmpty: true },
            { name: 'collections', value: collections, type: 'object', notEmpty: true }
        ])

        const data = { collections }

        return (async () => {
            try {
                return await cinemaApi.updateMap(this.__userToken__, mapId, data)
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    }

}

export default appLogic
