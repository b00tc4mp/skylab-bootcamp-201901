import { validate, call} from 'kaori-utils'

const { REACT_PORT } = process.env

const restApi = {
    __url__: `http://localhost:${REACT_PORT}/api`,
    __timeout__: 0,

    registerUser(name, surname, phone, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'phone', value: phone, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, phone, email, password }),
            timeout: this.__timeout__
        })
            .then(response => response.json())

    },

}

export default restApi