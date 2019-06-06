const { call, validate } = require('pro-skate-common')
require('dotenv').config()

// const {
//     env: { REACT_APP_SERVER: url }
//   } = process;

const dataApi = {
    __url__: 'http://localhost:8080/api',
    __timeout__: 0,

    createUser(name, surname, email, password, age, imageUrl ) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'age', value: age, type: 'string', notEmpty: true },
            { name: 'imageUrl', value: imageUrl, type: 'string' },

        ])
        return (async ()=> {
            const isCreated = await call(`${this.__url__}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                data: { name, surname, email, password, age, imageUrl },
                timeout: this.__timeout__
            })
                return isCreated
        })()
    },

    authenticate(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])
        return( async () => {
            
            const res = await call(`${this.__url__}/users/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                data: { email, password }
            })
            const { token } = res
            return token

        })()

    },

    retrieveUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])
        return ( async ()=>{

            const res = await call(`${this.__url__}/users`, {
                headers: { Authorization: `Bearer ${token}` },
                timeout: this.__timeout__
            })
            return res
        })()
    },

    updateUser(token, name, surname, email, age, ) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'age', value: age, type: 'string' },
            { name: 'imageUrl', value: imageUrl, type: 'string' }
        ])

        return ( async ()=> {
            const res = await call(`${this.__url__}/users`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: { name, surname, email, age, imageUrl },
                timeout: this.__timeout__
            }
        )
        return res
        
        })()
    },
    deleteUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return ( async ()=> {
            const res = await call(`${this.__url__}/users`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: this.__timeout__
            }
        )
        return res
        })()
    },
}

module.exports = dataApi