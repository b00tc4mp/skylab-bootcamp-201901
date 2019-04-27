import validate from '../../common/validate'
import call from '../../common/call'

const userApi = {
    __url__: 'https://skylabcoders.herokuapp.com/api',
    __timeout__: 0,

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

}

export default userApi