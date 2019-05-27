import normalize from '../common/normalize'
import restApi from '../data/rest-api'
import { LogicError } from '../common/errors'
const ow = require('ow')
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const logic = {

    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    get isUserLoggedIn() {
        return !!(this.__userToken__)
    },

    registerUser(nickname, age, email, password) {

        ow(nickname, ow.string.not.empty)
        ow(age, ow.number.is(x => x > 13))
        ow(email, ow.string.not.empty)
        ow(password, ow.string.is(x => re.test(String(x))))

        return (async () => {
            const response = await restApi.create(nickname, age, email, password)

            if (!response.ok) throw new LogicError('Email already registred')
        })()
    },

    loginUser(nicknameOEmail, password) {

        ow(nicknameOEmail, ow.string.not.empty)
        ow(password, ow.string.not.empty)

        return (async () => {
            const response = await restApi.authenticate(nicknameOEmail, password)

            if (response.status === 200) {
                response.json()
                this.__userToken__ = response.token

            } else throw new LogicError("Bad identification")

        })()
    },

    async retrieveUser() {
        const response = await restApi.retrieveUser(this.__userToken__)

        if (response.status === 200) {
            response.json()
            const { nickname, age, email } = response
            return { nickname, age, email }

        } else throw new LogicError("Bad Way")
    },

    logoutUser() {
        sessionStorage.clear()
    },
}

export default logic