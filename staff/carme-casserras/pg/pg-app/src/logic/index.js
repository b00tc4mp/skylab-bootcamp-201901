import validate from 'pg-validate'
import { RequirementError, ValueError, LogicError, HttpError } from 'pg-errors'
import normalize from 'pg-normalize'
import pgApi from '../data'


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

    registerUser(name, email, password) {

        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const res = await pgApi.registerUser(name, email, password)            
            const {err} = res
                
        })()
    },

    loginUser(email, password) {

        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return pgApi.authenticateUser(email, password) 

            .then(({ error, token }) => {
                if (error) throw new LogicError(error)

                this.__userToken__ = token
            })

            // .then(res => {
            //     if(res.status === 'OK') {
            //         const { token } = res
            //         this.__userToken__ = token
            //     }else throw new LogicError(res.err)
            // })        
    }
}

export default logic
