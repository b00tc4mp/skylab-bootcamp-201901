import normalize from '../common/normalize'
import restApi from '../data/rest-api'
import { LogicError } from '../common/errors'


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

        //todo Validation with OW

        (async () => {
            const response = await restApi.create(nickname, age, email, password)

            if (!response.ok) throw new LogicError('Email already registred')
        })()
    },

    loginUser(nicknameOEmail, password) {

        //todo Validation with OW

        (async () => {
            const response = await restApi.authenticate(nicknameOEmail, password)

            if (response.status === 200) {
                response.json()
                this.__userToken__ = response.token

            } else throw new LogicError("Bad identification")

        })()

        return restApi.authenticate(nicknameOEmail, password)
            .then(response => {
                if (response.status === 200) return response.json()
                else throw new LogicError("Bad identification")
            })
            .then(response => {

                this.__userToken__ = response.token
            })
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