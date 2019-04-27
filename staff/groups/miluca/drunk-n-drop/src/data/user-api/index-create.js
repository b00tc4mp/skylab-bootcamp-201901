import validate from '../../common/validate'
import call from '../../common/call'

const userApi = {
    __url__: 'https://skylabcoders.herokuapp.com/api',
    __timeout__: 0,

    create(username, password, data) {
        validate.arguments([
            {username: 'username', value: username, type: 'string', notEmpty: true},
            {password: 'password', value: password, type: 'string', notEmpty: true},
            {data: 'data', value: data, type: 'object', notEmpty: true, optional: true}
        ])

        return call(`${this.__url__}/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password, ...data}),
            timeout: this.__timeout__
        })
        .then(response => response.json())
    }
}

export default userApi


