import validate from ('validate')
import normalize from ('normalize')
import data from ('.')
import pgApi from "../data";


const logic = {

    set __userToken__(token) {
        sessionStorage.userToken(token)
    },

    get __userToken__(token) {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    registerUser(name, email, password) {

        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return pgApi.create(name, email, password)
            .then(res => {
                if (res.status === 'OK') return
                throw new LogicError(res.err)
            })

}