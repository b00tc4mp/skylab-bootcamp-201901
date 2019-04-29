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
    },

    authenticate(username,password){

        validate.arguments([
            {name:'username',value: username, type: 'string', notEmpty : true},
            {name:'password',value: password, type: 'string', notEmpty : true}
        ])
        
            return call(`${this.__url__}/auth`,{
                method : 'POST',
                headers: {'content-type' : 'application/json'},
                body: JSON.stringify({username , password}),
                timeout: this.__timeout__
            })

            .then(response => response.json())

    },
    retrieve(id, token) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
        .then(response => response.json())
    },
    update(id, token, data) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return call(`${this.__url__}/user/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            timeout: this.__timeout__
        })
            .then(response => response.json())
    }

}

export default userApi


